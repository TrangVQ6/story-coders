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

  redactAnswers(answers: Answers, entities: DetectedEntity[]): Answers {
    const out = { ...answers } as Answers;
    for (const key of Object.keys(out) as (keyof Answers)[]) {
      const v = out[key];
      if (v) out[key] = redactText(v, entities).text;
    }
    return out;
  }

  scan(outputs: Record<string, string>, register: DetectedEntity[]): Warning[] {
    return scanOutputs(outputs, register, this.blocklist);
  }
}
