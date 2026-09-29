export interface ProductBlueprint {
  id: string;
  title: string;
  englishTitle: string;
  tagline: string;
  pillarId: string;
  pillarName: string;
  targetAudience: string;
  coreProblem: string;
  coreSolution: string;
  whyEveryoneNeedsIt: string;
  frictionKiller: string;
  businessModel: string;
  pricingExample: string;
  competitiveMoat: string;
  fourteenDayRoadmap: {
    days1_3: string;
    days4_8: string;
    days9_14: string;
  };
  keyMetrics: {
    targetMargin: string;
    repeatCadence: string;
    zeroFrictionScore: number; // out of 100
  };
  tags: string[];
}

export const CURATED_BLUEPRINTS: ProductBlueprint[] = [
  {
    id: 'bp_clarity_guard',
    title: 'ClarityGuard — Vệ Sĩ Rò Rỉ Vi Mô Hộ Gia Đình',
    englishTitle: 'Family Financial Micro-Leakage Shield',
    tagline: 'Tự động bắt quả tang các khoản phí định kỳ âm thầm, cước phát sinh vô lý và hủy dịch vụ trong 1 chạm.',
    pillarId: 'financial_peace',
    pillarName: 'An Toàn Tài Chính',
    targetAudience: 'Mọi gia đình và cá nhân có tài khoản ngân hàng hoặc ví điện tử',
    coreProblem: 'Mọi người liên tục bị trừ tiền từ các ứng dụng tải thử, dịch vụ xem phim không còn coi, phụ phí thẻ và cước viễn thông ẩn mà không nhớ hay có thời gian lục lọi sao kê.',
    coreSolution: 'Một công cụ an toàn phân tích bản sao kê PDF/ảnh chụp màn hình hoàn toàn cục bộ trên máy (Private On-Device OCR), liệt kê chính xác các dòng tiền "chảy máu ngầm", tính toán số tiền tiết kiệm được trong năm và cung cấp email/mẫu hủy dịch vụ gửi đi ngay lập tức.',
    whyEveryoneNeedsIt: 'Tiết kiệm trung bình từ 2.400.000đ đến 8.000.000đ mỗi năm cho mỗi hộ gia đình mà không bắt họ phải bớt ăn hay thắt lưng buộc bụng.',
    frictionKiller: 'Không yêu cầu người dùng phải kết nối mật khẩu ngân hàng. Chỉ cần kéo thả file sao kê hàng tháng hoặc chụp màn hình tin nhắn biến động số dư.',
    businessModel: 'Freemium có tâm: Miễn phí quét và phát hiện; thu 10% trên số tiền tiết kiệm được lần đầu (Success-fee) hoặc phí cố định 19.000đ/tháng cho gia đình không giới hạn.',
    pricingExample: '19.000đ/tháng hoặc chia sẻ 10% số tiền tìm thấy',
    competitiveMoat: 'Thuật toán đối soát danh mục nhà cung cấp dịch vụ địa phương (Gym, Telco, bảo hiểm, app con) và tính bảo mật 100% dữ liệu không rời khỏi điện thoại.',
    fourteenDayRoadmap: {
      days1_3: 'Tạo bot Telegram/Web đơn giản cho phép gửi ảnh chụp màn hình tin nhắn trừ tiền, bot trả về danh sách gói thuê bao phát hiện được.',
      days4_8: 'Mời 20 gia đình bè bạn thử nghiệm thực tế; mục tiêu giúp ít nhất 15 gia đình thu hồi tối thiểu 300.000đ/tháng.',
      days9_14: 'Hoàn thiện giao diện web một trang với tính năng tạo thư hủy gói dịch vụ theo chuẩn pháp lý viễn thông/ngân hàng.'
    },
    keyMetrics: {
      targetMargin: '85%',
      repeatCadence: 'Hàng tháng',
      zeroFrictionScore: 94
    },
    tags: ['Tài chính gia đình', 'Bảo vệ ví tiền', 'Hủy thuê bao', 'Tự động hóa']
  },
  {
    id: 'bp_family_pulse',
    title: 'FamilyPulse — Vòng Tay Quan Tâm Người Cao Tuổi Vô Hình',
    englishTitle: 'Zero-Friction Elder Wellness Check',
    tagline: 'Theo dõi sự bình an của cha mẹ già mỗi ngày mà không làm phiền, không cần đeo thiết bị gây khó chịu.',
    pillarId: 'connection_loneliness',
    pillarName: 'Kết Nối & Chăm Sóc',
    targetAudience: 'Con cái trưởng thành đi làm xa nhà và cha mẹ già sống riêng',
    coreProblem: 'Con cái luôn thấp thỏm lo cha mẹ té ngã hay đổ bệnh một mình, nhưng gọi điện 3-4 lần mỗi ngày lại gây cảm giác gò bó, kiểm soát, còn các vòng đeo tay thông minh thì người già hay quên sạc hoặc từ chối đeo.',
    coreSolution: 'Ứng dụng ghi nhận nhịp sinh hoạt thụ động: Cảm biến điện thoại ghi nhận bước chân đầu tiên trong ngày hoặc một thao tác chạm vào widget "Cha mẹ chúc con ngày mới" để cập nhật nhịp sống bình an về cho nhóm gia đình.',
    whyEveryoneNeedsIt: 'Sinh lão bệnh tử là quy luật tự nhiên. Bất kỳ ai có cha mẹ bước qua tuổi 60 đều có nỗi lo thường trực này trong lòng.',
    frictionKiller: 'Người già không cần học cách dùng app mới. Khi nhấc điện thoại lên tắt báo thức hoặc mở điện thoại đọc tin tức buổi sáng, trạng thái an toàn tự động được gửi đi.',
    businessModel: 'Gói chăm sóc gia đình 39.000đ/tháng cho 1 gia đình tối đa 6 người, tích hợp dịch vụ gọi xe y tế cấp cứu khi mất tín hiệu quá thời gian quy định.',
    pricingExample: '39.000đ/tháng cho cả nhà',
    competitiveMoat: 'Hiệu ứng liên kết gia đình (Family Graph Retention cực cao). Một khi gia đình đã dùng để chăm sóc cha mẹ, tỉ lệ hủy dịch vụ dưới 1.5%/năm.',
    fourteenDayRoadmap: {
      days1_3: 'Xây dựng giao diện Web App PWA với 1 nút bấm lớn duy nhất "Hôm nay tôi khỏe" kết nối gửi thông báo qua Zalo/Telegram.',
      days4_8: 'Cài đặt thử cho 10 gia đình có cha mẹ trên 65 tuổi sống độc lập, khảo sát mức độ yên tâm của con cái sau 5 ngày.',
      days9_14: 'Bổ sung cơ chế đếm ngược tự động: nếu 9:30 sáng chưa thấy tương tác sẽ gửi tin nhắn nhắc nhở dịu dàng.'
    },
    keyMetrics: {
      targetMargin: '90%',
      repeatCadence: 'Mỗi buổi sáng',
      zeroFrictionScore: 98
    },
    tags: ['Chăm sóc cha mẹ', 'Người cao tuổi', 'Bình an tinh thần', 'Gia đình']
  },
  {
    id: 'bp_fridge_zen',
    title: 'FridgeZen — Bộ Não Tủ Lạnh & Ẩm Thực Cân Bằng',
    englishTitle: 'Zero-Waste Smart Kitchen & Meal Equilibrium',
    tagline: 'Chấm dứt câu hỏi "Hôm nay ăn gì?" và ngăn chặn tình trạng vứt bỏ thức ăn hỏng trong tủ lạnh.',
    pillarId: 'health_vitality',
    pillarName: 'Sức Khỏe & Sinh Lực',
    targetAudience: 'Người độc thân, các bà mẹ nội trợ và hộ gia đình nấu ăn tại nhà',
    coreProblem: 'Mọi gia đình đều lặp lại bi kịch: Mua quá nhiều đồ ăn vào cuối tuần, quên ở góc tủ lạnh đến khi thiu hỏng phải vứt đi, mỗi buổi chiều đều căng thẳng vì không biết nấu món gì nhanh gọn đủ chất.',
    coreSolution: 'Chỉ cần chụp 1 tấm ảnh ngăn mát hoặc nhập bằng giọng nói 10 giây. Hệ thống tự động nhận diện nguyên liệu, sắp xếp theo thứ tự cần ăn trước và đề xuất đúng 2 công thức nấu 15-20 phút tận dụng trọn vẹn nguyên liệu có sẵn.',
    whyEveryoneNeedsIt: 'Tiết kiệm từ 20-30% chi phí đi chợ hàng tháng và cứu vãn 45 phút đau đầu mỗi ngày cho người phụ trách nấu nướng.',
    frictionKiller: 'Không yêu cầu nhập ngày hết hạn từng củ hành hay cân đo đong đếm gram. Nhận diện hình ảnh trực quan và giọng nói tự nhiên.',
    businessModel: 'Bản cơ bản miễn phí; bản Premium (29.000đ/tháng) tự động đồng bộ thực đơn theo mục tiêu sức khỏe (giảm cân, ít đường, cho người tiểu đường) và tạo danh sách đi chợ thông minh.',
    pricingExample: '29.000đ/tháng hoặc gói năm 199.000đ',
    competitiveMoat: 'Cơ sở dữ liệu các món ăn gia đình bản địa và mẹo bảo quản đồ tươi sống không dùng chất hóa học.',
    fourteenDayRoadmap: {
      days1_3: 'Tạo công cụ web cho phép người dùng tick chọn 5-10 nguyên liệu có sẵn trong bếp, trả về ngay 2 món ăn truyền thống dễ làm nhất.',
      days4_8: 'Thêm module tính toán số tiền tiết kiệm được dựa trên giá thị trường thực phẩm trung bình.',
      days9_14: 'Tích hợp camera nhận diện rau củ cơ bản và chia sẻ thử nghiệm lên các hội nhóm nấu ăn gia đình.'
    },
    keyMetrics: {
      targetMargin: '80%',
      repeatCadence: '2-3 lần/ngày',
      zeroFrictionScore: 91
    },
    tags: ['Ẩm thực', 'Chống lãng phí', 'Tiết kiệm chi tiêu', 'Dinh dưỡng']
  },
  {
    id: 'bp_evening_capsule',
    title: 'EveningCapsule — Kho Báu Thư Thả 18:00',
    englishTitle: 'The 6PM Cognitive Unwind & Daily Debrief',
    tagline: 'Chuyển hóa 8 tiếng hỗn loạn công việc thành 3 gạch đầu dòng then chốt, trả lại tâm trí thanh thản cho buổi tối gia đình.',
    pillarId: 'time_energy',
    pillarName: 'Thời Gian & Nhận Thức',
    targetAudience: 'Nhân viên văn phòng, người làm nghề tự do, quản lý dự án',
    coreProblem: 'Khi tan làm, đầu óc con người vẫn bị kẹt trong lo âu: "Mình có quên việc gì không?", "Mai phải làm gì?", khiến họ cáu gắt với con cái, mất ngủ và không thể tận hưởng cuộc sống riêng.',
    coreSolution: 'Một nghi thức kết thúc ngày làm việc 2 phút: Tóm tắt nhanh những việc đã hoàn thành, tự động khóa các thông báo không khẩn cấp và chuyển việc còn dang dở thành danh sách 3 việc quan trọng nhất cho sáng mai.',
    whyEveryoneNeedsIt: 'Ranh giới giữa công việc và đời sống bị xóa nhòa. Ai cũng cần một chiếc công tắc rõ ràng để ngắt kết nối tâm lý và tái tạo năng lượng.',
    frictionKiller: 'Không phải là một phần mềm quản lý việc (Jira/Trello) phức tạp. Chỉ có 3 câu hỏi nhanh trả lời bằng giọng nói hoặc gõ tắt trong 60 giây.',
    businessModel: 'Thu phí người dùng cá nhân 49.000đ/tháng hoặc bán gói Phúc Lợi Tinh Thần cho doanh nghiệp (B2B HR Wellness).',
    pricingExample: '49.000đ/tháng',
    competitiveMoat: 'Phương pháp luận tâm lý học đảo ngược (Zeigarnik Effect Relief) đã được chứng minh giúp cải thiện chất lượng giấc ngủ tức thì.',
    fourteenDayRoadmap: {
      days1_3: 'Thiết kế biểu mẫu 3 câu hỏi kết thúc ngày trên giao diện siêu tối giản, thử nghiệm tự ghi chép cho chính bản thân và bạn bè.',
      days4_8: 'Đo lường mức độ giảm căng thẳng và khả năng ngủ sâu của nhóm thử nghiệm sau 7 ngày áp dụng liên tục.',
      days9_14: 'Xây dựng thông báo kích hoạt tự động đúng 17:45 mỗi ngày làm việc kèm nhạc chuông êm dịu báo hiệu kết thúc ca làm.'
    },
    keyMetrics: {
      targetMargin: '92%',
      repeatCadence: 'Mỗi ngày làm việc',
      zeroFrictionScore: 96
    },
    tags: ['Tâm lý học', 'Cân bằng cuộc sống', 'Giấc ngủ', 'Năng suất bền vững']
  },
  {
    id: 'bp_life_manual',
    title: 'LifeManual — Sổ Tay Xử Lý Sự Cố Đời Thực',
    englishTitle: 'The Real-World Crisis & Paperwork Navigator',
    tagline: 'Chỉ dẫn từng bước khi bạn gặp sự cố đời thường: đụng xe, thủ tục bảo hiểm, kiện đòi tiền lương, rò rỉ ống nước lúc nửa đêm.',
    pillarId: 'future_resilience',
    pillarName: 'Kỹ Năng Sinh Tồn',
    targetAudience: 'Tất cả mọi người từ 18 đến 60 tuổi khi đối mặt với biến cố bất ngờ',
    coreProblem: 'Khi gặp sự cố bất ngờ (tai nạn giao thông, hỏng đường ống, tranh chấp hợp đồng nhà, thủ tục viện phí), con người thường hoảng loạn, không biết luật và dễ bị bắt chẹt hoặc mất tiền oan.',
    coreSolution: 'Một bách khoa toàn thư khẩn cấp tương tác: Chọn sự cố đang xảy ra -> Nhận ngay quy trình 3 bước cần làm trong 5 phút đầu tiên (Chụp lại bằng chứng gì? Không được ký vào đâu? Gọi số điện thoại nào?).',
    whyEveryoneNeedsIt: 'Sự cố luôn đến khi ta không ngờ tới nhất. Có một "người anh/chị thông thái" trong túi áo bảo vệ bạn là nhu cầu an ninh cơ bản.',
    frictionKiller: 'Giao diện khẩn cấp cực lớn, chế độ offline 100% không cần mạng, chỉ dẫn bằng hình vẽ rõ ràng không dùng từ ngữ pháp lý khó hiểu.',
    businessModel: 'Ứng dụng tải về miễn phí nội dung cấp cứu; kết nối dịch vụ đối tác xác thực (thợ sửa khẩn cấp, luật sư tư vấn theo giờ) nhận hoa hồng giới thiệu.',
    pricingExample: 'Miễn phí kiến thức; hoa hồng dịch vụ 10-15%',
    competitiveMoat: 'Mạng lưới cộng tác viên chuyên gia địa phương đã qua kiểm định danh tính và thư viện kịch bản đối phó khủng hoảng chi tiết.',
    fourteenDayRoadmap: {
      days1_3: 'Soạn thảo 10 kịch bản sự cố phổ biến nhất: Va chạm xe máy, ngập nước trong nhà, mất giấy tờ tùy thân, chủ nhà đòi nhà đột ngột.',
      days4_8: 'Đưa lên website dạng cẩm nang tương tác nhanh, kiểm tra tốc độ tìm thấy giải pháp của người dùng dưới 15 giây.',
      days9_14: 'Thêm nút gọi nhanh đường dây nóng khẩn cấp và công cụ tạo biên bản sự cố tự động.'
    },
    keyMetrics: {
      targetMargin: '75%',
      repeatCadence: 'Khi xảy ra sự cố',
      zeroFrictionScore: 92
    },
    tags: ['Cứu hộ khẩn cấp', 'Kỹ năng sinh tồn', 'Pháp lý đời thường', 'An tâm']
  },
  {
    id: 'bp_family_legacy',
    title: 'MemoryLoom — Hộp Ký Ức & Di Sản Giọng Nói Gia Đình',
    englishTitle: 'Generational Voice Archive & Family Lore',
    tagline: 'Lưu giữ những câu chuyện và giọng nói vô giá của ông bà, cha mẹ trước khi quá muộn.',
    pillarId: 'connection_loneliness',
    pillarName: 'Gắn Kết & Ký Ức',
    targetAudience: 'Con cháu muốn lưu giữ kỷ niệm về thế hệ trước',
    coreProblem: 'Mỗi khi một người lớn tuổi trong gia đình qua đời, cả một thư viện ký ức và bài học cuộc đời biến mất vĩnh viễn. Con cháu thường ân hận vì đã không hỏi và ghi âm lại câu chuyện của ông bà lúc còn minh mẫn.',
    coreSolution: 'Mỗi tuần một câu hỏi gợi mở qua điện thoại gửi tới ông bà (ví dụ: "Ngày xưa ông bà gặp nhau thế nào?", "Kỷ niệm tuổi thơ nào ông nhớ nhất?"). Ông bà chỉ cần bấm nghe và trả lời bằng giọng nói tự nhiên, hệ thống tự lưu trữ và biên tập thành cuốn sách nói gia đình.',
    whyEveryoneNeedsIt: 'Ai rồi cũng sẽ già đi, và tình cảm cội nguồn là sợi dây duy nhất vượt qua thời gian kết nối các thế hệ.',
    frictionKiller: 'Người già chỉ cần nói chuyện như gọi điện thoại bình thường, không cần gõ chữ hay cài ứng dụng phức tạp.',
    businessModel: 'Miễn phí 10 câu chuyện đầu; gói in sách gia đình bằng giấy cao cấp kèm mã QR giọng nói (499.000đ - 1.200.000đ/cuốn làm quà tặng ý nghĩa).',
    pricingExample: 'In sách kỷ niệm vật lý 499.000đ',
    competitiveMoat: 'Giá trị tình cảm thiêng liêng cao nhất (Zero Churn - không ai xóa đi ký ức về người thân đã khuất).',
    fourteenDayRoadmap: {
      days1_3: 'Tuyển chọn bộ câu hỏi 52 tuần phỏng vấn hồi ký gia đình giàu cảm xúc nhất.',
      days4_8: 'Thực nghiệm ghi âm giọng nói với 5 người cao tuổi trong gia đình của chính đội ngũ phát triển.',
      days9_14: 'Xây dựng trang web gia đình riêng tư nơi con cháu cùng nghe và để lại lời bình luận động viên.'
    },
    keyMetrics: {
      targetMargin: '65%',
      repeatCadence: 'Hàng tuần',
      zeroFrictionScore: 97
    },
    tags: ['Ký ức gia đình', 'Di sản giọng nói', 'Tình cảm cội nguồn', 'Sách nói']
  }
];
