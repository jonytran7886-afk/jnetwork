# Cùng Làm — Tài liệu định hướng sản phẩm

**Phiên bản:** 1.1 · **Ngày:** 29/09/2026 · **Trạng thái:** Bản định hướng để rà soát

> Đây là tài liệu **định hướng sản phẩm**, không phải đặc tả kỹ thuật. Để biết chính xác những gì đã được lập trình trong source hiện tại, xem [`FEATURES.md`](./FEATURES.md); để biết cấu trúc mã nguồn và mô hình dữ liệu, xem [`ARCHITECTURE.md`](./ARCHITECTURE.md).

## 1. Tổng quan

**Cùng Làm** là mạng xã hội kết nối nguồn lực, chia sẻ cơ hội và hỗ trợ hình thành hoạt động hợp tác. Thành viên có thể giới thiệu ý tưởng, kiến thức, kỹ năng, kinh nghiệm, thời gian, tài chính, thiết bị hoặc không gian mà họ sẵn sàng chia sẻ; khám phá những sáng kiến liên quan; trao đổi để cùng tạo ra giá trị.

Sản phẩm lấy **nguồn lực và cơ hội** làm trung tâm. Một thành viên có thể vừa chia sẻ điều mình có, vừa khởi tạo ý tưởng, tham gia cộng đồng và cộng tác với người khác. Cùng Làm không định vị là nền tảng tuyển dụng, tìm việc, hẹn hò, môi giới nhân sự hay huy động vốn.

**Thông điệp chính:** Kết nối nguồn lực. Kiến tạo cơ hội.

## 2. Vấn đề và giá trị

Nhiều ý tưởng và nguồn lực nhỏ chưa được tận dụng vì người sở hữu chúng khó tìm thấy bối cảnh hợp tác phù hợp, khó trình bày rõ đề xuất và thiếu công cụ để trao đổi minh bạch. Cùng Làm giúp thành viên:

1. Thể hiện nguồn lực, mối quan tâm và điều kiện tham gia trong một hồ sơ rõ ràng.
2. Chia sẻ dự án, ý tưởng, nguồn lực hoặc không gian dưới dạng cơ hội hợp tác có cấu trúc.
3. Khám phá cơ hội theo lĩnh vực, địa điểm, hình thức tham gia và nguồn lực bổ trợ.
4. Trao đổi, thống nhất kỳ vọng và ghi nhận tiến trình hợp tác khi các bên tự nguyện đồng ý.

Nền tảng tạo điều kiện kết nối; sự phù hợp, thỏa thuận và kết quả hợp tác do các thành viên tự đánh giá và quyết định. Không cam kết thu nhập, lợi nhuận hoặc thành công.

## 3. Đối tượng và tình huống sử dụng

| Đối tượng | Ví dụ tham gia |
|---|---|
| Cá nhân có ý tưởng | Chia sẻ một sáng kiến và kết nối năng lực bổ trợ để thử nghiệm. |
| Người có kỹ năng hoặc kinh nghiệm | Đóng góp chuyên môn vào dự án hoặc cộng đồng phù hợp. |
| Người có tài sản, thiết bị, không gian | Chia sẻ nguồn lực theo điều kiện do mình xác định. |
| Nhóm, tổ chức nhỏ | Công bố cơ hội hợp tác và mở rộng mạng lưới chuyên môn. |

Ví dụ: một người có mặt bằng và ý tưởng cà phê mang đi có thể trình bày dự án, điều kiện hợp tác và nguồn lực hiện có. Người có kinh nghiệm vận hành có thể tìm hiểu, trao đổi và cùng đánh giá khả năng triển khai. Đây là **đề xuất hợp tác**, không phải tin tuyển nhân viên.

## 4. Mô hình nội dung

### 4.1. Hồ sơ thành viên

Hồ sơ gồm giới thiệu, khu vực hoạt động, lĩnh vực quan tâm, nguồn lực có thể chia sẻ, loại cơ hội muốn tham gia, điều kiện hợp tác và mức xác minh. Thông tin liên hệ, địa chỉ chính xác và dữ liệu tài chính nhạy cảm mặc định không công khai. Thành viên kiểm soát nội dung hiển thị.

### 4.2. Cơ hội hợp tác

Mỗi cơ hội có tiêu đề, mô tả mục tiêu, loại cơ hội, nguồn lực sẵn có, nguồn lực mong muốn bổ trợ, khu vực hoặc hình thức trực tuyến, thời gian dự kiến, điều kiện trao đổi và trạng thái. Bốn nhóm chuẩn hóa — dùng chung một danh sách trong mã nguồn (`src/data/categories.ts`) để tránh lệch nhãn giữa các màn hình:

