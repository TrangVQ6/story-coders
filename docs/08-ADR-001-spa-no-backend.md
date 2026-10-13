# ADR-001: Kiến trúc SPA không backend trong MVP

## Status
Accepted

## Context
MVP của Case Study Builder cần được triển khai nhanh trên nền tảng VibeFlow: web app một trang, luồng form → LLM → 5 đầu ra. BRD §5.1 giới hạn phạm vi MVP không có backend riêng, không có tài khoản người dùng, không có persistence. Câu hỏi đặt ra: kiến trúc nào cho phép đạt mục tiêu an toàn thông tin (BR-002) mà vẫn giữ MVP gọn?

Các phương án:
1. **SPA thuần + gọi LLM gateway trực tiếp từ client** — không backend, Security Layer chạy ở client.
2. **SPA + backend proxy** — mọi lời gọi LLM qua backend, Security Layer ở server.
3. **SPA + serverless functions** — trung gian giữa hai phương án trên.

## Decision
Chọn **phương án 1: SPA thuần, không backend, gọi LLM gateway trực tiếp từ client** cho MVP.

Security Layer (EntityDetector, Redactor, OutputScanner, WarningEngine) chạy hoàn toàn ở client, nhưng được thiết kế theo dạng module độc lập (docs/07 §2.3) để **di chuyển nguyên vẹn lên backend trong Phase 2** mà không thay đổi giao diện.

Đi kèm 3 điều kiện chấp nhận rủi ro:
- MVP chỉ triển khai trong nội bộ tổ chức (không public).
- Lớp client-side là lớp *cảnh báo & trải nghiệm*, không phải tường lửa tuyệt đối — người dùng có kỹ thuật vẫn có thể bypass.
- Phase 2 bắt buộc chuyển Security Layer lên backend (ADR-002 vẫn giữ nguyên thiết kế 3 lớp).

## Consequences

### Positive
- Triển khai nhanh nhất, đúng tinh thần MVP trên VibeFlow.
- Không chi phí vận hành backend, không cần quản lý hạ tầng.
- Security Layer tách module → tái sử dụng 100% khi chuyển backend.

### Negative
- Security Layer có thể bị bypass bởi người dùng kỹ thuật (chấp nhận ở MVP nội bộ).
- Không có log tập trung phía server (chỉ log client).
- Không thể ép buộc quy trình duyệt ở mức hệ thống (chỉ rào cản UX).

### Risks
- R1: Lộ thông tin nếu người dùng cố tình bypass → giảm thiểu bằng chính sách nội bộ + Phase 2.
- R2: API key/gateway exposure → chỉ dùng gateway có CORS giới hạn origin nội bộ; không nhúng secret tĩnh vào bundle.

## Related
- BRD §5.1, SRS NFR-SEC-001, System Design §6, ADR-004.