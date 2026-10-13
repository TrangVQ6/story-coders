import { Answers, LangCode, GenerateResponse } from './types';

export async function generateStory(
  answers: Answers,
  languages: LangCode[]
): Promise<GenerateResponse> {
  const res = await fetch('/api/stories/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers, languages }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error?.message || `Lỗi ${res.status}`);
  }
  return res.json();
}
