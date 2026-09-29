export interface IndustryInsightItem {
  id: string;
  title: string;
  category: 'supply_chain' | 'policy_tax' | 'funding_market' | 'case_study' | 'tech_ai';
  categoryLabel: string;
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
}

export const INITIAL_INDUSTRY_INSIGHTS: IndustryInsightItem[] = [
  {
    id: 'insight-01',
    title: 'Gói tín dụng ưu đãi 30.000 tỷ đồng hỗ trợ doanh nghiệp sản xuất xanh và chế biến nông thủy sản',
    category: 'funding_market',
    categoryLabel: 'Dòng Vốn & Thị Trường',
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
    publishedAt: 'Hôm nay, 08:30',
    readTime: '3 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
    isTrending: true,
    viewsCount: 1420
  },
  {
    id: 'insight-02',
    title: 'Xu hướng "Chia sẻ công suất nhà xưởng nhàn rỗi" bùng nổ tại các cụm công nghiệp phía Nam',
    category: 'supply_chain',
    categoryLabel: 'Chuỗi Cung Ứng & Sản Xuất',
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
    publishedAt: 'Hôm qua, 14:15',
    readTime: '4 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    isTrending: true,
    viewsCount: 2180
  },
  {
    id: 'insight-03',
    title: 'Nghị định mới về Thương mại Điện tử & Hóa đơn số: Giải pháp liên kết kho bãi để giảm 30% chi phí fulfillment',
    category: 'policy_tax',
    categoryLabel: 'Chính Sách & Thuế',
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
    publishedAt: '28-09-2026',
    readTime: '3 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    isTrending: false,
    viewsCount: 980
  },
  {
    id: 'insight-04',
    title: 'Case Study: Mô hình F&B "Buổi sáng Cà phê mang đi - Buổi tối Bia thủ công & Acoustic" tăng gấp 2.4 lần doanh thu mặt bằng',
    category: 'case_study',
    categoryLabel: 'Bài Học Thực Chiến B2B',
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
    publishedAt: '27-09-2026',
    readTime: '5 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    isTrending: true,
    viewsCount: 3410
  },
  {
    id: 'insight-05',
    title: 'Ứng dụng AI Mini-Agent trong thẩm định đối tác B2B: Giảm 90% rủi ro nợ xấu và sai lệch cam kết',
    category: 'tech_ai',
    categoryLabel: 'AI & Chuyển Đổi Số',
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
    publishedAt: '26-09-2026',
    readTime: '3 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    isTrending: false,
    viewsCount: 1650
  },
  {
    id: 'insight-06',
    title: 'Cơ hội thị trường xuất khẩu sản phẩm chứng nhận Halal: Mảnh đất màu mỡ cho chuỗi thực phẩm Việt',
    category: 'funding_market',
    categoryLabel: 'Dòng Vốn & Thị Trường',
    summary: 'Thị trường Halal toàn cầu đạt quy mô 2.300 tỷ USD đang mở ra cánh cửa rộng lớn cho các đơn vị có vùng nguyên liệu nông nghiệp sạch liên kết với cơ sở chế biến đạt chuẩn.',
    content: 'Khu vực Trung Đông và các quốc gia Đông Nam Á lân cận như Indonesia, Malaysia đang có nhu cầu cực lớn về nông sản sấy, cà phê, gia vị và thủy hải sản chế biến từ Việt Nam. Trở ngại lớn nhất của các đơn vị địa phương là chi phí chứng nhận Halal và quy trình kiểm soát nhiễm chéo chuỗi cung ứng. Giải pháp tối ưu là thành lập các cụm liên kết (Clustering): một doanh nghiệp đầu tàu có chứng nhận bảo trợ và gia công đóng gói cho các hộ nông nghiệp vệ tinh.',
    keyTakeaways: [
      'Biên lợi nhuận của sản phẩm đạt chuẩn Halal xuất khẩu cao hơn từ 25% - 40% so với bán thô nội địa.',
      'Các hiệp hội thương mại đang tài trợ 50% chi phí tư vấn chứng chỉ cho các doanh nghiệp liên minh hợp tác.',
      'Cần sớm xây dựng liên minh giữa Đơn vị có nguồn nguyên liệu chất lượng cao và Đơn vị sở hữu chứng chỉ/kinh nghiệm logistics quốc tế.'
    ],
    actionableOpportunity: 'Kết nối ngay với các chuyên gia tư vấn tiêu chuẩn xuất khẩu và đơn vị gia công thực phẩm có sẵn chứng nhận quốc tế.',
    suggestedActionType: 'deal_room',
    suggestedActionLabel: 'Đàm Phán Liên Minh Chế Biến Xuất Khẩu',
    defaultDealPrompt: {
      partyAResources: 'Vùng trồng chanh leo và xoài cát 25 hecta tại Đồng Nai, sản lượng 40 tấn/tháng, đạt chuẩn VietGAP.',
      partyBResources: 'Nhà máy sấy lạnh và đóng gói đạt chuẩn ISO 22000, có sẵn chứng chỉ Halal và kênh phân phối đi UAE.',
      dealType: 'Gia công xuất khẩu ODM & Chia sẻ lợi nhuận đơn hàng quốc tế',
      targetGoal: 'Xuất khẩu lô hàng thử nghiệm 5 tấn trái cây sấy sang thị trường Trung Đông trong quý tới.'
    },
    source: 'Bộ Công Thương & Cục Xúc tiến Thương mại',
    publishedAt: '25-09-2026',
    readTime: '4 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
    isTrending: false,
    viewsCount: 1890
  }
];
