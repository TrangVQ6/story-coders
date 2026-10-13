# BRD — Case Study Builder: Biến kết quả dự án thành câu chuyện ai cũng muốn đọc

| Thuộc tính | Giá trị |
|---|---|
| **Tài liệu** | Business Requirements Document (BRD) |
| **Phiên bản** | 1.0 |
| **Trạng thái** | Draft — chờ phê duyệt |
| **Ngày** | 2026-10-13 |
| **Tác giả** | Business Analyst |
| **Chủ sở hữu sản phẩm** | Trang Vuong Quynh |
| **Phạm vi** | MVP (Phase 1) + định hướng Phase 2 |

---

## 1. Tóm tắt điều hành (Executive Summary)

**Case Study Builder** là một ứng dụng web tự động hóa quy trình "kể lại thành tựu dự án" trong tổ chức phần mềm. Người dùng chỉ cần trả lời **6 câu hỏi có cấu trúc**, hệ thống sẽ:

1. **Ẩn thông tin nhạy cảm** (tên khách hàng, tên dự án, số liệu mật) theo nguyên tắc tự động + cảnh báo;
2. **Tạo 5 đầu ra** phục vụ các kênh khác nhau: bản tin nội bộ, post Teams, case study chuẩn khung, bản dịch JA/EN, danh sách cảnh báo rà soát;
3. Cho phép **chỉnh sửa và copy** trước khi phát hành.

Giá trị cốt lõi: **giảm thời gian viết từ nhiều giờ xuống còn dưới 10 phút**, đồng thời **đảm bảo an toàn thông tin** và **chuẩn hóa chất lượng nội dung** trên mọi kênh truyền thông nội bộ.

---

## 2. Phân tích vấn đề (Problem Statement)

### 2.1. Hiện trạng

Các team dự án tạo ra nhiều thành tựu đáng ghi nhận (cải thiện hiệu năng, khách hàng khen ngợi, áp dụng AI vào quy trình, giao hàng đúng hạn…). Tuy nhiên, những thành tựu này **hiếm khi được kể lại** dưới dạng nội dung có thể phát hành.

### 2.2. Phân rã vấn đề (Problem Hierarchy)

| # | Lớp vấn đề | Mô tả chi tiết | Hệ quả |
|---|---|---|---|
| P1 | **Năng lực viết của team dự án** | Thành viên/lead dự án bận deadline, không có thời gian viết; không tự tin "viết sao cho hay", không quen giọng văn truyền thông | Không có nội dung thô để các bên khác sử dụng |
| P2 | **Chi phí sản xuất của truyền thông nội bộ** | Phải phỏng vấn nhiều vòng, tự chuyển ngôn ngữ kỹ thuật sang ngôn ngữ dễ hiểu, chờ duyệt lâu giữa các bên | Chu kỳ sản xuất nội dung dài, tắc nghẽn ở khâu trung gian |
| P3 | **Rủi ro an toàn thông tin** | Nội dung kỹ thuật dễ vô tình lộ tên khách hàng, số liệu mật, chi tiết hợp đồng | Rủi ro pháp lý, mất lòng tin khách hàng |
| P4 | **Thất thoát giá trị tri thức** | Thành tựu không được ghi nhận; bài học không được chia sẻ giữa các team | Lặp lại sai lầm, mất nguồn nội dung cho thương hiệu tuyển dụng |

### 2.3. Định lượng vấn đề (ước tính cho tổ chức ~500 nhân sự, 40 team dự án)

| Chỉ số | Ước tính hiện tại |
|---|---|
| Số thành tựu đáng kể mỗi quý | ~60–80 (trung bình 1,5–2/team/quý) |
| Số thành tựu được kể lại dưới dạng nội dung | < 10% |
| Thời gian trung bình để sản xuất 1 bài (phỏng vấn → duyệt → phát hành) | 4–8 giờ làm việc |
| Tỷ lệ bài phải làm lại do thiếu thông tin kỹ thuật | ~40% |

> **Mục tiêu của sản phẩm:** nâng tỷ lệ thành tựu được kể lại lên ≥ 50%, giảm thời gian sản xuất xuống ≤ 10 phút cho bản nháp đầu tiên.

---

## 3. Người dùng & Persona

### 3.1. Ma trận người dùng

