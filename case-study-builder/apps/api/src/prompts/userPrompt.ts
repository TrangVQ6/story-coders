import {
  Answers,
  Consent,
  DetectedEntity,
  LangCode,
  AchievementType,
  questionKeysFor,
} from '../types';

/**
 * USER PROMPT TEMPLATE v2.0 — docs/09-technical-spec-prompts-and-security.md §2.3
 * Gom achievement_type, 10 cau tra loi theo chu de, consent va ENTITIES_TO_REDACT.
 */
export function buildUserPrompt(
  achievementType: AchievementType,
  answers: Answers,
  entities: DetectedEntity[],
  languages: LangCode[],
  consent: Consent
): string {
  const keys = questionKeysFor(achievementType);
  const answerLines = keys.map((k) => `${k}: ${answers[k]?.trim() || '(trống)'}`).join('\n');

  const entityLines =
    entities.length > 0
      ? entities.map((e) => `- ${e.value} (${e.type})`).join('\n')
      : '(không có)';

  return `<user_data>
achievement_type: ${achievementType}
${answerLines}
languages: ${languages.join(',')}
consent: media_public=${consent.consent_media_public}, truthful=${consent.consent_truthful}
</user_data>

ENTITIES_TO_REDACT:
${entityLines}`;
}