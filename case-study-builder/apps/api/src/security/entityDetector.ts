import { DetectedEntity, EntityType } from '../types';

export interface BlocklistEntry {
  value: string;
  type: EntityType;
}

interface Rule {
  type: EntityType;
  pattern: RegExp;
}

/**
 * Bang quy tac phat hien thuc the (docs/09 Technical Spec §3.2-3.3).
 * R7 (so lieu ket qua: %, x, ms...) la ALLOWED — khong nam trong bang nay.
 */
const RULES: Rule[] = [
  // R1 — Organization suffix (EN)
  {
    type: 'client_name',
    pattern:
      /\b[A-ZÀ-Ỹ][\w&.\-]{1,40}\s+(?:Corporation|Corp|Incorporated|Inc|Limited|Ltd|Company|Co|LLC|JSC|Group|Holdings|Bank)\b/gi,
  },
  // R1 — Vietnamese org prefix
  {
    type: 'client_name',
    pattern: /\b(?:Công ty|Tập đoàn|Tổng công ty|Ngân hàng|Trường|Viện)\s+[A-ZÀ-Ỹ][\w\s]{1,40}\b/gi,
  },
  // R1 — Japanese org suffix (prefix hoac suffix)
  {
    type: 'client_name',
    pattern:
      /(?:[\p{L}]{1,30}(?:株式会社|合同会社|有限会社)|(?:株式会社|合同会社|有限会社)[\p{L}]{1,30})/gu,
  },
  // R2 — Project code
  { type: 'project_name', pattern: /\b(?:PRJ|PROJ|DV|DA)[\-_]\d{2,4}[\-_]\d{2,4}\b/gi },
  // R3 — Person names (honorific + name) — dung lookbehind/lookahead \p{L} thay vi \b
  // (\b khong an toan voi ky tu co dau: "ông" trong "không" tao boundary gia)
  { type: 'person_name', pattern: /\b(?:Mr|Mrs|Ms|Dr|Prof)\s+[A-Z][\p{L}]{1,30}\b/gu },
  { type: 'person_name', pattern: /[\p{L}]{1,30}(?:さん|様|先生)(?![\p{L}\p{M}])/gu },
  {
    type: 'person_name',
    pattern:
      /(?<![\p{L}\p{M}])(?:anh|Anh|chị|Chị|ông|Ông|bà|Bà|ngài|Ngài)(?![\p{L}\p{M}])\s+[A-ZÀ-Ỹ][\p{L}\p{M}]{1,30}/gu,
  },
  // R4 — Email
  { type: 'email', pattern: /\b[\w.+\-]+@[\w\-]+\.[\w.\-]{2,}\b/gi },
  // R4 — Domain
  {
    type: 'domain',
    pattern: /\b(?:https?:\/\/)?(?:www\.)?[\w\-]{2,}\.(?:com|co\.jp|jp|vn|net|org|io)\b/gi,
  },
  // R5 — Phone (>= 8 digits)
  { type: 'phone', pattern: /\b(?:\+?\d[\s\-.]?){7,}\d\b/g },
  // R6 — Confidential money (VND/JPY/USD)
  { type: 'confidential_data', pattern: /\$\s?\d[\d,]*(?:\.\d+)?\s?(?:M|B|K|million|billion)?\b/gi },
  { type: 'confidential_data', pattern: /\d[\d,.]*\s*(?:triệu|trieu|tỷ|ty|億|万円|百万|千万|億円)/gi },
  {
    type: 'confidential_data',
    pattern: /(?:Hợp đồng số|Contract\s+No\.?|契約番号)\s*[:#]?\s*\d+/gi,
  },
];

function dedupe(items: DetectedEntity[]): DetectedEntity[] {
  const seen = new Map<string, DetectedEntity>();
  for (const it of items) {
    const key = it.type + ':' + it.value.toLowerCase();
    const prev = seen.get(key);
    if (!prev || prev.value.length < it.value.length) seen.set(key, it);
  }
  return Array.from(seen.values());
}

export function detectEntities(text: string, blocklist: BlocklistEntry[] = []): DetectedEntity[] {
  const found: DetectedEntity[] = [];
  for (const rule of RULES) {
    const matches = text.matchAll(rule.pattern);
    for (const m of matches) {
      const value = m[0].trim();
      if (value) found.push({ value, type: rule.type });
    }
  }
  const lower = text.toLowerCase();
  for (const entry of blocklist) {
    const needle = entry.value.toLowerCase();
    let idx = lower.indexOf(needle);
    while (idx !== -1) {
      found.push({ value: text.slice(idx, idx + entry.value.length), type: entry.type });
      idx = lower.indexOf(needle, idx + entry.value.length);
    }
  }
  return dedupe(found);
}
