# ADR-006: Cổng xác nhận bảo mật & sự đồng ý (Consent Gate)

## Status
Proposed

## Context
Yêu cầu mới (2026-10-14) bổ sung **2 checkbox bắt buộc** trước khi tạo nội dung:

1. **C1 — Quyền công khai hình ảnh**: hình ảnh/tài liệu đính kèm được phép sử dụng và đăng tải công khai theo chính sách truyền thông.
2. **C2 — Tính xác thực & sự đồng ý**: thông tin cung cấp là đúng sự thật và đã có sự đồng ý của khách hàng/người được nhắc tới.

Điều này củng cố tuân thủ PDPA (VN — Nghị định 13/2023/NĐ-CP), APPI (JP) và chính sách truyền thông nội bộ: **không phát hành nội dung về người khác khi chưa có sự đồng ý**, và **không dùng hình ảnh khi chưa rõ quyền sử dụng**.

Các phương án:
1. **Không có consent** (giữ nguyên) — vi phạm yêu cầu mới, rủi ro pháp lý.
2. **Consent checkbox bắt buộc ở client** — chặn gửi khi chưa tick; không lưu vết.
3. **Consent bắt buộc + lưu vết (audit)** — Phase 2 khi có backend.

## Decision
Chọn **phương án 2: Consent Gate ở client, bắt buộc, không lưu vết ở MVP** (kết hợp ADR-001 SPA-no-backend).

- 2 checkbox `consent_media_public` và `consent_truthful` hiển thị trước nút "Tạo câu chuyện".
- Cả 2 bắt buộc; chưa tick → nút bị vô hiệu hóa + thông báo lỗi.
- Giá trị consent được gửi trong payload API `generateStory` (API Contracts v2.0 §2.1).
- Backend (nếu có) validate consent bắt buộc → thiếu → `ERR_VALIDATION`.
- Warning category mới `consent_missing` (severity `high`) nếu phát hiện nội dung evidence mà thiếu consent.
- Phase 2: lưu vết `session.consent` (timestamp, giá trị) khi có persistence (ADR-004 mở rộng).

## Consequences

### Positive
- Giảm rủi ro pháp lý: có bằng chứng người dùng xác nhận quyền sử dụng hình ảnh/thông tin.
- Tuân thủ PDPA/APPI về consent và thông báo mục đích xử lý.
- Rào cản UX đúng chỗ: buộc suy nghĩ trước khi gửi nội dung về người khác.

### Negative
- Thêm 2 bước tick trước khi gửi (chấp nhận, nhỏ).
- Client-side có thể bị bypass bởi người dùng kỹ thuật (chấp nhận ở MVP nội bộ — cùng giới hạn ADR-001).
- Không có bằng chứng lưu trữ ở MVP nếu xảy ra tranh chấp (chuyển Phase 2).

### Risks
- R1: Người dùng tick mà không đọc → giảm thiểu bằng văn bản ngắn gọn, rõ ràng; Phase 2 thêm "bắt buộc xem trước tóm tắt".
- R2: Nội dung về khách hàng vẫn bị phát hành dù đã tick → nằm ngoài kiểm soát hệ thống; chính sách + đào tạo nội bộ.

## Related
- BRD v2.0 §4.5, §9; SRS v2.0 FR-FORM-005; Data Dictionary v2.0 §2.7; API Contracts v2.0 §2.1; ADR-001, ADR-004; Content Standard docs/12 §3.