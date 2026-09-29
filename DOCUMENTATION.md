# Cùng Làm — Chức năng thực tế của jnetwork

Cập nhật: **2026-09-29**. Đối chiếu `src/App.tsx`, `src/components/`, `src/data/cungLamData.ts` và `server.ts`. Đây là tài liệu hiện trạng, không phải cam kết tính năng hay lộ trình phát hành.

## 1. Sản phẩm hiện tại

**Cùng Làm** là giao diện cộng đồng chia sẻ nguồn lực và tìm cơ hội hợp tác. Người dùng giới thiệu điều mình có, điều mình cần và hướng hợp tác mong muốn. Nội dung nhấn mạnh bình đẳng, minh bạch, bổ trợ thế mạnh và cùng tạo giá trị.

| Nhóm trong source | Nội dung | Ví dụ dữ liệu mẫu |
| --- | --- | --- |
| `project` | Dự án & ý tưởng | Phát triển mô hình cà phê mang đi |
| `resource` | Nguồn lực hợp tác | Hợp tác phát triển xưởng gia công nội thất |
| `space` | Không gian chia sẻ | Chia sẻ không gian làm việc sáng tạo |
| `partner` | Cộng đồng chuyên môn; bộ lọc ghi “Hợp tác chuyên môn” | Đồng hành phát triển sản phẩm công nghệ |

Bốn cơ hội trong `INITIAL_OPPORTUNITIES` là dữ liệu viết sẵn. Tên người, địa điểm, mô tả và thời gian như “Hôm nay” không được lấy từ người dùng thật hoặc server.

## 2. Bố cục và hành vi

Trang gồm header, hero với ô tìm kiếm và bốn tab, bốn nhóm nguồn lực, cách hoạt động, danh sách cơ hội, giá trị cộng đồng, lời mời tham gia và footer. Điều hướng cuộn đến section trong trang; chưa có router hay trang hồ sơ riêng.

“Cách hoạt động” giới thiệu bốn bước: chia sẻ nguồn lực → khám phá cơ hội → kết nối & trao đổi → đồng hành & phát triển. Chưa có hệ thống nhắn tin hoặc quản lý hợp tác thực tế cho các bước sau.

| Chức năng | Đã triển khai | Giới hạn |
| --- | --- | --- |
| Lọc cơ hội | Lọc mảng theo category, có mục tất cả | Không phân trang hoặc truy vấn server |
| Ô tìm kiếm | Giữ nội dung nhập; nút tìm chọn nhóm đang mở rồi cuộn xuống | `searchQuery` không tham gia lọc; chưa tìm theo từ khóa |
| Thẻ gợi ý hero | Điền từ khóa, chọn nhóm theo chuỗi trong nhãn và cuộn xuống | Không tìm nội dung bài đăng |
| Xem cơ hội | Modal nguồn lực, nhu cầu, mô tả, người khởi tạo | Dữ liệu từ state React |
| Chia sẻ nguồn lực | Tạo bài, chèn đầu danh sách, chuyển bộ lọc về tất cả | Không lưu bền vững, không kiểm tra đăng nhập |
| Lưu cơ hội | Toggle `isBookmarked` và hiện thông báo | Mất khi tải lại; chưa có trang danh sách đã lưu |
| Đăng nhập/đăng ký | Form và hai lựa chọn trải nghiệm nhanh; hiện thành công sau bộ hẹn giờ | Không xác thực, tạo tài khoản, session hoặc token |
| Mở lời hợp tác | Nhập tên, liên hệ, đề xuất; hiện thành công rồi đóng | Không gửi hoặc lưu đề xuất dù thông báo nói đã chuyển tới người khởi tạo |
| Nguyên tắc/hỗ trợ/điều khoản/quyền riêng tư | Modal nội dung tĩnh và các tab | Không có báo cáo, kiểm duyệt hoặc xử lý hỗ trợ |
| Mạng xã hội ở footer | Hiển thị biểu tượng | Handler chặn điều hướng, chưa liên kết tài khoản thật |

