export interface BusinessContactDocument {
  id: string;
  title: string;
  type: 'profile' | 'catalogue' | 'price_list' | 'certificate' | 'contract';
  fileUrl: string;
  fileSize?: string;
  updatedAt: string;
}

export interface BusinessContactItem {
  id: string;
  userId?: string; // UID of owner
  contactName: string;
  company: string;
  position: string;
  phone: string;
  zaloPhone?: string;
  email?: string;
  industry: string;
  location: string;
  avatarUrl?: string;
  tags: string[];
  coreStrengths: string;
  needs: string;
  meetingContext: string;
  documents?: BusinessContactDocument[];
  isVerified?: boolean;
  rating?: number;
  lastContactedAt?: string;
  createdAt: string;
}

export const INITIAL_BUSINESS_CONTACTS: BusinessContactItem[] = [
  {
    id: 'contact-01',
    contactName: 'Trần Đình Quang',
    company: 'Công Ty Cổ Phần Cơ Khí Chính Xác Nam Khang',
    position: 'Tổng Giám Đốc',
    phone: '0918456789',
    zaloPhone: '0918456789',
    email: 'quang.tran@namkhangprecision.vn',
    industry: 'Cơ khí & Chế tạo máy',
    location: 'KCN Sóng Thần, Bình Dương',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    tags: ['Xưởng Cơ Khí', 'Đối Tác Cung Ứng', 'Bình Dương', 'ISO 9001'],
    coreStrengths: 'Xưởng CNC 2.000m² với 18 máy tiện phay 4 trục, chuyên gia công chi tiết kim loại độ chính xác cao cho tập đoàn Nhật Bản.',
    needs: 'Tìm đối tác xử lý bề mặt xi mạ kim loại đạt chuẩn RoHS để liên danh thầu gói phụ trợ 5 tỷ đồng.',
    meetingContext: 'Gặp gỡ tại Diễn đàn Kết nối Chuỗi Cung Ứng Phía Nam 2026',
    isVerified: true,
    rating: 5,
    documents: [
      {
        id: 'doc-01-1',
        title: 'Hồ Sơ Năng Lực & Danh Mục Máy Móc CNC 2026',
        type: 'profile',
        fileUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
        fileSize: '3.8 MB',
        updatedAt: '15-09-2026',
      },
      {
        id: 'doc-01-2',
        title: 'Chứng nhận Hệ thống Quản lý ISO 9001:2015',
        type: 'certificate',
        fileUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
        fileSize: '1.2 MB',
        updatedAt: '01-08-2026',
      },
    ],
    lastContactedAt: 'Hôm qua',
    createdAt: '2026-09-15',
  },
  {
    id: 'contact-02',
    contactName: 'Nguyễn Thị Bích Ngọc',
    company: 'Logistics Vận Tải Lạnh Mekong Express',
    position: 'Giám Đốc Vận Hành',
    phone: '0903889123',
    zaloPhone: '0903889123',
    email: 'bichngoc@mekonglogistics.vn',
    industry: 'Logistics & Kho lạnh',
    location: 'Cảng Cát Lái, TP. Thủ Đức, TP.HCM',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    tags: ['Vận Tải Lạnh', 'Cửa Khẩu', 'Xuất Nhập Khẩu', 'Đồng Bằng Sông Cửu Long'],
    coreStrengths: 'Đội xe 25 container lạnh kiểm soát nhiệt độ từ -20°C đến 5°C, chuyên tuyến miền Tây - cửa khẩu Lạng Sơn và cảng Cát Lái.',
    needs: 'Tìm đối tác hợp tác kho lạnh trung chuyển tại khu vực Long An và Hưng Yên để giảm 20% chi phí xe quay đầu.',
    meetingContext: 'Hội thảo Xuất khẩu Nông sản Xanh TP.HCM',
    isVerified: true,
    rating: 5,
    documents: [
      {
        id: 'doc-02-1',
        title: 'Bảng Cước Vận Tải Tuyến Bắc Nam & Dịch Vụ Kho Lạnh 2026',
        type: 'price_list',
        fileUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
        fileSize: '2.1 MB',
        updatedAt: '20-09-2026',
      },
    ],
    lastContactedAt: '3 ngày trước',
    createdAt: '2026-09-18',
  },
  {
    id: 'contact-03',
    contactName: 'Hoàng Minh Tuấn',
    company: 'Chuỗi Trà & Cà Phê Mộc Viên Organic',
    position: 'Sáng Lập & Chủ Tịch',
    phone: '0979112233',
    zaloPhone: '0979112233',
    email: 'tuan.hoang@mocvien.vn',
    industry: 'F&B & Bán Lẻ',
    location: 'Quận 1, TP.HCM & Đà Nẵng',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    tags: ['F&B', 'Nhượng Quyền', 'Chia Sẻ Mặt Bằng', 'Dòng Tiền Đều'],
    coreStrengths: 'Chuỗi 6 cửa hàng đang vận hành có dòng tiền dương 120-180 triệu/tháng/cửa hàng, hệ thống quản trị POS tự động.',
    needs: 'Tìm nhà đầu tư nhàn rỗi hoặc chủ mặt bằng đắc địa muốn hợp tác ăn chia theo doanh thu (BCC) để mở thêm 2 chi nhánh.',
    meetingContext: 'CLB Doanh Nhân Trẻ Sài Gòn (YBA)',
    isVerified: true,
    rating: 4.8,
    documents: [
      {
        id: 'doc-03-1',
        title: 'Bản Đề Xuất Nhượng Quyền & Mô Phỏng Hoàn Vốn 18 Tháng',
        type: 'catalogue',
        fileUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
        fileSize: '4.5 MB',
        updatedAt: '25-09-2026',
      },
    ],
    lastContactedAt: '1 tuần trước',
    createdAt: '2026-09-20',
  },
  {
    id: 'contact-04',
    contactName: 'Luật sư Lê Văn Thành',
    company: 'Văn Phòng Luật Sư Doanh Nghiệp & Đầu Tư APEX',
    position: 'Luật Sư Điều Hành',
    phone: '0988665544',
    zaloPhone: '0988665544',
    email: 'thanh.le@apexlaw.vn',
    industry: 'Pháp Lý & Thẩm Định Hợp Đồng',
    location: 'Ba Đình, Hà Nội',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    tags: ['Pháp Lý', 'Hợp Đồng MOU', 'M&A', 'Trọng Tài Thương Mại'],
    coreStrengths: '15 năm kinh nghiệm soạn thảo hợp đồng hợp tác kinh doanh (BCC), thỏa thuận bảo mật NDA và cơ chế cổ đông sáng lập.',
    needs: 'Kết nối mạng lưới doanh nghiệp SME cần tư vấn rà soát hợp đồng kinh tế và tái cấu trúc pháp lý dự án.',
    meetingContext: 'Diễn đàn Pháp Lý Doanh Nghiệp VCCI 2026',
    isVerified: true,
    rating: 5,
    documents: [
      {
        id: 'doc-04-1',
        title: 'Mẫu Bộ Hợp Đồng Thỏa Thuận Hợp Tác B2B & Bảo Mật Nguồn Lực',
        type: 'contract',
        fileUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
        fileSize: '1.8 MB',
        updatedAt: '10-09-2026',
      },
    ],
    lastContactedAt: '2 tuần trước',
    createdAt: '2026-09-10',
  },
];

