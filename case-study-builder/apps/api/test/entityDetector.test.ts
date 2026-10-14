import { describe, it, expect } from 'vitest';
import { detectEntities } from '../src/security/entityDetector';

describe('EntityDetector — check ten khach hang / ten du an', () => {
  it('phat hien ten cong ty qua blocklist', () => {
    const hits = detectEntities('Du an cho ABC Corporation tai Nhat', [
      { value: 'ABC Corporation', type: 'client_name' },
    ]);
    expect(hits.some((h) => h.type === 'client_name' && h.value === 'ABC Corporation')).toBe(true);
  });

  it('phat hien ten cong ty qua regex hau to (Inc/Corp/...)', () => {
    const hits = detectEntities('Hop tac voi TechWave Inc trong 2 nam');
    expect(hits.some((h) => h.type === 'client_name')).toBe(true);
  });

  it('phat hien ten cong ty Viet Nam (prefix)', () => {
    const hits = detectEntities('Khach hang la Cong ty Co phan Dai Duong');
    expect(hits.some((h) => h.type === 'client_name')).toBe(true);
  });

  it('phat hien ten cong ty Nhat (suffix)', () => {
    const hits = detectEntities('Khach hang la 株式会社サンプル');
    expect(hits.some((h) => h.type === 'client_name')).toBe(true);
  });

  it('phat hien ma du an', () => {
    const hits = detectEntities('Du an PRJ-2026-041 da hoan thanh');
    expect(hits.some((h) => h.type === 'project_name')).toBe(true);
  });

  it('phat hien email va domain', () => {
    const hits = detectEntities('Lien he abc@corp.com hoac www.example.com');
    expect(hits.some((h) => h.type === 'email')).toBe(true);
    expect(hits.some((h) => h.type === 'domain')).toBe(true);
  });

  it('phat hien so dien thoai', () => {
    const hits = detectEntities('SDT: 0901234567');
    expect(hits.some((h) => h.type === 'phone')).toBe(true);
  });

  it('phat hien so lieu mat (tien)', () => {
    const hits = detectEntities('Hop dong tri gia 1.2 ty dong');
    expect(hits.some((h) => h.type === 'confidential_data')).toBe(true);
  });

  it('KHONG false-positive person_name tu "không nhỏ"', () => {
    const hits = detectEntities('Thách thức không nhỏ khi triển khai');
    expect(hits.some((h) => h.type === 'person_name')).toBe(false);
  });

  it('phat hien ten nguoi Viet qua honorific', () => {
    const hits = detectEntities('Người hùng là anh Nam, kỹ sư trưởng');
    expect(hits.some((h) => h.type === 'person_name')).toBe(true);
  });

  it('KHONG danh dau so lieu ket qua (R7 — allowed)', () => {
    const hits = detectEntities('Giam 30% thoi gian xu ly, uptime 99.9%, tang 2x toc do');
    expect(hits.filter((h) => h.type === 'confidential_data')).toHaveLength(0);
  });

  it('phat hien proper_name — ma don vi FPT noi bo', () => {
    const hits = detectEntities('Nhan vien Nguyen Thi Thao Hien (FJP.RPP) dat giai');
    expect(hits.some((h) => h.type === 'proper_name' && h.value.includes('FJP.RPP'))).toBe(true);
  });

  it('phat hien proper_name — ten nguoi day du kem chuc danh', () => {
    const hits = detectEntities('Anh Nguyen Trung Thanh - PM cua du an');
    expect(hits.some((h) => h.type === 'proper_name')).toBe(true);
  });
});

describe('Redactor — v2.0', () => {
  it('thay ten khach hang bang mo ta chung', async () => {
    const { redactText } = await import('../src/security/redactor');
    const entities = detectEntities('Du an cho ABC Corporation tai Nhat', [
      { value: 'ABC Corporation', type: 'client_name' },
    ]);
    const out = redactText('Du an cho ABC Corporation tai Nhat', entities);
    expect(out.text).not.toContain('ABC Corporation');
    expect(out.text).toContain('khách hàng');
    expect(out.replacedCount).toBeGreaterThan(0);
  });

  it('chuyen ten rieng thanh chu cai dau (initials)', async () => {
    const { toInitials, redactText } = await import('../src/security/redactor');
    expect(toInitials('Takenaka')).toBe('T.');
    expect(toInitials('Nguyen Van An')).toBe('N.V.A.');
    const entities = [{ value: 'Nguyen Van An', type: 'proper_name' as const }];
    const out = redactText('Anh Nguyen Van An la PM', entities, { useInitials: true });
    expect(out.text).toContain('N.V.A.');
    expect(out.text).not.toContain('Nguyen Van An');
  });

  it('proper_name giu nguyen khi khong dung initials (de UI highlight)', async () => {
    const { redactText } = await import('../src/security/redactor');
    const entities = [{ value: 'FJP.RPP', type: 'proper_name' as const }];
    const out = redactText('Nhan vien FJP.RPP dat giai', entities);
    expect(out.text).toContain('FJP.RPP');
  });
});
