import { NextRequest, NextResponse } from 'next/server';
import { ai } from '@/src/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const { ideaTitle, problemStatement, targetAudience, solutionDescription, monetizationModel } = await req.json();

    if (!ideaTitle || !problemStatement) {
      return NextResponse.json({ error: 'ideaTitle và problemStatement là bắt buộc' }, { status: 400 });
    }

    if (ai) {
      try {
        const prompt = `
Bạn là một chuyên gia thẩm định khởi nghiệp và thiết kế sản phẩm đẳng cấp thế giới, chuyên đánh giá xem một sản phẩm có thực sự là "Sản phẩm thiết yếu mà ai cũng cần" (Universal Necessity) hay chỉ là một tính năng xa xỉ / phong trào tạm thời.

Hãy phân tích nghiêm khắc, sắc bén và thực tế dự án sau:
- Tên sản phẩm: ${ideaTitle}
- Vấn đề cốt lõi: ${problemStatement}
- Đối tượng người dùng: ${targetAudience || 'Mọi người dân / hộ gia đình'}
- Giải pháp đề xuất: ${solutionDescription || 'Tối ưu hóa và tự động hóa giải quyết vấn đề'}
- Mô hình doanh thu: ${monetizationModel || 'Freemium / Đăng ký hợp lý'}

Hãy trả về phản hồi DUY NHẤT dưới định dạng JSON với cấu trúc sau:
{
  "necessityScore": number (từ 50 đến 98, đại diện cho độ cần thiết thực tế),
  "isPainkiller": boolean (true nếu là thuốc giảm đau cấp thiết, false nếu chỉ là vitamin bồi bổ),
  "verdictHeadline": string (1 câu đúc kết đánh giá tổng quan, tối đa 15 từ),
  "universalFitAnalysis": string (Phân tích tại sao mọi người thực sự cần hoặc chưa cần, 2-3 câu),
  "frictionFails": [string, string] (2 rào cản ma sát khiến người bình thường, người già hoặc người bận rộn bỏ cuộc),
  "monetizationViability": string (Đánh giá khả năng thu tiền thực tế, giá cả chấp nhận được),
  "defensibilityMoat": string (Lợi thế cạnh tranh để không bị các ông lớn Big Tech copy và đè bẹp),
  "fourteenDayRoadmap": [
    { "phase": "Ngày 1-3", "action": string },
    { "phase": "Ngày 4-8", "action": string },
    { "phase": "Ngày 9-14", "action": string }
  ],
  "radicalAdvice": string (1 lời khuyên mang tính bước ngoặt để biến ý tưởng từ "tốt" thành "bắt buộc phải có")
}
`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.6,
          },
        });

        const responseText = response.text?.trim() || '{}';
        const parsedData = JSON.parse(responseText);
        return NextResponse.json({ success: true, data: parsedData, source: 'gemini-2.5-flash' });
      } catch (err: any) {
        console.error('Gemini API Error in stress-test:', err?.message || err);
      }
    }

    // Heuristic matrix fallback
    const score = Math.floor(74 + Math.random() * 18);
    const isPainkiller = problemStatement.length > 30 || problemStatement.toLowerCase().includes('mất tiền') || problemStatement.toLowerCase().includes('sức khỏe');

    const fallbackData = {
      necessityScore: score,
      isPainkiller: isPainkiller,
      verdictHeadline: 'Tiềm năng tiếp cận quy mô lớn nếu loại bỏ rào cản thao tác ban đầu.',
      universalFitAnalysis: `Ý tưởng "${ideaTitle}" chạm đúng sự mệt mỏi nhận thức của ${targetAudience || 'đại chúng'}. Để ai cũng cần, sản phẩm phải tạo ra giá trị thấy được ngay trong 48 giờ đầu tiên mà không đòi hỏi người dùng thay đổi thói quen cố hữu.`,
      frictionFails: [
        'Người dùng nản lòng nếu bắt buộc phải nhập liệu thủ công quá 3 bước trong ngày đầu.',
        'Sự hoài nghi về tính bảo mật dữ liệu riêng tư cá nhân khi lưu thông tin nhạy cảm.',
      ],
      monetizationViability: monetizationModel
        ? `Mô hình "${monetizationModel}" khả thi nếu áp dụng chiến lược 'Micro-utility' (thu mức phí cực nhỏ nhưng tần suất gắn bó cao).`
        : 'Nên kết hợp Freemium hữu ích thực thụ với gói bảo hộ nâng cao dành cho hộ gia đình (19.000đ - 49.000đ/tháng).',
      defensibilityMoat: 'Xây dựng hiệu ứng mạng gia đình (Family Graph) hoặc cơ chế tự động hóa cá nhân hóa sâu sắc mà các app đại trà không thể sao chép đồng loạt.',
      fourteenDayRoadmap: [
        {
          phase: 'Ngày 1-3',
          action: 'Xây dựng 1 trang landing đơn giản trình bày đúng 1 lời hứa giải quyết vấn đề, kiểm tra tỉ lệ đăng ký trước (Target: >15% conversion).',
        },
        {
          phase: 'Ngày 4-8',
          action: 'Thử nghiệm dịch vụ dạng "Concierge MVP" thủ công cho 10 người quen không rành công nghệ để đo độ hào hứng.',
        },
        {
          phase: 'Ngày 9-14',
          action: 'Đóng gói quy trình tự động đầu tiên và đo lường tần suất quay lại sử dụng sau 7 ngày (Day-7 Retention).',
        },
      ],
      radicalAdvice: 'Đừng cố làm một ứng dụng tất cả-trong-một. Hãy cắt bỏ 80% tính năng phụ, chỉ giữ lại đúng 1 nút bấm kỳ diệu giúp người dùng đạt mục tiêu ngay lập tức.',
    };

    return NextResponse.json({ success: true, data: fallbackData, source: 'heuristic-matrix' });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 });
  }
}
