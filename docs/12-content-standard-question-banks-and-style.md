# Content Standard — Bộ câu hỏi phân tích, Xác nhận bảo mật & Giọng văn (Case Study Builder)

| Thuộc tính | Giá trị |
|---|---|
| **Tài liệu** | Content Standard — Question Banks, Consent & Writing Style |
| **Phiên bản** | 2.0 |
| **Trạng thái** | Draft — chờ phê duyệt |
| **Ngày** | 2026-10-14 |
| **Liên kết** | BRD v2.0, SRS v2.0, ADR-005, ADR-006, Technical Spec v2.0 |
| **Phạm vi** | Thay đổi cấu trúc câu hỏi, bổ sung xác nhận bảo mật, đánh dấu tên riêng, chuẩn giọng văn theo tài liệu tham khảo |

---

## 1. Mục đích

Tài liệu này là **nguồn chuẩn duy nhất** cho 4 thay đổi nội dung của Case Study Builder:

1. **Cấu trúc câu hỏi mới**: câu hỏi đầu tiên chọn chủ đề (thành tựu cá nhân / thành tựu đội nhóm) → hiển thị bộ 10 câu hỏi phân tích tương ứng.
2. **Checkbox xác nhận bảo mật**: quyền công khai hình ảnh + khẳng định thông tin đúng sự thật có sự đồng ý của khách hàng/người được nhắc tới.
3. **Đánh dấu tên riêng**: tên dự án/khách hàng/người được đánh dấu nổi bật để người chỉnh sửa rà soát; hoặc chỉ viết chữ cái đầu để giữ bảo mật.
4. **Giọng văn**: theo tài liệu tham khảo (bản tin FUN — FPT Japan Internal Newsletter).

---

## 2. Cấu trúc câu hỏi mới (Requirement 1)

### 2.1. Nguyên tắc

- **Bước 0 — Chọn chủ đề**: câu hỏi đầu tiên của form là "Bạn muốn nói về nội dung gì?" với **2 lựa chọn**:
  - **A. Thành tựu cá nhân** — câu chuyện của một người (giải thưởng, OKR cá nhân, sáng kiến riêng…).
  - **B. Thành tựu đội nhóm** — câu chuyện của một team/dự án (thắng dự án, go-live, kỷ lục tuyển dụng…).
- **Bước 1 — Hiển thị bộ câu hỏi theo chủ đề**: sau khi chọn, form hiển thị **đúng 10 câu hỏi** của chủ đề đó (không hiển thị câu hỏi của chủ đề kia).
- Người dùng có thể **đổi chủ đề** bất kỳ lúc nào trước khi gửi; đổi chủ đề → xóa dữ liệu câu trả lời cũ (cảnh báo trước khi xóa).
- Mỗi câu hỏi giữ giới hạn **500 ký tự** (FR-FORM-004) và có nhãn bắt buộc/tùy chọn rõ ràng.

### 2.2. Bộ câu hỏi — A. Thành tựu cá nhân (10 câu)

| # | question_key | Câu hỏi | Bắt buộc | Ghi chú |
|---|---|---|---|---|
| A1 | `pa_context` | Bạn muốn chia sẻ thành tựu cá nhân nào? Hãy tóm tắt trong 1–2 câu. | ✅ | Gợi ý: không ghi tên khách hàng |
| A2 | `pa_role` | Vai trò của bạn trong thành tựu này là gì? | ✅ | Ví dụ: kỹ sư trưởng, PM, thành viên team |
| A3 | `pa_challenge` | Thách thức hoặc khó khăn lớn nhất bạn phải đối mặt là gì? | ✅ | |
| A4 | `pa_action` | Bạn đã làm gì để vượt qua thách thức đó? | ✅ | Cách tiếp cận, công cụ, quyết định |
| A5 | `pa_result` | Kết quả đạt được có con số cụ thể nào không? | ⬜ | Trống → cảnh báo "nên bổ sung con số" |
| A6 | `pa_support` | Ai đã hỗ trợ hoặc đồng hành cùng bạn? | ⬜ | Tên riêng → đánh dấu nổi bật hoặc viết chữ cái đầu (xem §4) |
| A7 | `pa_lesson` | Bài học hoặc kinh nghiệm bạn muốn chia sẻ? | ⬜ | |
| A8 | `pa_impact` | Thành tựu này có ý nghĩa gì với team/công ty? | ⬜ | |
| A9 | `pa_evidence` | Bạn có hình ảnh/minh chứng kèm theo không? | ⬜ | Kèm checkbox quyền public (xem §3) |
| A10 | `pa_quote` | Bạn muốn trích dẫn một câu nói của chính mình về thành tựu này không? | ⬜ | Dùng làm quote trong bài (theo phong cách FUN) |

