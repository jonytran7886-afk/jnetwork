# jnetwork — Kiến trúc hiện tại

Cập nhật theo source: **2026-09-29**. Giữ tên file `SYSTEM_ARCHITECTURE_V1.md` để tương thích liên kết cũ; tên file không biểu thị phiên bản phát hành. Nội dung này thay thế đặc tả UniversalNeeds/FamilyShield trước đây.

## 1. Thành phần và luồng dữ liệu

```text
Trình duyệt
  index.html → src/main.tsx → App.tsx → components Cùng Làm
                                 ↑
                  INITIAL_OPPORTUNITIES → React useState

Express (server.ts, PORT mặc định 3000)
  ├─ Development: Vite middleware phục vụ frontend
  ├─ Production: phục vụ dist/ và GET * trả dist/index.html
  └─ 7 POST API cũ → Gemini khi có khóa → fallback khi thiếu khóa/lỗi

Frontend Cùng Làm hiện không gọi các POST API trên.
```

Frontend là SPA React 19/TypeScript, build bằng Vite 8 và Tailwind CSS 4. `main.tsx` mount App trong StrictMode. Các section/modal giao tiếp qua props và callback; state do React quản lý. Không có router, store bên ngoài hoặc tầng truy cập dữ liệu từ frontend.

Express 4 dùng `express.json()` và chạy qua `tsx`. Không có database, ORM, migration, hàng đợi, WebSocket, xác thực hoặc phân quyền API trong source. Các API AI vẫn được đăng ký khi chạy server dù giao diện không sử dụng.

## 2. Bản đồ mã nguồn

| File/nhóm file | Trách nhiệm |
| --- | --- |
| `src/App.tsx` | State cơ hội, bộ lọc, tìm kiếm, modal, toast và điều hướng cuộn |
| `src/data/cungLamData.ts` | Kiểu OpportunityItem, 4 cơ hội mẫu, các khai báo cộng đồng |
| `src/components/CungLam*.tsx` | Header, hero, nhóm nguồn lực, cách hoạt động, danh sách, giá trị, CTA, footer |
| `src/components/PostDemandModal.tsx` | Tạo bài đăng cục bộ |
| `src/components/OpportunityDetailModal.tsx` | Chi tiết bài và đề xuất hợp tác mô phỏng |
| `src/components/AuthModal.tsx` | Form đăng nhập/đăng ký mô phỏng |
| `src/components/CommunityPrinciplesModal.tsx` | Nguyên tắc, hỗ trợ, điều khoản, quyền riêng tư |
| `src/data/pillars.ts`, `src/data/blueprints.ts` | Dữ liệu cũ, không được giao diện hiện tại import |
| `src/assets/images/` | Ảnh được dữ liệu trụ cột cũ tham chiếu |
| `src/index.css`, `index.html` | Tailwind, scrollbar, font và metadata trang Cùng Làm |
| `server.ts` | API AI, fallback và phục vụ frontend |
| `vite.config.ts`, `tsconfig.json` | Plugin, HMR, alias @ trỏ về thư mục gốc và cấu hình TypeScript |
| `metadata.json` | Metadata còn mang tên UniversalNeeds Studio |

Giao diện dùng nền slate sáng, thẻ trắng, điểm nhấn hồng `#FF2D55` và các lớp phủ tối. Font chính là Plus Jakarta Sans; HTML tải thêm Space Grotesk từ Google Fonts. Ảnh cơ hội dùng URL Unsplash. Tài nguyên ngoài phụ thuộc mạng; chưa có kiểm chứng WCAG hoặc offline.

## 3. Mô hình cơ hội

`OpportunityItem` được định nghĩa tại `src/data/cungLamData.ts`:

| Trường | Kiểu/ý nghĩa |
| --- | --- |
| `id` | string |
| `category` | project / resource / space / partner |
| `categoryLabel` | Một trong bốn nhãn tiếng Việt khai báo bằng union |
| `title`, `location` | Tiêu đề và địa điểm dạng chuỗi |
| `resourceHighlight`, `cooperationType` | Điểm nhấn và hướng hợp tác |
| `imageUrl` | URL ảnh |
| `whatIHave`, `whatINeed`, `detailedDescription` | Nguồn lực, nhu cầu, mô tả |
| `creatorName`, `creatorRole` | Tên và vai trò hiển thị |
| `createdTime` | Chuỗi thời gian hiển thị, không phải timestamp |
| `isBookmarked` | boolean tùy chọn |

Không có số điện thoại, ID tài khoản hoặc đề xuất hợp tác trong model. App khởi tạo state từ dữ liệu mẫu mỗi lần mount; không lưu xuống server/browser storage. `COMMUNITY_VALUES` trong file dữ liệu chưa được component giá trị cộng đồng sử dụng; component tự khai báo nội dung tương tự.

## 4. API còn tồn tại

Tất cả endpoint dùng **POST**, nhận JSON. Các trường bắt buộc phần lớn chỉ kiểm tra có giá trị; riêng `statementText` kiểm tra thêm kiểu string. Chưa có schema validation đầy đủ cho đầu vào hoặc JSON từ AI.

