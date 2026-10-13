import { DetectedEntity, EntityType } from '../types';

const MAPPING: Record<EntityType, string> = {
  client_name: 'khách hàng',
  project_name: 'dự án',
  person_name: 'thành viên team',
  email: '[email]',
  domain: '[website]',
  phone: '[số điện thoại]',
  confidential_data: '[thông tin mật]',
};

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function redactText(
  text: string,
  entities: DetectedEntity[]
): { text: string; replacedCount: number } {
  let result = text;
  let replacedCount = 0;
  const sorted = [...entities].sort((a, b) => b.value.length - a.value.length);
  for (const e of sorted) {
    const re = new RegExp(escapeRegExp(e.value), 'gi');
    let count = 0;
    result = result.replace(re, () => {
      count++;
      return MAPPING[e.type];
    });
    if (count > 0) replacedCount++;
  }
  return { text: result, replacedCount };
}