### 2.3. Bộ câu hỏi — B. Thành tựu đội nhóm (10 câu)

| # | question_key | Câu hỏi | Bắt buộc | Ghi chú |
|---|---|---|---|---|
| B1 | `team_context` | Team của bạn đã đạt được thành tựu gì? Hãy tóm tắt trong 1–2 câu. | ✅ | Gợi ý: không ghi tên khách hàng |
| B2 | `team_project` | Dự án/hoạt động này diễn ra trong bối cảnh nào? (lĩnh vực, thời gian, quy mô) | ✅ | |
| B3 | `team_challenge` | Thách thức lớn nhất của team là gì? | ✅ | |
| B4 | `team_solution` | Team đã giải quyết bằng cách nào? | ✅ | Giải pháp, cách phối hợp, công nghệ |
| B5 | `team_result` | Kết quả đạt được có con số cụ thể nào không? | ⬜ | Trống → cảnh báo "nên bổ sung con số" |
| B6 | `team_members` | Ai là những thành viên chủ chốt của team? | ⬜ | Tên riêng → đánh dấu nổi bật hoặc viết chữ cái đầu (xem §4) |
| B7 | `team_collab` | Có sự phối hợp giữa các đơn vị/chi nhánh nào không? | ⬜ | Ví dụ: FKO + offshore, FJP.GHC + FHM.GHS |
| B8 | `team_lesson` | Bài học hoặc cách làm hay muốn chia sẻ? | ⬜ | |
| B9 | `team_impact` | Thành tựu này có ý nghĩa gì với khách hàng/công ty? | ⬜ | |
| B10 | `team_quote` | Có câu nói nào của thành viên/leader muốn trích dẫn không? | ⬜ | Dùng làm quote trong bài (theo phong cách FUN) |

### 2.4. Ánh xạ dữ liệu

- `achievement_type` (enum: `personal` | `team`) là trường bắt buộc mới ở đầu form.
- `answers` chỉ chứa 10 question_key của chủ đề đã chọn (không trộn lẫn).
- Các question_key cũ (`project_description`, `challenge`, `solution`, `result_metrics`, `lesson`, `unsung_hero`) **được thay thế** bởi bộ mới. Xem Data Dictionary v2.0 §2.2.

---

## 3. Checkbox xác nhận bảo mật (Requirement 2)

### 3.1. Vị trí & nội dung

Hiển thị **trước nút "Tạo câu chuyện"**, gồm 2 checkbox bắt buộc:

| # | Checkbox | Nội dung hiển thị | Bắt buộc |
|---|---|---|---|
| C1 | `consent_media_public` | "Tôi xác nhận **hình ảnh/tài liệu đính kèm** trong câu trả lời được phép sử dụng và **đăng tải công khai** (nội bộ/ngoài tổ chức) theo chính sách truyền thông." | ✅ |
| C2 | `consent_truthful` | "Tôi cam kết **thông tin đã cung cấp là đúng sự thật** và đã có **sự đồng ý của khách hàng hoặc người được nhắc tới** trước khi gửi." | ✅ |

### 3.2. Quy tắc

- **Không tick → không gửi**: nút "Tạo câu chuyện" bị vô hiệu hóa cho đến khi cả 2 checkbox được tick.
- Hiển thị thông báo lỗi nếu người dùng cố gắng gửi khi chưa tick (chặn phía client).
- Cả 2 giá trị consent được gửi kèm trong payload API (xem API Contracts v2.0 §2.1).
- Nếu người dùng **không đính kèm hình ảnh nào**, checkbox C1 vẫn hiển thị và vẫn bắt buộc (xác nhận cho mọi nội dung đính kèm tiềm năng); ghi chú UI: "Nếu không có hình ảnh đính kèm, vui lòng xác nhận để hoàn tất."
- Vi phạm → cảnh báo mức `high` trong danh sách cảnh báo (category `consent_missing`).

### 3.3. Hình ảnh đính kèm (nếu có)

