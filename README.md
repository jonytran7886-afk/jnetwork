# J-Network — Nền Tảng Kết Nối Nguồn Lực & Giao Thương B2B

> **"Kết nối nguồn lực. Kiến tạo cơ hội."**

J-Network là nền tảng số kết nối nguồn lực toàn diện và thúc đẩy giao thương B2B thực chiến. Nền tảng giải quyết triệt để bài toán tìm kiếm cộng sự, chia sẻ công suất nhà xưởng, mở rộng mạng lưới phân phối, kêu gọi vốn đầu tư và tự động hóa thẩm định thương vụ thông qua trợ lý Giám đốc Kinh doanh AI (CCO AI Engine).

---

## 🚀 Tính Năng Cốt Lõi

### 1. Sàn Cơ Hội & Kết Nối Nguồn Lực (Resource Networking)
- **4 Trụ cột nhu cầu**:
  - Dự án & Ý tưởng kinh doanh
  - Nguồn lực hợp tác (Công nghệ, máy móc, xưởng may/sản xuất)
  - Không gian chia sẻ (Văn phòng, mặt bằng bán lẻ, kho bãi)
  - Cộng đồng chuyên môn & Cố vấn C-Level
- **Đồng bộ thời gian thực (Real-time Sync)** qua Google Cloud Firestore: Thêm mới, xem chi tiết, lưu cơ hội quan tâm.

### 2. Commercial Deal Room B2B (Phòng Giao Thương Chiến Lược)
- **AI Deal Validator (Thẩm định thương vụ AI)**:
  - Phân tích tương hỗ hai chiều (Win-Win Synergy).
  - Tự động gợi ý **Cơ chế phân chia doanh thu & lợi nhuận (Net Revenue Share Formula)**.
  - Cảnh báo 2 rủi ro pháp lý/tài chính trọng yếu cần đưa vào hợp đồng.
  - Thiết lập lộ trình hành động 30-60-90 ngày.
- **Biên Bản Ghi Nhớ Hợp Tác Sơ Bộ (Draft MOU Builder)**: Tự động xuất văn bản thỏa thuận 1 trang sẵn sàng ký kết kèm nút sao chép nhanh 1-Click.
- **Sàn Quản Trị Pipeline Thương Vụ**: Theo dõi các deal theo tiến trình: *Đang mở nhận hồ sơ ➔ Đang đàm phán ➔ Đã ký MOU ➔ Đang triển khai*.
- **Hệ Thống Tín Nhiệm Doanh Nghiệp (J-Trust Scoring Engine)**:
  - 40% Xác thực thực thể pháp lý.
  - 35% Lịch sử thực thi cam kết và giải ngân.
  - 25% Bảo chứng từ mạng lưới thành viên.
  - 3 Hạng tín nhiệm: Bạc (Silver), Vàng (Gold), Kim Cương (Diamond).

### 3. Trung Tâm Thành Viên (Member Hub)
- Quản lý danh sách cơ hội cá nhân đã đăng tải.
- Hộp thư tiếp nhận và phê duyệt lời mời hợp tác.
- Hệ thống gửi lời đề nghị giao thương trực tiếp đến chủ sở hữu nguồn lực.

### 4. Bộ Công Cụ Trí Tuệ Nhân Tạo (Gemini AI Suite)
- Khảo sát & kích hoạt ý tưởng sản phẩm thiết yếu.
- Thẩm định rủi ro kinh doanh và điểm hòa vốn.
- Tự động quét hóa đơn, tối ưu chi phí vận hành.

---

## 🛠️ Công Nghệ Nền Tảng

- **Frontend & Server Framework**: Next.js 16.3 (Turbopack, App Router, React 19, TypeScript).
- **Styling**: Tailwind CSS v4, Motion (`motion/react`), Lucide React.
- **Backend & Database**:
  - Next.js API Routes (`src/app/api/*`).
  - Google Cloud Firestore & Firebase Authentication (`fleet-gravity-c5fd2`).
- **Trí tuệ nhân tạo**: Google Gen AI SDK (`@google/genai`) tích hợp mô hình **Gemini 2.5 Flash**.
- **Kiến trúc Containerization**:
  - `output: 'standalone'` trong `next.config.ts`.
  - Dockerfile Multi-stage siêu nhẹ (~80MB) trên nền **Node 22 Alpine**.
  - Healthcheck tự động tại endpoint `/api/health`.
  - Sẵn sàng triển khai tức thì trên **Google Cloud Run** & **Google Cloud Build**.

---

## 💻 Hướng Dẫn Cài Đặt & Chạy Môi Trường Cục Bộ

### 1. Yêu cầu hệ thống
- Node.js 22+ và npm 10+.

### 2. Cài đặt thư viện
```bash
npm install
```

### 3. Cấu hình biến môi trường
Tạo file `.env.local` tại thư mục gốc:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
```
*(Nếu không có GEMINI_API_KEY, hệ thống sẽ tự động chuyển sang cơ chế Heuristic Matrix dự phòng để đảm bảo 100% không gián đoạn người dùng).*

### 4. Khởi chạy môi trường Dev
```bash
npm run dev
```
Truy cập ứng dụng tại `http://localhost:3000`.

### 5. Kiểm tra mã nguồn & Biên dịch
```bash
# Kiểm tra Type Check
npm run lint

# Biên dịch bản sản xuất
npm run build

# Khởi chạy server sản xuất
npm start
```

---

## 🐳 Triển Khai Container & Google Cloud Run

Dự án được tối ưu hóa đặc biệt cho hạ tầng **Google Cloud Run**:

```bash
# Build container image
docker build -t jnetwork:latest .

# Chạy thử nghiệm cục bộ
docker run -p 3000:3000 -e PORT=3000 jnetwork:latest
```

File `Dockerfile` đã được cấu hình bảo mật với user không đặc quyền `nextjs`, port động `$PORT`, và probe tự động ping `/api/health`.
