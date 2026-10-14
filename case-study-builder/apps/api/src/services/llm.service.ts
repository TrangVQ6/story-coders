import { Answers, GeneratedOutputs, LangCode, AchievementType } from '../types';
import { config } from '../config';
import { resultKeyFor } from '../types';

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
 * Google Cloud Translation API v2 — bản dịch thật cho tính năng Translations.
 * Dung khi cau hinh GOOGLE_TRANSLATE_API_KEY. Tra ve null neu khong co key
 * hoac loi (graceful fallback ve placeholder demo).
 */
export async function translateViaGoogle(
  text: string,
  target: 'ja' | 'en'
): Promise<string | null> {
  const key = config.googleTranslate.apiKey;
  if (!key || !text.trim()) return null;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${encodeURIComponent(key)}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: text, target, format: 'text' }),
      signal: controller.signal,
    });
    if (!res.ok) {
      console.warn(`[translate] Google API error: ${res.status}`);
      return null;
    }
    const data = (await res.json()) as {
      data?: { translations?: Array<{ translatedText?: string }> };
    };
    const translated = data.data?.translations?.[0]?.translatedText;
    return translated && translated.trim() ? translated : null;
  } catch (err) {
    console.warn('[translate] failed:', err instanceof Error ? err.message : err);
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Demo generator — deterministic fallback khi chua cau hinh LLM API key.
 * Viet lai v2.0: ho tro 2 chu de (personal/team), phong cach FUN (docs/12 §5).
 * Bao dam moi dau ra chi dung du lieu da redact; khong bia so lieu.
 * Neu co GOOGLE_TRANSLATE_API_KEY, ja_version/en_version la ban dich that.
 */
export async function generateDemo(
  achievementType: AchievementType,
  answers: Answers,
  languages: LangCode[]
): Promise<GeneratedOutputs> {
  const resultKey = resultKeyFor(achievementType);
  const result = answers[resultKey]?.trim();

  const newsletter_vi =
    achievementType === 'personal'
      ? demoPersonalNewsletter(answers)
      : demoTeamNewsletter(answers);

  const teams_post = demoTeamsPost(achievementType, answers, result);

  const case_study =
    achievementType === 'personal'
      ? demoPersonalCaseStudy(answers)
      : demoTeamCaseStudy(answers);

  const [ja, en] = await Promise.all([
    languages.includes('ja') ? translateViaGoogle(newsletter_vi, 'ja') : Promise.resolve(null),
    languages.includes('en') ? translateViaGoogle(newsletter_vi, 'en') : Promise.resolve(null),
  ]);

  return {
    newsletter_vi,
    teams_post,
    case_study,
    ja_version:
      ja ??
      (languages.includes('ja')
        ? '[Bản dịch tiếng Nhật — chế độ demo: kết nối AI để nhận bản dịch thật]'
        : null),
    en_version:
      en ??
      (languages.includes('en')
        ? '[English translation — demo mode: connect AI for real translation]'
        : null),
  };
}

/** Bản tin cá nhân — phong cách FUN: nhân vật → vai trò → đóng góp → tầm quan trọng → kết quả → phẩm chất */
function demoPersonalNewsletter(a: Answers): string {
  const name = a.pa_name?.trim() || 'nhân vật';
  const role = a.pa_role?.trim();
  const contribution = a.pa_contribution?.trim();
  const importance = a.pa_importance?.trim();
  const challenge = a.pa_challenge?.trim();
  const situation = a.pa_situation?.trim();
  const results = a.pa_results?.trim();
  const collab = a.pa_collab?.trim();
  const quality = a.pa_quality?.trim();
  const reason = a.pa_reason?.trim();
  const thanks = a.pa_thanks?.trim();

  const title = `Câu chuyện thành công: ${name}`;
  const sentences = [
    `Mới đây, ${name}${role ? ` với vai trò ${role}` : ''} đã để lại dấu ấn đáng ghi nhận trong dự án.`,
    contribution ? `Đóng góp nổi bật nhất: ${contribution}.` : '',
    importance ? `Điều này quan trọng bởi ${importance}.` : '',
    challenge ? `Trong quá trình thực hiện, ${name} đã giải quyết thách thức đáng chú ý: ${challenge}.` : '',
    situation ? `Một tình huống tiêu biểu: ${situation}.` : '',
    results ? `Kết quả có dấu ấn trực tiếp: ${results}.` : '',
    collab ? `Về tinh thần phối hợp: ${collab}.` : '',
    quality ? `Phẩm chất nổi bật nhất: ${quality}.` : '',
    reason
      ? `Nếu chỉ chọn một lý do để vinh danh: ${reason}.`
      : 'Sự cống hiến của nhân vật xứng đáng được ghi nhận và lan tỏa.',
    thanks ? `Lời ghi nhận gửi tới nhân vật: ${thanks}.` : '',
  ].filter(Boolean);

  return `${title}\n\n${sentences.join(' ')}`;
}

/** Bản tin đội nhóm — phong cách FUN: giới thiệu → thành tựu → thách thức → giải pháp → công cụ → số liệu → phản hồi → bài học */
function demoTeamNewsletter(a: Answers): string {
  const intro = a.team_intro?.trim() || 'câu chuyện thành công của team';
  const achievement = a.team_achievement?.trim();
  const challenge = a.team_challenge?.trim();
  const solution = a.team_solution?.trim();
  const tools = a.team_tools?.trim();
  const difference = a.team_difference?.trim();
  const metrics = a.team_metrics?.trim();
  const feedback = a.team_feedback?.trim();
  const lesson = a.team_lesson?.trim();
  const advice = a.team_advice?.trim();

  const title = `Câu chuyện thành công: ${intro}`;
  const sentences = [
    `Mới đây, ${intro}.`,
    achievement ? `Thành tựu nổi bật: ${achievement}.` : '',
    challenge ? `Trước đó, team đối mặt với bài toán: ${challenge}.` : '',
    solution ? `Team đã áp dụng giải pháp: ${solution}.` : '',
    tools ? `Công cụ/phương pháp hiệu quả: ${tools}.` : '',
    difference ? `Điểm khác biệt: ${difference}.` : '',
    metrics ? `Kết quả đo lường được: ${metrics}.` : '',
    feedback ? `Phản hồi từ khách hàng/bên liên quan: ${feedback}.` : '',
    lesson ? `Bài học giá trị nhất: ${lesson}.` : '',
    advice
      ? `Khuyến nghị cho team khác: ${advice}.`
      : 'Kinh nghiệm của team là nguồn tham khảo quý giá cho các dự án tương tự.',
  ].filter(Boolean);

  return `${title}\n\n${sentences.join(' ')}`;
}

function demoTeamsPost(achievementType: AchievementType, a: Answers, result?: string): string {
  const context =
    achievementType === 'personal'
      ? a.pa_name?.trim() || 'thành tựu cá nhân'
      : a.team_achievement?.trim() || a.team_intro?.trim() || 'thành tựu của team';
  const resultPart = result ? ` Kết quả: ${result}.` : '';
  const raw = `🚀 ${context}.${resultPart} Đọc câu chuyện đầy đủ 👉 #ProjectStory #FJP`;
  return raw.length > 284 ? raw.slice(0, 281) + '...' : raw;
}

function demoPersonalCaseStudy(a: Answers): {
  context: string;
  challenge: string;
  solution: string;
  result: string;
} {
  return {
    context: `Nhân vật ${a.pa_name?.trim() || 'được vinh danh'}${
      a.pa_role?.trim() ? ` (${a.pa_role.trim()})` : ''
    } đã có đóng góp nổi bật: ${a.pa_contribution?.trim() || 'chưa cung cấp'}.`,
    challenge: a.pa_challenge?.trim() || 'Chưa có thông tin thách thức.',
    solution: a.pa_situation?.trim() || a.pa_collab?.trim() || 'Chưa có thông tin cách giải quyết.',
    result: a.pa_results?.trim() || 'Chưa có số liệu kết quả — nên bổ sung con số cụ thể.',
  };
}

function demoTeamCaseStudy(a: Answers): {
  context: string;
  challenge: string;
  solution: string;
  result: string;
} {
  return {
    context: `Team triển khai ${a.team_intro?.trim() || 'dự án'} — ${
      a.team_achievement?.trim() || 'câu chuyện thành công'
    }.`,
    challenge: a.team_challenge?.trim() || 'Chưa có thông tin thách thức.',
    solution: a.team_solution?.trim() || 'Chưa có thông tin giải pháp.',
    result: a.team_metrics?.trim() || 'Chưa có số liệu kết quả — nên bổ sung con số cụ thể.',
  };
}