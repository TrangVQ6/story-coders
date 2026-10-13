# User Stories — Case Study Builder

| Thuộc tính | Giá trị |
|---|---|
| **Phiên bản** | 1.0 |
| **Trạng thái** | Draft |
| **Liên kết** | BRD v1.0, SRS v1.0 |
| **Quy ước** | US-[module]-[số]; mỗi story liên kết với FR tương ứng |

---

## US-FORM-001: Nhập câu chuyện dự án qua 6 câu hỏi

**As a** thành viên/lead dự án (PA)
**I want** trả lời 6 câu hỏi có cấu trúc về dự án của mình
**So that** tôi có thể chia sẻ thành tựu mà không phải tự viết bài dài.

### Acceptance Criteria
- [ ] Given form hiển thị đủ 6 trường câu hỏi, when tôi nhập dữ liệu vào các trường bắt buộc (Q1, Q2, Q3) và nhấn "Tạo câu chuyện", then hệ thống tạo đầu ra thành công.
- [ ] Given tôi bỏ trống trường bắt buộc, when tôi nhấn "Tạo câu chuyện", then hệ thống hiển thị lỗi tại đúng trường thiếu và không tạo đầu ra.
- [ ] Given trường Q1, when tôi bắt đầu nhập, then hệ thống hiển thị gợi ý "lĩnh vực, không ghi tên khách hàng".

### Business Rules
- BR-001: Q1, Q2, Q3 bắt buộc; Q4, Q5, Q6 tùy chọn.
- FR-FORM-001, FR-FORM-004 (giới hạn 500 ký tự/trường).

### Dependencies
- US-FORM-002 (chọn ngôn ngữ), US-GEN-001 (tạo đầu ra).

---

## US-FORM-002: Chọn ngôn ngữ đầu ra

**As a** nhân viên Marketing/Sales (PC)
**I want** chọn ngôn ngữ VI/JA/EN trước khi tạo
**So that** tôi nhận được bản dịch tiếng Nhật và tiếng Anh phục vụ đối tác FJP và website.

### Acceptance Criteria
- [ ] Given tôi chọn VI+JA+EN, when hệ thống tạo đầu ra, then tab "Bản dịch" chứa đủ bản JA và EN.
- [ ] Given tôi chỉ chọn VI, when hệ thống tạo đầu ra, then tab "Bản dịch" không xuất hiện.
- [ ] Given tôi không chọn ngôn ngữ nào, then hệ thống mặc định dùng VI.

### Business Rules
- FR-FORM-002, FR-GEN-001.4 (bản dịch giữ nguyên nội dung kỹ thuật).

### Dependencies
- US-GEN-001.

---

## US-FORM-003: Dùng dự án mẫu để trải nghiệm nhanh

**As a** người dùng mới
**I want** tải sẵn một trong 2 dự án mẫu vào form
**So that** tôi hiểu cách dùng sản phẩm mà không cần chuẩn bị nội dung thật.

### Acceptance Criteria
- [ ] Given tôi chọn "Dự án mẫu 1", then cả 6 trường được điền sẵn dữ liệu mẫu.
- [ ] Given dữ liệu mẫu, when tôi nhấn "Tạo câu chuyện", then hệ thống tạo đầu ra bình thường.
- [ ] Dữ liệu mẫu không chứa tên khách hàng thật.

### Business Rules
- FR-FORM-003.

---

## US-GEN-001: Tạo 5 đầu ra từ một lần gửi

**As a** nhân viên truyền thông nội bộ (PB)
**I want** nhận đủ 5 đầu ra (bản tin, post Teams, case study, bản dịch, cảnh báo) từ một lần gửi
**So that** tôi có bản nháp chuẩn để biên tập mà không cần phỏng vấn lại.

### Acceptance Criteria
- [ ] Given form hợp lệ, when tôi nhấn "Tạo câu chuyện", then hệ thống trả về đủ 5 đầu ra trong ≤ 45 giây.
- [ ] Given kết quả trả về, then bản tin nội bộ dài ~300 từ, giọng kể chuyện.
- [ ] Given kết quả trả về, then post Teams ≤ 280 ký tự (không tính hashtag) và có ≥ 1 hashtag.
- [ ] Given kết quả trả về, then case study có đúng 4 mục: Bối cảnh, Thách thức, Giải pháp, Kết quả.
- [ ] Given kết quả trả về, then danh sách cảnh báo luôn tồn tại (có thể ghi "đã rà soát").

### Business Rules
- FR-GEN-001, NFR-PERF-001.

### Dependencies
- US-FORM-001, US-FORM-002.

---

## US-GEN-002: Đảm bảo không bịa số liệu

**As a** lead dự án (PA/PD)
**I want** hệ thống không tự thêm số liệu hay kết quả không có trong câu trả lời của tôi
**So that** nội dung phát hành luôn trung thực với thực tế dự án.

### Acceptance Criteria
- [ ] Given trường Q4 (kết quả có con số) trống, when hệ thống tạo case study, then mục Kết quả không chứa bất kỳ con số nào do hệ thống tự sinh.
- [ ] Given trường Q4 trống, then danh sách cảnh báo chứa mục "Nên bổ sung con số cụ thể".
- [ ] Given tôi nhập số liệu "giảm 30% thời gian xử lý", then mọi đầu ra dùng đúng con số này, không thêm con số khác.

### Business Rules
- FR-GEN-002, FR-GEN-004 (ràng buộc prompt).

---

## US-GEN-003: Ẩn thông tin nhạy cảm tự động

**As a** lead dự án (PD)
**I want** hệ thống tự thay tên khách hàng, tên dự án, số liệu mật bằng mô tả chung
**So that** tôi an tâm chia sẻ thành tựu mà không lo lộ thông tin bảo mật.

