/**
 * Types v2.0 — Case Study Builder API
 *
 * Thay doi v2.0 (docs/12, ADR-005, ADR-006):
 * - Answers: 2 chu de x 10 cau (personal `pa_*` / team `team_*`)
 * - GenerateRequest: them `achievement_type` + `consent`
 * - WarningCategory: them `proper_name`, `consent_missing`
 * - EntityType: them `proper_name` (ten rieng noi bo FPT)
 */

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

export type LangCode = 'vi' | 'ja' | 'en';
export type Severity = 'high' | 'medium' | 'low' | 'info';
export type WarningCategory =
  | 'client_name'
  | 'project_name'
  | 'confidential_data'
  | 'missing_metric'
  | 'translation_check'
  | 'proper_name'
  | 'consent_missing'
  | 'general';
export type EntityType =
  | 'client_name'
  | 'project_name'
  | 'person_name'
  | 'proper_name'
  | 'email'
  | 'domain'
  | 'phone'
  | 'confidential_data';
export type GenerationMode = 'llm' | 'demo';

/** Bo cau hoi chuan theo chu de (docs/12 §2.2-2.3) */
export const PERSONAL_QUESTION_KEYS: PersonalQuestionKey[] = [
  'pa_name',
  'pa_role',
  'pa_contribution',
  'pa_importance',
  'pa_challenge',
  'pa_situation',
  'pa_results',
  'pa_collab',
  'pa_quality',
  'pa_reason',
  'pa_thanks',
];

export const TEAM_QUESTION_KEYS: TeamQuestionKey[] = [
  'team_intro',
  'team_achievement',
  'team_challenge',
  'team_solution',
  'team_tools',
  'team_difference',
  'team_metrics',
  'team_feedback',
  'team_lesson',
  'team_advice',
];

export function questionKeysFor(type: AchievementType): QuestionKey[] {
  return type === 'personal' ? PERSONAL_QUESTION_KEYS : TEAM_QUESTION_KEYS;
}

/** Truong bat buoc theo chu de: personal A1-A4 / team B1-B4 */
export function requiredKeysFor(type: AchievementType): QuestionKey[] {
  return type === 'personal'
    ? ['pa_name', 'pa_role', 'pa_contribution', 'pa_importance']
    : ['team_intro', 'team_achievement', 'team_challenge', 'team_solution'];
}

/** Truong ket qua con so theo chu de (dung cho missing_metric + no-hallucination) */
export function resultKeyFor(type: AchievementType): QuestionKey {
  return type === 'personal' ? 'pa_results' : 'team_metrics';
}

export interface Answers {
  [key: string]: string | null;
}

export interface Consent {
  consent_media_public: boolean;
  consent_truthful: boolean;
}

export interface DetectedEntity {
  value: string;
  type: EntityType;
}

export interface Warning {
  severity: Severity;
  category: WarningCategory;
  description: string;
}

export interface CaseStudy {
  context: string;
  challenge: string;
  solution: string;
  result: string;
}

export interface GeneratedOutputs {
  newsletter_vi: string;
  teams_post: string;
  case_study: CaseStudy;
  ja_version: string | null;
  en_version: string | null;
}

export interface GenerateRequest {
  achievement_type: AchievementType;
  answers: Answers;
  languages: LangCode[];
  consent: Consent;
  options?: {
    use_sample?: string | null;
  };
}

export interface GenerateResponse {
  outputs: GeneratedOutputs;
  warnings: Warning[];
  meta: {
    session_id: string;
    duration_ms: number;
    masked_entities: number;
    mode: GenerationMode;
    prompt_version: string;
  };
}

export interface SessionRecord {
  id: string;
  status: string;
  created_at: string;
  languages: string;
  achievement_type: AchievementType;
  masked_entities: number;
  consent: Consent;
  answers: Answers;
  outputs: GeneratedOutputs;
  warnings: Warning[];
}