# ADR-004: Không lưu trữ dữ liệu trong MVP — Session-only

## Status
Accepted

## Context
SRS NFR-SEC-001 yêu cầu: dữ liệu đầu vào (6 câu trả lời) không được lưu trữ lâu dài ngoài phiên làm việc; nếu lưu để tái sử dụng (Phase 2) phải có cơ chế xóa theo yêu cầu (PDPA — Nghị định 13/2023/NĐ-CP). BRD §5.2 đưa "kho lưu trữ case study" vào Phase 2.

Câu hỏi: MVP có nên lưu dữ liệu phiên (localStorage/backend) để tái sử dụng không?

## Decision
**MVP không lưu trữ bất kỳ dữ liệu người dùng nào.** Toàn bộ state nằm trong bộ nhớ phiên (in-memory) của tab trình duyệt và bị xóa khi đóng tab.

Cụ thể:
- Không dùng localStorage/sessionStorage để lưu câu trả lời.
- Không gửi dữ liệu đến bất kỳ endpoint lưu trữ nào.
- Log chỉ ghi metadata: `session_id`, `duration_ms`, `masked_entities`, `token_usage` — **không ghi nội dung câu trả lời thô**.
- `EntityRegister` (danh sách thực thể phát hiện) chỉ tồn tại trong bộ nhớ phiên.

## Consequences

### Positive
- Giảm diện tích tấn công: không có kho dữ liệu để bị rò rỉ.
- Tuân thủ PDPA ngay từ MVP (thu thập tối thiểu, không lưu).
- Đơn giản hóa vận hành, không cần quản lý retention.

### Negative
- Người dùng phải nhập lại khi muốn tạo lại nội dung (chấp nhận ở MVP).
- Không có lịch sử để truy vết ai đã tạo gì (đưa vào Phase 2 với log có kiểm soát).

### Risks
- R1: Người dùng dán nội dung nhạy cảm vào clipboard → ngoài tầm kiểm soát của hệ thống → nhắc trong giao diện "chỉ dán nội dung đã rà soát".
- R2: Phase 2 thêm persistence phải kèm cơ chế xóa theo yêu cầu và thông báo mục đích xử lý (PDPA Art. 11–13).

## Related
- BRD §9, SRS NFR-SEC-001, NFR-COMP-001, System Design §5, ADR-001.