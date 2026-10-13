import { describe, it, expect } from 'vitest';
import { StoryService } from '../src/services/story.service';
import { SanitizationService } from '../src/services/sanitization.service';
import { WarningService } from '../src/services/warning.service';
import { LlmService } from '../src/services/llm.service';
import { SessionRepository } from '../src/repository/sessionRepository';
import { createDatabase } from '../src/db/database';
import { GenerateRequest } from '../src/types';

const BLOCKLIST = [{ value: 'ABC Corporation', type: 'client_name' as const }];

function makeService() {
  const db = createDatabase(':memory:');
  const repo = new SessionRepository(db);
  const sanitization = new SanitizationService(BLOCKLIST);
  const warnings = new WarningService();
  const llm = new LlmService();
  return new StoryService(sanitization, warnings, llm, repo);
}

describe('StoryService (demo mode) — dap ung yeu cau nghiep vu', () => {
  it('tao du 5 dau ra tu 6 cau tra loi', async () => {
    const svc = makeService();
    const req: GenerateRequest = {
      answers: {
        project_description: 'Phan mem giao dien o to cho khach hang Nhat Ban',
        challenge: 'Ap dung thiet ke moi ma khong lam giam hieu nang',
        solution: 'Danh gia rui ro truoc va trien khai theo thu tu uu tien',
        result_metrics: 'Giao hang dung han, khach danh gia cao',
        lesson: 'Danh gia rui ro som giup giam soc khi thay doi',
        unsung_hero: 'Ky su kiem thu hieu nang',
      },
      languages: ['vi', 'ja', 'en'],
    };
    const resp = await svc.generate(req);

    expect(resp.outputs.newsletter_vi.length).toBeGreaterThan(50);
    expect(resp.outputs.teams_post.length).toBeLessThanOrEqual(290);
    expect(resp.outputs.case_study.context).toBeTruthy();
    expect(resp.outputs.case_study.challenge).toBeTruthy();
    expect(resp.outputs.case_study.solution).toBeTruthy();
    expect(resp.outputs.case_study.result).toBeTruthy();
    expect(resp.outputs.ja_version).not.toBeNull();
    expect(resp.outputs.en_version).not.toBeNull();
    expect(resp.meta.session_id).toBeTruthy();
    expect(resp.meta.mode).toBe('demo');
  });

  it('an ten khach hang trong moi dau ra', async () => {
    const svc = makeService();
    const req: GenerateRequest = {
      answers: {
        project_description: 'Du an cho ABC Corporation tai Nhat',
        challenge: 'Thach thuc lon',
        solution: 'Giai phap cua team',
        result_metrics: null,
        lesson: null,
        unsung_hero: null,
      },
      languages: ['vi'],
    };
    const resp = await svc.generate(req);
    const allText = JSON.stringify(resp.outputs);
    expect(allText).not.toContain('ABC Corporation');
    expect(resp.meta.masked_entities).toBeGreaterThan(0);
  });

  it('sinh canh bao missing_metric khi thieu so lieu ket qua', async () => {
    const svc = makeService();
    const req: GenerateRequest = {
      answers: {
        project_description: 'Dua AI vao quy trinh',
        challenge: 'Lo ngai do chinh xac',
        solution: 'Pilot tren 1 phong ban',
        result_metrics: null,
        lesson: null,
        unsung_hero: null,
      },
      languages: ['vi'],
    };
    const resp = await svc.generate(req);
    expect(resp.warnings.some((w) => w.category === 'missing_metric')).toBe(true);
  });

  it('khong bia so lieu khi Q4 trong', async () => {
    const svc = makeService();
    const req: GenerateRequest = {
      answers: {
        project_description: 'Dua AI vao quy trinh',
        challenge: 'Lo ngai do chinh xac',
        solution: 'Pilot tren 1 phong ban',
        result_metrics: null,
        lesson: null,
        unsung_hero: null,
      },
      languages: ['vi'],
    };
    const resp = await svc.generate(req);
    expect(/\d/.test(resp.outputs.case_study.result)).toBe(false);
  });

  it('tu choi khi thieu truong bat buoc', async () => {
    const svc = makeService();
    await expect(
      svc.generate({
        answers: {
          project_description: '',
          challenge: 'x',
          solution: 'y',
          result_metrics: null,
          lesson: null,
          unsung_hero: null,
        },
        languages: ['vi'],
      })
    ).rejects.toThrow();
  });
});
