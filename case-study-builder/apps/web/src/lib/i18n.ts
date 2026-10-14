import {
  AchievementType,
  PersonalQuestionKey,
  TeamQuestionKey,
  QuestionKey,
} from './types';

export type UiLang = 'vi' | 'en' | 'ja';

export interface QuestionDict {
  label: string;
  hint?: string;
  placeholder?: string;
}

export interface Dict {
  langName: string;
  header: {
    title: string;
    subtitle: string;
    chip: string;
  };
  hero: {
    titleLead: string;
    titleEm: string;
    titleTail: string;
    sub: string;
    pipeline: { input: string; engine: string; outputs: string; ship: string };
  };
  form: {
    head: string;
    samplePlaceholder: string;
    step0: string;
    step0Question: string;
    topicPersonal: string;
    topicPersonalDesc: string;
    topicTeam: string;
    topicTeamDesc: string;
    step1Personal: string;
    step1Team: string;
    step2: string;
    consentMediaPre: string;
    consentMediaStrong: string;
    consentMediaPost: string;
    consentTruthPre: string;
    consentTruthStrong: string;
    consentTruthPost: string;
    consentNote: string;
    languagesLegend: string;
    langVi: string;
    langJa: string;
    langEn: string;
    generate: string;
    generating: string;
    confirmReset: string;
    errSelectTopic: string;
    errFillRequired: string;
    errConsent: string;
    counterSuffix: string;
    requiredMark: string;
  };
  results: {
    head: string;
    modeAi: string;
    modeDemo: string;
    masked: string;
    tabNewsletter: string;
    tabTeams: string;
    tabCasestudy: string;
    tabTranslations: string;
    tabWarnings: string;
    copy: string;
    copied: string;
    hlNote: string;
    noTranslations: string;
    reviewed: string;
    warningGateLabel: string;
    warningGateDesc: string;
    emptyTitle: string;
    emptyHint: string;
    caseStudyPrefix: string;
  };
  questions: Record<QuestionKey, QuestionDict>;
}

