export interface UniversalPillar {
  id: string;
  name: string;
  englishName: string;
  frequency: string;
  maslowLevel: string;
  corePain: string;
  universalThesis: string;
  marketPotential: string;
  keyStats: string;
  exampleFriction: string;
  image: string;
}

export const UNIVERSAL_PILLARS: UniversalPillar[] = [
  {
    id: 'health_vitality',
    name: 'Sức Khỏe & Sinh Lực',
    englishName: 'Health, Sleep & Restorative Biology',
    frequency: '24/7 (Liên tục mỗi ngày)',
    maslowLevel: 'Tầng 1: Nhu cầu Sinh học thiết yếu',
    corePain: 'Giấc ngủ chập chờn, mệt mỏi kinh niên, lo lắng về các bệnh âm thầm và dinh dưỡng khó kiểm soát.',
    universalThesis: 'Bất kể thu nhập hay địa vị, con người không thể trì hoãn giấc ngủ và hơi thở. Bất kỳ sản phẩm nào phục hồi sinh lực mà không đòi hỏi nỗ lực ý chí cao đều trở thành nhu cầu thiết yếu.',
    marketPotential: 'Toàn bộ 8 tỷ người trên Trái Đất',
    keyStats: '62% người trưởng thành toàn cầu cho rằng họ không ngủ ngon giấc.',
    exampleFriction: 'Các máy đo sức khỏe hiện nay quá phức tạp, bắt người dùng phải đeo và sạc pin liên tục.',
    image: '/src/assets/images/pillar_health_vitality_1790601523330.jpg'
  },
  {
    id: 'time_energy',
    name: 'Thời Gian & Giảm Tải Nhận Thức',
    englishName: 'Cognitive Offloading & Time Reclamation',
    frequency: 'Hàng giờ trong ngày',
    maslowLevel: 'Tầng 2: An toàn & Kiểm soát cuộc sống',
    corePain: 'Não bộ kiệt sức vì hàng trăm quyết định vụn vặt: ăn gì, dọn gì, trả lời tin nhắn nào, mua sắm định kỳ ra sao.',
    universalThesis: 'Thời gian là tài nguyên duy nhất không thể tái sinh. Sản phẩm trả lại 1–2 giờ mỗi ngày cho sự tự do và giải phóng bộ nhớ đệm tâm trí sẽ luôn có người chi trả.',
    marketPotential: 'Mọi người lao động, phụ huynh, người độc thân',
    keyStats: 'Trung bình một người mất 2.5 giờ mỗi ngày chỉ để loay hoay xử lý việc nhà và quyết định vụn vặt.',
    exampleFriction: 'Các công cụ năng suất hiện nay lại bắt người dùng mất thêm thời gian để quản lý chính công cụ đó.',
    image: '/src/assets/images/pillar_time_energy_1790601537438.jpg'
  },
  {
    id: 'financial_peace',
    name: 'An Toàn Tài Chính & Rò Rỉ Vi Mô',
    englishName: 'Micro-leakage & Financial Peace of Mind',
    frequency: 'Hàng ngày / Hàng tuần',
    maslowLevel: 'Tầng 2: An toàn tài sản & Gia đình',
    corePain: 'Cảm giác tiền trôi đi không rõ lý do: phí ẩn, hợp đồng tự động gia hạn, mua sắm bốc đồng, lạm phát làm hao mòn tiết kiệm.',
    universalThesis: 'Mọi người không cần trở thành chuyên gia đầu tư phức tạp; họ cần một người gác cổng trung thực đảm bảo không ai lấy cắp tiền của họ và dòng tiền gia đình luôn an toàn.',
    marketPotential: 'Mọi cá nhân có thu nhập và tài khoản thanh toán',
    keyStats: 'Hơn 74% người tiêu dùng có ít nhất 1 khoản phí định kỳ đang bị trừ tiền mà không hay biết.',
    exampleFriction: 'Các ứng dụng ngân hàng và kế toán quá khô khan, đáng sợ và mang tính phán xét chi tiêu.',
    image: '/src/assets/images/pillar_financial_peace_1790601549337.jpg'
  },
  {
    id: 'connection_loneliness',
    name: 'Kết Nối Chân Thực & Chống Cô Đơn',
    englishName: 'Authentic Bonds & Generational Care',
    frequency: 'Mỗi ngày',
    maslowLevel: 'Tầng 3: Tình cảm & Thuộc về cộng đồng',
    corePain: 'Thế giới ngập tràn mạng xã hội nhưng con người ngày càng cô đơn, thế hệ trẻ xa cách cha mẹ già, người già bị cô lập.',
    universalThesis: 'Khao khát được lắng nghe, thấu cảm và giữ kết nối với gia đình là bản năng tiến hóa. Sản phẩm tạo ra chiếc cầu nối tự nhiên không gượng gạo là cứu cánh của thời đại.',
    marketPotential: 'Gia đình đa thế hệ, thanh niên sống xa quê, người cao tuổi',
    keyStats: 'Tổ chức Y tế Thế giới (WHO) xếp cô đơn là mối nguy hại sức khỏe tương đương hút 15 điếu thuốc/ngày.',
    exampleFriction: 'Mạng xã hội tập trung vào phô trương và so sánh thay vì kết nối sâu sắc thực tế.',
    image: '/src/assets/images/hero_universal_concept_1790601508990.jpg'
  },
  {
    id: 'future_resilience',
    name: 'Kỹ Năng Sống & Thích Ứng Tương Lai',
    englishName: 'Practical Survival & Anti-Fragile Skills',
    frequency: 'Hàng tháng / Dài hạn',
    maslowLevel: 'Tầng 4 & 5: Phát triển & Làm chủ bản thân',
    corePain: 'Nỗi bất an bị công nghệ và AI đào thải; nhà trường dạy kiến thức hàn lâm nhưng không ai dạy cách tự vệ tài chính, pháp lý thực tế hay sửa chữa cơ bản.',
    universalThesis: 'Ai cũng muốn cảm giác tự tin đối diện với biến động. Sản phẩm biến kỹ năng sống phức tạp thành chỉ dẫn từng bước như chơi lego sẽ trao quyền lực thực sự cho người dùng.',
    marketPotential: 'Học sinh, sinh viên, người đi làm mọi lứa tuổi',
    keyStats: '85% người trẻ thừa nhận họ bối rối khi phải tự xử lý các thủ tục bảo hiểm, thuế hoặc tranh chấp quyền lợi.',
    exampleFriction: 'Khóa học online quá dài dòng với tỷ lệ hoàn thành trung bình dưới 5%.',
    image: '/src/assets/images/pillar_time_energy_1790601537438.jpg'
  },
  {
    id: 'digital_order',
    name: 'Trật Tự Không Gian & Tối Giản Số',
    englishName: 'Physical & Digital Decluttering',
    frequency: 'Hàng tuần',
    maslowLevel: 'Tầng 2 & 4: Bình an & Cân bằng nội tâm',
    corePain: 'Hàng chục nghìn bức ảnh rác, giấy tờ hóa đơn thất lạc, đồ đạc mua về chật nhà nhưng không nỡ vứt, hộp thư tràn ngập spam.',
    universalThesis: 'Không gian sống lộn xộn tạo ra tâm trí hỗn loạn. Một giải pháp nhẹ nhàng trả lại trật tự mà không bắt người dùng ngồi dọn dẹp hàng giờ là điều ai cũng mơ ước.',
    marketPotential: 'Toàn bộ cư dân đô thị và người dùng smartphone',
    keyStats: 'Một người trung bình có hơn 3.000 tấm ảnh và 40 ứng dụng chưa bao giờ mở lại.',
    exampleFriction: 'Việc dọn dẹp thường đem lại cảm giác tội lỗi và tiếc nuối khi phải tự tay xóa bỏ.',
    image: '/src/assets/images/hero_universal_concept_1790601508990.jpg'
  }
];
