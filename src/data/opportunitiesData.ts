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

const unsplash = (photoId: string) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=800&q=80`;

/** Ảnh minh họa theo nhóm. Mỗi lần đăng chọn ngẫu nhiên trong pool, ưu tiên ảnh chưa dùng. */
export const OPPORTUNITY_IMAGE_POOLS: Record<OpportunityItem['category'], string[]> = {
  project: [
    unsplash('photo-1517256064527-09c73fc73e38'),
    unsplash('photo-1495474472287-4d71bcdd2085'),
    unsplash('photo-1501339847302-ac426a4a7cbb'),
    unsplash('photo-1554118811-1e0d58224f24'),
    unsplash('photo-1445116572660-236099ec97a0'),
    unsplash('photo-1556742049-0cfed4f6a45d'),
    unsplash('photo-1460925895917-afdab827c52f'),
    unsplash('photo-1556761175-5973dc0f32e7'),
  ],
  resource: [
    unsplash('photo-1581783342308-f792dbdd27c5'),
    unsplash('photo-1504148455328-c376907d081c'),
    unsplash('photo-1581091226825-a6a2a5aee158'),
    unsplash('photo-1504328345606-18bbc8c9d7d1'),
    unsplash('photo-1565043666747-69f6646db940'),
    unsplash('photo-1565793298595-6a879b1d9492'),
    unsplash('photo-1416879595882-3373a0480b5b'),
    unsplash('photo-1581094794329-c8112a89af12'),
  ],
  space: [
    unsplash('photo-1497366216548-37526070297c'),
    unsplash('photo-1497215728101-856f4ea42174'),
    unsplash('photo-1497366811353-6870744d04b2'),
    unsplash('photo-1524758631624-e2822e304c36'),
    unsplash('photo-1497366754035-f200968a6e72'),
    unsplash('photo-1527192491265-7e15c55b1ed2'),
    unsplash('photo-1604328698692-f76ea9498e76'),
    unsplash('photo-1517502884422-41eaead166d4'),
  ],
  partner: [
    unsplash('photo-1498050108023-c5249f4df085'),
    unsplash('photo-1519389950473-47ba0277781c'),
    unsplash('photo-1522071820081-009f0129c71c'),
    unsplash('photo-1551434678-e076c223a692'),
    unsplash('photo-1531482615713-2afd69097998'),
    unsplash('photo-1600880292203-757bb62b4baf'),
    unsplash('photo-1517245386807-bb43f82c33c4'),
    unsplash('photo-1552664730-d307ca884978'),
  ],
};

export function pickOpportunityImage(
  category: OpportunityItem['category'],
  usedImageUrls: Iterable<string> = [],
): string {
  const pool = OPPORTUNITY_IMAGE_POOLS[category];
  const used = new Set(usedImageUrls);
  const unused = pool.filter((url) => !used.has(url));
  const candidates = unused.length > 0 ? unused : pool;
  return candidates[Math.floor(Math.random() * candidates.length)];
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
