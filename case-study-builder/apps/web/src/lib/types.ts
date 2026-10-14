export type LangCode = 'vi' | 'ja' | 'en';
export type AchievementType = 'personal' | 'team';

export type PersonalQuestionKey =
  | 'pa_name'
  | 'pa_role'
  | 'pa_contribution'
  | 'pa_importance'
  | 'pa_challenge'
  | 'pa_situation'
  | 'pa_results'
  | 'pa_collab'
  | 'pa_quality'
  | 'pa_reason'
  | 'pa_thanks';

export type TeamQuestionKey =
  | 'team_intro'
  | 'team_achievement'
  | 'team_challenge'
  | 'team_solution'
  | 'team_tools'
  | 'team_difference'
  | 'team_metrics'
  | 'team_feedback'
  | 'team_lesson'
  | 'team_advice';

export type QuestionKey = PersonalQuestionKey | TeamQuestionKey;

export interface Answers {
  [key: string]: string;
}

export type AnswersPatch = Partial<Answers>;

export interface Consent {
  consent_media_public: boolean;
  consent_truthful: boolean;
}

export interface Warning {
  severity: 'high' | 'medium' | 'low' | 'info';
  category: string;
  description: string;
}

export interface GenerateResponse {
  outputs: {
    newsletter_vi: string;
    teams_post: string;
    case_study: { context: string; challenge: string; solution: string; result: string };
    ja_version: string | null;
    en_version: string | null;
  };
  warnings: Warning[];
  meta: {
    session_id: string;
    duration_ms: number;
    masked_entities: number;
    mode: 'llm' | 'demo';
    prompt_version: string;
  };
}

/** Bộ câu hỏi chuẩn theo chủ đề (docs/12 §2.2-2.3) — label/hint/placeholder nằm trong lib/i18n.ts */
export interface QuestionMeta {
  key: QuestionKey;
  required: boolean;
  rows?: number;
}

export const PERSONAL_QUESTIONS: QuestionMeta[] = [
  { key: 'pa_name', required: true },
  { key: 'pa_role', required: true },
  { key: 'pa_contribution', required: true, rows: 3 },
  { key: 'pa_importance', required: true, rows: 3 },
  { key: 'pa_challenge', required: false, rows: 3 },
  { key: 'pa_situation', required: false, rows: 3 },
  { key: 'pa_results', required: false, rows: 3 },
  { key: 'pa_collab', required: false, rows: 3 },
  { key: 'pa_quality', required: false },
  { key: 'pa_reason', required: false, rows: 3 },
  { key: 'pa_thanks', required: false, rows: 3 },
];

export const TEAM_QUESTIONS: QuestionMeta[] = [
  { key: 'team_intro', required: true, rows: 3 },
  { key: 'team_achievement', required: true, rows: 3 },
  { key: 'team_challenge', required: true, rows: 3 },
  { key: 'team_solution', required: true, rows: 3 },
  { key: 'team_tools', required: false, rows: 3 },
  { key: 'team_difference', required: false, rows: 3 },
  { key: 'team_metrics', required: false, rows: 3 },
  { key: 'team_feedback', required: false, rows: 3 },
  { key: 'team_lesson', required: false, rows: 3 },
  { key: 'team_advice', required: false, rows: 3 },
];

export const TOPICS: { type: AchievementType; icon: string }[] = [
  { type: 'personal', icon: 'person' },
  { type: 'team', icon: 'team' },
];

export const EMPTY_ANSWERS: Answers = {};
export const EMPTY_CONSENT: Consent = { consent_media_public: false, consent_truthful: false };