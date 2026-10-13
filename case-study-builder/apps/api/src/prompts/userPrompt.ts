import { Answers, DetectedEntity, LangCode } from '../types';

export function buildUserPrompt(
  answers: Answers,
  entities: DetectedEntity[],
  languages: LangCode[]
): string {
  const entityLines =
    entities.length > 0
      ? entities.map((e) => `- ${e.value} (${e.type})`).join('\n')
      : '(không có)';

  return `<user_data>
project_description: ${answers.project_description}
challenge: ${answers.challenge}
solution: ${answers.solution}
result_metrics: ${answers.result_metrics || '(trống)'}
lesson: ${answers.lesson || '(trống)'}
unsung_hero: ${answers.unsung_hero || '(trống)'}
languages: ${languages.join(',')}
</user_data>

ENTITIES_TO_REDACT:
${entityLines}`;
}
