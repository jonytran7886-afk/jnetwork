# Cùng Làm — Chức năng thực tế của jnetwork

Cập nhật: **2026-09-29**. Đối chiếu `src/app/page.tsx`, `src/components/`, `src/data/` sau khi tái cấu trúc sang Next.js. Đây là tài liệu hiện trạng, không phải cam kết tính năng hay lộ trình phát hành — xem định hướng dài hạn tại [`PRODUCT_OVERVIEW.md`](./PRODUCT_OVERVIEW.md).

## 1. Sản phẩm hiện tại

**Cùng Làm** là giao diện cộng đồng chia sẻ nguồn lực và tìm cơ hội hợp tác. Người dùng giới thiệu điều mình có, điều mình cần và hướng hợp tác mong muốn. Nội dung nhấn mạnh bình đẳng, minh bạch, bổ trợ thế mạnh và cùng tạo giá trị.

| Nhóm (`src/data/categories.ts`) | Nhãn | Ví dụ dữ liệu mẫu |
| --- | --- | --- |
| `project` | Dự án & ý tưởng | Phát triển mô hình cà phê mang đi |
| `resource` | Nguồn lực hợp tác | Hợp tác phát triển xưởng gia công nội thất |
| `space` | Không gian chia sẻ | Chia sẻ không gian làm việc sáng tạo |
| `partner` | Cộng đồng chuyên môn | Đồng hành phát triển sản phẩm công nghệ |

Bốn cơ hội trong `INITIAL_OPPORTUNITIES` (`src/data/opportunities.ts`) là dữ liệu viết sẵn. Tên người, địa điểm, mô tả và thời gian như "Hôm nay" không được lấy từ người dùng thật hoặc server.

## 2. Bố cục và hành vi

Trang gồm header, hero với ô tìm kiếm và 4 tab, khối 4 nhóm nguồn lực, cách hoạt động, danh sách cơ hội, giá trị cộng đồng, lời mời tham gia và footer. Điều hướng cuộn đến section trong trang; chưa có router phụ hay trang hồ sơ riêng (một route `/` duy nhất trong App Router).

"Cách hoạt động" giới thiệu bốn bước: chia sẻ nguồn lực → khám phá cơ hội → kết nối & trao đổi → đồng hành & phát triển. Chưa có hệ thống nhắn tin hoặc quản lý hợp tác thực tế cho các bước sau.

| Chức năng | Đã triển khai | Giới hạn |
| --- | --- | --- |
| Lọc cơ hội | Lọc mảng theo category (dùng chung danh sách nhóm với Hero/Footer), có mục "Tất cả" | Không phân trang hoặc truy vấn server |
| Ô tìm kiếm | Giữ nội dung nhập; nút tìm chọn nhóm đang mở rồi cuộn xuống | `searchQuery` không tham gia lọc; chưa tìm theo từ khóa |
| Thẻ gợi ý hero | Điền từ khóa, chọn nhóm theo chuỗi trong nhãn và cuộn xuống | Không tìm nội dung bài đăng |
| Xem cơ hội | Modal nguồn lực, nhu cầu, mô tả, người khởi tạo | Dữ liệu từ state React phía client |
| Chia sẻ nguồn lực | Tạo bài qua `ShareOpportunityModal`, chèn đầu danh sách, chuyển bộ lọc về "Tất cả", cho chỉnh cả định hướng hợp tác (`cooperationType`) | Không lưu bền vững, không kiểm tra đăng nhập |
| Lưu cơ hội | Toggle `isBookmarked`, hiện thông báo, đồng bộ ngay cả khi modal chi tiết đang mở | Mất khi tải lại; chưa có trang danh sách đã lưu |
| Đăng nhập/đăng ký | Form và hai lựa chọn trải nghiệm nhanh; đúng tab (đăng nhập/đăng ký) mỗi lần mở, hiện thành công sau bộ hẹn giờ | Không xác thực, tạo tài khoản, session hoặc token thật |
| Mở lời hợp tác | Nhập tên, liên hệ, đề xuất; hiện thành công rồi đóng | Không gửi hoặc lưu đề xuất dù thông báo nói đã chuyển tới người khởi tạo |
| Nguyên tắc/hỗ trợ/điều khoản/quyền riêng tư | Modal nội dung tĩnh, mở đúng tab tương ứng với link đã bấm ở footer | Không có báo cáo, kiểm duyệt hoặc xử lý hỗ trợ thật |
| Mạng xã hội ở footer | Hiển thị biểu tượng | Handler chặn điều hướng, chưa liên kết tài khoản thật |

## 3. Dữ liệu bài đăng

`ShareOpportunityModal` nhận nhóm, tiêu đề, nguồn lực sẵn có, nhu cầu kết nối, địa điểm, điểm nhấn nguồn lực, định hướng hợp tác, tên và số điện thoại/Zalo. Trường bắt buộc dùng kiểm tra HTML; handler kiểm tra thêm tiêu đề và tên sau khi trim.

