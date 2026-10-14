import { Db } from '../db/database';
import {
  Answers,
  GeneratedOutputs,
  Warning,
  SessionRecord,
  Consent,
  AchievementType,
} from '../types';
import { v4 as uuidv4 } from 'uuid';

export class SessionRepository {
  constructor(private db: Db) {}

  create(input: {
    achievementType: AchievementType;
    answers: Answers;
    languages: string[];
    consent: Consent;
    maskedEntities: number;
    outputs: GeneratedOutputs;
    warnings: Warning[];
  }): string {
    const id = uuidv4();
    const now = new Date().toISOString();
    this.db.transaction(() => {
      this.db
        .prepare(
          'INSERT INTO sessions (id, status, created_at, languages, achievement_type, masked_entities) VALUES (?, ?, ?, ?, ?, ?)'
        )
        .run(
          id,
          'ready',
          now,
          JSON.stringify(input.languages),
          input.achievementType,
          input.maskedEntities
        );

      const insAns = this.db.prepare(
        'INSERT INTO answers (session_id, question_key, content) VALUES (?, ?, ?)'
      );
      for (const [key, value] of Object.entries(input.answers)) {
        if (value) insAns.run(id, key, String(value));
      }

      const insOut = this.db.prepare(
        'INSERT INTO outputs (session_id, type, content) VALUES (?, ?, ?)'
      );
      const o = input.outputs;
      insOut.run(id, 'newsletter_vi', o.newsletter_vi);
      insOut.run(id, 'teams_post', o.teams_post);
      insOut.run(id, 'case_study', JSON.stringify(o.case_study));
      if (o.ja_version) insOut.run(id, 'ja_version', o.ja_version);
      if (o.en_version) insOut.run(id, 'en_version', o.en_version);

      const insWarn = this.db.prepare(
        'INSERT INTO warnings (session_id, severity, category, description) VALUES (?, ?, ?, ?)'
      );
      for (const w of input.warnings) insWarn.run(id, w.severity, w.category, w.description);

      const insConsent = this.db.prepare(
        'INSERT INTO consents (session_id, consent_media_public, consent_truthful) VALUES (?, ?, ?)'
      );
      insConsent.run(
        id,
        input.consent.consent_media_public ? 1 : 0,
        input.consent.consent_truthful ? 1 : 0
      );
    })();
    return id;
  }

  getById(id: string): SessionRecord | null {
    const row = this.db
      .prepare(
        'SELECT id, status, created_at, languages, achievement_type, masked_entities FROM sessions WHERE id = ?'
      )
      .get(id) as
      | {
          id: string;
          status: string;
          created_at: string;
          languages: string;
          achievement_type: AchievementType;
          masked_entities: number;
        }
      | undefined;
    if (!row) return null;

    const answersRows = this.db
      .prepare('SELECT question_key, content FROM answers WHERE session_id = ?')
      .all(id) as { question_key: string; content: string }[];
    const outputsRows = this.db
      .prepare('SELECT type, content FROM outputs WHERE session_id = ?')
      .all(id) as { type: string; content: string }[];
    const warningsRows = this.db
      .prepare('SELECT severity, category, description FROM warnings WHERE session_id = ?')
      .all(id) as Warning[];
    const consentRow = this.db
      .prepare(
        'SELECT consent_media_public, consent_truthful FROM consents WHERE session_id = ? ORDER BY id DESC LIMIT 1'
      )
      .get(id) as { consent_media_public: number; consent_truthful: number } | undefined;

    const answers = {} as Record<string, string>;
    for (const r of answersRows) answers[r.question_key] = r.content;

    const outputs = {} as Record<string, unknown>;
    for (const r of outputsRows) {
      outputs[r.type] = r.type === 'case_study' ? JSON.parse(r.content) : r.content;
    }

    return {
      id: row.id,
      status: row.status,
      created_at: row.created_at,
      languages: row.languages,
      achievement_type: row.achievement_type,
      masked_entities: row.masked_entities,
      consent: {
        consent_media_public: Boolean(consentRow?.consent_media_public),
        consent_truthful: Boolean(consentRow?.consent_truthful),
      },
      answers: answers as unknown as Answers,
      outputs: outputs as unknown as GeneratedOutputs,
      warnings: warningsRows,
    };
  }
}