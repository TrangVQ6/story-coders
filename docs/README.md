# Case Study Builder — Bộ tài liệu phân tích nghiệp vụ & kiến trúc

> **Ý tưởng:** Biến kết quả dự án thành câu chuyện ai cũng muốn đọc — trả lời 6 câu hỏi, nhận 5 đầu ra sẵn sàng phát hành.

## Tổng quan tài liệu

### Nhóm 1 — Phân tích nghiệp vụ

| Tài liệu | Nội dung | Trạng thái |
|---|---|---|
| [01-BRD-CaseStudyBuilder.md](./01-BRD-CaseStudyBuilder.md) | Business Requirements Document — phân tích vấn đề, persona, giá trị, phạm vi, KPI, rủi ro, tuân thủ, roadmap | Draft |
| [02-SRS-CaseStudyBuilder.md](./02-SRS-CaseStudyBuilder.md) | Software Requirements Specification — FR/NFR, MoSCoW, acceptance criteria | Draft |
| [03-user-stories.md](./03-user-stories.md) | User stories theo persona + acceptance criteria | Draft |
| [04-process-flows.md](./04-process-flows.md) | Process flows BPMN (Mermaid) — As-Is/To-Be, sequence, state, workflow 3 agent | Draft |
| [05-data-dictionary.md](./05-data-dictionary.md) | Data dictionary — thực thể, thuộc tính, schema JSON, dữ liệu mẫu, thuật ngữ | Draft |
| [06-traceability-matrix.md](./06-traceability-matrix.md) | Ma trận truy vết BR ↔ FR ↔ User Story ↔ NFR + coverage | Draft |

### Nhóm 2 — Kiến trúc & kỹ thuật

| Tài liệu | Nội dung | Trạng thái |
|---|---|---|
| [07-system-design.md](./07-system-design.md) | System Design — kiến trúc 4 lớp, data flow, threat model, defense-in-depth, observability | Draft |
| [08-ADR-001-spa-no-backend.md](./08-ADR-001-spa-no-backend.md) | ADR-001 — SPA không backend trong MVP | Accepted |
| [08-ADR-002-sanitization-defense-in-depth.md](./08-ADR-002-sanitization-defense-in-depth.md) | ADR-002 — Sanitization 3 lớp (L1 detector, L2 prompt, L3 residual scan) + L4 WarningGate | Accepted |
| [08-ADR-003-structured-llm-output.md](./08-ADR-003-structured-llm-output.md) | ADR-003 — Đầu ra LLM JSON có cấu trúc, strict validation | Accepted |
| [08-ADR-004-session-only-data.md](./08-ADR-004-session-only-data.md) | ADR-004 — Không lưu trữ dữ liệu trong MVP (session-only, PDPA) | Accepted |
| [09-technical-spec-prompts-and-security.md](./09-technical-spec-prompts-and-security.md) | Technical Spec — **toàn bộ prompt** (system/user/3-agent) + **security spec check tên khách hàng/tên dự án** (regex, blocklist, redaction mapping, chống injection) | Draft |
| [10-api-contracts.md](./10-api-contracts.md) | API contracts — generateStory, LLM gateway, error codes, data flow, event log | Draft |
| [11-implementation-blueprint.md](./11-implementation-blueprint.md) | **MVP Monorepo đã test** — toàn bộ mã nguồn TypeScript + Next.js + SQLite (service layer), 21 unit test + 16 E2E test PASSED | ✅ Tested |

## Tóm tắt một trang

**Vấn đề:** Team dự án tạo ra nhiều thành tựu nhưng hiếm khi được kể lại — truyền thông nội bộ tốn 4–8 giờ/bài, tỷ lệ làm lại ~40%, thành tựu và bài học bị thất thoát.

