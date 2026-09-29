# Kiến Trúc Hệ Thống Toàn Diện — J-Network

**Cập nhật:** 29-09-2026  
**File định danh:** `SYSTEM_ARCHITECTURE_V1.md`  
**Mục tiêu:** Mô tả sơ đồ luồng dữ liệu, cấu trúc module và kiến trúc micro-utility của nền tảng J-Network.

---

## 1. Sơ Đồ Khối Kiến Trúc (High-Level Architecture)

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        Client Layer (Web / Mobile)                     │
│  - React 19 Client Components ('use client')                           │
│  - Tailwind CSS v4, Motion (motion/react), Lucide Icons                │
│  - Realtime Firestore Listener (onSnapshot for Opportunities & Users)   │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│                    Next.js 16.3 App Router Server                      │
│  ├── SSR / Static Pre-rendering: src/app/page.tsx, layout.tsx          │
│  ├── API Routes Layer:                                                 │
│  │   ├── GET  /api/health            (Container Healthcheck Probe)     │
│  │   ├── POST /api/ai/deal-validator (CCO Deal Valuation & MOU Engine) │
│  │   ├── POST /api/ai/stress-test    (Product Viability Analyzer)      │
│  │   └── POST /api/ai/generate-ideas (Universal Ideas Engine)          │
│  └── Standalone Runtime: server.js (0ms Startup, dynamic $PORT)        │
└──────────────────┬─────────────────────────────────┬───────────────────┘
                   │                                 │
                   ▼                                 ▼
┌──────────────────────────────────────┐  ┌──────────────────────────────┐
│       Google Cloud Firestore         │  │     Google Gemini AI Cloud   │
│  - Collection: users                 │  │  - Model: gemini-2.5-flash   │
│  - Collection: opportunities         │  │  - SDK: @google/genai        │
│  - Collection: invitations           │  │  - JSON Schema Strict Output │
│  - Rules: firestore.rules (deployed) │  │  - Heuristic Matrix Fallback │
└──────────────────────────────────────┘  └──────────────────────────────┘
```

---

## 2. Bản Đồ Thư Mục & Phân Bổ Trách Nhiệm

| Đường dẫn | Vai trò & Trách nhiệm kiến trúc |
| :--- | :--- |
| `src/app/page.tsx` | Trang chủ điều phối chính (Orchestrator), tích hợp state Firestore và mở các Modal tương tác |
| `src/app/layout.tsx` | Khung layout tổng thể, tối ưu SEO, OpenGraph metadata, font chữ Plus Jakarta Sans |
| `src/app/api/health/route.ts` | Endpoint kiểm tra sức khỏe hệ thống trả về HTTP 200, phục vụ Cloud Run & Docker |
| `src/app/api/ai/deal-validator/route.ts` | Phân tích tương hỗ Win-Win, đề xuất cơ chế chia sẻ doanh thu và sinh MOU tự động |
| `src/components/Navbar.tsx` | Header điều hướng thích ứng (Adaptive Breakpoint) chống vỡ layout trên mọi kích thước màn hình |
| `src/components/CommercialDealRoom.tsx` | Phân hệ giao thương B2B, phòng đàm phán AI, sàn pipeline cơ hội và chuẩn tín nhiệm J-Trust |
| `src/components/HeroSection.tsx` | Khối hero truyền cảm hứng, ô tìm kiếm thông minh và 4 tab lọc nhanh nguồn lực |
| `src/components/OpportunitiesSection.tsx` | Danh sách hiển thị cơ hội với bộ lọc thời gian thực và đánh dấu lưu bài |
| `src/components/MemberHubModal.tsx` | Bảng điều khiển thành viên quản lý bài đăng, lời mời hợp tác và hội thoại |
| `src/lib/firebase.ts` | Khởi tạo kết nối Firebase App, Auth và Cloud Firestore theo config bảo mật |
| `src/lib/gemini.ts` | Cấu hình GoogleGenAI client với process.env.GEMINI_API_KEY ở server-side |
| `Dockerfile` | Multi-stage Dockerfile cho Node 22 Alpine, đóng gói Standalone chỉ ~80MB |
| `cloudbuild.yaml` | Cấu hình kích hoạt build container trên Google Cloud Build |

---

## 3. Mô Hình Thực Thể Dữ Liệu (Firestore Entity Schema)

### 3.1. Entity: `Opportunity` (Bộ sưu tập: `opportunities`)
```typescript
interface OpportunityItem {
  id: string;                         // Mã định danh cơ hội
  category: 'project' | 'resource' | 'space' | 'partner';
  categoryLabel: string;             // Nhãn hiển thị tiếng Việt
  title: string;                      // Tiêu đề cơ hội
  location: string;                   // Địa điểm triển khai
  resourceHighlight: string;          // Nguồn lực nổi bật sẵn có
  cooperationType: string;            // Hình thức hợp tác mong muốn
  imageUrl: string;                   // Ảnh đại diện
  whatIHave: string;                  // Điều tôi có thể cung cấp
  whatINeed: string;                  // Điều tôi đang tìm kiếm
  detailedDescription?: string;       // Mô tả chi tiết
  creatorName: string;                // Tên người đăng bài
  creatorRole: string;                // Vai trò (Doanh chủ, Chuyên gia,...)
  createdTime: string;                // Thời gian đăng tải
  isBookmarked?: boolean;             // Trạng thái đã lưu của người dùng hiện tại
}
```

### 3.2. Entity: `DealEvaluation` (Sinh bởi AI CCO Engine)
```typescript
interface DealEvaluation {
  dealFeasibilityScore: number;       // Điểm khả thi thương mại (65 - 98)
  commercialVerdict: string;          // Đánh giá tổng quan từ góc nhìn Giám đốc Kinh doanh
  winWinAnalysis: string;             // Phân tích tương hỗ và bổ trợ nguồn lực song phương
  revenueShareFormula: string;        // Công thức phân chia doanh thu ròng khuyến nghị
  financialRiskAlerts: string[];      // 2 rủi ro tài chính/công nợ trọng yếu
  actionMilestones: {                 // Lộ trình 30-60-90 ngày
    timeline: string;
    deliverable: string;
  }[];
  draftMOU: {                         // Biên bản ghi nhớ thỏa thuận sơ bộ
    title: string;
    purpose: string;
    commitmentsA: string;
    commitmentsB: string;
    disputeResolution: string;
  };
  ccoRecommendation: string;          // Lời khuyên vàng để chốt thương vụ trong 48 giờ
}
```

---

## 4. Cơ Chế Triển Khai & Vận Hành Liên Tục (CI/CD)

1. **Local Build**:
   ```bash
   npm run lint && npm run build
   ```
2. **Google Cloud Run Deployment**:
   - Khi tiến hành Publish từ AI Studio, hệ thống đọc trực tiếp `Dockerfile` và `cloudbuild.yaml` tại thư mục gốc.
   - Quá trình build sử dụng cache layer của Docker và cài đặt qua `npm ci` độc lập, tạo ra artifact Standalone gọn nhẹ.
   - Cloud Run khởi chạy container với user không đặc quyền `nextjs`, cấp phát cổng qua `$PORT` và tự động kiểm tra tính sẵn sàng qua probe `http://127.0.0.1:${PORT}/api/health`.
