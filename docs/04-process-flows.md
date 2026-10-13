# Process Flows — Case Study Builder

| Thuộc tính | Giá trị |
|---|---|
| **Phiên bản** | 1.0 |
| **Trạng thái** | Draft |
| **Ký pháp** | BPMN mô tả dạng Mermaid (flowchart / sequenceDiagram / stateDiagram) |
| **Liên kết** | SRS v1.0, User Stories v1.0 |

---

## 1. Quy trình tổng thể: Tạo câu chuyện (End-to-End)

### Actors
- **PA**: Thành viên/lead dự án — người nhập liệu
- **Hệ thống**: Case Study Builder
- **PB**: Truyền thông nội bộ — người biên tập
- **PD**: Lead phê duyệt — người rà soát cảnh báo

### Flow

```mermaid
flowchart TD
    A(["Bắt đầu"]) --> B["PA mở form 6 câu hỏi"]
    B --> C{"Đã có dữ liệu mẫu?"}
    C -- "Có" --> D["PA chọn dự án mẫu<br/>điền sẵn form"]
    C -- "Không" --> E["PA nhập 6 câu trả lời"]
    D --> F["PA chọn ngôn ngữ VI/JA/EN"]
    E --> F
    F --> G{"Form hợp lệ?<br/>(Q1-Q3 bắt buộc)"}
    G -- "Không" --> H["Hiển thị lỗi tại trường thiếu"]
    H --> E
    G -- "Có" --> I["Hệ thống sinh 5 đầu ra<br/>(engine + masking)"]
    I --> J["Hiển thị 5 tab kết quả"]
    J --> K["PA/PB chỉnh sửa nội dung"]
    K --> L{"Có cảnh báo mức cao?"}
    L -- "Có" --> M["PB/PD tick xác nhận<br/>đã đọc cảnh báo"]
    M --> N["Copy nội dung"]
    L -- "Không" --> N
    N --> O["PB/PD rà soát lần cuối<br/>(ngoài hệ thống)"]
    O --> P(["Kết thúc — phát hành"])
```

### Business Rules
- BR-001: Q1–Q3 bắt buộc; thiếu trường → chặn gửi.
- BR-002: Mọi đầu ra là bản nháp; không có bước tự động phát hành.
- BR-003: Copy bị khóa khi có cảnh báo mức cao chưa xác nhận.

### Exceptions
- **EX-01 — Lỗi engine**: Hiển thị thông báo lỗi, giữ nguyên dữ liệu form, cho phép "Thử lại" (FR-GEN-005).
- **EX-02 — Timeout > 45 giây**: Hiển thị cảnh báo chậm, không hủy dữ liệu đã nhập.

---

## 2. Sequence Diagram: Luồng tương tác hệ thống

```mermaid
sequenceDiagram
    autonumber
    actor PA as Người dùng (PA/PB)
    participant UI as Giao diện (5 tab)
    participant GEN as Engine sinh nội dung
    participant MASK as Tầng ẩn thông tin

    PA->>UI: Nhập 6 câu trả lời + chọn ngôn ngữ
    PA->>UI: Nhấn "Tạo câu chuyện"
    UI->>GEN: Gửi payload (questions, languages)
    GEN->>GEN: Chạy prompt hệ thống<br/>(ràng buộc không bịa số liệu)
    GEN-->>MASK: JSON thô (newsletter, post, case_study,<br/>ja_version, en_version, warnings[])
    MASK->>MASK: Rà soát & thay tên riêng bằng mô tả chung
    MASK-->>UI: 5 đầu ra đã ẩn thông tin
    UI-->>PA: Hiển thị 5 tab + badge cảnh báo
    PA->>UI: Chỉnh sửa nội dung
    PA->>UI: Tick xác nhận cảnh báo (nếu có)
    PA->>UI: Nhấn Copy
    UI-->>PA: "Đã sao chép" (2 giây)
```

### Business Rules
- BR-004: Prompt hệ thống trả về JSON đúng schema (FR-GEN-004).
- BR-005: Tầng masking chạy trước khi hiển thị, không chạy sau khi người dùng copy.

---

## 3. State Diagram: Vòng đời phiên tạo nội dung

```mermaid
stateDiagram-v2
    [*] --> Drafting : Mở form
    Drafting --> Validating : Nhấn "Tạo câu chuyện"
    Validating --> Drafting : Lỗi form (thiếu trường bắt buộc)
    Validating --> Generating : Form hợp lệ
    Generating --> Error : Engine lỗi/timeout
    Error --> Generating : "Thử lại"
    Generating --> Ready : 5 đầu ra đã masking
    Ready --> Editing : Người dùng chỉnh sửa
    Editing --> Editing : Sửa tiếp
    Editing --> Confirming : Có cảnh báo mức cao
    Confirming --> Editing : Chưa tick xác nhận
    Confirming --> Copied : Đã tick + Copy
    Editing --> Copied : Không có cảnh báo + Copy
    Copied --> [*] : Hoàn tất phiên
```

