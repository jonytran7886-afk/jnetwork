# Jenkins cho jnetwork

`Jenkinsfile` ở thư mục gốc dùng Declarative Pipeline: checkout SCM → build Next.js bằng Docker Compose → push Docker Hub → copy Compose → deploy VPS và chờ healthcheck.

## Cấu hình job trong ảnh

- Definition: **Pipeline script from SCM**; SCM: **Git**.
- Repository URL: `https://github.com/jonytran7886-afk/jnetwork.git`.
- Branch Specifier: `*/main`; Script Path: `Jenkinsfile`.
- Credential Git: chọn credential có quyền đọc repository nếu repo private.
- Tham số `ENV`: Choice Parameter, giá trị `production`. Jenkinsfile cũng khai báo tham số này.
- Pipeline giữ 2 build trong tối đa 2 ngày và không chạy đồng thời các build của job.

Cần commit/push Jenkinsfile và thư mục docker trước khi Jenkins có thể đọc chúng từ GitHub.

## Repository và hạ tầng

| Cấu hình | Giá trị |
| --- | --- |
| Docker Hub repository | `jonytran86/jnetwork` |
| Docker Hub credential ID | `jenkin_login_docker_jonytran86` (Username with password/token) |
| SSH credential ID | `jenkin_ssh_vps` (SSH Username with private key) |
| VPS | `root@72.60.107.226:22` |
| Thư mục triển khai | `/root/docker/jnetwork/jnetwork-production` |
| Cổng mặc định | `3112:3000` |

Repository private `jonytran86/jnetwork` đã được người dùng tạo trên Docker Hub. VPS và SSH credential vẫn kế thừa mẫu, chưa xác minh quyền truy cập hoặc tính sẵn sàng. Nếu dùng hạ tầng khác, sửa block environment trong Jenkinsfile.

Tạo credential trong Jenkins loại **Username with password** với ID **`jenkin_login_docker_jonytran86`**, Username **`jonytran86`**, Password là **Docker Hub access token có quyền đọc/ghi repository**. Đây là ID pipeline sẽ tìm, không phải credential đã được tự động tạo. Pipeline dùng credential này để push và để VPS pull image private; không đưa token vào source.

Jenkins agent cần Linux, Git, Docker CLI/daemon, Docker Compose v2, SSH/SCP và quyền chạy Docker. Jenkins cần Pipeline, Git và Credentials Binding plugins. VPS cần Docker và Compose v2 hỗ trợ `up --wait --wait-timeout`. Pipeline dùng `agent any`, nên agent nhận job phải đáp ứng các điều kiện này.

Đưa host key VPS đã xác minh vào `~/.ssh/known_hosts` của user chạy Jenkins agent. Pipeline bật StrictHostKeyChecking, không tự chấp nhận host key lạ.

## Biến môi trường và image

`.env.production` trong Git chứa cấu hình mặc định công khai (không có secret nào, vì ứng dụng hiện không gọi API bên ngoài nào cần khóa). Jenkins chép file này lên VPS mỗi lần deploy. Có thể tạo `.env` trực tiếp tại thư mục deploy trên VPS để ghi đè:

```dotenv
JNETWORK_PORT=3112
```

Nếu cổng 3112 đã được ứng dụng khác sử dụng, đặt `JNETWORK_PORT` thành cổng còn trống trước khi deploy. Pipeline đọc `.env.production` trước rồi `.env`; file `.env` trên VPS được giữ nguyên qua các lần deploy và được tạo rỗng nếu chưa có. Compose cần hỗ trợ nhiều tùy chọn `--env-file`.

Image được push với tag `<BUILD_NUMBER>-<git-commit>` và `latest`. Deploy dùng tag của đúng build, ưu tiên hơn `JNETWORK_IMAGE` trong `.env`. Compose mặc định dùng `jonytran86/jnetwork:latest`. Khi pull thủ công trên VPS, cần đăng nhập Docker Hub bằng tài khoản có quyền đọc repository private; thông tin đăng nhập tạm của pipeline được dọn sau deploy.

Mật khẩu Docker được truyền qua stdin, tắt shell tracing ở bước dùng mật khẩu; cấu hình đăng nhập tạm được dọn khi shell kết thúc. Pipeline không prune image của các ứng dụng khác, không tự rollback. Healthcheck chỉ xác nhận HTTP frontend đang phản hồi, không kiểm tra các chức năng còn mô phỏng phía client.

Tham khảo cú pháp: [Jenkins Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/).

Chưa chạy pipeline, build Docker hoặc deploy sau đợt cập nhật cấu trúc Next.js này.
