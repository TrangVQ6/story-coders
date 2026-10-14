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

  /** ADR-006: thieu consent -> chan tao noi dung */
  buildConsentMissing(consentOk: boolean): Warning[] {
    if (consentOk) return [];
    return [
      {
        severity: 'high',
        category: 'consent_missing',
        description:
          'Thiếu xác nhận consent: cần đồng ý quyền công khai hình ảnh và xác nhận thông tin đúng sự thật có sự đồng ý của khách hàng/người được nhắc tới.',
      },
    ];
  }

  merge(groups: Warning[][]): Warning[] {
    return groups.flat();
  }
}