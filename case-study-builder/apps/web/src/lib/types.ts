export type LangCode = 'vi' | 'ja' | 'en';

export interface Answers {
  project_description: string;
  challenge: string;
  solution: string;
  result_metrics: string;
  lesson: string;
  unsung_hero: string;
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

export const EMPTY_ANSWERS: Answers = {
  project_description: '',
  challenge: '',
  solution: '',
  result_metrics: '',
  lesson: '',
  unsung_hero: '',
};