### Business Rules
- BR-006: Trạng thái `Ready` chỉ đạt được sau khi hoàn tất masking.
- BR-007: Trạng thái `Copied` yêu cầu xác nhận cảnh báo nếu có rủi ro mức cao.

---

## 4. Quy trình hiện tại vs. Quy trình đề xuất (To-Be)

### 4.1. As-Is (hiện trạng) — sản xuất nội dung thủ công

```mermaid
flowchart LR
    A["Team làm dự án"] --> B["Truyền thông phỏng vấn<br/>(nhiều vòng)"]
    B --> C["Chuyển ngôn ngữ kỹ thuật<br/>sang ngôn ngữ dễ hiểu"]
    C --> D["Chờ lead duyệt"]
    D --> E["Biên tập & phát hành"]
    E --> F["Nội dung ra kênh"]
```

**Điểm đau**: Phỏng vấn nhiều vòng, chu kỳ 4–8 giờ/bài, tỷ lệ làm lại ~40%, rủi ro lộ thông tin.

### 4.2. To-Be (đề xuất) — sản xuất có hỗ trợ AI

```mermaid
flowchart LR
    A["Team làm dự án"] --> B["Trả lời 6 câu hỏi<br/>(≤ 10 phút)"]
    B --> C["Case Study Builder<br/>sinh 5 đầu ra + masking"]
    C --> D["Truyền thông biên tập<br/>trên bản nháp chuẩn"]
    D --> E["Lead rà soát cảnh báo"]
    E --> F["Copy & phát hành"]
    F --> G["Nội dung ra kênh<br/>(VI/JA/EN)"]
```

**Cải thiện**: Chu kỳ ≤ 10 phút cho bản nháp đầu, thông tin kỹ thuật chính xác, ẩn thông tin tự động, đa ngôn ngữ sẵn sàng.

---

## 5. Quy trình nâng cao (Phase 2): Workflow 3 agent

> Áp dụng khi triển khai tab Workflow trên VibeFlow — ghép 3 agent chuyên biệt.

```mermaid
flowchart TD
    subgraph Agent1["Agent 1 — Ẩn thông tin"]
        A1["Nhận 6 câu trả lời"]
        A1 --> A2["Phát hiện tên riêng, số liệu mật"]
        A2 --> A3["Thay bằng mô tả chung"]
        A3 --> A4["Xuất dữ liệu đã ẩn + danh sách phát hiện"]
    end

    subgraph Agent2["Agent 2 — Viết theo kênh"]
        B1["Nhận dữ liệu đã ẩn"]
        B1 --> B2["Viết bản tin nội bộ (~300 từ)"]
        B1 --> B3["Viết post Teams + hashtag"]
        B1 --> B4["Viết case study 4 mục"]
    end

    subgraph Agent3["Agent 3 — Dịch & kiểm tra"]
        C1["Nhận 3 đầu ra tiếng Việt"]
        C1 --> C2["Dịch JA + EN"]
        C2 --> C3["Kiểm tra thuật ngữ kỹ thuật"]
        C3 --> C4["Tổng hợp cảnh báo cuối cùng"]
    end

    A4 --> B1
    B2 --> C1
    B3 --> C1
    B4 --> C1
    C4 --> D["5 đầu ra hoàn chỉnh"]
```

### Business Rules
- BR-008: Agent 1 phải hoàn thành trước Agent 2 (dữ liệu đã ẩn mới được đưa vào viết).
- BR-009: Agent 3 kiểm tra thuật ngữ kỹ thuật trong bản dịch; phát hiện sai lệch → thêm vào cảnh báo.

---

## 6. Ma trận quy trình ↔ yêu cầu

| Quy trình | Yêu cầu liên quan |
|---|---|
| Quy trình tổng thể (§1) | FR-FORM-001..004, FR-GEN-001..005, FR-VIEW-001..004 |
| Sequence tương tác (§2) | FR-GEN-004, FR-GEN-003, FR-VIEW-003 |
| State diagram (§3) | FR-GEN-005, FR-VIEW-004 |
| To-Be (§4.2) | BR-001, NFR-USAB-001 |
| Workflow 3 agent (§5) | BR-007, NFR-PERF-002 |