| Persona | Vai trò | Nhu cầu chính | Nỗi đau hiện tại | Kênh sử dụng |
|---|---|---|---|---|
| **PA — Project Member/Lead** | Người cung cấp thông tin gốc | Chia sẻ thành tựu nhanh, không phải tự viết | Deadline, không biết viết, ngại lộ thông tin | Form 6 câu hỏi |
| **PB — Truyền thông nội bộ** | Người biên tập/phát hành | Có bản nháp chuẩn, đúng thông tin kỹ thuật | Phỏng vấn nhiều vòng, chờ duyệt lâu | Tab kết quả, chỉnh sửa, copy |
| **PC — Marketing/Sales** | Người tận dụng nội dung | Case study đa ngôn ngữ, đã ẩn thông tin khách | Thiếu nguồn nội dung, lo ngại bảo mật | Bản dịch JA/EN, cảnh báo |
| **PD — Lead/Quản lý** | Người phê duyệt | Kiểm soát thông tin trước khi phát hành | Không có cơ chế rà soát tập trung | Danh sách cảnh báo, checkpoint duyệt |

### 3.2. Chi tiết persona

#### PA — Minh (Project Lead, 32 tuổi)
- **Bối cảnh:** Lead team 8 người, dự án phần mềm nhúng cho khách Nhật, luôn trong tình trạng sprint bận rộn.
- **Hành vi:** Sau khi demo thành công, muốn chia sẻ với công ty nhưng "không biết bắt đầu từ đâu"; sợ viết sai thông tin kỹ thuật bị lead cấp trên soi.
- **Động lực:** Được ghi nhận trước ban lãnh đạo; lan tỏa cách làm hay của team.
- **Rào cản:** Thời gian, kỹ năng viết, lo ngại bảo mật.

#### PB — Lan (Truyền thông nội bộ, 27 tuổi)
- **Bối cảnh:** Phụ trách bản tin nội bộ hàng tháng; phải săn tin từ các team.
- **Hành vi:** Gửi email hỏi, chờ trả lời, phỏng vấn bổ sung, tự viết lại, gửi lead duyệt — mỗi bài mất 1–2 ngày.
- **Động lực:** Ra được nhiều bài chất lượng, đúng hạn.
- **Rào cản:** Phụ thuộc vào tốc độ phản hồi của team; thiếu kiến thức kỹ thuật để hỏi đúng trọng tâm.

#### PC — Hùng (Marketing/Sales, 35 tuổi)
- **Bối cảnh:** Cần case study tiếng Nhật để gửi đối tác FJP; cần tiếng Anh cho website.
- **Hành vi:** Xin tài liệu từ dự án, tự dịch, tự kiểm tra thông tin nhạy cảm.
- **Động lực:** Có tài liệu bán hàng thuyết phục, đúng chuẩn bảo mật.
- **Rào cản:** Không rõ thông tin nào được phép công bố; dịch thuật không chính xác thuật ngữ kỹ thuật.

---

## 4. Khái niệm giải pháp (Solution Concept)

### 4.1. Tuyên bố giá trị (Value Proposition)

> **Với team dự án**, Case Study Builder biến thành tựu kỹ thuật thành câu chuyện sẵn sàng phát hành **trong 10 phút**, không cần kỹ năng viết.
> **Với truyền thông nội bộ**, công cụ cung cấp **bản nháp chuẩn, đúng thông tin, đã ẩn dữ liệu nhạy cảm** để biên tập ngay.
> **Với Marketing/Sales**, công cụ tạo **case study đa ngôn ngữ (VI/JA/EN)** phục vụ đối tác và thương hiệu tuyển dụng.

### 4.2. Luồng sử dụng cốt lõi (Core Journey)

```
Trả lời 6 câu hỏi → Hệ thống ẩn thông tin nhạy cảm → Tạo 5 đầu ra → Chỉnh sửa & Copy
```

### 4.3. 6 câu hỏi đầu vào (đã chuẩn hóa)

