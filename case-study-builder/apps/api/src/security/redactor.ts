import { DetectedEntity, EntityType } from '../types';

const MAPPING: Record<EntityType, string> = {
  client_name: 'khách hàng',
  project_name: 'dự án',
  person_name: 'thành viên team',
  // proper_name (ten rieng noi bo FPT) duoc giu nguyen de ra soat — khong thay
  proper_name: '[tên riêng]',
  email: '[email]',
  domain: '[website]',
  phone: '[số điện thoại]',
  confidential_data: '[thông tin mật]',
};

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Chuyen ten day du thanh chu cai dau: "Nguyen Van An" -> "N.V.A", "Takenaka" -> "T." */
export function toInitials(fullName: string): string {
  const trimmed = fullName.trim();
  if (!trimmed) return '';
  // Tach theo khoang trang, bo ky tu dac biet
  const parts = trimmed.split(/\s+/).filter(Boolean);
  if (parts.length === 1) {
    // Mot tu: lay chu cai dau + dau cham (vd: Takenaka -> T.)
    const first = Array.from(parts[0])[0];
    return first ? `${first.toUpperCase()}.` : '';
  }
  // Nhieu tu: moi tu lay chu cai dau, noi bang dau cham (vd: Nguyen Van An -> N.V.A.)
  const initials = parts
    .map((p) => {
      const ch = Array.from(p)[0];
      return ch ? ch.toUpperCase() : '';
    })
    .join('.');
  return initials ? `${initials}.` : '';
}

export function redactText(
  text: string,
  entities: DetectedEntity[],
  opts: { useInitials?: boolean } = {}
): { text: string; replacedCount: number } {
  let result = text;
  let replacedCount = 0;
  const sorted = [...entities].sort((a, b) => b.value.length - a.value.length);
  for (const e of sorted) {
    // proper_name duoc GIU NGUYEN mac dinh (de UI highlight cho nguoi chinh sua);
    // chi thay bang chu cai dau khi opts.useInitials = true.
    if (e.type === 'proper_name' && !opts.useInitials) continue;
    const re = new RegExp(escapeRegExp(e.value), 'gi');
    const replacement =
      e.type === 'proper_name' && opts.useInitials ? toInitials(e.value) : MAPPING[e.type];
    let count = 0;
    result = result.replace(re, () => {
      count++;
      return replacement;
    });
    if (count > 0) replacedCount++;
  }
  return { text: result, replacedCount };
}