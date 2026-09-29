# jnetwork — Cùng Làm

Ứng dụng web tiếng Việt để chia sẻ nguồn lực và khám phá cơ hội hợp tác, với thông điệp **"Kết nối nguồn lực. Kiến tạo cơ hội."** Tên hiển thị hiện tại là **Cùng Làm**; `jnetwork` là tên thư mục dự án.

Source hiện là bản demo tương tác: xem/lọc cơ hội theo nhóm, mở chi tiết, thêm bài đăng và đánh dấu quan tâm trong bộ nhớ React (phía client). Đăng nhập/đăng ký và gửi lời hợp tác chỉ mô phỏng thành công. Chưa có database, tài khoản thật hay gửi thông tin tới người khác. Tải lại trang sẽ mất bài đăng mới và trạng thái đã lưu.

## Công nghệ

- **Next.js 16** (App Router), **React 19**, **TypeScript**.
- **Tailwind CSS 4** (qua `@tailwindcss/postcss`), **lucide-react** cho icon, **motion** cho hoạt ảnh.
- Không có backend riêng: không Express, không database, không API AI. Ứng dụng build bằng `next build` với `output: 'standalone'` để đóng Docker image gọn.

## Cấu trúc thư mục

```text
src/
  app/            # App Router: layout.tsx, page.tsx, globals.css
  components/
    layout/       # Header, Footer
    sections/     # Hero, Pillars, HowItWorks, OpportunityList, CommunityValues, CtaSection
    modals/       # OpportunityDetailModal, ShareOpportunityModal, AuthModal, CommunityPrinciplesModal
  data/           # opportunities.ts (dữ liệu mẫu), categories.ts (nguồn nhóm cơ hội duy nhất)
docs/             # PRODUCT_OVERVIEW.md, ARCHITECTURE.md, FEATURES.md
docker/           # Dockerfile, docker-compose*.yml, hướng dẫn build/deploy
```

Tất cả tên file/thư mục trong mã nguồn dùng tiếng Anh theo chuẩn cộng đồng Next.js; nội dung hiển thị cho người dùng vẫn bằng tiếng Việt.

## Chạy tại máy

Cần Node.js tương thích với dependency trong `package.json` (khuyến nghị Node 22+). Dự án chưa có lockfile được commit; `npm install` sẽ tạo `package-lock.json` riêng.

```powershell
npm install
npm run dev
```

Mở http://localhost:3000.

## Các lệnh

| Lệnh | Hành vi |
| --- | --- |
| `npm run dev` | Chạy Next.js dev server (Fast Refresh). |
| `npm run build` | Build production; tạo `.next/standalone` để đóng Docker image. |
| `npm start` | Chạy `next start`; cần `npm run build` trước. |
| `npm run lint` | `next lint` — ESLint flat config kế thừa `next/core-web-vitals` và `next/typescript`. |
| `npm run typecheck` | `tsc --noEmit`. |

## Tài liệu

- [`docs/PRODUCT_OVERVIEW.md`](docs/PRODUCT_OVERVIEW.md) — định hướng sản phẩm (đối tượng, mô hình nội dung, giai đoạn phát hành).
- [`docs/FEATURES.md`](docs/FEATURES.md) — chức năng thực tế và giới hạn của bản demo hiện tại, đối chiếu với source.
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — cấu trúc mã nguồn, mô hình dữ liệu, cấu hình build/Docker.
- [`docker/README.md`](docker/README.md) — build và chạy bằng Docker.
- [`docker/JENKINS.md`](docker/JENKINS.md) — cấu hình pipeline CI/CD.

Cập nhật theo mã nguồn ngày **2026-09-29**, sau khi tái cấu trúc từ Vite + Express sang Next.js App Router. `package.json` ghi phiên bản `0.1.0`; không có cơ sở gọi đây là bản phát hành thương mại v1/v2.