| # | Câu hỏi | Trường dữ liệu | Bắt buộc | Ghi chú |
|---|---|---|---|---|
| Q1 | Dự án làm gì? *(lĩnh vực, không ghi tên khách)* | `project_description` | ✅ | Nhắc người dùng KHÔNG nhập tên khách |
| Q2 | Thách thức lớn nhất là gì? | `challenge` | ✅ | |
| Q3 | Team đã giải quyết bằng cách nào? | `solution` | ✅ | |
| Q4 | Kết quả có con số nào không? | `result_metrics` | ⬜ | Nếu trống → sinh cảnh báo "Nên bổ sung con số cụ thể" |
| Q5 | Bài học hoặc mẹo muốn chia sẻ? | `lesson` | ⬜ | |
| Q6 | Ai là người hùng thầm lặng của team? | `unsung_hero` | ⬜ | Tùy chọn ẩn danh |

### 4.4. 5 đầu ra (Deliverables)

| # | Đầu ra | Độ dài mục tiêu | Giọng văn | Ngôn ngữ |
|---|---|---|---|---|
| O1 | **Bản tin nội bộ** | ~300 từ | Kể chuyện, truyền cảm hứng | VI |
| O2 | **Post Teams** | ≤ 280 ký tự + hashtag | Ngắn gọn, lôi cuốn | VI |
| O3 | **Case study chuẩn khung** | Bối cảnh → Thách thức → Giải pháp → Kết quả | Chuyên nghiệp, có cấu trúc | VI |
| O4 | **Bản dịch JA + EN** | Tương ứng O1/O3 | Đúng thuật ngữ kỹ thuật | JA, EN |
| O5 | **Danh sách cảnh báo** | Liệt kê điểm rủi ro | Khách quan, hành động được | VI |

### 4.5. Nguyên tắc thiết kế sản phẩm

1. **An toàn trước tiên (Privacy-by-default):** mọi đầu ra đều được rà soát ẩn thông tin; cảnh báo luôn được tạo kể cả khi không phát hiện rủi ro (trạng thái "đã rà soát").
2. **Không bịa số liệu (No-hallucination):** hệ thống chỉ dùng thông tin người dùng cung cấp; thiếu số liệu → cảnh báo, không tự suy diễn.
3. **Con người quyết định cuối cùng (Human-in-the-loop):** mọi đầu ra là *bản nháp*; người dùng và lead phải rà soát trước khi phát hành.
4. **Tái sử dụng tối đa (Reusability):** dữ liệu đầu vào được lưu dưới dạng có cấu trúc để tái sinh nội dung cho nhiều kênh mà không cần nhập lại.
5. **Không lưu trữ bí mật:** hệ thống không lưu tên khách hàng thật; nếu người dùng nhập, hệ thống đánh dấu là thông tin cần ẩn và không dùng trong đầu ra.

---

## 5. Phạm vi (Scope)

### 5.1. Trong phạm vi — MVP (Phase 1)

- Form 6 câu hỏi có cấu trúc + chọn ngôn ngữ (VI/JA/EN).
- Engine sinh 5 đầu ra (bản tin, post Teams, case study, bản dịch, cảnh báo).
- Cơ chế ẩn thông tin nhạy cảm tự động + danh sách cảnh báo.
- 2 dự án mẫu (demo).
- Chỉnh sửa trực tiếp trên từng tab + nút Copy.
- Giao diện responsive, tông hồng–tím, thân thiện.

### 5.2. Ngoài phạm vi — MVP (đưa vào Phase 2)

- Quy trình phê duyệt đa cấp (approval workflow) có lưu vết.
- Xuất file (DOCX/PDF) và tích hợp CMS/Teams publishing.
- Kho lưu trữ case study + tìm kiếm.
- Analytics: số lượt đọc, tỷ lệ chuyển đổi nội dung.
- Đa ngôn ngữ mở rộng (CN, KR).
- Tích hợp SSO và phân quyền theo phòng ban.

### 5.3. Ranh giới rõ ràng

- **KHÔNG** thay thế quyết định phê duyệt của con người.
- **KHÔNG** tự động phát hành nội dung ra kênh ngoài.
- **KHÔNG** thay thế công cụ quản lý dự án (Jira, Redmine…) — chỉ nhận dữ liệu thủ công ở MVP.

---

## 6. Yêu cầu kinh doanh (Business Requirements)

