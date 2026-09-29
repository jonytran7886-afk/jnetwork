# jnetwork — Kiến trúc hiện tại

Cập nhật theo source: **2026-09-29**. Thay thế `SYSTEM_ARCHITECTURE_V1.md` sau khi chuyển toàn bộ source từ Vite + Express sang **Next.js (App Router)**; nội dung dưới đây phản ánh cấu trúc mã nguồn thực tế, không phải đặc tả UniversalNeeds/FamilyShield/RealMatch từ trước.

## 1. Vì sao chuyển sang Next.js

Trước đợt cập nhật này, dự án dùng Vite cho frontend và một server Express riêng (`server.ts`) chỉ để (a) phục vụ Vite middleware/`dist/` và (b) đăng ký 7 API AI (Gemini) thuộc các sản phẩm cũ (UniversalNeeds Studio, FamilyShield, RealMatch) mà giao diện Cùng Làm **không gọi tới**. Việc này tạo ra hai tầng build (Vite + esbuild cho server) và nhiều mã không dùng.

Next.js App Router gộp việc render, routing và build vào một framework chuẩn, có sẵn tối ưu ảnh (`next/image`), font (`next/font`) và chế độ build `standalone` phù hợp để đóng Docker image nhỏ. Các API AI không liên quan đã được **xóa hẳn** theo quyết định khi rà soát lại (không di chuyển thành API route), vì frontend hiện tại không sử dụng.

## 2. Thành phần và luồng dữ liệu

```text
Trình duyệt
  src/app/layout.tsx (Server Component, fonts + metadata)
    → src/app/page.tsx ('use client', toàn bộ state UI)
        → components/layout (Header, Footer)
        → components/sections (Hero, Pillars, HowItWorks, OpportunityList, CommunityValues, CtaSection)
        → components/modals (OpportunityDetailModal, ShareOpportunityModal, AuthModal, CommunityPrinciplesModal)
                                 ↑
                    data/opportunities.ts → React useState (không có store/API)

next build (output: 'standalone')
  └─ next start / node server.js phục vụ HTML + assets tĩnh
```

Frontend là ứng dụng Next.js 16 / React 19 / TypeScript, dựng bằng Tailwind CSS 4 (qua plugin PostCSS `@tailwindcss/postcss`). `src/app/page.tsx` là Client Component duy nhất giữ toàn bộ state (cơ hội, bộ lọc, tìm kiếm, modal, toast); các section/modal nhận dữ liệu và callback qua props. Không có router phụ (chỉ 1 trang), store bên ngoài hay tầng gọi API từ frontend — đúng với hiện trạng demo tương tác trong bộ nhớ.

Không có backend riêng: không Express, không database, không endpoint AI. Nếu sau này cần API, dùng Next.js Route Handlers (`src/app/api/**/route.ts`) thay vì dựng lại server Express.

## 3. Bản đồ mã nguồn

| File/nhóm file | Trách nhiệm |
|---|---|
| `src/app/layout.tsx` | Server Component gốc: khai báo font (`next/font/google`), metadata `<head>`, class `<html>/<body>`. |
| `src/app/page.tsx` | Client Component duy nhất: state cơ hội, bộ lọc, tìm kiếm, modal, toast, điều hướng cuộn. |
| `src/app/globals.css` | Import Tailwind, biến font, scrollbar tùy biến. |
| `src/data/opportunities.ts` | Kiểu `OpportunityItem`/`CommunityValueItem`/`TestimonialItem`, 4 cơ hội mẫu (`INITIAL_OPPORTUNITIES`), `COMMUNITY_VALUES`. |
| `src/data/categories.ts` | Nguồn dữ liệu **duy nhất** cho 4 nhóm cơ hội (key, nhãn, icon, màu, ảnh mẫu) — dùng chung cho Hero, Pillars, OpportunityList, Footer và ShareOpportunityModal để tránh lệch nhãn. |
| `src/components/layout/Header.tsx`, `Footer.tsx` | Thanh điều hướng trên/dưới trang. |
| `src/components/sections/*.tsx` | Hero, Pillars, HowItWorks, OpportunityList, CommunityValues, CtaSection — các khối nội dung của trang chủ. |
| `src/components/modals/*.tsx` | OpportunityDetailModal, ShareOpportunityModal, AuthModal, CommunityPrinciplesModal — các hộp thoại tương tác. |
| `next.config.ts` | `output: 'standalone'`, khai báo `images.remotePatterns` cho ảnh Unsplash. |
| `postcss.config.mjs` | Plugin `@tailwindcss/postcss` cho Tailwind CSS 4. |
| `tsconfig.json` | Alias `@/*` trỏ về `./src/*`, cấu hình chuẩn Next.js App Router. |
| `docker/Dockerfile` | Build multi-stage, chạy `next build` rồi copy `.next/standalone` sang image runtime. |

