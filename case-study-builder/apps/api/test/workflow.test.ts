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

describe('Workflow API (end-to-end)', () => {
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
    const res = await request(app).post('/api/stories/generate').send({
      answers: {
        project_description: 'Du an cho ABC Corporation tai Nhat',
        challenge: 'Ap dung thiet ke moi khong giam hieu nang',
        solution: 'Danh gia rui ro truoc',
        result_metrics: null,
        lesson: 'Danh gia rui ro som',
        unsung_hero: 'Ky su kiem thu',
      },
      languages: ['vi', 'ja', 'en'],
    });

    expect(res.status).toBe(200);
    expect(res.body.outputs.newsletter_vi).toBeTruthy();
    expect(res.body.outputs.teams_post).toBeTruthy();
    expect(res.body.outputs.case_study.result).toBeTruthy();
    expect(res.body.outputs.ja_version).not.toBeNull();
    expect(res.body.outputs.en_version).not.toBeNull();
    expect(JSON.stringify(res.body.outputs)).not.toContain('ABC Corporation');
    expect(res.body.warnings.length).toBeGreaterThan(0);
    expect(res.body.meta.session_id).toBeTruthy();
  });

  it('POST /api/stories/generate -> 422 khi thieu truong bat buoc', async () => {
    const res = await request(app).post('/api/stories/generate').send({
      answers: {
        project_description: '',
        challenge: '',
        solution: '',
        result_metrics: null,
        lesson: null,
        unsung_hero: null,
      },
      languages: ['vi'],
    });
    expect(res.status).toBe(422);
  });

  it('GET /api/stories/:id -> tra ve phien da luu (SQLite)', async () => {
    const gen = await request(app).post('/api/stories/generate').send({
      answers: {
        project_description: 'Dua AI vao quy trinh',
        challenge: 'Lo ngai do chinh xac',
        solution: 'Pilot 1 phong ban',
        result_metrics: null,
        lesson: null,
        unsung_hero: null,
      },
      languages: ['vi'],
    });
    const id = gen.body.meta.session_id;
    const res = await request(app).get(`/api/stories/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(id);
    expect(res.body.outputs.newsletter_vi).toBeTruthy();
  });
});