- ID tạo bằng `opp-${Date.now()}`; ảnh chọn sẵn theo nhóm (`sampleImageUrl` trong `categories.ts`), chưa có upload.
- Mô tả được ghép từ nguồn lực, nhu cầu và địa điểm.
- `cooperationType` có trường nhập riêng trên form (mặc định "Đồng hành triển khai") — trước đây trường này chỉ tồn tại trong state, không có ô nhập.
- `phoneContact` chỉ nằm trong state form, không đưa vào `OpportunityItem` hoặc gửi đi.
- Bài mới ghi "Vừa xong", không lưu timestamp tự cập nhật.

Bài đăng và bookmark nằm trong `useState` của `src/app/page.tsx`. Không dùng `localStorage`, `sessionStorage` hoặc database để lưu chúng.

## 4. Những điểm đã sửa trong lần tái cấu trúc này

Các bất đồng bộ được ghi nhận ở bản audit trước đã được sửa trực tiếp trong mã nguồn:

- **Nhãn nhóm lệch nhau**: bộ lọc cơ hội trước đây hiển thị "Hợp tác chuyên môn" trong khi hero/data dùng "Cộng đồng chuyên môn". Toàn bộ 4 nhóm nay lấy từ một nguồn duy nhất (`src/data/categories.ts`), không còn lệch.
- **`AuthModal` kẹt tab cũ**: trước đây `initialMode` chỉ được dùng làm giá trị khởi tạo `useState`, nên mở lại modal ở mode khác không đổi tab. Đã thêm đồng bộ lại khi `isOpen` chuyển thành `true`.
- **`CommunityPrinciplesModal` kẹt tab cũ**: cùng lỗi với `defaultTab`, đã sửa tương tự.
- **Bookmark không cập nhật trong modal chi tiết đang mở**: trước đây modal giữ object cơ hội riêng (`activeDetailItem`), không đồng bộ khi toggle bookmark từ danh sách. Nay modal tra cứu theo `id` trong state hiện tại mỗi lần render.
- **`cooperationType` không có ô nhập**: đã thêm trường "Định hướng hợp tác" vào form chia sẻ nguồn lực.
- **`COMMUNITY_VALUES` khai báo nhưng không dùng**: `CommunityValues` nay import trực tiếp từ `src/data/opportunities.ts` thay vì tự khai báo lại nội dung trùng lặp.

## 5. Phần cũ đã loại bỏ

Khi chuyển sang Next.js, các phần sau đã bị **xóa hẳn** (không di chuyển, không giữ lại dưới dạng route mới) vì thuộc sản phẩm cũ và không được giao diện Cùng Làm sử dụng:

- `server.ts` (Express) và 7 API AI (Gemini) của UniversalNeeds Studio / FamilyShield / RealMatch.
- `src/data/pillars.ts`, `src/data/blueprints.ts` — dữ liệu UniversalNeeds Studio không được UI import.
- `metadata.json` — tệp đặc thù nền tảng AI Studio cũ, tên "UniversalNeeds Studio" không khớp sản phẩm hiện tại.
- `vite.config.ts`, `index.html`, `src/main.tsx`, `src/App.tsx` — thay bằng `next.config.ts`, `src/app/layout.tsx`, `src/app/page.tsx` theo chuẩn App Router.

Xem [`ARCHITECTURE.md`](./ARCHITECTURE.md) để biết cấu trúc mã nguồn đầy đủ sau khi tái cấu trúc.

## 6. Những mô tả sai đã được thay thế (giữ từ bản audit trước)

| Tài liệu trước đây | Kết quả đối chiếu |
| --- | --- |
| RealMatch v2 là sản phẩm thương mại với 5 phân hệ | Giao diện hiện tại là Cùng Làm với 4 nhóm cơ hội và thao tác demo; toàn bộ API RealMatch đã bị xóa |
| FamilyShield OS là sản phẩm hoàn chỉnh | Không có giao diện hoặc API FamilyShield trong source hiện tại |
| Lưu bộ sưu tập bằng localStorage | Không có triển khai; bookmark chỉ tồn tại trong state React của phiên hiện tại |
| Xử lý on-device, offline 100% | Không còn API server nào được gọi; ứng dụng là SPA tĩnh phía client, không xử lý AI |
| Fallback thông minh bảo đảm hoạt động 100% | Không còn cơ chế AI/fallback nào trong source |
| KPI, WCAG AA, các mốc phát hành v1/v2/v3 | Không có kết quả kiểm chứng hoặc kế hoạch được xác nhận trong source |

Chưa có tài khoản thật, API CRUD cơ hội, chat, ghép nối tự động, thanh toán/ký quỹ, eKYC, định vị lân cận, gửi Zalo/SMS hoặc xuất bộ sưu tập trong ứng dụng đang hiển thị. Không coi các ý tưởng này là tính năng đã có hay lộ trình đã duyệt.
