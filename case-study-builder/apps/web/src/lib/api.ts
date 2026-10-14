import { Answers, LangCode, GenerateResponse, AchievementType, Consent } from './types';

export async function generateStory(
  achievementType: AchievementType,
  answers: Answers,
  languages: LangCode[],
  consent: Consent
): Promise<GenerateResponse> {
  const res = await fetch('/api/stories/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ achievement_type: achievementType, answers, languages, consent }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error?.message || `Lỗi ${res.status}`);
  }
  return res.json();
}