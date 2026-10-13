import { Answers, GeneratedOutputs, LangCode } from '../types';
import { config } from '../config';

export class LlmService {
  get isConfigured(): boolean {
    return Boolean(config.llm.apiKey);
  }

  async generate(prompt: string, system: string): Promise<GeneratedOutputs> {
    if (config.llm.provider === 'anthropic') {
      return this.generateAnthropic(prompt, system);
    }
    return this.generateOpenAI(prompt, system);
  }

  private async generateOpenAI(prompt: string, system: string): Promise<GeneratedOutputs> {
    const base = config.llm.baseUrl || 'https://api.openai.com/v1';
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), config.llm.timeoutMs);
    try {
      const res = await fetch(`${base}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.llm.apiKey}`,
        },
        body: JSON.stringify({
          model: config.llm.model || 'gpt-4o-mini',
          temperature: config.llm.temperature,
          max_tokens: config.llm.maxTokens,
          response_format: { type: 'json_object' },
          messages: [
            { role: 'system', content: system },
            { role: 'user', content: prompt },
          ],
        }),
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(`LLM API error: ${res.status}`);
      const data = await res.json();
      const text = data.choices?.[0]?.message?.content ?? '';
      return parseJsonOutput(text);
    } finally {
      clearTimeout(timer);
    }
  }

  private async generateAnthropic(prompt: string, system: string): Promise<GeneratedOutputs> {
    const base = config.llm.baseUrl || 'https://api.anthropic.com/v1';
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), config.llm.timeoutMs);
    try {
      const res = await fetch(`${base}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': config.llm.apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: config.llm.model || 'claude-3-5-haiku-latest',
          max_tokens: config.llm.maxTokens,
          temperature: config.llm.temperature,
          system,
          messages: [{ role: 'user', content: prompt }],
        }),
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(`LLM API error: ${res.status}`);
      const data = await res.json();
      const text = data.content?.find((b: { type: string }) => b.type === 'text')?.text ?? '';
      return parseJsonOutput(text);
    } finally {
      clearTimeout(timer);
    }
  }
}

export function parseJsonOutput(text: string): GeneratedOutputs {
  let cleaned = text.trim();
  cleaned = cleaned.replace(/^```(?:json)?/i, '').replace(/```$/i, '').trim();
  const parsed = JSON.parse(cleaned) as Partial<GeneratedOutputs>;
  return normalizeOutputs(parsed);
}

export function normalizeOutputs(o: Partial<GeneratedOutputs>): GeneratedOutputs {
  return {
    newsletter_vi: typeof o.newsletter_vi === 'string' ? o.newsletter_vi : '',
    teams_post: typeof o.teams_post === 'string' ? o.teams_post : '',
    case_study: {
      context: o.case_study?.context ?? '',
      challenge: o.case_study?.challenge ?? '',
      solution: o.case_study?.solution ?? '',
      result: o.case_study?.result ?? '',
    },
    ja_version: typeof o.ja_version === 'string' && o.ja_version ? o.ja_version : null,
    en_version: typeof o.en_version === 'string' && o.en_version ? o.en_version : null,
  };
}

/**
 * Demo generator — deterministic fallback khi chua cau hinh LLM API key.
 * Bao dam moi dau ra chi dung du lieu da redact; khong bia so lieu.
 */
export function generateDemo(answers: Answers, languages: LangCode[]): GeneratedOutputs {
  const area = answers.project_description.trim();
  const challenge = answers.challenge.trim();
  const solution = answers.solution.trim();
  const result = answers.result_metrics?.trim();
  const lesson = answers.lesson?.trim();
  const hero = answers.unsung_hero?.trim();

  const summary = area || 'dự án';
  const challengeSentence = challenge ? `Thách thức lớn nhất: ${challenge}.` : '';
  const solutionSentence = solution ? `Team đã giải quyết bằng cách ${solution}.` : '';
  const resultSentence = result ? `Kết quả đạt được: ${result}.` : '';

  const newsletterTitle = `Câu chuyện thành công: ${summary}`;
  const newsletterBody = [
    `Mỗi dự án đều có một câu chuyện đáng kể. Với ${summary}, câu chuyện bắt đầu từ một thách thức không nhỏ.`,
    challengeSentence,
    solutionSentence,
    resultSentence,
    lesson ? `Bài học team muốn chia sẻ: ${lesson}.` : '',
    hero ? `Và người hùng thầm lặng của team — ${hero} — xứng đáng được ghi nhận.` : '',
  ]
    .filter(Boolean)
    .join(' ');

  const newsletter_vi = `${newsletterTitle}\n\n${newsletterBody}`;

  const postRaw = `🚀 ${summary}: ${challengeSentence} ${resultSentence} Đọc câu chuyện đầy đủ 👉 #ProjectStory #FJP`;
  const teams_post = postRaw.length > 284 ? postRaw.slice(0, 281) + '...' : postRaw;

  const case_study = {
    context: `Team triển khai ${summary} trong bối cảnh yêu cầu ngày càng khắt khe về chất lượng và thời gian.`,
    challenge: challenge || 'Chưa có thông tin thách thức.',
    solution: solution || 'Chưa có thông tin giải pháp.',
    result: result || 'Chưa có số liệu kết quả — nên bổ sung con số cụ thể.',
  };

  return {
    newsletter_vi,
    teams_post,
    case_study,
    ja_version: languages.includes('ja')
      ? '[Bản dịch tiếng Nhật — chế độ demo: kết nối AI để nhận bản dịch thật]'
      : null,
    en_version: languages.includes('en')
      ? '[English translation — demo mode: connect AI for real translation]'
      : null,
  };
}
