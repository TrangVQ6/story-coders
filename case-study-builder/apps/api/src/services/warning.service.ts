import { Warning } from '../types';

export class WarningService {
  buildMissingMetric(hasResultMetric: boolean): Warning[] {
    if (hasResultMetric) return [];
    return [
      {
        severity: 'medium',
        category: 'missing_metric',
        description: 'Nên bổ sung con số cụ thể để tăng sức thuyết phục cho câu chuyện.',
      },
    ];
  }

  merge(groups: Warning[][]): Warning[] {
    return groups.flat();
  }
}