| Nhóm (key) | Nhãn hiển thị | Nội dung |
|---|---|---|
| `project` | Dự án & ý tưởng | Sáng kiến hoặc dự án có mục tiêu cụ thể. |
| `resource` | Nguồn lực hợp tác | Kỹ năng, kinh nghiệm, thiết bị, tài sản hoặc nguồn lực khác. |
| `space` | Không gian chia sẻ | Không gian sống, làm việc, kinh doanh hoặc sáng tạo. |
| `partner` | Cộng đồng chuyên môn | Trao đổi và hợp tác quanh lĩnh vực hoặc mối quan tâm chung. |

Nội dung minh họa phải được đánh dấu là ví dụ. Không giả lập thành viên thật, lời chứng thực, thống kê hay kết quả hợp tác.

### 4.3. Kết nối và nhóm hợp tác

Thành viên có thể bày tỏ quan tâm bằng lời mời kèm mục đích. Bên nhận chấp nhận, từ chối hoặc yêu cầu làm rõ. Sau khi hai bên đồng ý, họ có thể trao đổi riêng. Nhóm hợp tác, nếu được triển khai, ghi nhận vai trò, đóng góp dự kiến, mốc công việc và nội dung được từng bên xác nhận; bản ghi trong ứng dụng không tự tạo quyền sở hữu hoặc nghĩa vụ tài chính.

## 5. Hành trình sản phẩm

1. **Chia sẻ nguồn lực:** Tạo hồ sơ và xác định phạm vi thông tin công khai.
2. **Khám phá cơ hội:** Xem, tìm kiếm, lọc và lưu nội dung phù hợp.
3. **Kết nối & trao đổi:** Gửi lời mời có ngữ cảnh, thảo luận kỳ vọng và điều kiện.
4. **Đồng hành & phát triển:** Tự thỏa thuận, triển khai kế hoạch và cập nhật tiến trình nếu các bên muốn.

Đề xuất phù hợp cần nêu **lý do cụ thể** như cùng lĩnh vực, khu vực tương thích hoặc nguồn lực bổ trợ. Không hiển thị phần trăm tương thích khi chưa có phương pháp và dữ liệu kiểm chứng. AI, nếu được dùng, chỉ hỗ trợ cấu trúc nội dung, gợi ý thông tin còn thiếu và đề xuất; người dùng xác nhận trước khi đăng công khai.

## 6. Chức năng theo giai đoạn

### 6.1. Phiên bản thử nghiệm

Phạm vi đề xuất: thử nghiệm cơ hội hợp tác cho dự án kinh doanh nhỏ trong một khu vực địa lý, sau khi đã phỏng vấn và ghép kết nối thủ công để xác nhận nhu cầu.

| Nhóm | Chức năng |
|---|---|
| Tài khoản | Đăng ký, đăng nhập, xác minh số điện thoại; quyền riêng tư cơ bản. |
| Hồ sơ | Nguồn lực, mối quan tâm, khu vực và điều kiện tham gia. |
| Cơ hội | Tạo, sửa, đóng và xem cơ hội theo biểu mẫu có cấu trúc. |
| Khám phá | Tìm kiếm, lọc và đề xuất theo quy tắc giải thích được. |
| Kết nối | Lời mời, chấp nhận/từ chối, hội thoại sau đồng thuận. |
| An toàn | Báo cáo, chặn, kiểm duyệt và xử lý nội dung vi phạm. |

### 6.2. Mở rộng sau kiểm chứng

Không gian hợp tác, quản lý mốc công việc, xác minh nâng cao, thông báo theo mối quan tâm, công cụ hỗ trợ thỏa thuận và AI hỗ trợ mô tả/khám phá. Thứ tự triển khai phụ thuộc dữ liệu sử dụng thực tế. Ví điện tử, nhận giữ vốn, phân phối lợi nhuận và xếp hạng uy tín tự động không thuộc phạm vi phiên bản thử nghiệm.

Lưu ý: [`FEATURES.md`](./FEATURES.md) mô tả những gì **đã** có trong giao diện demo hiện tại (chưa có tài khoản thật, chưa có API lưu trữ) — khoảng cách giữa mục này và hiện trạng là có chủ đích, chưa phải cam kết lộ trình.

## 7. Trang giới thiệu sản phẩm

Landing page truyền tải định vị sản phẩm trước khi giới thiệu tính năng. Cấu trúc nội dung:

| Khu vực | Thông điệp chính | Hành động |
|---|---|---|
| Header | Cùng Làm; Trang chủ, Khám phá, Cách hoạt động, Cộng đồng, Về chúng tôi | Đăng nhập; Tham gia cộng đồng |
| Hero | **Kết nối nguồn lực. Kiến tạo cơ hội.** | Khám phá cơ hội; Chia sẻ nguồn lực |
| Giá trị cốt lõi | Dự án & ý tưởng; Kết nối nguồn lực; Không gian chia sẻ; Cộng đồng đồng hành | Xem nội dung liên quan |
| Cách hoạt động | Từ nguồn lực riêng đến giá trị chung | Tìm hiểu quy trình |
| Cơ hội | Những cơ hội đang được chia sẻ | Xem cơ hội; Khám phá tất cả |
| Giá trị cộng đồng | Mở rộng góc nhìn; Bổ trợ thế mạnh; Cùng tạo giá trị | Khám phá cộng đồng |
| CTA cuối trang | Cơ hội mới bắt đầu từ những kết nối | Tham gia cộng đồng |
| Footer | Giới thiệu, khám phá, trợ giúp, an toàn, điều khoản và quyền riêng tư | Điều hướng |