const QUESTIONS_VI: Record<QuestionKey, QuestionDict> = {
  pa_name: {
    label: 'Họ, tên và account nhân vật được khai thác?',
    hint: 'Account nội bộ (vd: NVA123). Tên riêng sẽ được đánh dấu để rà soát hoặc viết tắt.',
    placeholder: 'VD: Nguyễn Văn An (NVA123)',
  },
  pa_role: {
    label: 'Nhân vật này đảm nhận vai trò gì trong dự án?',
    placeholder: 'VD: Kỹ sư trưởng, PM, BA, tester…',
  },
  pa_contribution: {
    label: 'Đóng góp nổi bật nhất của nhân vật đối với dự án là gì?',
    placeholder: 'VD: Thiết kế kiến trúc hệ thống giúp giảm 40% thời gian xử lý',
  },
  pa_importance: {
    label: 'Tại sao đóng góp này lại quan trọng đối với sự thành công của dự án?',
    placeholder: 'VD: Nếu không có giải pháp này, dự án khó đáp ứng tiến độ bàn giao',
  },
  pa_challenge: {
    label: 'Trong quá trình thực hiện dự án, nhân vật đã giải quyết thách thức hoặc vấn đề nào đáng chú ý?',
    placeholder: 'VD: Xử lý bottleneck hiệu năng khi dữ liệu tăng gấp 3 lần',
  },
  pa_situation: {
    label: 'Có tình huống cụ thể nào thể hiện năng lực hoặc tinh thần trách nhiệm của nhân vật không?',
    placeholder: 'VD: Ở lại xuyên đêm cùng khách để xử lý sự cố go-live',
  },
  pa_results: {
    label: 'Những kết quả nào của dự án có dấu ấn trực tiếp từ sự đóng góp của nhân vật?',
    hint: 'Nếu có con số cụ thể, hãy ghi rõ.',
    placeholder: 'VD: Giảm 30% thời gian xử lý, tăng 20% năng suất team',
  },
  pa_collab: {
    label: 'Nhân vật đã phối hợp, hỗ trợ đồng đội hoặc khách hàng như thế nào?',
    placeholder: 'VD: Chủ động mentor fresher, phối hợp chặt chẽ với khách onsite',
  },
  pa_quality: {
    label: 'Theo bạn, phẩm chất nổi bật nhất của nhân vật là gì?',
    placeholder: 'VD: Tinh thần trách nhiệm cao, luôn đặt chất lượng lên hàng đầu',
  },
  pa_reason: {
    label: 'Nếu chỉ chọn một lý do để vinh danh nhân vật này, đó sẽ là gì?',
    placeholder: 'VD: Người tạo ra bước ngoặt giúp dự án vượt chỉ tiêu',
  },
  pa_thanks: {
    label: 'Bạn muốn gửi lời ghi nhận hoặc cảm ơn gì tới nhân vật?',
    placeholder: 'VD: Cảm ơn An đã luôn đồng hành và truyền cảm hứng cho cả team',
  },
  team_intro: {
    label: 'Vui lòng giới thiệu ngắn gọn về dự án, khách hàng và vai trò của team trong dự án.',
    hint: 'Không ghi tên khách hàng — dùng mô tả chung.',
    placeholder: 'VD: Dự án hệ thống giao diện ô tô cho khách Nhật, team phụ trách toàn bộ vòng đời phát triển',
  },
  team_achievement: {
    label: 'Thành tựu hoặc kết quả nổi bật mà team đạt được là gì?',
    hint: 'Ví dụ: rút ngắn thời gian triển khai, giảm effort, tăng năng suất, khách hàng khen ngợi, mở rộng phase, nhận thêm ngân sách...',
    placeholder: 'VD: Hoàn thành phase 1 trước hạn, khách tin tưởng giao tiếp phase 2',
  },
  team_challenge: {
    label: 'Trước khi đạt được kết quả đó, team đang đối mặt với bài toán hoặc thách thức gì?',
    placeholder: 'VD: Yêu cầu cao về kiến thức toán học, deadline gấp, thiếu nhân sự chuyên sâu',
  },
  team_solution: {
    label: 'Team đã áp dụng giải pháp, sáng kiến hoặc cách làm nào để giải quyết vấn đề?',
    placeholder: 'VD: Đánh giá rủi ro trước, chia nhỏ milestone, phối hợp offshore + onsite',
  },
  team_tools: {
    label: 'Có công cụ, AI, framework, quy trình hoặc phương pháp làm việc nào được sử dụng hiệu quả không?',
    placeholder: 'VD: Ứng dụng AI hỗ trợ review code, áp dụng CI/CD tự động hóa',
  },
  team_difference: {
    label: 'Yếu tố nào tạo nên sự khác biệt giữa cách làm của team và cách làm thông thường?',
    placeholder: 'VD: Chủ động đề xuất giải pháp thay vì chờ yêu cầu, đo lường liên tục',
  },
  team_metrics: {
    label: 'Kết quả đạt được có thể đo lường bằng những con số cụ thể nào?',
    hint: 'Tiết kiệm thời gian, giảm chi phí, tăng năng suất, cải thiện chất lượng...',
    placeholder: 'VD: Giảm 30% thời gian xử lý, tăng 2x năng suất, 0 lỗi nghiêm trọng sau go-live',
  },
  team_feedback: {
    label: 'Khách hàng hoặc các bên liên quan đã phản hồi như thế nào về kết quả của team?',
    placeholder: 'VD: Khách đánh giá cao chất lượng, gửi thư cảm ơn và đề xuất mở rộng phase',
  },
  team_lesson: {
    label: 'Nhìn lại dự án, đâu là bài học hoặc kinh nghiệm giá trị nhất mà team rút ra được?',
    placeholder: 'VD: Đánh giá rủi ro sớm giúp giảm sốc khi thay đổi thiết kế',
  },
  team_advice: {
    label: 'Nếu một team khác đang gặp bài toán tương tự, anh/chị sẽ khuyến nghị họ áp dụng điều gì từ kinh nghiệm của team?',
    placeholder: 'VD: Bắt đầu nhỏ, đo lường rõ, mở rộng dần; luôn giữ kênh giao tiếp với khách',
  },
};

