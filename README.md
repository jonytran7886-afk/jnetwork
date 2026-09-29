# jnetwork — Cùng Làm

Ứng dụng web tiếng Việt để chia sẻ nguồn lực và khám phá cơ hội hợp tác, với thông điệp **“Kết nối nguồn lực. Kiến tạo cơ hội.”** Tên hiển thị hiện tại là **Cùng Làm**; `jnetwork` là tên thư mục dự án.

Source hiện là bản demo tương tác: xem/lọc cơ hội theo nhóm, mở chi tiết, thêm bài đăng và đánh dấu quan tâm trong bộ nhớ React. Đăng nhập/đăng ký và gửi lời hợp tác chỉ mô phỏng thành công. Chưa có database, tài khoản thật hay gửi thông tin tới người khác. Tải lại trang sẽ mất bài đăng mới và trạng thái đã lưu.

## Công nghệ

- React 19, TypeScript, Vite 8, Tailwind CSS 4, Lucide React.
- Express 4 chạy bằng `tsx`, phục vụ frontend và 7 API AI còn lại từ các hướng sản phẩm cũ.
- Frontend Cùng Làm hiện không gọi các API này. Gemini API key không bắt buộc để chạy giao diện.

## Chạy tại máy

Cần Node.js và npm tương thích với dependency trong `package.json`. Dự án chưa khai báo `engines` hoặc cố định phiên bản Node. Source có `bun.lock`, chưa có `package-lock.json`; npm install sẽ tạo lockfile npm riêng.

```powershell
npm install
npm run dev
```

Mở `http://localhost:3000`. Biến môi trường `PORT` có thể đổi cổng Express.

Nếu cần thử API Gemini, tạo `.env` ở thư mục gốc và đặt khóa thật vào `GEMINI_API_KEY`. Server dùng `dotenv.config()` mặc định, không cấu hình đọc `.env.local`. Bỏ hẳn khóa để dùng phản hồi dự phòng. Model trong source là chuỗi `gemini-3.8-flash`; tài liệu này không xác nhận model đó khả dụng trên dịch vụ.

## Các lệnh

| Lệnh | Hành vi |
| --- | --- |
| `npm run lint` | Kiểm tra TypeScript bằng `tsc --noEmit`, không phải ESLint |
| `npm run build` | Build frontend vào `dist/`, không biên dịch backend |
| `npm start` | Chạy `tsx server.ts`; chế độ phụ thuộc `NODE_ENV` |
| `npm run preview` | Xem frontend build qua Vite, không khởi chạy API Express |
| `npm run clean` | Script `rm -rf dist server.js`, cần shell hỗ trợ cú pháp Unix |

Chạy bản build cùng Express trong PowerShell:

```powershell
npm run build
$env:NODE_ENV = 'production'
npm start
```

Backend vẫn chạy qua `tsx`, nên môi trường chạy cần công cụ này dù đang ở chế độ production. Chế độ production không biến các chức năng demo thành chức năng vận hành thật.

## Tài liệu

- [Chức năng thực tế và giới hạn](DOCUMENTATION.md).
- [Kiến trúc, dữ liệu và API](SYSTEM_ARCHITECTURE_V1.md) — giữ tên file cũ để không làm đứt liên kết; nội dung đã cập nhật theo source.

Cập nhật theo mã nguồn ngày **2026-09-29**. `package.json` vẫn ghi `react-example`, phiên bản `0.0.0`; không có cơ sở gọi đây là bản phát hành thương mại v1/v2.
