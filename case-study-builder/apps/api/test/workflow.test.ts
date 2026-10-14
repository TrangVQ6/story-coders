import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app';
import { StoryService } from '../src/services/story.service';
import { SanitizationService } from '../src/services/sanitization.service';
import { WarningService } from '../src/services/warning.service';
import { LlmService } from '../src/services/llm.service';
import { SessionRepository } from '../src/repository/sessionRepository';
import { createDatabase } from '../src/db/database';

const BLOCKLIST = [{ value: 'ABC Corporation', type: 'client_name' as const }];

const CONSENT_OK = { consent_media_public: true, consent_truthful: true };

function teamReq(overrides: Record<string, unknown> = {}) {
  return {
    achievement_type: 'team',
    answers: {
      team_intro: 'Du an cho ABC Corporation tai Nhat',
      team_achievement: 'Hoan thanh du an ABC Corporation',
      team_challenge: 'Ap dung thiet ke moi khong giam hieu nang',
      team_solution: 'Danh gia rui ro truoc',
      team_tools: null,
      team_difference: null,
      team_metrics: null,
      team_feedback: null,
      team_lesson: 'Danh gia rui ro som',
      team_advice: null,
    },
    languages: ['vi', 'ja', 'en'],
    consent: CONSENT_OK,
    ...overrides,
  };
}

describe('Workflow API (end-to-end) — v2.0', () => {
  let app: ReturnType<typeof createApp>;

  beforeAll(() => {
    const db = createDatabase(':memory:');
    const repo = new SessionRepository(db);
    const sanitization = new SanitizationService(BLOCKLIST);
    const warnings = new WarningService();
    const llm = new LlmService();
    const storyService = new StoryService(sanitization, warnings, llm, repo);
    app = createApp(storyService);
  });

  it('GET /api/health -> 200', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  it('POST /api/stories/generate -> 200 voi 5 dau ra + warnings', async () => {
    const res = await request(app).post('/api/stories/generate').send(teamReq());

    expect(res.status).toBe(200);
    expect(res.body.outputs.newsletter_vi).toBeTruthy();
    expect(res.body.outputs.teams_post).toBeTruthy();
    expect(res.body.outputs.case_study.result).toBeTruthy();
    expect(res.body.outputs.ja_version).not.toBeNull();
    expect(res.body.outputs.en_version).not.toBeNull();
    expect(JSON.stringify(res.body.outputs)).not.toContain('ABC Corporation');
    expect(res.body.warnings.length).toBeGreaterThan(0);
    expect(res.body.meta.session_id).toBeTruthy();
    expect(res.body.meta.prompt_version).toBe('2.0');
  });

  it('POST /api/stories/generate -> 422 khi thieu truong bat buoc', async () => {
    const res = await request(app)
      .post('/api/stories/generate')
      .send(
        teamReq({
          answers: {
            team_intro: '',
            team_achievement: '',
            team_challenge: '',
            team_solution: '',
            team_tools: null,
            team_difference: null,
            team_metrics: null,
            team_feedback: null,
            team_lesson: null,
            team_advice: null,
          },
        })
      );
    expect(res.status).toBe(422);
  });

  it('POST /api/stories/generate -> 422 khi thieu consent (ADR-006)', async () => {
    const res = await request(app)
      .post('/api/stories/generate')
      .send(
        teamReq({
          consent: { consent_media_public: false, consent_truthful: true },
        })
      );
    expect(res.status).toBe(422);
  });

  it('POST /api/stories/generate -> 422 khi thieu achievement_type (ADR-005)', async () => {
    const res = await request(app).post('/api/stories/generate').send({
      answers: teamReq().answers,
      languages: ['vi'],
      consent: CONSENT_OK,
    });
    expect(res.status).toBe(422);
  });

  it('GET /api/stories/:id -> tra ve phien da luu (SQLite) + consent', async () => {
    const gen = await request(app).post('/api/stories/generate').send(teamReq());
    const id = gen.body.meta.session_id;
    const res = await request(app).get(`/api/stories/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(id);
    expect(res.body.achievement_type).toBe('team');
    expect(res.body.consent.consent_media_public).toBe(true);
    expect(res.body.outputs.newsletter_vi).toBeTruthy();
  });
});