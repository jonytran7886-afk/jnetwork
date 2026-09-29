export interface OpportunityItem {
  id: string;
  category: 'project' | 'resource' | 'space' | 'partner';
  categoryLabel: 'Dự án & ý tưởng' | 'Nguồn lực hợp tác' | 'Không gian chia sẻ' | 'Cộng đồng chuyên môn';
  title: string;
  location: string;
  resourceHighlight: string;
  cooperationType: string;
  imageUrl: string;
  whatIHave: string;
  whatINeed: string;
  detailedDescription: string;
  creatorName: string;
  creatorRole: string;
  createdTime: string;
  isBookmarked?: boolean;
  ownerId?: string;
  status?: 'active' | 'closed' | 'paused';
}

export interface CommunityValueItem {
  id: string;
  title: string;
  description: string;
  iconName: 'compass' | 'puzzle' | 'sparkles';
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  location: string;
  avatarUrl: string;
  quote: string;
}

export const INITIAL_OPPORTUNITIES: OpportunityItem[] = [
  {
    id: 'opp-1',
    category: 'project',
    categoryLabel: 'Dự án & ý tưởng',
    title: 'Phát triển mô hình cà phê mang đi',
    location: 'Bình Thạnh, TP.HCM',
    resourceHighlight: 'Mặt bằng sẵn có',
    cooperationType: 'Hợp tác vận hành & thương hiệu',
    imageUrl: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
    whatIHave: 'Mặt bằng mặt tiền khu vực tập trung nhiều văn phòng và trường học, quầy bar inox và máy xay cà phê.',
    whatINeed: 'Đồng hành cùng cá nhân hoặc nhóm có kinh nghiệm pha chế, yêu thích ngành F&B để cùng xây dựng thực đơn và vận hành.',
    detailedDescription: 'Dự án kinh doanh quy mô nhỏ với mặt bằng sẵn có, mở ra cơ hội hợp tác trong lĩnh vực vận hành và phát triển thương hiệu. Hai bên cùng trao đổi để thống nhất mô hình và cơ chế hợp tác bình đẳng.',
    creatorName: 'Minh',
    creatorRole: 'Người khởi tạo cơ hội',
    createdTime: 'Hôm nay',
    isBookmarked: false,
  },
  {
    id: 'opp-2',
    category: 'space',
    categoryLabel: 'Không gian chia sẻ',
    title: 'Chia sẻ không gian làm việc sáng tạo',
    location: 'Cầu Giấy, Hà Nội',
    resourceHighlight: 'Môi trường sáng tạo',
    cooperationType: 'Chia sẻ không gian làm việc',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    whatIHave: 'Không gian làm việc mở 60m2 tại phố Trần Thái Tông, nhiều ánh sáng tự nhiên, trang bị bàn ghế công thái học và internet cáp quang.',
    whatINeed: 'Kết nối với những cá nhân hoặc nhóm làm việc độc lập (thiết kế, công nghệ, nội dung) có nhu cầu chia sẻ môi trường làm việc văn minh.',
    detailedDescription: 'Không gian làm việc tại Cầu Giấy, phù hợp với những cá nhân và nhóm muốn chia sẻ môi trường làm việc, tối ưu chi phí và tăng cường kết nối chuyên môn.',
    creatorName: 'Hà',
    creatorRole: 'Người khởi tạo không gian',
    createdTime: '2 ngày trước',
    isBookmarked: false,
  },
  {
    id: 'opp-3',
    category: 'resource',
    categoryLabel: 'Nguồn lực hợp tác',
    title: 'Hợp tác phát triển xưởng gia công nội thất',
    location: 'Biên Hòa, Đồng Nai',
    resourceHighlight: 'Thiết bị & kỹ thuật sẵn có',
    cooperationType: 'Mở rộng quy mô & kinh doanh',
    imageUrl: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80',
    whatIHave: 'Nhà xưởng 180m2, hệ thống máy cưa bàn trượt, máy bào liên hợp và đội ngũ kỹ thuật lành nghề.',
    whatINeed: 'Kết nối với đối tác am hiểu thiết kế nội thất dân dụng và phát triển thị trường để tối ưu hóa năng lực sản xuất.',
    detailedDescription: 'Kết nối nguồn lực về thiết bị, kỹ thuật và kinh doanh để cùng phát triển hoạt động gia công. Hai bên cùng chia sẻ thế mạnh để tạo ra các dòng sản phẩm đồ gỗ chất lượng.',
    creatorName: 'Hoàng',
    creatorRole: 'Người khởi tạo nguồn lực',
    createdTime: '3 ngày trước',
    isBookmarked: false,
  },
  {
    id: 'opp-4',
    category: 'partner',
    categoryLabel: 'Cộng đồng chuyên môn',
    title: 'Đồng hành phát triển sản phẩm công nghệ',
    location: 'Linh hoạt / Từ xa',
    resourceHighlight: 'Sản phẩm thử nghiệm',
    cooperationType: 'Hợp tác chuyên môn kỹ thuật',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    whatIHave: 'Ý tưởng sản phẩm quản lý hành trình và đơn hàng cho các đội vận chuyển nhỏ, đã có phản hồi tích cực từ 30 khách hàng thử nghiệm.',
    whatINeed: 'Đồng hành cùng kỹ sư phần mềm yêu thích xây dựng sản phẩm thực tế, có định hướng hợp tác lâu dài.',
    detailedDescription: 'Ý tưởng sản phẩm đang được triển khai, mở ra cơ hội hợp tác giữa các năng lực công nghệ và phát triển thị trường. Cùng xây dựng và đồng sở hữu giải pháp mang lại giá trị thiết thực.',
    creatorName: 'Tuấn',
    creatorRole: 'Người khởi tạo dự án',
    createdTime: '4 ngày trước',
    isBookmarked: false,
  },
];

export const COMMUNITY_VALUES: CommunityValueItem[] = [
  {
    id: 'val-1',
    title: 'Mở rộng góc nhìn',
    description: 'Tiếp cận những ý tưởng, kinh nghiệm và cách làm khác nhau thông qua các kết nối đa lĩnh vực.',
    iconName: 'compass',
  },
  {
    id: 'val-2',
    title: 'Bổ trợ thế mạnh',
    description: 'Kết hợp những năng lực và nguồn lực khác nhau để mở rộng khả năng triển khai các dự án.',
    iconName: 'puzzle',
  },
  {
    id: 'val-3',
    title: 'Cùng tạo giá trị',
    description: 'Xây dựng mối quan hệ hợp tác dựa trên mục tiêu chung, sự minh bạch và tinh thần đồng hành.',
    iconName: 'sparkles',
  },
];
