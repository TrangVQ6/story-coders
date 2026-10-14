import { Answers, DetectedEntity, Warning } from '../types';
import { detectEntities, BlocklistEntry } from '../security/entityDetector';
import { redactText } from '../security/redactor';
import { scanOutputs } from '../security/outputScanner';

export class SanitizationService {
  constructor(private blocklist: BlocklistEntry[]) {}

  detect(texts: string[]): DetectedEntity[] {
    const all: DetectedEntity[] = [];
    for (const t of texts) {
      if (t) all.push(...detectEntities(t, this.blocklist));
    }
    const seen = new Map<string, DetectedEntity>();
    for (const e of all) {
      const key = e.type + ':' + e.value.toLowerCase();
      const prev = seen.get(key);
      if (!prev || prev.value.length < e.value.length) seen.set(key, e);
    }
    return Array.from(seen.values());
  }

  /**
   * Redact cau tra loi truoc khi dua vao prompt.
   * - client/project/person/confidential... -> mo ta chung
   * - proper_name (ten rieng noi bo FPT) -> GIU NGUYEN de LLM viet dung, L3 se
   *   danh dau warning proper_name de UI highlight cho nguoi chinh sua.
   */
  redactAnswers(answers: Answers, entities: DetectedEntity[]): Answers {
    const out = { ...answers } as Answers;
    const redactable = entities.filter((e) => e.type !== 'proper_name');
    for (const key of Object.keys(out) as (keyof Answers)[]) {
      const v = out[key];
      if (v) out[key] = redactText(v, redactable).text;
    }
    return out;
  }

  scan(outputs: Record<string, string>, register: DetectedEntity[]): Warning[] {
    return scanOutputs(outputs, register, this.blocklist);
  }
}