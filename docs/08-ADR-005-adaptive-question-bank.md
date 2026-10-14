# ADR-005: Bộ câu hỏi phân tích theo chủ đề (Adaptive Question Bank)

## Status
Proposed

## Context
BRD v1.0 định nghĩa form **6 câu hỏi cố định** cho mọi người dùng. Yêu cầu mới (2026-10-14): câu hỏi đầu tiên hỏi **chủ đề nội dung** với 2 lựa chọn — *thành tựu cá nhân* hoặc *thành tựu đội nhóm* — sau đó hiển thị **bộ 10 câu hỏi phân tích** riêng cho từng chủ đề.

Lý do: nhu cầu kể chuyện của 2 nhóm rất khác nhau. Câu chuyện cá nhân cần khai thác vai trò, hành động, quote của một người; câu chuyện đội nhóm cần khai thác bối cảnh dự án, cách phối hợp, thành viên chủ chốt. Một form 6 câu chung không thu thập đủ chất liệu cho cả hai.

Các phương án:
1. **Form tĩnh 6 câu** (giữ nguyên) — không đáp ứng yêu cầu mới.
2. **Form 2 bước: chọn chủ đề → 10 câu theo chủ đề** — đáp ứng, thêm 1 bước nhưng cải thiện chất lượng dữ liệu.
3. **Một form dài 20 câu (cả 2 chủ đề)** — người dùng bối rối, tỷ lệ bỏ form cao.

## Decision
Chọn **phương án 2: Adaptive Question Bank**.

- Trường đầu form: `achievement_type` (enum `personal` | `team`), bắt buộc.
- Sau khi chọn, form render đúng 10 câu của chủ đề (question_key tiền tố `pa_*` hoặc `team_*`).
- Đổi chủ đề → xóa dữ liệu câu trả lời cũ (có cảnh báo).
- Bộ câu hỏi chuẩn được định nghĩa tại **docs/12 §2.2–2.3** (nguồn duy nhất).
- Các question_key cũ (`project_description`, `challenge`, `solution`, `result_metrics`, `lesson`, `unsung_hero`) bị thay thế.

## Consequences

### Positive
- Dữ liệu thu thập đúng trọng tâm từng loại thành tựu → đầu ra chất lượng hơn.
- Form ngắn hơn (10 câu thay vì 20), giảm bỏ form.
- Dễ mở rộng thêm chủ đề mới (chỉ thêm 1 nhánh question bank).

### Negative
- Thêm 1 bước tương tác (chọn chủ đề) trước khi nhập liệu.
- Logic form phức tạp hơn: render động theo chủ đề, reset dữ liệu khi đổi chủ đề.
- Prompt/user prompt phải nhận `achievement_type` và bộ câu hỏi tương ứng.

### Risks
- R1: Người dùng không hiểu khác biệt 2 chủ đề → thêm mô tả ngắn dưới mỗi option.
- R2: Đổi chủ đề làm mất dữ liệu → cảnh báo xác nhận trước khi reset.

## Related
- BRD v2.0 §4.3, SRS v2.0 FR-FORM-001, Data Dictionary v2.0 §2.2, API Contracts v2.0 §2.1, Content Standard docs/12 §2.