| ID | Yêu cầu kinh doanh | Mô tả | MoSCoW |
|---|---|---|---|
| BR-001 | Tạo nội dung nhanh | Người dùng tạo được bộ 5 đầu ra từ 6 câu trả lời trong **≤ 10 phút** (bao gồm thời gian nhập liệu) | Must |
| BR-002 | Ẩn thông tin nhạy cảm | Hệ thống phát hiện và thay thế tên khách hàng, tên dự án, số liệu mật bằng mô tả chung; mọi phát hiện phải xuất hiện trong danh sách cảnh báo | Must |
| BR-003 | Không bịa thông tin | Mọi đầu ra chỉ dùng dữ liệu người dùng cung cấp; không thêm số liệu, tên, hoặc kết quả không có trong đầu vào | Must |
| BR-004 | Đa ngôn ngữ | Hệ thống tạo bản dịch tiếng Nhật và tiếng Anh giữ nguyên nội dung kỹ thuật | Must |
| BR-005 | Chuẩn hóa khung nội dung | Case study luôn theo khung Bối cảnh → Thách thức → Giải pháp → Kết quả | Must |
| BR-006 | Kiểm soát phát hành | Mọi đầu ra là bản nháp; người dùng phải xác nhận đã đọc cảnh báo trước khi copy | Should |
| BR-007 | Tái sử dụng dữ liệu | Dữ liệu đầu vào được lưu để tái sinh nội dung cho các kênh khác mà không nhập lại | Should |
| BR-008 | Đo lường hiệu quả | Hệ thống ghi log phiên tạo nội dung (số lần tạo, thời gian, ngôn ngữ) phục vụ phân tích | Could |

---

## 7. Chỉ số thành công (Success Metrics / KPIs)

| KPI | Công thức | Mục tiêu 6 tháng sau launch |
|---|---|---|
| Tỷ lệ thành tựu được kể lại | Số bài phát hành / số thành tựu đáng kể | ≥ 50% |
| Thời gian tạo bản nháp | Từ mở form đến có 5 đầu ra | ≤ 10 phút |
| Tỷ lệ bài không cần phỏng vấn lại | Bài phát hành không cần hỏi thêm thông tin | ≥ 70% |
| Tỷ lệ lỗi lộ thông tin | Số bài phát hiện lộ thông tin sau phát hành | = 0 |
| Mức độ hài lòng người dùng | Khảo sát NPS nội bộ | ≥ 40 |
| Số case study đa ngôn ngữ phát hành | Đếm theo quý | ≥ 20/quý |

---

## 8. Phân tích rủi ro & đối sách

| # | Rủi ro | Mức độ | Đối sách |
|---|---|---|---|
| R1 | AI bịa số liệu/kết quả | Cao | Prompt ràng buộc "chỉ dùng thông tin người dùng"; engine cảnh báo khi thiếu số liệu; nguyên tắc Human-in-the-loop |
| R2 | Lộ thông tin khách hàng qua mô tả kỹ thuật | Cao | Tầng ẩn thông tin (masking) + danh sách cảnh báo + checkpoint xác nhận trước khi copy |
| R3 | Chất lượng bản dịch JA không đạt | Trung bình | Prompt chuyên biệt song ngữ Việt–Nhật; cho phép chỉnh sửa thủ công; Phase 2: thêm bước kiểm tra dịch |
| R4 | Người dùng không có động lực nhập liệu | Trung bình | Form 6 câu hỏi tối giản; dự án mẫu; gamification nhẹ (ghi nhận người hùng) |
| R5 | Nội dung đồng nhất, thiếu cá tính | Thấp | Giữ giọng kể chuyện; cho phép chỉnh sửa tự do trước khi copy |
| R6 | Tuân thủ quy định dữ liệu cá nhân | Trung bình | Áp dụng PDPA (VN – Nghị định 13/2023/NĐ-CP), APPI (JP), GDPR (EU nếu mở rộng); xem §9 |

---

## 9. Tuân thủ pháp lý & quy chuẩn (Compliance)

