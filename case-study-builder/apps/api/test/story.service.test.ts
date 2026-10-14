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

const CONSENT_OK = { consent_media_public: true, consent_truthful: true };

const TEAM_ANSWERS_FULL: GenerateRequest['answers'] = {
  team_intro: 'Du an he thong giao dien o to cho khach hang Nhat Ban',
  team_achievement: 'Hoan thanh phase 1 truoc han, khach giao tiep phase 2',
  team_challenge: 'Yeu cau cao ve kien thuc toan hoc va xay dung',
  team_solution: 'Danh gia rui ro truoc, phoi hop offshore + onsite',
  team_tools: 'AI ho tro review code, CI/CD tu dong',
  team_difference: 'Chu dong de xuat giai phap thay vi cho yeu cau',
  team_metrics: 'Giao hang dung han, giam 30% thoi gian xu ly',
  team_feedback: 'Khach danh gia cao, gui thu cam on',
  team_lesson: 'Danh gia rui ro som giup giam soc',
  team_advice: 'Bat dau nho, do luong ro, mo rong dan',
};

const PERSONAL_ANSWERS_FULL: GenerateRequest['answers'] = {
  pa_name: 'Nguyen Van An (NVA123)',
  pa_role: 'Ky su truong',
  pa_contribution: 'Thiet ke kien truc he thong giam 40% thoi gian xu ly',
  pa_importance: 'Neu khong co giai phap nay du an kho dat tien do',
  pa_challenge: 'Xu ly bottleneck hieu nang khi du lieu tang gap 3 lan',
  pa_situation: 'O lai xuyen dem cung khach xu ly su co go-live',
  pa_results: 'Giam 30% thoi gian xu ly, tang 20% nang suat',
  pa_collab: 'Chu dong mentor fresher, phoi hop chat che voi khach',
  pa_quality: 'Tinh than trach nhiem cao, luon dat chat luong len hang dau',
  pa_reason: 'Nguoi tao buoc ngoat giup du an vuot chi tieu',
  pa_thanks: 'Cam on An da luon dong hanh va truyen cam hung cho team',
};

describe('StoryService (demo mode) — bo cau hoi moi (11 personal / 10 team)', () => {
  it('tao du 5 dau ra tu 10 cau tra loi (chu de team)', async () => {
    const svc = makeService();
    const req: GenerateRequest = {
      achievement_type: 'team',
      answers: TEAM_ANSWERS_FULL,
      languages: ['vi', 'ja', 'en'],
      consent: CONSENT_OK,
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

  it('tao du 5 dau ra (chu de personal — 11 cau)', async () => {
    const svc = makeService();
    const req: GenerateRequest = {
      achievement_type: 'personal',
      answers: PERSONAL_ANSWERS_FULL,
      languages: ['vi'],
      consent: CONSENT_OK,
    };
    const resp = await svc.generate(req);
    expect(resp.outputs.newsletter_vi.length).toBeGreaterThan(50);
    expect(resp.outputs.newsletter_vi).toContain('Nguyen Van An');
    expect(resp.outputs.case_study.result).toBeTruthy();
    expect(resp.meta.mode).toBe('demo');
  });

  it('an ten khach hang trong moi dau ra', async () => {
    const svc = makeService();
    const req: GenerateRequest = {
      achievement_type: 'team',
      answers: {
        team_intro: 'Du an cho ABC Corporation tai Nhat',
        team_achievement: 'Hoan thanh du an ABC Corporation',
        team_challenge: 'Thach thuc lon',
        team_solution: 'Giai phap cua team',
        team_tools: null,
        team_difference: null,
        team_metrics: null,
        team_feedback: null,
        team_lesson: null,
        team_advice: null,
      },
      languages: ['vi'],
      consent: CONSENT_OK,
    };
    const resp = await svc.generate(req);
    const allText = JSON.stringify(resp.outputs);
    expect(allText).not.toContain('ABC Corporation');
    expect(resp.meta.masked_entities).toBeGreaterThan(0);
  });

  it('sinh canh bao missing_metric khi thieu so lieu ket qua', async () => {
    const svc = makeService();
    const req: GenerateRequest = {
      achievement_type: 'team',
      answers: {
        team_intro: 'Dua AI vao quy trinh',
        team_achievement: 'Hoan thanh pilot',
        team_challenge: 'Lo ngai do chinh xac',
        team_solution: 'Pilot tren 1 phong ban',
        team_tools: null,
        team_difference: null,
        team_metrics: null,
        team_feedback: null,
        team_lesson: null,
        team_advice: null,
      },
      languages: ['vi'],
      consent: CONSENT_OK,
    };
    const resp = await svc.generate(req);
    expect(resp.warnings.some((w) => w.category === 'missing_metric')).toBe(true);
  });

  it('khong bia so lieu khi team_metrics trong', async () => {
    const svc = makeService();
    const req: GenerateRequest = {
      achievement_type: 'team',
      answers: {
        team_intro: 'Dua AI vao quy trinh',
        team_achievement: 'Hoan thanh pilot',
        team_challenge: 'Lo ngai do chinh xac',
        team_solution: 'Pilot tren 1 phong ban',
        team_tools: null,
        team_difference: null,
        team_metrics: null,
        team_feedback: null,
        team_lesson: null,
        team_advice: null,
      },
      languages: ['vi'],
      consent: CONSENT_OK,
    };
    const resp = await svc.generate(req);
    expect(/\d/.test(resp.outputs.case_study.result)).toBe(false);
  });

  it('tu choi khi thieu truong bat buoc', async () => {
    const svc = makeService();
    await expect(
      svc.generate({
        achievement_type: 'team',
        answers: {
          team_intro: '',
          team_achievement: 'x',
          team_challenge: 'y',
          team_solution: 'z',
          team_tools: null,
          team_difference: null,
          team_metrics: null,
          team_feedback: null,
          team_lesson: null,
          team_advice: null,
        },
        languages: ['vi'],
        consent: CONSENT_OK,
      })
    ).rejects.toThrow();
  });

  it('tu choi khi thieu achievement_type', async () => {
    const svc = makeService();
    await expect(
      svc.generate({
        achievement_type: 'invalid' as never,
        answers: {},
        languages: ['vi'],
        consent: CONSENT_OK,
      })
    ).rejects.toThrow();
  });

  it('tu choi khi thieu consent (ADR-006)', async () => {
    const svc = makeService();
    await expect(
      svc.generate({
        achievement_type: 'team',
        answers: {
          team_intro: 'abc',
          team_achievement: 'x',
          team_challenge: 'y',
          team_solution: 'z',
          team_tools: null,
          team_difference: null,
          team_metrics: null,
          team_feedback: null,
          team_lesson: null,
          team_advice: null,
        },
        languages: ['vi'],
        consent: { consent_media_public: false, consent_truthful: true },
      })
    ).rejects.toThrow();
  });
});