Nhãn CTA phải dẫn tới chức năng thật tương ứng. Khi chưa có trang đích, thiết kế cần thể hiện trạng thái phù hợp thay vì hứa một hành động chưa hoạt động.

## 8. Ngôn ngữ sản phẩm

Giọng văn hiện đại, rõ ràng, tích cực và bình đẳng. Ưu tiên "chia sẻ nguồn lực", "cơ hội hợp tác", "kết nối phù hợp", "mở lời hợp tác", "đồng hành phát triển". Tránh mô tả thành viên là người thiếu thốn, cô đơn hoặc cần được cứu giúp. Tránh cụm từ mang sắc thái tuyển dụng như "ứng viên", "nhà tuyển dụng", "tuyển cộng sự"; tránh lời kêu gọi góp vốn và cam kết lợi nhuận. Không thay chữ máy móc: mọi nhãn phải đúng ngữ cảnh và hành vi sản phẩm.

Quy tắc này áp dụng cho **nội dung hiển thị** (tiếng Việt). Mã nguồn (tên file, biến, thư mục) dùng tiếng Anh để theo chuẩn cộng đồng Next.js/React — xem [`ARCHITECTURE.md`](./ARCHITECTURE.md).

## 9. Tin cậy, an toàn và giới hạn

- Xác minh tài khoản theo mức phù hợp; phân biệt danh tính đã xác minh với năng lực hoặc mức độ đáng tin cậy.
- Chỉ mở hội thoại riêng theo quy tắc đồng thuận; hỗ trợ chặn, báo cáo và quản trị vi phạm.
- Cho thành viên quyết định khi nào chia sẻ số điện thoại, địa chỉ và thông tin nhạy cảm; đặc biệt với không gian sống.
- Có cơ chế xử lý nội dung lừa đảo, quấy rối và đề nghị chuyển tiền đáng ngờ.
- Phân biệt kết nối đối tác với hoạt động huy động, nhận giữ, quản lý hoặc phân phối vốn. Mọi tính năng giao dịch tài chính cần được đánh giá pháp lý riêng trước khi triển khai.

## 10. Kiểm chứng sản phẩm

**Chỉ số trọng tâm:** tỷ lệ cơ hội dẫn tới trao đổi có ý nghĩa và hợp tác được các bên tự xác nhận. Theo dõi thêm thời gian tới cuộc trao đổi đầu tiên, tỷ lệ lời mời được chấp nhận, số kết nối quay lại, báo cáo an toàn và mức sẵn sàng trả phí. Không dùng lượt đăng ký làm bằng chứng duy nhất về giá trị sản phẩm.

| Giai đoạn tham khảo | Hoạt động | Câu hỏi cần trả lời |
|---|---|---|
| Ngày 1–15 | Phỏng vấn 30–50 người có nhu cầu thực | Nguồn lực và điều kiện có bổ trợ nhau không? |
| Ngày 16–30 | Tổ chức kết nối thủ công | Có trao đổi và bước tiến thực tế không? |
| Ngày 31–60 | Thử nghiệm sản phẩm với nhóm đầu | Người dùng tự trình bày và khám phá được không? |
| Ngày 61–90 | Cải thiện kết nối, thử mức sẵn sàng trả phí | Giá trị nào khiến họ quay lại hoặc trả phí? |

Các mốc và quy mô trên là **giả định để lập kế hoạch**, chưa phải cam kết triển khai hay kết quả đã đạt.

## 11. Câu hỏi cần chốt trước đặc tả kỹ thuật

1. Thành phố và nhóm cộng đồng đầu tiên là ai?
2. Những loại nguồn lực nào được phép đăng và cần kiểm duyệt đặc biệt?
3. Mức xác minh và thời điểm mở thông tin liên hệ là gì?
4. Một kết nối được coi là có kết quả khi hai bên xác nhận điều gì?
5. Nền tảng sẽ hỗ trợ giao dịch không gian hoặc góp vốn tới mức nào? Mỗi phạm vi cần đánh giá vận hành và pháp lý riêng.

Tài liệu này là **định hướng sản phẩm** dựa trên nội dung đã trao đổi, chưa mô tả toàn bộ API, database hay các chức năng đã được xác nhận trong mã nguồn — xem [`FEATURES.md`](./FEATURES.md) cho hiện trạng đã kiểm chứng theo source.