**Giải pháp:** Web app một trang — người dùng trả lời **6 câu hỏi có cấu trúc**, hệ thống **ẩn thông tin nhạy cảm tự động** và tạo **5 đầu ra**: bản tin nội bộ (~300 từ), post Teams, case study chuẩn khung (Bối cảnh → Thách thức → Giải pháp → Kết quả), bản dịch JA/EN, danh sách cảnh báo.

**Nguyên tắc vàng:**
1. An toàn trước tiên — privacy-by-default, mọi đầu ra đều qua masking.
2. Không bịa số liệu — chỉ dùng thông tin người dùng cung cấp.
3. Con người quyết định cuối cùng — mọi đầu ra là bản nháp, cần rà soát.
4. Đa ngôn ngữ sẵn sàng — VI/JA/EN phục vụ đối tác FJP và thương hiệu tuyển dụng.

**Chỉ số thành công chính:** tỷ lệ thành tựu được kể lại ≥ 50%; thời gian tạo bản nháp ≤ 10 phút; 0 lỗi lộ thông tin sau phát hành.

## Cấu trúc thư mục

```
docs/
├── 01-BRD-CaseStudyBuilder.md          # Nghiệp vụ
├── 02-SRS-CaseStudyBuilder.md          # Nghiệp vụ
├── 03-user-stories.md                  # Nghiệp vụ
├── 04-process-flows.md                 # Nghiệp vụ
├── 05-data-dictionary.md               # Nghiệp vụ
├── 06-traceability-matrix.md           # Nghiệp vụ
├── 07-system-design.md                 # Kiến trúc
├── 08-ADR-001-spa-no-backend.md        # Kiến trúc
├── 08-ADR-002-sanitization-defense-in-depth.md
├── 08-ADR-003-structured-llm-output.md
├── 08-ADR-004-session-only-data.md
├── 09-technical-spec-prompts-and-security.md
├── 10-api-contracts.md
├── 11-implementation-blueprint.md   # MVP monorepo đã test (21 unit + 16 E2E)
└── README.md
```

## MVP Monorepo — trạng thái kiểm thử

> **Đã test thật trên Node v20.20.2** (chi tiết: [11-implementation-blueprint.md §5](./11-implementation-blueprint.md#5-ket-qua-kiem-tra-da-chay-that))

- **21/21 unit + workflow tests PASSED** (vitest): EntityDetector (blocklist + regex R1–R7), StoryService (5 đầu ra, masking, no-hallucination), API E2E (generate, 422, GET by id)
- **16/16 Playwright E2E PASSED** trên browser thật: form → 5 tabs → masking "ABC Corporation" → WarningGate khóa Copy khi warning high → copy feedback
- Stack: TypeScript (Express + better-sqlite3) + Next.js 14 SPA, npm workspaces monorepo, service layer pattern

## Điểm bảo mật trọng tâm (check tên khách hàng/tên dự án)

Xem [Technical Spec §3](./09-technical-spec-prompts-and-security.md#3-security-spec--check-tên-khách-hàng--tên-dự-án) — cơ chế **3 lớp defense-in-depth**:

1. **L1 — EntityDetector**: blocklist tên khách/tên dự án + regex (tổ chức EN/VI/JA, email, phone, số liệu mật) trước khi gọi LLM.
2. **L2 — Prompt constraint**: directive redact + danh sách thực thể truyền vào prompt + bọc `<user_data>` chống prompt injection.
3. **L3 — OutputScanner**: quét lại 5 đầu ra, phát hiện rò rỉ → warning `high` + khóa Copy.
4. **L4 — WarningGate**: rào cản UX buộc xác nhận trước khi copy.

## Câu hỏi mở cần chủ sản phẩm trả lời

Xem [BRD §13](./01-BRD-CaseStudyBuilder.md#13-câu-hỏi-mở-cần-làm-rõ-open-questions) — 5 câu hỏi ảnh hưởng đến Phase 2 (quy trình duyệt, lưu trữ, ẩn danh người hùng, ngân sách token, tích hợp Jira).