export type QuestionKey =
  | 'project_description'
  | 'challenge'
  | 'solution'
  | 'result_metrics'
  | 'lesson'
  | 'unsung_hero';

export type LangCode = 'vi' | 'ja' | 'en';
export type Severity = 'high' | 'medium' | 'low' | 'info';
export type WarningCategory =
  | 'client_name'
  | 'project_name'
  | 'confidential_data'
  | 'missing_metric'
  | 'translation_check'
  | 'general';
export type EntityType =
  | 'client_name'
  | 'project_name'
  | 'person_name'
  | 'email'
  | 'domain'
  | 'phone'
  | 'confidential_data';
export type GenerationMode = 'llm' | 'demo';

export interface Answers {
  project_description: string;
  challenge: string;
  solution: string;
  result_metrics: string | null;
  lesson: string | null;
  unsung_hero: string | null;
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
  answers: Answers;
  languages: LangCode[];
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
  masked_entities: number;
  answers: Answers;
  outputs: GeneratedOutputs;
  warnings: Warning[];
}