const QUESTIONS_EN: Record<QuestionKey, QuestionDict> = {
  pa_name: {
    label: 'Full name and account of the person being featured?',
    hint: 'Internal account (e.g. NVA123). Proper names will be highlighted for review or abbreviated.',
    placeholder: 'E.g. Nguyen Van An (NVA123)',
  },
  pa_role: {
    label: 'What role did this person play in the project?',
    placeholder: 'E.g. Lead engineer, PM, BA, tester…',
  },
  pa_contribution: {
    label: 'What was the person\'s most outstanding contribution to the project?',
    placeholder: 'E.g. Designed the system architecture that cut processing time by 40%',
  },
  pa_importance: {
    label: 'Why was this contribution important to the project\'s success?',
    placeholder: 'E.g. Without this solution, the project could not meet the delivery deadline',
  },
  pa_challenge: {
    label: 'During the project, what notable challenge or problem did this person solve?',
    placeholder: 'E.g. Fixed a performance bottleneck when data volume tripled',
  },
  pa_situation: {
    label: 'Is there a specific situation that shows this person\'s ability or sense of responsibility?',
    placeholder: 'E.g. Stayed overnight with the client to fix a go-live incident',
  },
  pa_results: {
    label: 'Which project results bear the direct mark of this person\'s contribution?',
    hint: 'If there are concrete numbers, please include them.',
    placeholder: 'E.g. Cut processing time by 30%, increased team productivity by 20%',
  },
  pa_collab: {
    label: 'How did this person coordinate with or support teammates or the client?',
    placeholder: 'E.g. Proactively mentored freshers, worked closely with onsite client staff',
  },
  pa_quality: {
    label: 'In your opinion, what is this person\'s most outstanding quality?',
    placeholder: 'E.g. Strong sense of responsibility, always puts quality first',
  },
  pa_reason: {
    label: 'If you had to pick one reason to honor this person, what would it be?',
    placeholder: 'E.g. The person who created the turning point that helped the project exceed targets',
  },
  pa_thanks: {
    label: 'What recognition or thanks would you like to send to this person?',
    placeholder: 'E.g. Thank you for always being there and inspiring the whole team',
  },
  team_intro: {
    label: 'Please briefly introduce the project, the client, and the team\'s role in it.',
    hint: 'Do not write client names — use a general description.',
    placeholder: 'E.g. A car-UI system project for a Japanese client; the team owns the full development lifecycle',
  },
  team_achievement: {
    label: 'What outstanding achievement or result did the team deliver?',
    hint: 'E.g. shorter delivery time, reduced effort, higher productivity, client praise, expanded phase, additional budget...',
    placeholder: 'E.g. Completed phase 1 ahead of schedule; the client trusted us with phase 2',
  },
  team_challenge: {
    label: 'Before achieving that result, what problem or challenge was the team facing?',
    placeholder: 'E.g. High demands on mathematical knowledge, tight deadlines, lack of specialized staff',
  },
  team_solution: {
    label: 'What solution, initiative, or approach did the team apply to solve the problem?',
    placeholder: 'E.g. Assessed risks upfront, split milestones, coordinated offshore + onsite',
  },
  team_tools: {
    label: 'Were any tools, AI, frameworks, processes, or working methods used effectively?',
    placeholder: 'E.g. Used AI-assisted code review, adopted automated CI/CD',
  },
  team_difference: {
    label: 'What made the team\'s approach different from the usual way of working?',
    placeholder: 'E.g. Proactively proposed solutions instead of waiting for requirements, measured continuously',
  },
  team_metrics: {
    label: 'What concrete numbers can measure the results achieved?',
    hint: 'Time saved, cost reduced, productivity gained, quality improved...',
    placeholder: 'E.g. Cut processing time by 30%, doubled productivity, zero critical defects after go-live',
  },
  team_feedback: {
    label: 'How did the client or stakeholders respond to the team\'s results?',
    placeholder: 'E.g. The client praised the quality, sent a thank-you letter, and proposed expanding the phase',
  },
  team_lesson: {
    label: 'Looking back, what is the most valuable lesson or experience the team gained?',
    placeholder: 'E.g. Early risk assessment reduces the shock of design changes',
  },
  team_advice: {
    label: 'If another team faced a similar problem, what would you recommend they adopt from your experience?',
    placeholder: 'E.g. Start small, measure clearly, scale gradually; always keep the communication channel with the client open',
  },
};