- MVP: người dùng có thể **dán đường dẫn/mô tả hình ảnh** trong trường `pa_evidence`/`team_evidence` (không upload file nhị phân ở MVP — ngoài phạm vi).
- Nếu nhập nội dung evidence mà chưa tick C1 → chặn gửi + hiển thị lỗi tại checkbox.
- Phase 2: hỗ trợ upload thật + watermark + kiểm tra quyền sử dụng.

---

## 4. Đánh dấu tên riêng để rà soát (Requirement 3)

### 4.1. Nguyên tắc

Khi hệ thống (hoặc người dùng) phát hiện **tên riêng có khả năng là dự án/khách hàng/người**, xử lý theo 2 chế độ:

1. **Đánh dấu nổi bật (highlight)**: tên riêng được bôi đậm/khoanh vùng trong **bản nháp đầu ra** để người chỉnh sửa (PB/PD) dễ dàng rà soát lại trước khi phát hành.
2. **Viết chữ cái đầu (initialization)**: khuyến nghị thay tên đầy đủ bằng **chữ cái đầu của tên** (ví dụ: `Takenaka` → `T.`, `Nguyễn Văn An` → `N.V.A`) khi tên đó thuộc khách hàng/người ngoài tổ chức — giữ tính bảo mật mà vẫn đủ ngữ cảnh.

### 4.2. Cơ chế

| Tầng | Hành động |
|---|---|
| **L1 — EntityDetector** | Phát hiện tên riêng (client/project/person) như ADR-002; **thêm category `proper_name`** vào danh sách thực thể. |
| **L2 — Prompt** | Directive mới: "Nếu tên riêng thuộc khách hàng/người ngoài, chỉ viết chữ cái đầu (vd: T.); nếu là tên nội bộ, giữ nguyên nhưng đánh dấu để rà soát." |
| **L3 — OutputScanner** | Quét lại đầu ra; mọi tên riêng còn sót → thêm warning category `proper_name`, severity `medium` (không tự khóa copy, nhưng hiển thị nổi bật). |
| **UI — Highlight** | Trong tab kết quả, các tên riêng được bọc `<mark>`/thẻ span class `proper-name` với màu nền vàng → người chỉnh sửa thấy ngay. |
| **UI — Suggestion** | Cạnh mỗi tên được đánh dấu, hiển thị gợi ý "Đổi thành chữ cái đầu: T." (nút áp dụng 1 click). |

### 4.3. Ví dụ

| Đầu vào | Đầu ra mặc định | Đầu ra khi chọn "viết chữ cái đầu" |
|---|---|---|
| "Dự án Topology cho khách Takenaka" | "Dự án **Topology** cho khách **Takenaka**" (highlight vàng) | "Dự án **T.** cho khách **T.**" |
| "Anh Nguyễn Trung Thành - PM" | "Anh **Nguyễn Trung Thành** - PM" (highlight vàng) | "Anh **N.T.T.** - PM" |

---

## 5. Giọng văn theo tài liệu tham khảo (Requirement 4)

### 5.1. Nguồn tham khảo

Tài liệu tham khảo: **Bản tin FUN — FPT Japan Internal Newsletter** (bộ bài mẫu khai thác thành tựu cá nhân & thành tựu nhóm). Đây là chuẩn giọng văn cho mọi đầu ra.

### 5.2. Đặc điểm giọng văn FUN (đã phân tích từ tài liệu)