| Quy định/Chuẩn | Phạm vi áp dụng | Tác động đến sản phẩm |
|---|---|---|
| **PDPA — Nghị định 13/2023/NĐ-CP** (VN) | Dữ liệu cá nhân của người dùng VN | Thu thập tối thiểu; thông báo mục đích xử lý; quyền xóa dữ liệu |
| **APPI** (Nhật Bản) | Dữ liệu người dùng JP | Xử lý dữ liệu cá nhân minh bạch; không chuyển dữ liệu ra ngoài nếu chưa đồng ý |
| **GDPR** (EU — nếu mở rộng) | Người dùng EU | Consent rõ ràng; quyền truy cập/xóa; ghi chú xử lý dữ liệu |
| **Bí mật kinh doanh / NDA** | Toàn bộ | Không lưu trữ thông tin mật của khách hàng ngoài phiên làm việc; cơ chế ẩn mặc định |
| **WCAG 2.1 AA** | Giao diện web | Khả năng tiếp cận: tương phản màu, điều hướng bàn phím, nhãn form đầy đủ |

---

## 10. Stakeholders & Kênh phối hợp

| Stakeholder | Vai trò | Nhu cầu chính | Mức ảnh hưởng |
|---|---|---|---|
| Ban lãnh đạo | Nhà tài trợ | Ghi nhận thành tựu, lan tỏa văn hóa | Cao |
| Truyền thông nội bộ | Khách hàng chính | Bản nháp chuẩn, giảm thời gian sản xuất | Cao |
| Team dự án | Người cung cấp dữ liệu | Tiết kiệm thời gian, được ghi nhận | Cao |
| Marketing/Sales | Người tận dụng | Case study đa ngôn ngữ, an toàn thông tin | Trung bình |
| An ninh thông tin | Người kiểm soát | Không lộ dữ liệu khách hàng | Cao |
| IT/Platform | Người vận hành | Triển khai, bảo trì, log/audit | Trung bình |

---

## 11. Lộ trình đề xuất (Roadmap)

| Phase | Nội dung | Tiêu chí ra mắt |
|---|---|---|
| **Phase 1 — MVP** | Form 6 câu hỏi, 5 đầu ra, ẩn thông tin, cảnh báo, 2 mẫu, copy | Chạy pilot 3 team trong 4 tuần; ≥ 90% người dùng tạo được nội dung trong 10 phút |
| **Phase 2 — Quản trị** | Approval workflow, kho lưu trữ, xuất DOCX/PDF, analytics | ≥ 20 case study/quý; quy trình duyệt có vết |
| **Phase 3 — Mở rộng** | Tích hợp CMS/Teams, SSO, đa ngôn ngữ CN/KR, AI review nâng cao | Tự động hóa phát hành theo quy trình duyệt |

---

## 12. Giả định & Ràng buộc

### Giả định (Assumptions)
- A1: Người dùng có thể nhập liệu bằng tiếng Việt; bản dịch JA/EN là đầu ra phụ.
- A2: Tổ chức có kênh truyền thông nội bộ (bản tin, Teams) sẵn sàng tiếp nhận nội dung.
- A3: Dữ liệu đầu vào không chứa thông tin tuyệt mật cấp nhà nước; sản phẩm phục vụ nội dung thương mại thông thường.
- A4: MVP chạy trên nền tảng VibeFlow (web app một trang), không yêu cầu backend riêng.

### Ràng buộc (Constraints)
- C1: Không được tự động phát hành nội dung ra kênh ngoài tổ chức.
- C2: Không được lưu trữ bí mật khách hàng ngoài phiên làm việc hiện tại.
- C3: Toàn bộ đầu ra phải có thể chỉnh sửa thủ công trước khi phát hành.
- C4: Chi phí vận hành (token AI) cần được giới hạn bằng cách tối ưu prompt và giới hạn độ dài đầu vào.

---

## 13. Câu hỏi mở cần làm rõ (Open Questions)

| # | Câu hỏi | Ảnh hưởng |
|---|---|---|
| OQ1 | Ai là người phê duyệt cuối cùng trước khi phát hành? (lead dự án hay truyền thông?) | Thiết kế quy trình duyệt Phase 2 |
| OQ2 | Có cần lưu trữ lịch sử các phiên tạo nội dung để tái sử dụng không? | Thiết kế data retention |
| OQ3 | Tên "người hùng thầm lặng" có được công khai hay ẩn danh mặc định? | Thiết kế trường Q6 |
| OQ4 | Ngân sách token AI mỗi tháng cho phép bao nhiêu phiên tạo? | Giới hạn NFR hiệu năng |
| OQ5 | Có cần tích hợp với hệ thống quản lý dự án hiện có (Jira…) không? | Phạm vi Phase 2 |