/**
 * Generates standard vCard 3.0 file content for seamless mobile/desktop contact import
 */
export function generateVCardString(contact: BusinessContactItem): string {
  const cleanPhone = contact.phone.replace(/[^0-9+]/g, '');
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${contact.contactName}`,
    `ORG:${contact.company}`,
    `TITLE:${contact.position}`,
    `TEL;TYPE=CELL,VOICE:${cleanPhone}`,
    contact.email ? `EMAIL;TYPE=WORK,INTERNET:${contact.email}` : '',
    contact.location ? `ADR;TYPE=WORK:;;${contact.location};;;;Việt Nam` : '',
    `NOTE:Thế mạnh: ${contact.coreStrengths} | Nhu cầu: ${contact.needs} | Ngữ cảnh: ${contact.meetingContext}`,
    'URL:https://jnetwork.ai.studio',
    'END:VCARD',
  ]
    .filter(Boolean)
    .join('\r\n');
}

/**
 * Triggers client-side browser download for a .vcf file
 */
export function downloadVCard(contact: BusinessContactItem): void {
  const vcardText = generateVCardString(contact);
  const blob = new Blob([vcardText], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const safeFileName = contact.contactName.replace(/[^a-zA-Z0-9_\u00C0-\u024F\u1EA0-\u1EF9]/g, '_');
  link.setAttribute('download', `${safeFileName}_JNetwork.vcf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
