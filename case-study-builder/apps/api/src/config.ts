import path from 'path';

export const config = {
  port: Number(process.env.PORT || 4000),
  dbPath: process.env.DB_PATH || path.join(__dirname, '..', 'data', 'csb.db'),
  promptVersion: '1.0',
  maxAnswerLength: 500,
  llm: {
    provider: (process.env.LLM_PROVIDER || 'openai') as 'openai' | 'anthropic',
    baseUrl: process.env.LLM_BASE_URL || '',
    apiKey: process.env.LLM_API_KEY || '',
    model: process.env.LLM_MODEL || '',
    temperature: 0.3,
    maxTokens: 4096,
    timeoutMs: 45000,
  },
};
