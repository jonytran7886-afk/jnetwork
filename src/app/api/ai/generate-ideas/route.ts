import { NextRequest, NextResponse } from 'next/server';
import { ai } from '@/src/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const { pillarId, audience, focusAngle } = await req.json();

    if (ai) {
      try {
        const prompt = `
Hãy đóng vai một Product Architect thiên tài. Dựa trên trụ cột nhu cầu con người: "${pillarId || 'Sức khỏe & Sinh tồn'}", nhóm người dùng: "${audience || 'Mọi gia đình'}", và góc tiếp cận: "${focusAngle || 'Tiết kiệm thời gian & năng lượng'}", hãy sáng tạo 3 ý tưởng sản phẩm đột phá mà "AI CŨNG CẦN".

Yêu cầu:
- Sản phẩm phải giải quyết nỗi đau thường trực mỗi ngày (Everyday High Frequency Pain).
- Người không rành công nghệ vẫn dùng được dễ dàng.
- Có mô hình kinh doanh đạo đức và bền vững.

Trả về DUY NHẤT một mảng JSON (3 sản phẩm) cấu trúc:
[
  {
    "id": string,
    "title": string,
    "oneLiner": string,
    "category": string,
    "whyEveryoneNeedsIt": string,
    "coreMechanism": string,
    "monetization": string,
    "effortLevel": "Thấp" | "Trung bình" | "Cao"
  }
]
`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.8,
          },
        });

        const responseText = response.text?.trim() || '[]';
        const parsed = JSON.parse(responseText);
        return NextResponse.json({ success: true, ideas: parsed, source: 'gemini-2.5-flash' });
      } catch (err: any) {
        console.error('Gemini API Error in generate-ideas:', err?.message || err);
      }
    }

    const fallbackIdeas = [
      {
        id: 'idea-' + Date.now() + '-1',
        title: 'AutoSubscription Guard (Vệ Sĩ Thuê Bao Âm Thầm)',
        oneLiner: 'Tự động phát hiện và cảnh báo các khoản phí trừ tiền định kỳ bị quên lãng của mọi thành viên.',
        category: pillarId || 'Tài chính & An toàn số',
        whyEveryoneNeedsIt: 'Hơn 70% người dùng trưởng thành đang mất từ 200.000đ - 1.000.000đ/tháng cho các ứng dụng và dịch vụ không còn sử dụng.',
        coreMechanism: 'Nhận diện sao kê an toàn qua OCR cục bộ trên thiết bị, gắn nhãn khoản chi định kỳ và tạo mẫu hủy dịch vụ với 1 chạm.',
        monetization: 'Miễn phí quét 3 dịch vụ đầu; 29.000đ/tháng cho cả gia đình kiểm soát vô hạn.',
        effortLevel: 'Trung bình',
      },
      {
        id: 'idea-' + Date.now() + '-2',
        title: 'Family Wellness Ping (Nhịp Sinh Hoạt Gia Đình Yên Tâm)',
        oneLiner: 'Kiểm tra an toàn người thân cao tuổi mỗi ngày chỉ bằng một chạm nhẹ nhàng không làm phiền.',
        category: pillarId || 'Sức khỏe & Gắn kết',
        whyEveryoneNeedsIt: 'Ai cũng lo lắng khi cha mẹ già ở nhà một mình nhưng gọi điện liên tục sẽ tạo cảm giác bị giám sát khó chịu.',
        coreMechanism: 'Widget một chạm "Hôm nay tôi khỏe" tích hợp cảm biến vận động nhẹ của điện thoại, báo động tự động nếu quá 10h sáng không có tín hiệu.',
        monetization: 'Miễn phí vĩnh viễn tính năng cơ bản; gói Premium hỗ trợ liên lạc khẩn cấp cứu hộ.',
        effortLevel: 'Thấp',
      },
      {
        id: 'idea-' + Date.now() + '-3',
        title: 'MealZero Waste (Trợ Lý Bếp Cân Bằng Dinh Dưỡng)',
        oneLiner: 'Gợi ý bữa ăn ngon từ những gì còn lại trong tủ lạnh để không lãng phí thức ăn và tiền bạc.',
        category: pillarId || 'Sinh hoạt & Tối giản',
        whyEveryoneNeedsIt: 'Câu hỏi "Hôm nay ăn gì?" và việc vứt bỏ đồ ăn hỏng gây áp lực tinh thần cho 100% người nội trợ và người sống độc thân.',
        coreMechanism: 'Chụp ảnh tủ lạnh 5 giây, AI phân loại nguyên liệu sắp hết hạn và gợi ý 2 thực đơn 15 phút dễ nấu nhất.',
        monetization: 'Bán kèm gói gia vị sạch theo công thức hoặc phí đăng ký tài khoản gia đình.',
        effortLevel: 'Trung bình',
      },
    ];

    return NextResponse.json({ success: true, ideas: fallbackIdeas, source: 'heuristic-matrix' });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 });
  }
}
