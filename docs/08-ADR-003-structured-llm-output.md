# ADR-003: Đầu ra LLM có cấu trúc JSON chuẩn hóa

## Status
Accepted

## Context
Hệ thống cần tạo 5 đầu ra (bản tin, post Teams, case study, bản dịch, cảnh báo) từ một lần gọi LLM (FR-GEN-001). Nếu LLM trả về văn bản tự do, việc tách nội dung từng tab, kiểm tra giới hạn độ dài, và quét rò rỉ từng trường sẽ không đáng tin cậy. SRS FR-GEN-004 yêu cầu kết quả parse được thành JSON với schema cố định.

Các phương án:
1. **Một lần gọi LLM trả về JSON có cấu trúc** — tất cả đầu ra trong một response.
2. **Nhiều lần gọi LLM, mỗi lần một đầu ra** — tách biệt, tốn token hơn, chậm hơn.
3. **Văn bản tự do + parse heuristic** — không đáng tin cậy.

## Decision
Chọn **phương án 1: một lần gọi LLM, response là JSON theo schema cố định** (FR-GEN-004):

```json
{
  "newsletter_vi": "string",
  "teams_post": "string",
  "case_study": { "context": "string", "challenge": "string", "solution": "string", "result": "string" },
  "ja_version": "string",
  "en_version": "string",
  "warnings": [{ "severity": "string", "category": "string", "description": "string" }]
}
```

Kèm theo:
- **Strict validation**: `SchemaValidator` kiểm tra đủ khóa, đúng kiểu, đúng enum; fail → retry 1 lần → lỗi (FR-GEN-005).
- **JSON-only directive** trong prompt: "Chỉ trả về JSON, không kèm văn bản khác".
- **ContentGuard**: kiểm tra no-hallucination trên từng trường (vd: `result` không chứa số khi Q4 trống).

## Consequences

### Positive
- Một lần gọi → tiết kiệm token và thời gian (NFR-PERF-001, NFR-COST-001).
- Schema cố định → dễ validate, dễ quét rò rỉ từng trường, dễ render tab.
- `warnings[]` là mảng có cấu trúc → WarningEngine xử lý nhất quán.

### Negative
- Nếu một trường lỗi → phải retry toàn bộ (không retry từng phần).
- Token đầu ra bị giới hạn bởi max_tokens của một lần gọi → cần đủ cho 5 đầu ra (đặt 4K token ra).

### Risks
- R1: LLM trả JSON không hợp lệ (truncate, markdown fence) → JsonParser xử lý trích xuất + retry.
- R2: Response quá dài vượt max_tokens → giới hạn độ dài từng trường trong prompt.

## Related
- SRS FR-GEN-001, FR-GEN-004, FR-GEN-005, NFR-COST-001, Data Dictionary §3, API Contracts §2.