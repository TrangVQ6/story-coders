# ADR-002: Sanitization ba lớp — Defense in Depth cho thông tin nhạy cảm

## Status
Accepted

## Context
Yêu cầu cốt lõi của sản phẩm là **không lộ tên khách hàng/tên dự án** trong mọi đầu ra (BR-002, NFR-SEC-002). Hai cách tiếp cận đơn lẻ đều có lỗ hổng:

1. **Chỉ dựa vào prompt LLM** ("hãy ẩn tên khách hàng"): LLM không đáng tin cậy 100% — có thể sót tên, bịa tên, hoặc bị prompt injection từ câu trả lời.
2. **Chỉ dựa vào quy tắc tĩnh** (regex/blocklist): không bắt được cách diễn đạt khác nhau, tên viết tắt, biến thể ngôn ngữ (tiếng Việt, Kanji Nhật).

Không phương án nào đơn lẻ đạt mục tiêu "0 lỗi lộ thông tin sau phát hành" (KPI trong BRD §7).

## Decision
Áp dụng **sanitization ba lớp (defense in depth)**:

| Lớp | Giai đoạn | Cơ chế | Bắt buộc |
|---|---|---|---|
| **L1 — Deterministic detection** | Trước khi gọi LLM | `EntityDetector`: regex + entity blocklist + heuristic phát hiện tên công ty, tên dự án, email, phone, số liệu mật → lập `EntityRegister` | ✅ |
| **L2 — Prompt constraint** | Trong prompt | Directive "redact mọi tên riêng" + danh sách thực thể truyền vào prompt + dữ liệu bọc `<user_data>` chống injection | ✅ |
| **L3 — Residual scan** | Sau khi sinh | `OutputScanner`: quét lại 5 đầu ra so với `EntityRegister` + quét tổng quát; phát hiện → warning `high` + tự ẩn nếu an toàn + khóa Copy | ✅ |

Bổ sung lớp **L4 — WarningGate** ở tầng UI: khóa Copy khi có warning mức `high` chưa xác nhận (FR-VIEW-004).

## Consequences

### Positive
- Giảm mạnh xác suất rò rỉ: lỗi của một lớp được lớp khác bắt.
- Blocklist tên khách/tên dự án cấu hình được → tổ chức tự duy trì danh sách thực tế.
- OutputScanner tạo ra *bằng chứng rà soát* (danh sách cảnh báo) — đúng yêu cầu O5.

### Negative
- Chi phí tính toán thêm 2 lần quét (input + output).
- Heuristic có thể báo nhầm (false positive) → cần cấu hình tinh chỉnh.
- EntityRegister phải được truyền an toàn vào prompt mà không làm lộ chính nó trong đầu ra.

### Risks
- R1: False negative của detector (tên không có trong blocklist, không khớp regex) → L2/L3 vẫn bắt; nếu cả 3 lớp bỏ sót → rủi ro còn lại thấp nhưng khác 0 → chấp nhận với rào cản con người (lead duyệt).
- R2: Prompt injection làm LLM bỏ qua directive redact → L3 quét lại vẫn bắt tên thật → warning high.

## Related
- BRD §4.5, SRS FR-GEN-003, NFR-SEC-002, System Design §4.2, Technical Spec §3, ADR-001.