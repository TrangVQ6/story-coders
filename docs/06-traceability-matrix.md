# Requirements Traceability Matrix (RTM) — Case Study Builder

| Thuộc tính | Giá trị |
|---|---|
| **Phiên bản** | 2.0 |
| **Trạng thái** | Draft |
| **Phạm vi** | MVP (Phase 1) |
| **Liên kết** | BRD v2.0, SRS v2.0, User Stories v2.0 |

---

## 1. Ma trận BR → FR → User Story

| BR (kinh doanh) | FR (chức năng) | User Story | NFR liên quan |
|---|---|---|---|
| BR-001 Tạo nội dung nhanh | FR-FORM-001, FR-FORM-002, FR-GEN-001 | US-FORM-001, US-FORM-002, US-GEN-001 | NFR-USAB-001, NFR-PERF-001 |
| BR-002 Ẩn thông tin nhạy cảm | FR-GEN-003 | US-GEN-003 | NFR-SEC-002 |
| BR-003 Không bịa thông tin | FR-GEN-002, FR-GEN-004 | US-GEN-002 | NFR-QUAL-001 |
| BR-004 Đa ngôn ngữ | FR-FORM-002, FR-GEN-001.4 | US-TRANS-001, US-FORM-002 | NFR-QUAL-001 |
| BR-005 Chuẩn hóa khung nội dung | FR-GEN-001.3 | US-GEN-001 | — |
| BR-006 Kiểm soát phát hành | FR-VIEW-004 | US-VIEW-003 | NFR-SEC-002 |
| BR-007 Tái sử dụng dữ liệu | FR-FORM-003 | US-FORM-003 | — |
| BR-008 Đo lường hiệu quả | *(Phase 2 — log analytics)* | — | — |
| BR-009 Câu hỏi theo chủ đề | FR-FORM-001 | US-FORM-001 | NFR-USAB-001 |
| BR-010 Xác nhận bảo mật | FR-FORM-005 | US-FORM-005 | NFR-COMP-001 |
| BR-011 Đánh dấu tên riêng | FR-GEN-003 | US-GEN-003 | NFR-SEC-002 |
| BR-012 Giọng văn chuẩn | FR-GEN-006 | US-GEN-005 | NFR-QUAL-001 |

---

## 2. Ma trận FR → Acceptance Criteria (kiểm thử)

| FR | Tiêu chí chấp nhận chính | Phương pháp kiểm thử |
|---|---|---|
| FR-FORM-001 | Chọn chủ đề → hiển thị đúng 10 câu; chặn gửi khi thiếu trường bắt buộc | Kiểm thử thủ công / E2E |
| FR-FORM-002 | Bản dịch chỉ xuất hiện khi chọn JA/EN | Kiểm thử thủ công |
| FR-FORM-003 | 2 dự án mẫu điền sẵn form | Kiểm thử thủ công |
| FR-FORM-004 | Chặn nhập > 500 ký tự | Kiểm thử biên |
| FR-FORM-005 | Chặn gửi khi chưa tick consent | Kiểm thử UI |
| FR-FORM-006 | Evidence nhập được, chặn nếu thiếu C1 | Kiểm thử UI |
| FR-GEN-001 | 5 đầu ra ≤ 45 giây | Kiểm thử hiệu năng |
| FR-GEN-002 | Không số liệu tự sinh khi pa_result/team_result trống | Kiểm thử nội dung (review mẫu) |
| FR-GEN-003 | Tên riêng được thay bằng mô tả chung + highlight + gợi ý chữ cái đầu | Kiểm thử nội dung (review mẫu) |
| FR-GEN-004 | JSON parse đúng schema | Kiểm thử API/unit |
| FR-GEN-005 | Lỗi không làm mất dữ liệu form | Kiểm thử phục hồi lỗi |
| FR-GEN-006 | Đầu ra theo phong cách FUN (sự kiện, con số, quote, kết ý nghĩa) | Review mẫu nội dung |
| FR-VIEW-001 | 5 tab + badge cảnh báo | Kiểm thử UI |
| FR-VIEW-002 | Chỉnh sửa giữ nguyên khi chuyển tab | Kiểm thử UI |
| FR-VIEW-003 | Copy đúng nội dung đã sửa | Kiểm thử clipboard |
| FR-VIEW-004 | Khóa Copy khi có cảnh báo mức cao | Kiểm thử UI |
| FR-UI-001 | Responsive ≥ 360px, tông hồng–tím | Kiểm thử UI đa viewport |
| FR-UI-002 | Trạng thái tải khi đang tạo | Kiểm thử UI |