Không còn `vite.config.ts`, `server.ts`, `index.html`, `src/main.tsx`, `src/App.tsx`, `metadata.json` (tệp đặc thù nền tảng AI Studio cũ) hay `src/data/pillars.ts`/`blueprints.ts` (dữ liệu sản phẩm cũ không được UI sử dụng) — toàn bộ đã bị loại bỏ khi tái cấu trúc.

Giao diện dùng nền slate sáng, thẻ trắng, điểm nhấn hồng `#FF2D55`. Font chính là Plus Jakarta Sans (`next/font/google`, tự host, không gọi Google Fonts runtime); font phụ Space Grotesk khai báo qua biến CSS nhưng chưa được gán cho phần tử nào — có thể dùng cho heading nếu cần nhấn mạnh. Ảnh cơ hội dùng URL Unsplash qua `next/image` (đã khai báo `remotePatterns`); chưa có ảnh tải lên từ người dùng.

## 4. Mô hình dữ liệu

`OpportunityItem` (`src/data/opportunities.ts`):

| Trường | Kiểu/ý nghĩa |
|---|---|
| `id` | string |
| `category` | `'project' \| 'resource' \| 'space' \| 'partner'` (xem `OpportunityCategory` trong `categories.ts`) |
| `categoryLabel` | Nhãn tiếng Việt tương ứng — phải khớp `CATEGORY_BY_KEY[category].label` |
| `title`, `location` | Tiêu đề và địa điểm dạng chuỗi |
| `resourceHighlight`, `cooperationType` | Điểm nhấn và hướng hợp tác |
| `imageUrl` | URL ảnh (Unsplash) |
| `whatIHave`, `whatINeed`, `detailedDescription` | Nguồn lực, nhu cầu, mô tả |
| `creatorName`, `creatorRole` | Tên và vai trò hiển thị |
| `createdTime` | Chuỗi thời gian hiển thị, không phải timestamp |
| `isBookmarked` | boolean tùy chọn |

`CategoryDefinition` (`src/data/categories.ts`) gom `key`, `label`, `icon` (Lucide), `iconClassName`, `bgClassName`, `sampleImageUrl` cho mỗi nhóm — là nguồn duy nhất được `Hero`, `Pillars`, `OpportunityList`, `Footer` và `ShareOpportunityModal` import, thay cho việc mỗi component tự khai báo danh sách 4 nhóm như trước.

`page.tsx` khởi tạo `opportunities` từ `INITIAL_OPPORTUNITIES` mỗi lần tải trang; không lưu xuống server hay `localStorage`/`sessionStorage`. Modal chi tiết (`OpportunityDetailModal`) nhận opportunity bằng cách tra cứu theo `id` trong mảng state hiện tại (không giữ object riêng), nên toggle bookmark từ danh sách phản ánh ngay trong modal đang mở.

## 5. Cấu hình và vận hành

| Biến/Tệp | Vai trò |
|---|---|
| — | Ứng dụng hiện không yêu cầu biến môi trường nào để `dev`/`build`/`start`. |
| `next.config.ts` | `output: 'standalone'` cho Docker; `images.remotePatterns` cho phép `images.unsplash.com`. |
| `.env.example` | Giữ làm chỗ khai báo secret trong tương lai, hiện chưa cần biến nào. |
| `.env.production` | Giá trị mặc định công khai cho Docker Compose (`NODE_ENV`, `PORT`, `JNETWORK_PORT`, `JNETWORK_IMAGE`). |

Lệnh chạy: `npm run dev` (Next.js dev server + HMR), `npm run build` (build production, tạo `.next/standalone`), `npm start` (chạy `next start`, cần `npm run build` trước), `npm run lint` (`next lint`, ESLint flat config kế thừa `next/core-web-vitals` và `next/typescript`), `npm run typecheck` (`tsc --noEmit`).

## 6. Phạm vi kiểm chứng

Tài liệu được đối chiếu tĩnh với cấu trúc thư mục, component, data và cấu hình Next.js/Docker sau khi tái cấu trúc. Chưa chạy `npm install`, `next build` hay thử trình duyệt trong lần cập nhật này vì môi trường thao tác không có kết nối registry npm ổn định — xem [`FEATURES.md`](./FEATURES.md) để biết giới hạn hành vi hiện tại của giao diện.

Khi cập nhật thêm, đối chiếu trực tiếp với `src/app/page.tsx` và các component/data thực tế trước khi ghi một chức năng là "đã triển khai".
