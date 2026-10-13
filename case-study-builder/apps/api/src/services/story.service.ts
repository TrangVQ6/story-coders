import {
  Answers,
  GenerateRequest,
  GenerateResponse,
  GeneratedOutputs,
  LangCode,
  Warning,
} from '../types';
import { SanitizationService } from './sanitization.service';
import { WarningService } from './warning.service';
import { LlmService, generateDemo } from './llm.service';
import { SessionRepository } from '../repository/sessionRepository';
import { SYSTEM_PROMPT } from '../prompts/systemPrompt';
import { buildUserPrompt } from '../prompts/userPrompt';
import { config } from '../config';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
  }
}

const REQUIRED_KEYS: (keyof Answers)[] = ['project_description', 'challenge', 'solution'];
const ALL_KEYS: (keyof Answers)[] = [
  'project_description',
  'challenge',
  'solution',
  'result_metrics',
  'lesson',
  'unsung_hero',
];

export class StoryService {
  constructor(
    private sanitization: SanitizationService,
    private warnings: WarningService,
    private llm: LlmService,
    private repo: SessionRepository
  ) {}

  async generate(req: GenerateRequest): Promise<GenerateResponse> {
    const startedAt = Date.now();
    this.validate(req);

    const answers = req.answers;
    const rawTexts = ALL_KEYS.filter((k) => answers[k]).map((k) => String(answers[k]));
    const register = this.sanitization.detect(rawTexts);
    const redacted = this.sanitization.redactAnswers(answers, register);

    const prompt = buildUserPrompt(redacted, register, req.languages);

    let outputs: GeneratedOutputs;
    let mode: 'llm' | 'demo';
    if (this.llm.isConfigured) {
      outputs = await this.llm.generate(prompt, SYSTEM_PROMPT);
      mode = 'llm';
    } else {
      outputs = generateDemo(redacted, req.languages);
      mode = 'demo';
    }

    // ContentGuard: khong bia so lieu (FR-GEN-002)
    this.assertNoHallucination(redacted, outputs);

    const warningGroups: Warning[][] = [];
    warningGroups.push(this.warnings.buildMissingMetric(Boolean(redacted.result_metrics)));
    warningGroups.push(this.sanitization.scan(this.flattenOutputs(outputs), register));

    const warnings = this.warnings.merge(warningGroups);
    const sessionId = this.repo.create({
      answers: redacted,
      languages: req.languages,
      maskedEntities: register.length,
      outputs,
      warnings,
    });

    return {
      outputs,
      warnings,
      meta: {
        session_id: sessionId,
        duration_ms: Date.now() - startedAt,
        masked_entities: register.length,
        mode,
        prompt_version: config.promptVersion,
      },
    };
  }

  getById(id: string) {
    return this.repo.getById(id);
  }

  private validate(req: GenerateRequest): void {
    if (!req || typeof req !== 'object') throw new ApiError(422, 'Payload không hợp lệ.');
    const answers = req.answers;
    if (!answers || typeof answers !== 'object') throw new ApiError(422, 'Thiếu trường answers.');

    for (const key of REQUIRED_KEYS) {
      const v = answers[key];
      if (typeof v !== 'string' || !v.trim()) {
        throw new ApiError(422, `Trường bắt buộc "${key}" đang trống.`);
      }
    }
    for (const key of ALL_KEYS) {
      const v = answers[key];
      if (v && typeof v === 'string' && v.length > config.maxAnswerLength) {
        throw new ApiError(422, `Trường "${key}" vượt quá ${config.maxAnswerLength} ký tự.`);
      }
    }

    const langs = req.languages;
    if (!Array.isArray(langs) || langs.length === 0) {
      throw new ApiError(422, 'Phải chọn ít nhất một ngôn ngữ.');
    }
    const valid: LangCode[] = ['vi', 'ja', 'en'];
    for (const l of langs) {
      if (!valid.includes(l)) throw new ApiError(422, `Ngôn ngữ không hợp lệ: ${l}`);
    }
  }

  private assertNoHallucination(redacted: Answers, outputs: GeneratedOutputs): void {
    if (!redacted.result_metrics) {
      const result = outputs.case_study.result;
      if (result && /\d/.test(result)) {
        throw new ApiError(502, 'Phát hiện số liệu không có trong đầu vào — vui lòng thử lại.');
      }
    }
  }

  private flattenOutputs(outputs: GeneratedOutputs): Record<string, string> {
    return {
      newsletter_vi: outputs.newsletter_vi,
      teams_post: outputs.teams_post,
      case_study_context: outputs.case_study.context,
      case_study_challenge: outputs.case_study.challenge,
      case_study_solution: outputs.case_study.solution,
      case_study_result: outputs.case_study.result,
      ja_version: outputs.ja_version ?? '',
      en_version: outputs.en_version ?? '',
    };
  }
}