## 3. Dữ liệu bài đăng

Form nhận nhóm, tiêu đề, nguồn lực sẵn có, nhu cầu kết nối, địa điểm, điểm nhấn nguồn lực, tên và số điện thoại/Zalo. Trường bắt buộc dùng kiểm tra HTML; handler kiểm tra thêm tiêu đề và tên sau khi trim.

- ID tạo bằng `opp-${Date.now()}`; ảnh chọn sẵn theo nhóm, chưa có upload.
- Mô tả được ghép từ nguồn lực, nhu cầu và địa điểm.
- `cooperationType` dùng state mặc định “Đồng hành triển khai”, chưa có trường chỉnh trên form.
- `phoneContact` chỉ nằm trong state form, không đưa vào `OpportunityItem` hoặc gửi đi.
- Bài mới ghi “Vừa xong”, không lưu timestamp tự cập nhật.

Bài đăng và bookmark nằm trong `useState` của `App`. Frontend không dùng localStorage, sessionStorage hoặc database để lưu chúng.

## 4. Những điểm chưa đồng bộ

- `AuthModal` chỉ dùng `initialMode` lúc khởi tạo state. Nút đăng nhập/đăng ký ở header có thể không mở đúng tab mong muốn ở các lần sau.
- `CommunityPrinciplesModal` cũng chỉ dùng `defaultTab` lúc khởi tạo state; liên kết footer có thể mở lại tab trước đó.
- `activeDetailItem` giữ object riêng. Toggle bookmark cập nhật mảng cơ hội nhưng không cập nhật object này; biểu tượng trong modal có thể chưa đổi cho tới khi mở lại.
- Nội dung hỗ trợ nhắc tin nhắn, nút báo cáo và xử lý trong 2 giờ nhưng chưa có triển khai tương ứng. Email và hotline là chuỗi viết sẵn; source không chứng minh đó là kênh hỗ trợ đang hoạt động.

Các điểm này được ghi nhận theo code; đợt cập nhật tài liệu không sửa hành vi ứng dụng.

## 5. Phần cũ còn tồn tại

`server.ts` vẫn đăng ký 7 API AI của UniversalNeeds/FamilyShield/RealMatch, nhưng frontend Cùng Làm không gọi API nào. `src/data/pillars.ts` và `src/data/blueprints.ts` chứa nội dung cũ, không được import vào giao diện hiện tại.

`metadata.json` và log khởi động server còn dùng tên UniversalNeeds Studio, chưa đồng bộ với `index.html` và giao diện Cùng Làm. Xem [kiến trúc và API](SYSTEM_ARCHITECTURE_V1.md).

## 6. Những mô tả sai đã được thay thế

| Tài liệu trước đây | Kết quả đối chiếu |
| --- | --- |
| RealMatch v2 là sản phẩm thương mại với 5 phân hệ | Giao diện hiện tại là Cùng Làm với 4 nhóm cơ hội và thao tác demo |
| FamilyShield OS là sản phẩm hoàn chỉnh | Còn API/nội dung dữ liệu cũ, không có giao diện FamilyShield trong App |
| Lưu bộ sưu tập bằng localStorage | Không có triển khai trong frontend hiện tại |
| Xử lý on-device, offline 100% | API xử lý server, có khóa thì thử gửi nội dung đến Gemini; không có service worker |
| Fallback thông minh bảo đảm hoạt động 100% | Phần lớn trả nội dung mẫu, không có kiểm chứng cho bảo đảm đó |
| KPI, WCAG AA, các mốc phát hành v1/v2/v3 | Không có kết quả kiểm chứng hoặc kế hoạch được xác nhận trong source |

Chưa có tài khoản thật, API CRUD cơ hội, chat, ghép nối tự động, thanh toán/ký quỹ, eKYC, định vị lân cận, gửi Zalo/SMS, OCR, cảm biến người thân hoặc xuất bộ sưu tập trong ứng dụng đang hiển thị. Không coi các ý tưởng này là tính năng đã có hay lộ trình đã duyệt.
