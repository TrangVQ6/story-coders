import { DetectedEntity, Warning } from '../types';
import { detectEntities, BlocklistEntry } from './entityDetector';

/**
 * L3 — Residual scan (docs/09 §3.5, ADR-002).
 * - client/project/confidential con sot  -> warning high
 * - proper_name (ten rieng noi bo FPT)    -> warning medium + de UI highlight
 * - khong phat hien                       -> info "Da ra soat"
 */
export function scanOutputs(
  outputs: Record<string, string>,
  register: DetectedEntity[],
  blocklist: BlocklistEntry[] = []
): Warning[] {
  const warnings: Warning[] = [];
  for (const [key, value] of Object.entries(outputs)) {
    if (!value) continue;
    const hits = detectEntities(value, blocklist);

    const sensitive = hits.filter(
      (h) =>
        h.type === 'client_name' ||
        h.type === 'project_name' ||
        h.type === 'confidential_data' ||
        h.type === 'email' ||
        h.type === 'domain' ||
        h.type === 'phone'
    );
    if (sensitive.length > 0) {
      const types = Array.from(new Set(sensitive.map((h) => h.type)));
      const category = types.includes('client_name')
        ? 'client_name'
        : types.includes('project_name')
        ? 'project_name'
        : types.includes('confidential_data')
        ? 'confidential_data'
        : 'general';
      warnings.push({
        severity: 'high',
        category,
        description: `Phát hiện thông tin nhạy cảm còn sót trong "${key}": ${types.join(', ')}. Cần lead duyệt trước khi phát hành.`,
      });
    }

    const properNames = hits.filter((h) => h.type === 'proper_name');
    if (properNames.length > 0) {
      const names = Array.from(new Set(properNames.map((h) => h.value))).slice(0, 5);
      warnings.push({
        severity: 'medium',
        category: 'proper_name',
        description: `Tên riêng cần người chỉnh sửa rà soát trong "${key}": ${names.join(
          ', '
        )}. Có thể chuyển thành chữ cái đầu để giữ bảo mật.`,
      });
    }
  }
  if (register.length > 0 && warnings.length === 0) {
    warnings.push({
      severity: 'info',
      category: 'general',
      description: 'Đã rà soát — không phát hiện rủi ro.',
    });
  }
  return warnings;
}