---

## 3. Ma trận NFR → Kiểm chứng

| NFR | Tiêu chí đo | Công cụ/Phương pháp |
|---|---|---|
| NFR-PERF-001 | ≤ 45 giây cho 5 đầu ra | Đồng hồ thực tế, 10 phiên mẫu |
| NFR-PERF-002 | 20 phiên đồng thời, tăng ≤ 50% | Kiểm thử tải |
| NFR-SEC-001 | Không lưu dữ liệu ngoài phiên | Kiểm tra client storage |
| NFR-SEC-002 | Không tên khách hàng thật trong đầu ra | Rà soát mẫu tự động + thủ công |
| NFR-COMP-001 | PDPA/APPI/WCAG 2.1 AA | Audit tuân thủ, kiểm tra accessibility |
| NFR-USAB-001 | 100% người dùng mới hoàn thành ≤ 10 phút | Usability test 5 người |
| NFR-USAB-002 | Tương phản ≥ 4.5:1, điều hướng bàn phím | Lighthouse/axe-core |
| NFR-QUAL-001 | ≥ 90% đầu ra không lỗi ngữ pháp nghiêm trọng | Review mẫu 20 phiên |
| NFR-COST-001 | ≤ 8K token vào + ≤ 4K token ra/phiên | Log token |

---

## 4. Ma trận phủ (Coverage Check)

| Hạng mục | Tổng | Đã có yêu cầu | Chưa có | Ghi chú |
|---|---|---|---|---|
| Câu hỏi đầu vào (2 chủ đề × 10) | 20 | 20 | 0 | docs/12 §2 |
| Đầu ra (O1–O5) | 5 | 5 | 0 | — |
| Checkbox consent | 2 | 2 | 0 | C1, C2 (FR-FORM-005) |
| Persona (PA–PD) | 4 | 4 | 0 | PD phủ qua US-VIEW-003 |
| Quy định tuân thủ | 4 | 4 | 0 | PDPA, APPI, WCAG, quyền hình ảnh/đồng ý |
| Kịch bản lỗi | 2 | 2 | 0 | EX-01, EX-02 |
| Câu hỏi mở (OQ) | 7 | — | 7 | Cần làm rõ trước Phase 2 |

---

## 5. Trạng thái triển khai (điền khi thực hiện)

| FR/US | Trạng thái | Người thực hiện | Ghi chú |
|---|---|---|---|
| FR-FORM-001 (2 chủ đề × 10) | ⬜ Chưa bắt đầu | — | Thay thế form 6 câu cũ |
| FR-FORM-002 | ⬜ Chưa bắt đầu | — | — |
| FR-FORM-003 | ⬜ Chưa bắt đầu | — | — |
| FR-FORM-004 | ⬜ Chưa bắt đầu | — | — |
| FR-FORM-005 (consent) | ⬜ Chưa bắt đầu | — | Mới |
| FR-FORM-006 (evidence) | ⬜ Chưa bắt đầu | — | Mới |
| FR-GEN-001 | ⬜ Chưa bắt đầu | — | — |
| FR-GEN-002 | ⬜ Chưa bắt đầu | — | — |
| FR-GEN-003 (masking + highlight) | ⬜ Chưa bắt đầu | — | Mở rộng |
| FR-GEN-004 | ⬜ Chưa bắt đầu | — | — |
| FR-GEN-005 | ⬜ Chưa bắt đầu | — | — |
| FR-GEN-006 (giọng FUN) | ⬜ Chưa bắt đầu | — | Mới |
| FR-VIEW-001 | ⬜ Chưa bắt đầu | — | — |
| FR-VIEW-002 | ⬜ Chưa bắt đầu | — | — |
| FR-VIEW-003 | ⬜ Chưa bắt đầu | — | — |
| FR-VIEW-004 | ⬜ Chưa bắt đầu | — | — |
| FR-UI-001 | ⬜ Chưa bắt đầu | — | — |
| FR-UI-002 | ⬜ Chưa bắt đầu | — | — |