const QUESTIONS_JA: Record<QuestionKey, QuestionDict> = {
  pa_name: {
    label: '紹介する人物の氏名とアカウントは？',
    hint: '社内アカウント（例：NVA123）。固有名詞は確認用にハイライトされるか、頭文字表記になります。',
    placeholder: '例：グエン・ヴァン・アン（NVA123）',
  },
  pa_role: {
    label: 'この人物はプロジェクトでどのような役割を担いましたか？',
    placeholder: '例：リードエンジニア、PM、BA、テスターなど',
  },
  pa_contribution: {
    label: 'この人物のプロジェクトへの最も顕著な貢献は何ですか？',
    placeholder: '例：処理時間を40%削減するシステムアーキテクチャを設計',
  },
  pa_importance: {
    label: 'なぜその貢献がプロジェクトの成功にとって重要だったのですか？',
    placeholder: '例：この解決策がなければ納期に間に合わなかった',
  },
  pa_challenge: {
    label: 'プロジェクト中、この人物が解決した注目すべき課題や問題は何ですか？',
    placeholder: '例：データ量が3倍になった際のパフォーマンスボトルネックを解消',
  },
  pa_situation: {
    label: 'この人物の能力や責任感を示す具体的な場面はありましたか？',
    placeholder: '例：Go-Live障害対応で顧客と徹夜で対応した',
  },
  pa_results: {
    label: 'この人物の貢献が直接反映されたプロジェクト成果は何ですか？',
    hint: '具体的な数字があれば記載してください。',
    placeholder: '例：処理時間を30%削減、チーム生産性を20%向上',
  },
  pa_collab: {
    label: 'この人物はチームメンバーや顧客とどのように連携・支援しましたか？',
    placeholder: '例：新人のメンタリングを率先、オンサイトの顧客と緊密に連携',
  },
  pa_quality: {
    label: 'あなたが思う、この人物の最も優れた資質は何ですか？',
    placeholder: '例：責任感が強く、常に品質を最優先にする',
  },
  pa_reason: {
    label: 'この人物を称える理由を一つだけ挙げるとすれば、それは何ですか？',
    placeholder: '例：プロジェクトが目標を超える転換点を作った人物',
  },
  pa_thanks: {
    label: 'この人物に送りたい感謝や称賛の言葉はありますか？',
    placeholder: '例：いつも寄り添い、チーム全体に刺激を与えてくれてありがとう',
  },
  team_intro: {
    label: 'プロジェクト、顧客、およびチームの役割を簡単に紹介してください。',
    hint: '顧客名は書かないでください — 一般的な説明を使用してください。',
    placeholder: '例：日本の顧客向け車載UIシステム。チームは開発ライフサイクル全体を担当',
  },
  team_achievement: {
    label: 'チームが達成した顕著な成果や結果は何ですか？',
    hint: '例：導入期間の短縮、工数削減、生産性向上、顧客からの評価、フェーズ拡大、予算増額など',
    placeholder: '例：フェーズ1を前倒しで完了し、顧客からフェーズ2を任された',
  },
  team_challenge: {
    label: 'その結果を達成する前、チームはどのような課題に直面していましたか？',
    placeholder: '例：高度な数学的知識が必要、納期が厳しい、専門人材が不足',
  },
  team_solution: {
    label: 'チームは問題解決のためにどのような解決策・取り組み・進め方を適用しましたか？',
    placeholder: '例：事前リスク評価、マイルストーン分割、オフショア＋オンサイト連携',
  },
  team_tools: {
    label: '効果的に活用したツール、AI、フレームワーク、プロセス、働き方はありますか？',
    placeholder: '例：AIによるコードレビュー支援、CI/CD自動化を導入',
  },
  team_difference: {
    label: 'チームの進め方が通常のやり方と異なる点は何でしたか？',
    placeholder: '例：要件を待つだけでなく解決策を主体的に提案、継続的な測定',
  },
  team_metrics: {
    label: '達成した結果を測れる具体的な数字は何ですか？',
    hint: '時間節約、コスト削減、生産性向上、品質改善など',
    placeholder: '例：処理時間を30%削減、生産性2倍、Go-Live後重大障害ゼロ',
  },
  team_feedback: {
    label: '顧客や関係者はチームの成果にどのように反応しましたか？',
    placeholder: '例：顧客が品質を高く評価し、感謝状を送り、フェーズ拡大を提案',
  },
  team_lesson: {
    label: '振り返って、チームが得た最も価値のある教訓や経験は何ですか？',
    placeholder: '例：早期のリスク評価が設計変更の衝撃を減らす',
  },
  team_advice: {
    label: '同じ課題に直面している別のチームに、あなたの経験から何を勧めますか？',
    placeholder: '例：小さく始めて明確に測定し、徐々に拡大。顧客とのコミュニケーション経路を常に確保',
  },
};

