# Build và chạy Cùng Làm bằng Docker

Thực hiện từ thư mục gốc `jnetwork`, với Docker Engine và Docker Compose đã cài:

```powershell
docker compose -f docker/docker-compose.production.yml up -d --build
```

Mở http://localhost:3112. File production tự build source; file `docker-compose.yml` dùng image có sẵn:

```powershell
docker compose -f docker/docker-compose.yml up -d
```

Hai file là hai cách chạy cùng một ứng dụng, chọn một cách; không chạy đồng thời hai stack. Image mặc định là `jonytran86/jnetwork:latest`, khớp repository private đã tạo trên Docker Hub. Repository cần có image được push trước khi máy khác có thể pull.

Khi chạy từ registry private, đăng nhập trước bằng `docker login -u jonytran86` và nhập access token tại lời nhắc. Lệnh build tại máy không tự push image; Jenkinsfile thực hiện bước push và đăng nhập trên VPS.

Các biến tùy chọn có thể đặt trong môi trường shell hoặc file `.env` tại thư mục gốc khi chạy lệnh từ đó:

| Biến | Mặc định | Ý nghĩa |
| --- | --- | --- |
| `JNETWORK_IMAGE` | `jonytran86/jnetwork:latest` | Tên/tag image, có thể thay bằng image trên registry |
| `JNETWORK_PORT` | `3112` | Cổng truy cập từ máy chủ |

Compose dùng mạng mặc định của project, không yêu cầu tạo sẵn mạng ngoài.

`docker/Dockerfile` build ứng dụng Next.js với `output: 'standalone'` (khai báo tại `next.config.ts`): giai đoạn `builder` chạy `npm run build`, giai đoạn `runner` chỉ sao chép `.next/standalone`, `.next/static` và `public/` — không cần `node_modules` đầy đủ hay mã nguồn TypeScript trong image cuối. Container chạy `node server.js` (entrypoint do Next.js tự sinh) bằng user `node` và `tini`. Healthcheck gọi `/` vì source chưa có endpoint `/health` riêng.

```powershell
docker compose -f docker/docker-compose.production.yml logs -f
docker compose -f docker/docker-compose.production.yml down
```

Source chưa có npm lockfile nên build dùng `npm install`; phiên bản dependency có thể thay đổi giữa các lần build. Các chức năng demo (bài đăng, bookmark) vẫn chỉ lưu trong bộ nhớ React phía client; Docker không bổ sung database hoặc lưu trữ phía server.
