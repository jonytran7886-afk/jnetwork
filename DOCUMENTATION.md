# Tài Liệu Đặc Tả Kỹ Thuật & Nghiệp Vụ — J-Network

**Phiên bản:** 2.0 (Cập nhật ngày 29-09-2026)  
**Định danh dự án:** `jnetwork`  
**Hạ tầng:** Google Cloud Run / Next.js 16.3 Standalone / Firebase Cloud Firestore

---

## 1. Tổng Quan Kiến Trúc Hệ Thống

J-Network được xây dựng theo mô hình **Full-Stack Server-Rendered / Micro-Utility** hiện đại trên nền Next.js App Router, kết hợp lưu trữ phân tán thời gian thực từ Google Cloud Firestore và trí tuệ nhân tạo từ Gemini 2.5 Flash:

```text
[ Người Dùng & Đối Tác ]
          │
          ▼
   [ Next.js 16.3 App Router (Port 3000) ]
   ├── Client Layer: React 19, Motion, Tailwind CSS v4
   ├── Server API Routes: /api/ai/*, /api/health
   └── Standalone Server Runtime: server.js
          │
    ┌─────┴─────────────────────────────────────┐
    ▼                                           ▼
[ Google Cloud Firestore ]           [ Google Gemini AI Engine ]
(users, opportunities,              (Gemini 2.5 Flash via
 invitations, deal_mous)              @google/genai SDK)
```

---

## 2. Phân Hệ Nghiệp Vụ Chi Tiết

### 2.1. Phân Hệ Điều Hướng & Nhận Diện Thương Hiệu (Navbar)
- **Thiết kế chống tràn màn hình (Anti-Break Layout)**:
  - Tự động co giãn theo các breakpoint `sm`, `md`, `lg`, `xl`, `2xl`.
  - Trên màn hình máy tính phổ thông (`1024px` đến `1279px`): Ẩn các liên kết phụ, ưu tiên hiển thị cố định 3 mục trọng tâm: `Trang chủ`, `Khám phá`, và `Deal Room B2B`.
  - Trên màn hình lớn (`>= 1280px`): Mở rộng đầy đủ `Cách hoạt động`, `Cộng đồng`, `Về chúng tôi`.
  - Khu vực tài khoản bên phải sử dụng `shrink-0` và giới hạn độ rộng tên `truncate` tránh đẩy menu rớt dòng.

### 2.2. Phân Hệ Sàn Nguồn Lực & Cơ Hội Hợp Tác (Opportunities Engine)
- **4 Nhóm nguồn lực thực tế**:
  1. `project`: Dự án & Ý tưởng khởi nghiệp.
  2. `resource`: Nguồn lực hợp tác (Công nghệ, nhà xưởng, máy móc, nguyên vật liệu).
  3. `space`: Không gian chia sẻ (Văn phòng, mặt bằng thương mại, kho bãi).
  4. `partner`: Cộng đồng chuyên gia & Cố vấn C-Level.
- **Cơ chế đồng bộ 2 chiều (Bi-directional Sync)**:
  - Khởi tạo với mảng dữ liệu mẫu uy tín `INITIAL_OPPORTUNITIES`.
  - Lắng nghe real-time qua Firestore snapshot `collection(db, 'opportunities')`.
  - Bổ sung cơ hội mới sẽ cập nhật tức thì đến toàn bộ các thành viên khác đang truy cập.

### 2.3. Commercial Deal Room B2B (Phòng Giao Thương Chiến Lược)
Đây là phân hệ nâng cấp đột phá dưới sự bảo trợ của Giám đốc Kinh doanh (CCO) và Chuyên gia Sản phẩm:

1. **AI Deal Validator (Thẩm định thương vụ AI)**:
   - Nhận diện năng lực đóng góp của Bên A và Bên B.
   - Trả về điểm số khả thi thương mại (`dealFeasibilityScore` từ 65 - 98).
   - Tự động thiết kế công thức phân chia doanh thu ròng (`revenueShareFormula`).
   - Cảnh báo 2 rủi ro tài chính / công nợ cần đưa vào hợp đồng.
   - Vạch ra lộ trình thực thi 3 giai đoạn (Tuần 1-2 Pilot ➔ Tháng 1 Chuẩn hóa ➔ Tháng 2-3 Nhân rộng).

2. **Draft MOU Generator (Biên bản ghi nhớ thỏa thuận sơ bộ)**:
   - Tự động đóng gói nội dung đàm phán thành văn bản 1 trang với đầy đủ điều khoản mục đích, cam kết hai bên và cơ chế hòa giải tranh chấp.
   - Nút **Sao chép 1-Click** sao chép tức thì vào clipboard để chia sẻ qua Zalo, Email, hoặc in thành văn bản.

3. **Sàn Quản Trị Pipeline Cơ Hội**:
   - Quản trị các thương vụ theo trạng thái tiến trình giao thương.
   - Nút **"Vào Deal Room"** đẩy toàn bộ dữ liệu đối tác vào form AI để phân tích trong 1 giây.

4. **Hệ Thống Tín Nhiệm Doanh Nghiệp (J-Trust Score)**:
   - Xếp hạng 3 cấp bậc: Bạc (Silver 70-84), Vàng (Gold 85-94), Kim Cương (Diamond 95-100).
   - Dựa trên 3 trụ cột: Pháp lý doanh nghiệp (40%), Lịch sử thực thi (35%), Bảo chứng mạng lưới (25%).

---

## 3. Danh Mục API Endpoints

| Endpoint | Phương thức | Chức năng | Phản hồi chính |
| :--- | :--- | :--- | :--- |
| `/api/health` | `GET` | Health check cho Docker container & Cloud Run probe | `{"status":"ok", "timestamp":"..."}` |
| `/api/ai/deal-validator` | `POST` | Thẩm định thương vụ B2B, chia sẻ doanh thu & sinh MOU | `{"success":true, "data": {dealFeasibilityScore, draftMOU, ...}}` |
| `/api/ai/stress-test` | `POST` | Thẩm định tính thiết yếu và mô hình doanh thu của ý tưởng | `{"success":true, "data": {necessityScore, isPainkiller, ...}}` |
| `/api/ai/generate-ideas` | `POST` | Gợi ý ý tưởng giải quyết nhu cầu phổ quát | `{"success":true, "data": [...]}` |
| `/api/ai/incident-guide` | `POST` | Hướng dẫn ứng phó sự cố khẩn cấp | `{"success":true, "data": {checklist, ...}}` |
| `/api/ai/scan-expense` | `POST` | Tối ưu hóa chi tiêu và chi phí vận hành | `{"success":true, "data": {savings, ...}}` |

*Ghi chú: Toàn bộ các API đều tích hợp cơ chế Heuristic Matrix Fallback để đảm bảo hệ thống phản hồi 100% kể cả trong trường hợp chưa kích hoạt API key.*

---

## 4. Đặc Tả Triển Khai Google Cloud Run

- **Container Engine**: Docker với `Dockerfile` đa tầng (Multi-stage build) trên nền `node:22-alpine`.
- **Cấu hình Standalone**: Khai báo `output: 'standalone'` trong `next.config.ts`, loại bỏ sự phụ thuộc vào toàn bộ thư mục `node_modules` nặng nề tại runtime.
- **Port Handling**: Tự động nhận diện biến môi trường `$PORT` do Google Cloud Run phân bổ (mặc định 8080/3000), tránh xung đột cổng.
- **Kiểm soát file**: `.gcloudignore` và `.dockerignore` chuẩn hóa, loại bỏ hoàn toàn các file tạm và cache build khỏi image.