export const DICTS: Record<UiLang, Dict> = {
  vi: {
    langName: 'Tiếng Việt',
    header: {
      title: 'Case Study Builder',
      subtitle: 'Biến kết quả dự án thành câu chuyện ai cũng muốn đọc',
      chip: 'privacy-first',
    },
    hero: {
      titleLead: 'Thành tựu của team,',
      titleEm: 'kể lại',
      titleTail: 'đúng cách.',
      sub: `✨ Mỗi dự án đều có một câu chuyện đáng kể

Team bạn vừa vượt qua một thử thách khó, được khách hàng khen, hay tìm ra một cách làm hay? Đừng để những thành tựu đó trôi qua mà không ai biết.

Chỉ cần trả lời các câu hỏi ngắn trong khoảng 5 phút. Case Study Builder sẽ biến câu trả lời của bạn thành bài bản tin nội bộ, post Teams, case study

Trước khi bắt đầu:

✍️ Viết tự nhiên như đang kể cho đồng nghiệp nghe, không cần câu chữ hay.
🔢 Có con số thì càng tốt, ví dụ thời gian tiết kiệm được hay số lỗi giảm đi.
🔒 Không ghi tên khách hàng, tên dự án hay thông tin mật.

Câu chuyện của bạn có thể là cảm hứng cho cả công ty. Bắt đầu thôi! 🚀`,
      pipeline: { input: 'input', engine: 'engine', outputs: '5 outputs', ship: '$ ship it 🚀' },
    },
    form: {
      head: '1 · Kể câu chuyện',
      samplePlaceholder: 'Dự án mẫu…',
      step0: 'Bước 0',
      step0Question: 'Bạn muốn nói về nội dung gì?',
      topicPersonal: 'Thành tựu cá nhân',
      topicPersonalDesc: 'Câu chuyện của một người — giải thưởng, OKR cá nhân, sáng kiến riêng.',
      topicTeam: 'Thành tựu đội nhóm',
      topicTeamDesc: 'Câu chuyện của team/dự án — thắng dự án, go-live, kỷ lục tuyển dụng.',
      step1Personal: '10 câu hỏi — thành tựu cá nhân',
      step1Team: '10 câu hỏi — thành tựu đội nhóm',
      step2: 'Xác nhận bảo mật',
      consentMediaPre: 'Tôi xác nhận ',
      consentMediaStrong: 'hình ảnh/tài liệu đính kèm',
      consentMediaPost: ' được phép sử dụng và đăng tải công khai theo chính sách truyền thông.',
      consentTruthPre: 'Tôi cam kết ',
      consentTruthStrong: 'thông tin là đúng sự thật',
      consentTruthPost: ' và đã có sự đồng ý của khách hàng hoặc người được nhắc tới.',
      consentNote: 'Cần tick cả 2 xác nhận để mở khóa nút "Tạo câu chuyện".',
      languagesLegend: 'Ngôn ngữ đầu ra',
      langVi: 'Tiếng Việt',
      langJa: '日本語',
      langEn: 'English',
      generate: 'Tạo câu chuyện',
      generating: 'Đang tạo câu chuyện…',
      confirmReset: 'Đổi chủ đề sẽ xóa câu trả lời hiện tại. Tiếp tục?',
      errSelectTopic: 'Vui lòng chọn chủ đề (thành tựu cá nhân hoặc đội nhóm).',
      errFillRequired: 'Vui lòng điền đủ các trường bắt buộc (đánh dấu *).',
      errConsent: 'Vui lòng tick cả 2 xác nhận bảo mật trước khi tạo.',
      counterSuffix: '/500',
      requiredMark: '*',
    },
    results: {
      head: '2 · Câu chuyện đã sẵn sàng',
      modeAi: 'AI',
      modeDemo: 'Demo',
      masked: 'thực thể đã ẩn',
      tabNewsletter: 'Bản tin nội bộ',
      tabTeams: 'Post Teams',
      tabCasestudy: 'Case study',
      tabTranslations: 'Bản dịch',
      tabWarnings: 'Cảnh báo',
      copy: 'Copy',
      copied: 'Đã sao chép',
      hlNote: 'Tên riêng được đánh dấu vàng — rà soát hoặc đổi thành chữ cái đầu.',
      noTranslations: 'Không có bản dịch (chỉ chọn VI).',
      reviewed: 'Đã rà soát — không phát hiện rủi ro.',
      warningGateLabel: 'Tôi đã đọc cảnh báo và chịu trách nhiệm rà soát trước khi phát hành.',
      warningGateDesc: 'Có cảnh báo mức cao. Copy bị khóa cho đến khi xác nhận.',
      emptyTitle: 'Chọn chủ đề, trả lời 10 câu hỏi và nhấn "Tạo câu chuyện".',
      emptyHint: '5 đầu ra sẵn sàng — bản tin, post Teams, case study, bản dịch, cảnh báo.',
      caseStudyPrefix: 'Bối cảnh: ',
    },
    questions: QUESTIONS_VI,
  },
  en: {
    langName: 'English',
    header: {
      title: 'Case Study Builder',
      subtitle: 'Turn project outcomes into stories everyone wants to read',
      chip: 'privacy-first',
    },
    hero: {
      titleLead: 'Your team\'s achievements,',
      titleEm: 'told',
      titleTail: 'the right way.',
      sub: `✨ Every project has a story worth telling

Did your team just overcome a tough challenge, earn a client's praise, or find a smarter way of working? Don't let those achievements go unnoticed.

Just answer a few short questions in about 5 minutes. Case Study Builder will turn your answers into an internal newsletter article, a Teams post, and a case study.

Before you start:

✍️ Write naturally, as if telling a colleague — no fancy wording needed.
🔢 Concrete numbers make it even better, e.g. time saved or defects reduced.
🔒 Do not write client names, project names, or confidential information.

Your story could inspire the whole company. Let's get started! 🚀`,
      pipeline: { input: 'input', engine: 'engine', outputs: '5 outputs', ship: '$ ship it 🚀' },
    },
    form: {
      head: '1 · Tell the story',
      samplePlaceholder: 'Sample project…',
      step0: 'Step 0',
      step0Question: 'What would you like to talk about?',
      topicPersonal: 'Personal achievement',
      topicPersonalDesc: 'One person\'s story — awards, personal OKRs, individual initiatives.',
      topicTeam: 'Team achievement',
      topicTeamDesc: 'A team/project story — winning deals, go-live, hiring records.',
      step1Personal: '10 questions — personal achievement',
      step1Team: '10 questions — team achievement',
      step2: 'Security confirmation',
      consentMediaPre: 'I confirm that ',
      consentMediaStrong: 'attached images/documents',
      consentMediaPost: ' may be used and published publicly under the communications policy.',
      consentTruthPre: 'I certify that the ',
      consentTruthStrong: 'information is truthful',
      consentTruthPost: ' and that I have the consent of the client or the people mentioned.',
      consentNote: 'Tick both confirmations to unlock the "Create story" button.',
      languagesLegend: 'Output languages',
      langVi: 'Tiếng Việt',
      langJa: '日本語',
      langEn: 'English',
      generate: 'Create story',
      generating: 'Creating story…',
      confirmReset: 'Switching topic will clear your current answers. Continue?',
      errSelectTopic: 'Please choose a topic (personal or team achievement).',
      errFillRequired: 'Please fill in all required fields (marked *).',
      errConsent: 'Please tick both security confirmations before creating.',
      counterSuffix: '/500',
      requiredMark: '*',
    },
    results: {
      head: '2 · Your story is ready',
      modeAi: 'AI',
      modeDemo: 'Demo',
      masked: 'entities hidden',
      tabNewsletter: 'Newsletter',
      tabTeams: 'Teams post',
      tabCasestudy: 'Case study',
      tabTranslations: 'Translations',
      tabWarnings: 'Warnings',
      copy: 'Copy',
      copied: 'Copied',
      hlNote: 'Proper names are highlighted in yellow — review or abbreviate them.',
      noTranslations: 'No translations (VI only).',
      reviewed: 'Reviewed — no risk detected.',
      warningGateLabel: 'I have read the warnings and take responsibility for reviewing before publishing.',
      warningGateDesc: 'There are high-severity warnings. Copy is locked until confirmed.',
      emptyTitle: 'Pick a topic, answer 10 questions, and press "Create story".',
      emptyHint: '5 outputs ready — newsletter, Teams post, case study, translations, warnings.',
      caseStudyPrefix: 'Context: ',
    },
    questions: QUESTIONS_EN,
  },
  ja: {
    langName: '日本語',
    header: {
      title: 'Case Study Builder',
      subtitle: 'プロジェクトの成果を、誰もが読みたくなる物語に',
      chip: 'privacy-first',
    },
    hero: {
      titleLead: 'チームの成果を、',
      titleEm: '正しく',
      titleTail: '伝える。',
      sub: `✨ すべてのプロジェクトには、語る価値のあるストーリーがある

チームが難しい課題を乗り越えた、顧客に褒められた、良い進め方を見つけた — そんな成果を誰にも知られずに終わらせないでください。

約5分の短い質問に答えるだけ。Case Study Builderがあなたの回答を社内ニュースレター記事、Teams投稿、ケーススタディに変えます。

始める前に：

✍️ 同僚に話すように自然に書いてください。きれいな表現は不要です。
🔢 数字があればなお良い。例：節約できた時間、減ったバグ数。
🔒 顧客名、プロジェクト名、機密情報は書かないでください。

あなたのストーリーが会社全体の刺激になるかもしれません。さあ、始めましょう！ 🚀`,
      pipeline: { input: 'input', engine: 'engine', outputs: '5 outputs', ship: '$ ship it 🚀' },
    },
    form: {
      head: '1 · ストーリーを語る',
      samplePlaceholder: 'サンプル案件…',
      step0: 'ステップ0',
      step0Question: 'どのような内容について話しますか？',
      topicPersonal: '個人の成果',
      topicPersonalDesc: '一人の物語 — 受賞、個人OKR、独自の取り組み。',
      topicTeam: 'チームの成果',
      topicTeamDesc: 'チーム／プロジェクトの物語 — 案件獲得、Go-Live、採用記録。',
      step1Personal: '10の質問 — 個人の成果',
      step1Team: '10の質問 — チームの成果',
      step2: 'セキュリティ確認',
      consentMediaPre: '添付の',
      consentMediaStrong: '画像・資料は',
      consentMediaPost: '広報ポリシーに従い公開利用が許可されていることを確認します。',
      consentTruthPre: '提供する',
      consentTruthStrong: '情報が真実であり',
      consentTruthPost: '顧客または言及された方の同意を得ていることを誓約します。',
      consentNote: '「ストーリーを作成」ボタンのロック解除には両方のチェックが必要です。',
      languagesLegend: '出力言語',
      langVi: 'Tiếng Việt',
      langJa: '日本語',
      langEn: 'English',
      generate: 'ストーリーを作成',
      generating: '作成中…',
      confirmReset: 'テーマを変更すると現在の回答が消えます。続行しますか？',
      errSelectTopic: 'テーマ（個人またはチームの成果）を選択してください。',
      errFillRequired: '必須項目（*印）をすべて入力してください。',
      errConsent: '作成前にセキュリティ確認を両方チェックしてください。',
      counterSuffix: '/500',
      requiredMark: '*',
    },
    results: {
      head: '2 · ストーリーが完成しました',
      modeAi: 'AI',
      modeDemo: 'デモ',
      masked: '件の実体を非表示',
      tabNewsletter: 'ニュースレター',
      tabTeams: 'Teams投稿',
      tabCasestudy: 'ケーススタディ',
      tabTranslations: '翻訳',
      tabWarnings: '警告',
      copy: 'コピー',
      copied: 'コピー済み',
      hlNote: '固有名詞は黄色でハイライト — 確認するか頭文字表記に変更してください。',
      noTranslations: '翻訳はありません（VIのみ）。',
      reviewed: '確認済み — リスクは検出されませんでした。',
      warningGateLabel: '警告を読み、公開前に確認する責任を負います。',
      warningGateDesc: '高レベルの警告があります。確認するまでコピーはロックされます。',
      emptyTitle: 'テーマを選び、10の質問に答えて「ストーリーを作成」を押してください。',
      emptyHint: '5つの出力 — ニュースレター、Teams投稿、ケーススタディ、翻訳、警告。',
      caseStudyPrefix: '背景: ',
    },
    questions: QUESTIONS_JA,
  },
};

export const UI_LANGS: UiLang[] = ['vi', 'en', 'ja'];

export function topicLabel(dict: Dict, type: AchievementType): string {
  return type === 'personal' ? dict.form.topicPersonal : dict.form.topicTeam;
}

export function topicDesc(dict: Dict, type: AchievementType): string {
  return type === 'personal' ? dict.form.topicPersonalDesc : dict.form.topicTeamDesc;
}

export function questionDict(dict: Dict, key: QuestionKey): QuestionDict {
  return dict.questions[key];
}

export function personalKeys(): PersonalQuestionKey[] {
  return [
    'pa_name',
    'pa_role',
    'pa_contribution',
    'pa_importance',
    'pa_challenge',
    'pa_situation',
    'pa_results',
    'pa_collab',
    'pa_quality',
    'pa_reason',
    'pa_thanks',
  ];
}

export function teamKeys(): TeamQuestionKey[] {
  return [
    'team_intro',
    'team_achievement',
    'team_challenge',
    'team_solution',
    'team_tools',
    'team_difference',
    'team_metrics',
    'team_feedback',
    'team_lesson',
    'team_advice',
  ];
}