| # | Đặc điểm | Mô tả | Ví dụ từ tài liệu |
|---|---|---|---|
| S1 | **Mở bài theo sự kiện** | Bắt đầu bằng thời gian + sự kiện + đơn vị, không vòng vo | "Ngày 12/10, tại trụ sở Đại sứ quán Việt Nam tại Tokyo, Lễ công bố kết quả… đã diễn ra…" |
| S2 | **Người thật, việc thật** | Nêu tên người + mã đơn vị (FJP.RPP, FNS.FKO…), chức danh | "Hai nhân viên FPT Japan là Nguyễn Thị Thảo Hiền (FJP.RPP) và Nguyễn Như Hồng Phúc (FJP.FA)…" |
| S3 | **Con số cụ thể** | Đưa số liệu chính xác, so sánh tăng trưởng | "Cuộc thi thu hút 27.900 người tham gia, tăng hơn ba lần so với năm 2025." |
| S4 | **Trích dẫn trực tiếp** | Quote từ người trong cuộc (PM, AM, CEO) để tăng tin cậy | "Theo anh Huy, dựa theo kết quả dự án… FJP có cơ hội triển khai tiếp các phase 3, 4…" |
| S5 | **Kể chuyện giải pháp** | Trình bày thách thức → cách làm → kết quả theo dòng thời gian | "Trước bài toán đó, FJP RD1 đã thiết lập bộ OKR… Áp lực từ chỉ tiêu kỷ lục đã kích hoạt tinh thần thực thi…" |
| S6 | **Kết bài ý nghĩa** | Kết bằng giá trị lan tỏa: hình ảnh tổ chức, bài học, tương lai | "Thành tích của hai nhân viên FPT Japan thể hiện tinh thần tích cực học hỏi… góp phần xây dựng hình ảnh người FPT chuyên nghiệp…" |
| S7 | **Giọng trang trọng, tích cực** | Ngôn ngữ chuẩn mực, không dùng từ lóng, không phóng đại | "Với nỗ lực và cách làm nổi bật, anh Giáp đã hoàn thành vượt mức OKR đặt ra…" |
| S8 | **Cấu trúc đoạn ngắn** | Đoạn 3–5 câu, mỗi đoạn một ý | Toàn bộ bài mẫu |

### 5.3. Áp dụng vào từng đầu ra

| Đầu ra | Áp dụng phong cách FUN |
|---|---|
| O1 — Bản tin nội bộ | Giữ nguyên khung kể chuyện; mở bài theo sự kiện (S1), nêu người/đơn vị (S2), con số (S3), trích dẫn (S4), kết ý nghĩa (S6) |
| O2 — Post Teams | Rút gọn: 1 câu sự kiện + 1 câu kết quả + 1 quote ngắn + hashtag |
| O3 — Case study | Khung Bối cảnh → Thách thức → Giải pháp → Kết quả, viết theo S5 (kể chuyện giải pháp) |
| O4 — Bản dịch JA/EN | Giữ nguyên giọng trang trọng (S7), thuật ngữ kỹ thuật giữ gốc |
| O5 — Cảnh báo | Không đổi (khách quan, hành động được) |

### 5.4. Ràng buộc prompt

- System prompt v2.0 nhúng **"Phong cách viết: theo bản tin FUN — FPT Japan"** kèm 8 đặc điểm S1–S8.
- Prompt yêu cầu: mở bài có thời gian/sự kiện, nêu người thật + mã đơn vị (nếu được phép), ưu tiên con số, trích dẫn 1–2 câu nói, kết bài nêu ý nghĩa lan tỏa.
- Tuân thủ đồng thời các ràng buộc bảo mật (masking, tên riêng → chữ cái đầu) — phong cách không được làm lộ thông tin.

---

## 6. Ma trận thay đổi ↔ tài liệu

| Thay đổi | BRD | SRS | User Stories | Process Flows | Data Dict | System Design | Tech Spec | API | ADR |
|---|---|---|---|---|---|---|---|---|---|
| Câu hỏi 2 chủ đề × 10 | §4.3 | FR-FORM-001 | US-FORM-001 | §1 | §2.2 | §2.1 | §2.2–2.3 | §2.1 | ADR-005 |
| Checkbox consent | §4.5, §9 | FR-FORM-005 | US-FORM-005 | §1 | §2.7 | §2.1 | §2.3 | §2.1 | ADR-006 |
| Đánh dấu tên riêng | §4.5 | FR-GEN-003 | US-GEN-003 | §2 | §2.6 | §2.3 | §3.4 | §2.2 | ADR-002 (mở rộng) |
| Giọng văn FUN | §4.4 | FR-GEN-006 | US-GEN-005 | §2 | — | §2.4 | §2.2 | §2.2 | — |

---

## 7. Câu hỏi mở

| # | Câu hỏi | Ảnh hưởng |
|---|---|---|
| OQ-2.1 | Có cần upload hình ảnh thật trong MVP không, hay chỉ mô tả/đường dẫn? | Phạm vi FR-FORM-005 |
| OQ-2.2 | Chữ cái đầu viết theo chuẩn nào (tên đầy đủ, họ+tên viết tắt)? | Cấu hình L2/L3 |
| OQ-2.3 | Có cần lưu vết (audit log) ai đã tick consent không? | Phase 2 |