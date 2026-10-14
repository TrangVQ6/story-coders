import { Answers, AchievementType } from './types';

export interface SampleProject {
  id: string;
  label: string;
  type: AchievementType;
  answers: Answers;
}

export const SAMPLES: SampleProject[] = [
  {
    id: 'sample-personal-award',
    label: 'Mẫu 1 — Giải thưởng pháp luật Nhật (cá nhân)',
    type: 'personal',
    answers: {
      pa_name: 'Nguyễn Văn An (NVA123)',
      pa_role: 'Kỹ sư phát triển — FJP.RPP',
      pa_contribution:
        'Đạt giải Nhất cuộc thi tìm hiểu pháp luật Nhật Bản 2026 với hơn 27.900 người tham gia',
      pa_importance:
        'Thành tích giúp lan tỏa hình ảnh người FPT chủ động học hỏi, mở ra cơ hội giao lưu với đối tác Nhật',
      pa_challenge:
        'Cuộc thi có tỷ lệ cạnh tranh cao, kiến thức pháp luật Nhật rất rộng và khô khan',
      pa_situation:
        'Trước kỳ thi, An chủ động lập nhóm ôn luyện buổi tối cho 5 đồng nghiệp trong đơn vị',
      pa_results: 'Đạt giải Nhất toàn quốc, lọt top 1% thí sinh tham dự',
      pa_collab:
        'Phối hợp cùng mentor người Nhật rà soát đề cương, chia sẻ tài liệu ôn thi cho cả team',
      pa_quality: 'Tinh thần tự học và trách nhiệm với tập thể rất cao',
      pa_reason:
        'Người truyền cảm hứng học tập, biến kiến thức khô khan thành phong trào của đơn vị',
      pa_thanks:
        'Cảm ơn An đã lan tỏa tinh thần học hỏi và đưa tên đơn vị lên bản đồ cuộc thi quốc gia',
    },
  },
  {
    id: 'sample-personal-tech',
    label: 'Mẫu 2 — Sáng kiến kỹ thuật giảm 40% thời gian xử lý (cá nhân)',
    type: 'personal',
    answers: {
      pa_name: 'Trần Thị Bình (TTB456)',
      pa_role: 'Technical Lead — FJP.GW.OSA',
      pa_contribution:
        'Thiết kế lại luồng xử lý batch bằng kiến trúc event-driven, giảm 40% thời gian xử lý dữ liệu',
      pa_importance:
        'Hệ thống cũ xử lý tuần tự mất nhiều giờ, gây chậm trễ báo cáo cho khách hàng mỗi sáng',
      pa_challenge:
        'Dữ liệu tăng gấp 3 lần sau khi khách mở rộng phạm vi, server cũ không đáp ứng kịp',
      pa_situation:
        'Đêm go-live, Bình ở lại cùng team khách đến 2h sáng để xử lý sự cố backlog tồn đọng',
      pa_results:
        'Giảm 40% thời gian xử lý, 0 lỗi nghiêm trọng sau 3 tháng vận hành',
      pa_collab:
        'Phối hợp chặt chẽ với team offshore và khách onsite để chuyển đổi dần từng module',
      pa_quality: 'Quyết đoán về kỹ thuật nhưng luôn lắng nghe ý kiến đồng nghiệp',
      pa_reason:
        'Người tạo ra bước ngoặt giúp hệ thống vượt chỉ tiêu hiệu năng của khách',
      pa_thanks:
        'Cảm ơn Bình đã dám thay đổi kiến trúc cũ và dẫn dắt team qua giai đoạn chuyển đổi khó khăn nhất',
    },
  },
  {
    id: 'sample-team-topology',
    label: 'Mẫu 3 — Dự án triệu USD (đội nhóm)',
    type: 'team',
    answers: {
      team_intro:
        'Dự án hệ thống giao diện ô tô cho khách Nhật Bản, team phụ trách toàn bộ vòng đời phát triển từ thiết kế đến bàn giao',
      team_achievement:
        'Hoàn thành phase 1 trước hạn, khách tin tưởng giao tiếp phase 2 trị giá khoảng 500.000 USD',
      team_challenge:
        'Yêu cầu cao về kiến thức toán học và hiểu biết xây dựng, deadline gấp, thiếu nhân sự chuyên sâu',
      team_solution:
        'Đánh giá rủi ro trước, chia nhỏ milestone, phối hợp chặt chẽ offshore + onsite',
      team_tools: 'Ứng dụng AI hỗ trợ review code, áp dụng CI/CD tự động hóa',
      team_difference:
        'Chủ động đề xuất giải pháp thay vì chờ yêu cầu, đo lường tiến độ liên tục với khách',
      team_metrics: 'Giao hàng đúng hạn, khách đánh giá cao, mở rộng phase 2',
      team_feedback:
        'Khách đánh giá cao chất lượng, gửi thư cảm ơn và đề xuất mở rộng phase 3,  ​4',
      team_lesson: 'Đánh giá rủi ro sớm giúp giảm sốc khi thay đổi thiết kế',
      team_advice:
        'Bắt đầu nhỏ, đo lường rõ, mở rộng dần; luôn giữ kênh giao tiếp với khách',
    },
  },
  {
    id: 'sample-team-ai-flow',
    label: 'Mẫu 4 — Đưa AI vào quy trình (đội nhóm)',
    type: 'team',
    answers: {
      team_intro:
        'Dự án nội bộ tự động hóa quy trình xử lý yêu cầu bằng AI, team phát triển phối hợp với phòng ban pilot',
      team_achievement:
        'Giảm 30% thời gian xử lý yêu cầu, tạo nền tảng nhân rộng AI toàn tổ chức',
      team_challenge:
        'Nhân viên lo ngại độ chính xác của AI và thay đổi quy trình làm việc quen thuộc',
      team_solution:
        'Pilot trên 1 phòng ban, đo lường song song với quy trình cũ trước khi mở rộng',
      team_tools: 'AI hỗ trợ phân loại và gợi ý xử lý yêu cầu, dashboard đo lường hiệu quả',
      team_difference:
        'Đo lường song song với quy trình cũ, có số liệu chứng minh trước khi thuyết phục mở rộng',
      team_metrics: 'Giảm 30% thời gian xử lý yêu cầu',
      team_feedback: 'Phòng ban pilot hài lòng, đề xuất nhân rộng sang các phòng khác',
      team_lesson: 'Bắt đầu nhỏ, đo lường rõ, mở rộng dần',
      team_advice:
        'Luôn có số liệu so sánh trước/sau khi áp dụng để thuyết phục các bên liên quan',
    },
  },
  {
    id: 'sample-team-client-redact',
    label: 'Mẫu 5 — Dự án có tên khách hàng (kiểm tra ẩn thông tin)',
    type: 'team',
    answers: {
      team_intro:
        'Dự án nâng cấp hệ thống CRM cho khách hàng ABC Corporation tại thị trường Nhật Bản',
      team_achievement:
        'Chuyển đổi nền tảng cũ sang cloud, giảm 50% chi phí vận hành và hoàn thành trước 2 tuần',
      team_challenge:
        'Dữ liệu khách hàng cũ không đồng bộ, quy trình nghiệp vụ phức tạp theo từng chi nhánh',
      team_solution:
        'Xây dựng công cụ tự động rà soát và làm sạch dữ liệu, chạy song song 2 hệ thống trong 1 tháng',
      team_tools: 'Công cụ migration tự động, CI/CD, monitoring dashboard theo thời gian thực',
      team_difference:
        'Chủ động đề xuất lộ trình chuyển đổi theo giai đoạn thay vì big-bang, giảm rủi ro gián đoạn',
      team_metrics: 'Giảm 50% chi phí vận hành, thời gian downtime gần như bằng 0 trong quá trình chuyển đổi',
      team_feedback:
        'Ban lãnh đạo ABC Corporation đánh giá cao tính an toàn của quá trình chuyển đổi và đề nghị gia hạn hợp đồng',
      team_lesson:
        'Chia nhỏ quá trình chuyển đổi và đo lường liên tục giúp kiểm soát rủi ro tốt hơn nhiều',
      team_advice:
        'Với dự án migration, luôn chạy song song hệ thống cũ và mới ít nhất 1 chu kỳ nghiệp vụ trước khi cắt',
    },
  },
];