| Endpoint | Bắt buộc | Tùy chọn | Kết quả |
| --- | --- | --- | --- |
| `/api/ai/stress-test` | ideaTitle, problemStatement | targetAudience, solutionDescription, monetizationModel | data: necessityScore, isPainkiller, verdictHeadline, universalFitAnalysis, frictionFails, monetizationViability, defensibilityMoat, fourteenDayRoadmap, radicalAdvice |
| `/api/ai/generate-ideas` | Không | pillarId, audience, focusAngle | ideas: mảng với id, title, oneLiner, category, whyEveryoneNeedsIt, coreMechanism, monetization, effortLevel |
| `/api/ai/scan-expense` | statementText | Không | data: detectedItems, totalMonthlyLeak, totalYearlyLeak, officialCancellationLetter |
| `/api/ai/incident-guide` | situation | Không | data: crisisTitle, immediateSteps, legalBasis, hotlines, legalTemplate |
| `/api/realmatch/solve-job` | businessProblem | industry, budget | data: exactRoleNeeded, threeCoreSkills, threeMinuteTest, suggestedEngagement, fairCompensationAdvice |
| `/api/realmatch/skill-to-income` | currentSkills | ageGroup, situation | data: immediateIncomes, seniorAdvantageAnalysis, skillsToSharpen |
| `/api/realmatch/market-demand` | productOrService | targetRegion | data: realBuyerNeeds, whyMostSellersFail, reverseOfferFormula, targetBuyerProfile |

Thành công trả `{ success: true, data, source }`; generate-ideas dùng `ideas` thay `data`. Thiếu trường bắt buộc trả HTTP 400 với `{ error: "..." }`.

Có GEMINI_API_KEY, server tạo GoogleGenAI và gọi model có tên literal `gemini-3.8-flash`, yêu cầu JSON rồi JSON.parse. Đây là cấu hình source, không xác nhận model đang được nhà cung cấp hỗ trợ. Nếu gọi hoặc parse lỗi, server ghi log và chuyển sang fallback. Thiếu khóa thì dùng fallback trực tiếp.

| source | Nhánh xử lý |
| --- | --- |
| `gemini-3.8-flash` | Phản hồi từ nhánh gọi Gemini |
| `heuristic-matrix` | Fallback stress-test và generate-ideas |
| `heuristic-engine` | Fallback 5 endpoint còn lại |

Fallback không tương đương phân tích AI thực tế:

- Stress-test tạo điểm ngẫu nhiên 74–91, phân loại bằng độ dài/từ khóa trong vấn đề và ghép nội dung mẫu.
- Generate-ideas trả 3 ý tưởng cố định, thay ID theo thời gian và category theo đầu vào.
- Scan-expense trả 3 khoản mẫu tổng 377.000 đồng/tháng, không phân tích statementText.
- Incident-guide dùng hướng dẫn mẫu, ghép một phần tình huống vào tiêu đề.
- Solve-job ghép bài toán vào mẫu. Skill-to-income và market-demand trả nội dung cố định.

Fallback cũng trả success: true, nên cần đọc source để phân biệt. Không diễn giải số liệu hoặc tư vấn mẫu thành kết quả đã kiểm chứng. Nội dung gửi đến API có thể được chuyển tới Gemini khi có khóa; đây là xử lý server, không phải on-device.

## 5. Cấu hình và vận hành

| Biến | Hành vi trong code |
| --- | --- |
| PORT | Cổng Express, mặc định 3000 |
| NODE_ENV | Chính xác production thì phục vụ dist; giá trị khác dùng Vite middleware |
| GEMINI_API_KEY | Tùy chọn cho 7 API AI |
| DISABLE_HMR | Chuỗi true tắt HMR và file watching theo vite.config.ts |
| APP_URL | Có trong .env.example, chưa được code đọc |

`dotenv.config()` đọc `.env` mặc định. `.env.example` chứa khóa mẫu; bỏ giá trị placeholder nếu muốn thử nhánh không có khóa. Hướng dẫn chạy và lệnh PowerShell nằm trong [README](README.md).

Build chỉ tạo frontend. Start và dev cùng gọi `tsx server.ts`; start không tự đặt production. Preview chỉ phục vụ frontend build, không có API Express. Chưa có script test tự động; lint chỉ kiểm tra TypeScript.

## 6. Phạm vi kiểm chứng

Tài liệu được đối chiếu tĩnh với entrypoint, component, data, cấu hình và các route server. Chưa chạy build, typecheck, thử trình duyệt hoặc gọi Gemini trong lần rà soát này; workspace chưa cài node_modules. Các giới hạn hành vi được ghi trong [DOCUMENTATION.md](DOCUMENTATION.md).

Khi cập nhật, kiểm tra luồng nối từ App và handler/API thực tế trước khi ghi chức năng là đã triển khai. Nội dung quảng bá, dữ liệu mẫu, dependency hoặc endpoint còn sót lại không tự chứng minh tính năng đang hoạt động trên giao diện.
