export interface IndustryInsightItem {
  id: string;
  title: string;
  category:
    | 'trade_commerce'
    | 'investment_capital'
    | 'b2b_cooperation'
    | 'projects_tenders'
    | 'policy_tax'
    | 'tech_ai'
    | 'supply_chain'
    | 'funding_market'
    | 'case_study';
  categoryLabel: string;
  pillar: 'trade' | 'investment' | 'cooperation' | 'projects';
  summary: string;
  content: string;
  keyTakeaways: string[];
  actionableOpportunity: string;
  suggestedActionType: 'deal_room' | 'post_resource' | 'explore_opportunities';
  suggestedActionLabel: string;
  defaultDealPrompt?: {
    partyAResources: string;
    partyBResources: string;
    dealType: string;
    targetGoal: string;
  };
  source: string;
  sourceUrl?: string;
  publishedAt: string;
  readTime: string;
  imageUrl: string;
  isTrending?: boolean;
  viewsCount?: number;
  region?: 'Toàn quốc' | 'Miền Bắc' | 'Miền Trung' | 'Miền Nam' | 'Quốc tế';
}

export const INITIAL_INDUSTRY_INSIGHTS: IndustryInsightItem[] = [
  // 1. GIAO THƯƠNG & XUẤT NHẬP KHẨU (TRADE & GLOBAL COMMERCE)
  {
    id: 'insight-trade-01',
    title: 'Mở rộng luồng thông quan xanh nông sản & thực phẩm chế biến qua các cửa khẩu phía Bắc',
    category: 'trade_commerce',
    categoryLabel: 'Giao Thương & Xuất Khẩu',
    pillar: 'trade',
    summary: 'Bộ Công Thương cùng Tổng cục Hải quan thiết lập cơ chế kiểm hóa ưu tiên 24/7 và cấp chứng nhận xuất xứ số hóa (e-C/O) cho các liên minh doanh nghiệp xuất khẩu chính ngạch.',
    content: 'Trước nhu cầu tiêu thụ bùng nổ của thị trường tỷ dân và khu vực ASEAN, các doanh nghiệp xuất khẩu nông sản, trái cây sấy và gia vị đóng hộp của Việt Nam đang được tạo điều kiện rút ngắn 70% thời gian lưu bãi tại các cửa khẩu Hữu Nghị, Tân Thanh. Điểm đột phá là cơ chế khuyến khích "Doanh nghiệp đầu tàu bao tiêu kết hợp vệ tinh địa phương" để đảm bảo truy xuất nguồn gốc mã số vùng trồng (PUC) và cơ sở đóng gói đồng bộ.',
    keyTakeaways: [
      'Rút ngắn thời gian thông quan từ 36 giờ xuống dưới 8 giờ đối với hàng có mã định danh vùng trồng chuẩn hóa.',
      'Giảm 25% chi phí lưu kho lạnh và hao hụt vận chuyển nhờ ứng dụng đối soát hải quan điện tử một cửa.',
      'Cơ hội lớn cho các xưởng chế biến nông sản tại ĐBSCL và Tây Nguyên liên kết với đơn vị logistics vận tải cửa khẩu.'
    ],
    actionableOpportunity: 'Thành lập liên minh giữa Doanh nghiệp có vùng nguyên liệu đạt chuẩn và Đơn vị vận tải logistics lạnh chuyên tuyến biên giới.',
    suggestedActionType: 'deal_room',
    suggestedActionLabel: 'Đàm Phán Liên Minh Giao Thương Xuất Khẩu',
    defaultDealPrompt: {
      partyAResources: 'Sở hữu vùng trồng xoài và chanh leo 30 hecta đạt mã số xuất khẩu (PUC), sản lượng 50 tấn/tháng.',
      partyBResources: 'Đội xe container lạnh 15 chiếc chuyên tuyến Lạng Sơn - Quảng Tây cùng giấy phép đại lý thông quan hải quan.',
      dealType: 'Liên minh xuất khẩu chính ngạch & Chia sẻ lợi nhuận vận chuyển',
      targetGoal: 'Xuất khẩu 300 tấn trái cây chế biến chính ngạch sang thị trường đối tác trong 6 tháng tới.'
    },
    source: 'Bộ Công Thương & Cục Xuất Nhập Khẩu',
    sourceUrl: 'https://moit.gov.vn',
    publishedAt: 'Hôm nay, 09:15',
    readTime: '3 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
    isTrending: true,
    viewsCount: 2840,
    region: 'Miền Bắc'
  },
  {
    id: 'insight-trade-02',
    title: 'Cơ hội thị trường xuất khẩu sản phẩm chứng nhận Halal: Mảnh đất màu mỡ cho chuỗi thực phẩm Việt',
    category: 'trade_commerce',
    categoryLabel: 'Giao Thương & Xuất Khẩu',
    pillar: 'trade',
    summary: 'Thị trường Halal toàn cầu đạt quy mô 2.300 tỷ USD mở ra cánh cửa xuất khẩu lớn cho các cơ sở chế biến thực phẩm sạch liên kết với đơn vị tư vấn chứng chỉ quốc tế.',
    content: 'Khu vực Trung Đông và các quốc gia lân cận như Indonesia, Malaysia đang có nhu cầu cực lớn về nông sản sấy, cà phê, gia vị và thủy hải sản chế biến từ Việt Nam. Trở ngại lớn nhất của các đơn vị địa phương là chi phí chứng nhận Halal và quy trình kiểm soát nhiễm chéo chuỗi cung ứng. Giải pháp tối ưu là thành lập các cụm liên kết (Clustering): một doanh nghiệp đầu tàu có chứng nhận bảo trợ và gia công đóng gói cho các hộ nông nghiệp vệ tinh.',
    keyTakeaways: [
      'Biên lợi nhuận của sản phẩm đạt chuẩn Halal xuất khẩu cao hơn từ 25% - 40% so với bán thô nội địa.',
      'Các hiệp hội thương mại đang tài trợ 50% chi phí tư vấn chứng chỉ cho các doanh nghiệp liên minh hợp tác.',
      'Cần sớm xây dựng liên minh giữa Đơn vị có nguồn nguyên liệu chất lượng cao và Đơn vị sở hữu chứng chỉ/kinh nghiệm logistics quốc tế.'
    ],
    actionableOpportunity: 'Kết nối ngay với các đơn vị chế biến thực phẩm có sẵn chứng nhận Halal để cùng gia công sản phẩm xuất khẩu.',
    suggestedActionType: 'deal_room',
    suggestedActionLabel: 'Đàm Phán Liên Minh Chế Biến Halal',
    defaultDealPrompt: {
      partyAResources: 'Vùng trồng chanh leo và xoài cát 25 hecta tại Đồng Nai, sản lượng 40 tấn/tháng, đạt chuẩn VietGAP.',
      partyBResources: 'Nhà máy sấy lạnh và đóng gói đạt chuẩn ISO 22000, có sẵn chứng chỉ Halal và kênh phân phối đi UAE.',
      dealType: 'Gia công xuất khẩu ODM & Chia sẻ lợi nhuận đơn hàng quốc tế',
      targetGoal: 'Xuất khẩu lô hàng thử nghiệm 5 tấn trái cây sấy sang thị trường Trung Đông trong quý tới.'
    },
    source: 'Cục Xúc tiến Thương mại (VIETRADE)',
    sourceUrl: 'https://vietrade.gov.vn',
    publishedAt: 'Hôm qua, 15:30',
    readTime: '4 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
    isTrending: true,
    viewsCount: 1980,
    region: 'Quốc tế'
  },

  // 2. ĐẦU TƯ, VỐN & M&A (INVESTMENT & CAPITAL ALLOCATION)
  {
    id: 'insight-invest-01',
    title: 'Gói tín dụng ưu đãi 30.000 tỷ đồng hỗ trợ doanh nghiệp sản xuất xanh và chế biến nông thủy sản',
    category: 'investment_capital',
    categoryLabel: 'Đầu Tư & Dòng Vốn',
    pillar: 'investment',
    summary: 'Ngân hàng Nhà nước chỉ đạo các NHTM triển khai gói vay lãi suất thấp hơn từ 1.5% - 2%/năm đối với doanh nghiệp có chứng chỉ thực hành xanh và chuỗi liên kết bền vững.',
    content: 'Theo thông báo mới nhất, gói tín dụng trọng điểm hướng tới các hợp tác xã, doanh nghiệp SME chế biến nông sản, thực phẩm sạch và nhà máy sản xuất có giải pháp tuần hoàn năng lượng. Điểm mấu chốt để giải ngân nhanh là doanh nghiệp cần chứng minh được "Hợp đồng đầu ra có tính liên kết chuỗi" (Off-take agreement) hoặc liên minh đối tác phân phối rõ ràng thay vì chỉ dựa vào tài sản thế chấp đơn thuần.',
    keyTakeaways: [
      'Lãi suất cho vay ưu đãi chỉ từ 5.5% - 6.5%/năm trong 12 tháng đầu cho chi phí vốn lưu động.',
      'Ưu tiên đặc biệt cho các chuỗi cung ứng có cam kết bao tiêu và hợp tác đa bên giữa Nhà sản xuất - Đơn vị logistics - Chuỗi bán lẻ.',
      'Hồ sơ phê duyệt tinh gọn hơn nếu doanh nghiệp có đối tác bảo chứng hoặc thành viên trong mạng lưới liên kết ngành.'
    ],
    actionableOpportunity: 'Cơ hội lớn cho các đơn vị có nhà xưởng/nông trại liên kết cùng đơn vị phân phối uy tín để đồng đứng tên đề xuất gói tài trợ vốn lưu động.',
    suggestedActionType: 'deal_room',
    suggestedActionLabel: 'Lập Đề Xuất Liên Minh Nhận Vay Vốn',
    defaultDealPrompt: {
      partyAResources: 'Nhà máy chế biến nông sản đạt chuẩn OCOP 4 sao, công suất 20 tấn/tháng, cần vốn lưu động thu mua nguyên liệu.',
      partyBResources: 'Chuỗi 30 cửa hàng thực phẩm sạch cam kết hợp đồng bao tiêu đầu ra cố định 12 tháng.',
      dealType: 'Liên minh sản xuất & Bao tiêu chuỗi cung ứng nhận ưu đãi tín dụng',
      targetGoal: 'Tiếp cận gói vay vốn sản xuất 2 tỷ đồng với lãi suất ưu đãi 5.5%/năm.'
    },
    source: 'Tạp chí Tài chính & Ngân hàng Nhà nước',
    sourceUrl: 'https://sbv.gov.vn',
    publishedAt: 'Hôm nay, 08:30',
    readTime: '3 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
    isTrending: true,
    viewsCount: 2310,
    region: 'Toàn quốc'
  },
  {
    id: 'insight-invest-02',
    title: 'Làn sóng M&A vi mô và gọi vốn thiên thần: Các chuỗi F&B và dịch vụ bán lẻ tìm đối tác đồng sở hữu',
    category: 'investment_capital',
    categoryLabel: 'Đầu Tư & Dòng Vốn',
    pillar: 'investment',
    summary: 'Xu hướng nhà đầu tư cá nhân góp vốn 100 - 500 triệu đồng để cùng đồng sở hữu các cơ sở kinh doanh nhượng quyền có dòng tiền thực tế hàng ngày.',
    content: 'Thay vì gửi tiết kiệm hoặc mạo hiểm vào các kênh biến động mạnh, nhiều nhà đầu tư nhàn rỗi đang chuyển dịch sang mô hình "Đầu tư thiên thần vi mô (Micro Angel Investment)". Bằng việc ký kết Hợp đồng hợp tác kinh doanh (BCC) với các chuỗi nhượng quyền đã có 5-10 chi nhánh vận hành ổn định, nhà đầu tư vừa được nhận 15-25% lợi nhuận ròng hàng tháng, vừa có điều khoản thu hồi vốn gốc minh bạch trong 18 - 24 tháng.',
    keyTakeaways: [
      'Lợi suất dòng tiền thực tế đạt 18% - 24%/năm dựa trên số liệu doanh thu POS tự động hàng ngày.',
      'Bảo vệ an toàn cho nhà đầu tư thông qua điều khoản hoàn vốn ưu tiên (Preferred Return) trước khi chia lợi nhuận cho bên sáng lập.',
      'Mô hình chuẩn hóa thủ tục pháp lý chỉ cần 1 buổi làm việc và hợp đồng mẫu 3 bên.'
    ],
    actionableOpportunity: 'Các chủ chuỗi kinh doanh đang muốn mở thêm chi nhánh mới hãy đưa phương án tài chính lên Deal Room để kết nối nhà đầu tư phù hợp.',
    suggestedActionType: 'deal_room',
    suggestedActionLabel: 'Đàm Phán Gọi Vốn Hợp Tác Dòng Tiền',
    defaultDealPrompt: {
      partyAResources: 'Thương hiệu chuỗi tiệm bánh & cafe đã có 4 cơ sở đạt doanh thu trung bình 180tr/tháng/cơ sở.',
      partyBResources: 'Nhà đầu tư thiên thần có sẵn 300 triệu đồng vốn nhàn rỗi, không trực tiếp tham gia vận hành.',
      dealType: 'Góp vốn hợp tác kinh doanh (BCC) nhận chia sẻ lợi nhuận ròng',
      targetGoal: 'Khai trương điểm bán thứ 5 tại Quận 7 và hoàn vốn đầu tư trong vòng 18 tháng.'
    },
    source: 'Báo Đầu Tư & Hiệp hội Doanh nghiệp',
    sourceUrl: 'https://baodautu.vn',
    publishedAt: '28-09-2026',
    readTime: '4 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    isTrending: false,
    viewsCount: 1750,
    region: 'Miền Nam'
  },

  // 3. HỢP TÁC, NHƯỢNG QUYỀN & NGUỒN LỰC (B2B PARTNERSHIPS & FRANCHISE)
  {
    id: 'insight-coop-01',
    title: 'Xu hướng "Chia sẻ công suất nhà xưởng nhàn rỗi" bùng nổ tại các cụm công nghiệp phía Nam',
    category: 'b2b_cooperation',
    categoryLabel: 'Hợp Tác & Nguồn Lực',
    pillar: 'cooperation',
    summary: 'Trước áp lực chi phí mặt bằng và máy móc khấu hao, hơn 40% doanh nghiệp vừa và nhỏ trong ngành cơ khí, dệt may, chế biến gỗ đang mở cửa nhận gia công bán phần hoặc chia sẻ kho bãi.',
    content: 'Thay vì phải gánh toàn bộ chi phí thuê xưởng 1.000m² - 3.000m² và đội ngũ bảo trì kỹ thuật khi đơn hàng xuất khẩu biến động theo mùa, nhiều chủ xưởng đã chủ động tìm đối tác khởi nghiệp hoặc thương hiệu D2C nội địa để cùng vận hành chung dây chuyền. Mô hình này giúp bên cho thuê bù đắp 50-70% chi phí cố định, còn bên đi thuê tiết kiệm đến 80% vốn đầu tư máy móc ban đầu (Capex).',
    keyTakeaways: [
      'Tiết kiệm trung bình 35 - 50 triệu đồng/tháng tiền thuê mặt bằng và khấu hao máy móc khi chia sẻ dây chuyền.',
      'Hình thức hợp tác phổ biến: Gia công OEM/ODM theo lô nhỏ (từ 500 sản phẩm) kèm điều khoản cọc bảo chứng linh hoạt.',
      'Yếu tố then chốt để thành công: Biên bản ghi nhớ thỏa thuận (MOU) minh bạch về quyền sở hữu trí tuệ mẫu mã và lịch trình bảo dưỡng thiết bị.'
    ],
    actionableOpportunity: 'Các xưởng có máy móc chưa chạy hết 100% công suất nên đăng tải nguồn lực để tìm thương hiệu thời trang hoặc gia dụng cùng chia lửa chi phí mặt bằng.',
    suggestedActionType: 'post_resource',
    suggestedActionLabel: 'Đăng Tải Nguồn Lực Nhà Xưởng Nhàn Rỗi',
    source: 'Hiệp hội Doanh nghiệp TP.HCM (HUBA)',
    sourceUrl: 'https://huba.vn',
    publishedAt: 'Hôm qua, 14:15',
    readTime: '4 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    isTrending: true,
    viewsCount: 2180,
    region: 'Miền Nam'
  },
  {
    id: 'insight-coop-02',
    title: 'Case Study: Mô hình F&B "Buổi sáng Cà phê mang đi - Buổi tối Bia thủ công & Acoustic" tăng gấp 2.4 lần doanh thu mặt bằng',
    category: 'b2b_cooperation',
    categoryLabel: 'Hợp Tác & Nguồn Lực',
    pillar: 'cooperation',
    summary: 'Phân tích chi tiết cách hai chủ kinh doanh trẻ tại phố đi bộ Đà Nẵng tối ưu hóa 100% thời gian hoạt động của một mặt bằng giá 35 triệu/tháng.',
    content: 'Thay vì để mặt bằng bỏ trống từ 6h chiều (đối với mô hình cà phê làm việc) hoặc bỏ trống buổi sáng (đối với mô hình quán bar đêm), hai chủ cơ sở đã ký kết thỏa thuận hợp tác thời gian biểu phân tách (Time-sharing Lease). Bên A khai thác từ 6h30 đến 17h00 phục vụ cà phê và đồ ăn nhẹ văn phòng; Bên B tiếp quản từ 17h30 đến 23h30 với không gian đồ uống thư giãn buổi tối. Chi phí thuê 35 triệu/tháng được chia tỷ lệ 45/55 kèm thỏa thuận bảo quản cơ sở vật chất nghiêm ngặt.',
    keyTakeaways: [
      'Hiệu suất sinh lời trên mỗi mét vuông tăng từ 1.2 triệu lên 2.9 triệu VNĐ/m²/tháng.',
      'Hai bên chia sẻ chung chi phí internet tốc độ cao, máy POS thu ngân, hệ thống âm thanh và phí dọn dẹp vệ sinh.',
      'Lượng khách hàng quen buổi sáng chuyển đổi thành khách hàng buổi tối và ngược lại đạt tỷ lệ hơn 18%.'
    ],
    actionableOpportunity: 'Nếu bạn đang có mặt bằng kinh doanh nhưng chỉ hoạt động 8 tiếng/ngày, hãy chia sẻ khung giờ còn lại để thu hồi 40-50% tiền thuê nhà.',
    suggestedActionType: 'explore_opportunities',
    suggestedActionLabel: 'Xem Các Không Gian Đang Tìm Đối Tác Chia Sẻ',
    source: 'Cộng đồng Doanh chủ F&B Việt Nam',
    sourceUrl: 'https://fnbvietnam.vn',
    publishedAt: '27-09-2026',
    readTime: '5 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    isTrending: false,
    viewsCount: 3410,
    region: 'Miền Trung'
  },

  // 4. DỰ ÁN, ĐẤU THẦU & BĐS CÔNG NGHIỆP (PROJECTS & INDUSTRIAL TENDERS)
  {
    id: 'insight-project-01',
    title: 'Quy hoạch phát triển 8 cụm công nghiệp sinh thái mới tại Long An, Đồng Nai, Bắc Ninh ưu tiên nhà thầu phụ địa phương',
    category: 'projects_tenders',
    categoryLabel: 'Dự Án & Đấu Thầu',
    pillar: 'projects',
    summary: 'Chính sách ưu đãi mặt bằng sạch, giảm 30% tiền thuê hạ tầng trong 3 năm đầu cho các liên minh doanh nghiệp phụ trợ công nghiệp cơ khí, điện tử và bao bì.',
    content: 'Các địa phương trọng điểm phía Nam và phía Bắc đang khẩn trương đẩy nhanh tiến độ bàn giao mặt bằng tại các cụm công nghiệp thế hệ mới. Điểm đặc biệt của quy hoạch lần này là tiêu chí lựa chọn nhà đầu tư thứ cấp: ưu tiên các tập đoàn có cam kết sử dụng ít nhất 40% giá trị hợp đồng thầu phụ và gia công chi tiết linh kiện từ các nhà máy vệ tinh nội địa. Điều này mở ra cơ hội hàng nghìn tỷ đồng cho các xưởng cơ khí chính xác, dập khuôn, đúc nhựa và xử lý bề mặt kim loại.',
    keyTakeaways: [
      'Chính sách ưu đãi thuế TNDN 10% trong 15 năm đầu và miễn 4 năm đầu đối với dự án phụ trợ công nghệ cao.',
      'Cần sớm thành lập các Tổ hợp liên danh (Consortium) gồm 3 - 5 doanh nghiệp vừa và nhỏ để đủ năng lực pháp lý đấu thầu các gói thầu lớn.',
      'Hệ thống quản lý chất lượng ISO 9001 và chứng chỉ xanh ISO 14001 là điều kiện tiên quyết để được xét chọn.'
    ],
    actionableOpportunity: 'Tham gia lập liên danh các nhà xưởng gia công phụ trợ trên J-Network để cùng ứng thầu các gói cung ứng cho nhà máy FDI.',
    suggestedActionType: 'deal_room',
    suggestedActionLabel: 'Lập Liên Danh Ứng Thầu Dự Án',
    defaultDealPrompt: {
      partyAResources: 'Xưởng cơ khí chính xác CNC 1.500m² tại Bắc Ninh có chứng chỉ ISO 9001, sẵn sàng 15 kỹ sư vận hành.',
      partyBResources: 'Doanh nghiệp chuyên thiết kế khuôn mẫu và xử lý xi mạ công nghiệp có sẵn tệp khách hàng FDI Hàn Quốc.',
      dealType: 'Thành lập liên danh (Consortium) đấu thầu cung ứng linh kiện phụ trợ',
      targetGoal: 'Ký hợp đồng cung ứng 50.000 chi tiết máy/tháng cho tổ hợp nhà máy sản xuất tại KCN Yên Phong.'
    },
    source: 'Bộ Kế hoạch & Đầu tư & Báo Xây Dựng',
    sourceUrl: 'https://mpi.gov.vn',
    publishedAt: '26-09-2026',
    readTime: '4 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    isTrending: true,
    viewsCount: 2650,
    region: 'Toàn quốc'
  },
  {
    id: 'insight-project-02',
    title: 'Dự án điện mặt trời áp mái tự sản tự tiêu tại các khu chế xuất: Hợp tác đầu tư mô hình ESCO không cần vốn',
    category: 'projects_tenders',
    categoryLabel: 'Dự Án & Đấu Thầu',
    pillar: 'projects',
    summary: 'Mô hình quỹ đầu tư năng lượng chi trả 100% chi phí lắp đặt pin mặt trời trên mái xưởng, chủ xưởng hưởng ngay giá điện rẻ hơn 15 - 20% so với EVN.',
    content: 'Nghị định mới của Chính phủ về khuyến khích phát triển điện mặt trời áp mái tự sản tự tiêu đang kích hoạt hàng loạt dự án hợp tác theo hình thức ESCO (Energy Service Company). Các quỹ đầu tư hạ tầng xanh sẽ bỏ toàn bộ vốn lắp đặt hệ thống pin năng lượng mặt trời công suất từ 500kWp đến 2MWp trên mái nhà máy. Doanh nghiệp sản xuất vừa giảm được nhiệt độ mái xưởng từ 4-6°C, vừa tiết kiệm hàng trăm triệu đồng tiền điện mỗi tháng và đạt chứng chỉ năng lượng tái tạo (I-REC) phục vụ xuất khẩu sang thị trường EU.',
    keyTakeaways: [
      'Chủ nhà máy không cần bỏ vốn ban đầu (Capex 0 đồng), thời hạn hợp đồng mua bán điện PPA linh hoạt từ 15 đến 20 năm.',
      'Sau khi hết hạn hợp đồng, toàn bộ hệ thống điện mặt trời được chuyển giao miễn phí cho chủ nhà máy quản lý.',
      'Điều kiện tham gia: Diện tích mái xưởng kiên cố tối thiểu từ 2.000m² trở lên và hóa đơn tiền điện hàng tháng từ 150 triệu đồng.'
    ],
    actionableOpportunity: 'Chủ xưởng có diện tích mái nhàn rỗi có thể kết nối với các quỹ đầu tư năng lượng sạch trên sàn J-Network.',
    suggestedActionType: 'deal_room',
    suggestedActionLabel: 'Đàm Phán Hợp Đồng Điện Mặt Trời Mái Xưởng (PPA)',
    defaultDealPrompt: {
      partyAResources: 'Sở hữu mái nhà xưởng may 3.500m² tại KCN Sóng Thần, chi phí điện hàng tháng 250 triệu đồng.',
      partyBResources: 'Quỹ đầu tư năng lượng sạch cam kết tài trợ 100% chi phí lắp đặt hệ thống 1MWp đạt chuẩn an toàn PCCC.',
      dealType: 'Hợp tác đầu tư ESCO chia sẻ chi phí năng lượng tái tạo',
      targetGoal: 'Tiết kiệm 20% tiền điện hàng tháng và cấp chứng chỉ xanh phục vụ xuất khẩu hàng may mặc sang châu Âu.'
    },
    source: 'Cục Điện lực và Năng lượng Tái tạo & VCCI',
    sourceUrl: 'https://vcci.com.vn',
    publishedAt: '25-09-2026',
    readTime: '3 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    isTrending: false,
    viewsCount: 1820,
    region: 'Miền Nam'
  },

  // 5. CHÍNH SÁCH, THUẾ & VĨ MÔ (POLICY, TAX & REGULATORY)
  {
    id: 'insight-policy-01',
    title: 'Nghị định mới về Thương mại Điện tử & Hóa đơn số: Giải pháp liên kết kho bãi để giảm 30% chi phí fulfillment',
    category: 'policy_tax',
    categoryLabel: 'Chính Sách & Thuế',
    pillar: 'cooperation',
    summary: 'Quy định siết chặt truy xuất nguồn gốc và đối soát doanh thu sàn TMĐT đòi hỏi các nhà bán hàng phải chuyển dịch sang kho hàng trung chuyển phân tán gần khách hàng.',
    content: 'Từ quý 3/2026, các cơ chế kiểm toán doanh thu tự động từ sàn TMĐT và thuế giá trị gia tăng xuyên biên giới khiến các nhà bán lẻ online không thể duy trì mô hình gom hàng nhỏ lẻ không hóa đơn. Giải pháp tối ưu đang được áp dụng là: các nhà bán hàng độc lập cùng góp nguồn lực thuê chung một "Hub kho trung tâm" đạt chuẩn PCCC và hóa đơn VAT, sử dụng chung đội ngũ đóng gói và đàm phán cước vận chuyển số lượng lớn với các đơn vị chuyển phát nhanh.',
    keyTakeaways: [
      'Giảm trực tiếp 15% - 25% cước bưu chính khi gom sản lượng đơn hàng của 5 - 10 đối tác bán lẻ thành một tài khoản doanh nghiệp lớn.',
      'Đảm bảo 100% hóa đơn chứng từ hợp lệ, tránh rủi ro thanh kiểm tra thuế đột xuất.',
      'Tốc độ giao hàng nội đô được rút ngắn xuống dưới 2 giờ (Same-day delivery), nâng tỷ lệ hoàn tất đơn hàng lên 96%.'
    ],
    actionableOpportunity: 'Tìm kiếm 3-5 đối tác kinh doanh cùng ngành hàng không cạnh tranh trực tiếp để thành lập "Liên minh Kho bãi & Fulfillment dùng chung".',
    suggestedActionType: 'deal_room',
    suggestedActionLabel: 'Tạo Thương Vụ Hub Kho Dùng Chung',
    defaultDealPrompt: {
      partyAResources: 'Sở hữu mặt bằng kho 300m² tại Quận Tân Bình đầy đủ PCCC, hệ thống giá kệ và 2 nhân viên đóng gói.',
      partyBResources: '3 Doanh nghiệp bán lẻ mỹ phẩm/thời trang có tổng lượng đơn 300 đơn/ngày cần không gian lưu trữ và đóng hàng.',
      dealType: 'Hợp tác liên kết hạ tầng kho bãi & Dùng chung đội ngũ vận hành',
      targetGoal: 'Tiết kiệm 40% chi phí kho vận hàng tháng và tối ưu tốc độ giao hàng 2h.'
    },
    source: 'Cục Thương mại Điện tử và Kinh tế số',
    sourceUrl: 'https://idea.gov.vn',
    publishedAt: '24-09-2026',
    readTime: '3 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    isTrending: false,
    viewsCount: 1480,
    region: 'Toàn quốc'
  },

  // 6. AI & CÔNG NGHỆ B2B (TECH & DIGITAL TRANSFORMATION)
  {
    id: 'insight-tech-01',
    title: 'Ứng dụng AI Mini-Agent trong thẩm định đối tác B2B: Giảm 90% rủi ro nợ xấu và sai lệch cam kết',
    category: 'tech_ai',
    categoryLabel: 'AI & Chuyển Đổi Số',
    pillar: 'cooperation',
    summary: 'Cách các Giám đốc Kinh doanh (CCO) hiện đại sử dụng công nghệ mô hình hóa điều khoản hợp tác để chốt giao dịch trong vòng 48 giờ.',
    content: 'Trước đây, một thương vụ liên minh phân phối hoặc gia công ODM giữa hai doanh nghiệp thường mất từ 3 đến 6 tuần chỉ để qua lại các bản dự thảo hợp đồng pháp lý và tranh luận về tỷ lệ chia sẻ doanh thu. Với sự hỗ trợ của các trợ lý AI chuyên biệt như Deal Validator trên J-Network, các nhà đàm phán có thể nhập dữ liệu nguồn lực của đôi bên, nhận ngay mô phỏng điểm hòa vốn, các cảnh báo rủi ro xung đột khách hàng cũ và tự động xuất ra bản Biên bản ghi nhớ (MOU) 1 trang chuẩn mực để ký tắt ngay trong buổi gặp đầu tiên.',
    keyTakeaways: [
      'Rút ngắn thời gian từ ý tưởng ban đầu đến lúc ký kết hợp tác thử nghiệm (Pilot) xuống dưới 3 ngày.',
      'Tránh tâm lý "ngại nói về tiền" hoặc chia hoa hồng cảm tính nhờ công thức toán học phân bổ theo chi phí gánh chịu thực tế.',
      'Tạo tiền đề vững chắc cho việc soạn thảo hợp đồng kinh tế chính thức mà không phát sinh tranh chấp sau này.'
    ],
    actionableOpportunity: 'Trải nghiệm ngay tính năng Thẩm định thương vụ AI tại Phòng Giao Thương J-Network để kiểm tra tính khả thi của đối tác sắp gặp.',
    suggestedActionType: 'deal_room',
    suggestedActionLabel: 'Mở Phòng Thẩm Định Thương Vụ AI',
    source: 'Báo Diễn Đàn Doanh Nghiệp & VCCI',
    sourceUrl: 'https://diendandoanhnghiep.vn',
    publishedAt: '23-09-2026',
    readTime: '3 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    isTrending: false,
    viewsCount: 1650,
    region: 'Toàn quốc'
  }
];
