import { DetectedEntity, Warning } from '../types';
import { detectEntities, BlocklistEntry } from './entityDetector';

export function scanOutputs(
  outputs: Record<string, string>,
  register: DetectedEntity[],
  blocklist: BlocklistEntry[] = []
): Warning[] {
  const warnings: Warning[] = [];
  for (const [key, value] of Object.entries(outputs)) {
    if (!value) continue;
    const hits = detectEntities(value, blocklist);
    if (hits.length > 0) {
      const types = Array.from(new Set(hits.map((h) => h.type)));
      const category = types.includes('client_name')
        ? 'client_name'
        : types.includes('project_name')
        ? 'project_name'
        : 'general';
      warnings.push({
        severity: 'high',
        category,
        description: `Phát hiện thông tin nhạy cảm còn sót trong "${key}": ${types.join(', ')}. Cần lead duyệt trước khi phát hành.`,
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