### Acceptance Criteria
- [ ] Given đầu vào chứa tên "ABC Corp", when hệ thống tạo đầu ra, then mọi đầu ra dùng "khách hàng"/mô tả chung, không xuất hiện "ABC Corp".
- [ ] Given hệ thống phát hiện rủi ro, then cảnh báo liệt kê đúng điểm rủi ro kèm gợi ý xử lý.
- [ ] Given không phát hiện rủi ro, then cảnh báo ghi "Đã rà soát — không phát hiện rủi ro".

### Business Rules
- FR-GEN-003, NFR-SEC-002 (privacy-by-default).

---

## US-GEN-004: Xử lý lỗi khi tạo nội dung

**As a** người dùng bất kỳ
**I want** thấy thông báo lỗi rõ ràng và có thể thử lại
**So that** tôi không mất dữ liệu đã nhập khi hệ thống gặp sự cố.

### Acceptance Criteria
- [ ] Given hệ thống gặp lỗi khi tạo, then dữ liệu 6 trường vẫn còn nguyên trên form.
- [ ] Given lỗi xảy ra, then hiển thị thông báo thân thiện và nút "Thử lại".
- [ ] Given tôi nhấn "Thử lại", then hệ thống thực hiện lại quá trình tạo.

### Business Rules
- FR-GEN-005.

---

## US-VIEW-001: Xem kết quả theo tab

**As a** nhân viên truyền thông nội bộ (PB)
**I want** xem 5 đầu ra trong các tab riêng biệt
**So that** tôi dễ dàng chọn đúng nội dung cho từng kênh.

### Acceptance Criteria
- [ ] Given kết quả đã tạo, then 5 tab hiển thị: Bản tin nội bộ, Post Teams, Case study, Bản dịch, Cảnh báo.
- [ ] Given có cảnh báo rủi ro, then tab "Cảnh báo" hiển thị badge số lượng.
- [ ] Given tôi chuyển tab, then nội dung đã chỉnh sửa ở tab trước không bị mất.

### Business Rules
- FR-VIEW-001, FR-VIEW-002.

---

## US-VIEW-002: Chỉnh sửa và copy nội dung

**As a** nhân viên truyền thông nội bộ (PB)
**I want** chỉnh sửa trực tiếp từng đầu ra và copy vào clipboard
**So that** tôi có thể đưa nội dung vào bản tin/post mà không cần sao chép thủ công nhiều bước.

### Acceptance Criteria
- [ ] Given tab đang mở, when tôi sửa nội dung, then nội dung sửa được lưu trong phiên.
- [ ] Given tôi nhấn "Copy", then clipboard chứa đúng nội dung hiển thị (kể cả sau khi sửa).
- [ ] Given copy thành công, then hiển thị thông báo "Đã sao chép" trong 2 giây.

### Business Rules
- FR-VIEW-002, FR-VIEW-003.

---

## US-VIEW-003: Xác nhận cảnh báo trước khi copy

**As a** lead dự án (PD)
**I want** phải xác nhận đã đọc cảnh báo trước khi copy nội dung có rủi ro
**So that** tôi kiểm soát được thông tin trước khi nó rời khỏi hệ thống.

### Acceptance Criteria
- [ ] Given có ≥ 1 cảnh báo mức cao, then nút Copy trên tab Cảnh báo bị khóa.
- [ ] Given tôi tick "Tôi đã đọc cảnh báo và chịu trách nhiệm rà soát", then nút Copy được mở khóa.
- [ ] Given tôi chưa tick, then hệ thống không cho copy.

### Business Rules
- FR-VIEW-004.

---

## US-UI-001: Giao diện thân thiện tông hồng–tím

**As a** người dùng bất kỳ
**I want** giao diện đẹp, tông hồng–tím, hoạt động tốt trên điện thoại và máy tính
**So that** tôi có trải nghiệm dễ chịu khi tạo nội dung.

### Acceptance Criteria
- [ ] Given viewport ≥ 360px, then giao diện hiển thị không vỡ layout.
- [ ] Given tôi nhấn "Tạo câu chuyện", then nút bị vô hiệu hóa và hiển thị trạng thái tải.
- [ ] Màu chủ đạo thuộc dải hồng–tím.

### Business Rules
- FR-UI-001, FR-UI-002.

---

## US-TRANS-001: Bản dịch giữ đúng nội dung kỹ thuật

**As a** nhân viên Marketing/Sales (PC)
**I want** bản dịch JA/EN giữ nguyên thuật ngữ kỹ thuật và ý nghĩa
**So that** đối tác Nhật và khách quốc tế hiểu đúng giá trị dự án.

### Acceptance Criteria
- [ ] Given tôi chọn JA, then bản tiếng Nhật bao phủ đầy đủ nội dung case study (Bối cảnh → Kết quả).
- [ ] Given thuật ngữ kỹ thuật xuất hiện trong đầu vào, then bản dịch giữ thuật ngữ gốc hoặc chú thích đúng nghĩa.
- [ ] Given tôi chỉ chọn VI, then không tạo bản dịch.

### Business Rules
- FR-GEN-001.4, NFR-QUAL-001.

### Dependencies
- US-FORM-002, US-GEN-001.

---

## Tổng hợp mức ưu tiên

| Sprint đề xuất | Story |
|---|---|
| **Sprint 1 (nền tảng)** | US-FORM-001, US-FORM-002, US-FORM-003, US-GEN-001, US-GEN-004, US-UI-001 |
| **Sprint 2 (an toàn & chất lượng)** | US-GEN-002, US-GEN-003, US-VIEW-001, US-VIEW-002 |
| **Sprint 3 (kiểm soát & đa ngôn ngữ)** | US-VIEW-003, US-TRANS-001 |