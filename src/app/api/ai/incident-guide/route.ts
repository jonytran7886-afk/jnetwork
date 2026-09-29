import { NextRequest, NextResponse } from 'next/server';
import { ai } from '@/src/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const { situation } = await req.json();

    if (!situation) {
      return NextResponse.json({ error: 'situation là bắt buộc' }, { status: 400 });
    }

    if (ai) {
      try {
        const prompt = `
Bạn là luật sư và chuyên gia xử lý khủng hoảng đời thực tại Việt Nam. Người dùng đang gặp phải tình huống sự cố khẩn cấp sau:
"""
${situation}
"""

Hãy cung cấp chỉ dẫn chuẩn xác, bình tĩnh, bảo vệ quyền lợi hợp pháp của người dùng theo pháp luật Việt Nam.
Trả về DUY NHẤT chuỗi JSON với cấu trúc:
{
  "crisisTitle": string,
  "immediateSteps": [
    {
      "step": number,
      "action": string,
      "detail": string,
      "criticalWarning": string (điều tuyệt đối KHÔNG được làm)
    }
  ],
  "legalBasis": string (điều luật, nghị định hoặc quyền pháp lý bảo vệ người dùng),
  "hotlines": [string, string],
  "legalTemplate": string (mẫu tin nhắn hoặc biên bản hiện trường chuẩn để lưu lại bằng chứng)
}
`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.4,
          },
        });

        const responseText = response.text?.trim() || '{}';
        const parsedData = JSON.parse(responseText);
        return NextResponse.json({ success: true, data: parsedData, source: 'gemini-2.5-flash' });
      } catch (err: any) {
        console.error('Gemini API Error in incident-guide:', err?.message || err);
      }
    }

    const fallbackGuide = {
      crisisTitle: `Quy trình xử lý sự cố: "${situation.slice(0, 50)}..."`,
      immediateSteps: [
        {
          step: 1,
          action: 'Ghi nhận hiện trường & Thu thập bằng chứng khách quan',
          detail: 'Chụp ảnh toàn cảnh từ ít nhất 3 góc (rộng, cận cảnh, chi tiết thiệt hại). Bật tính năng ghi âm thoại trên điện thoại trước khi đối thoại.',
          criticalWarning: 'Tuyệt đối KHÔNG thừa nhận lỗi bằng lời nói hoặc ký vào bất kỳ giấy tờ trắng nào khi chưa có người có thẩm quyền.'
        },
        {
          step: 2,
          action: 'Giữ thái độ bình tĩnh & Yêu cầu giải quyết theo quy trình chuẩn',
          detail: 'Nói rõ: "Để đảm bảo quyền lợi công bằng cho cả hai bên, chúng ta cùng giữ nguyên hiện trạng và lập biên bản sự việc rõ ràng".',
          criticalWarning: 'Tuyệt đối KHÔNG thỏa thuận tiền mặt dưới áp lực đe dọa hoặc to tiếng.'
        },
        {
          step: 3,
          action: 'Kích hoạt kênh hỗ trợ có thẩm quyền',
          detail: 'Gọi ngay cho lực lượng chức năng hoặc số hotline hỗ trợ khẩn cấp để được bảo vệ quyền lợi hợp pháp.',
          criticalWarning: 'Không rời khỏi hiện trường khi chưa có sự xác nhận của các bên liên quan.'
        }
      ],
      legalBasis: 'Căn cứ Bộ luật Dân sự 2015 về trách nhiệm bồi thường thiệt hại và bảo toàn chứng cứ pháp lý.',
      hotlines: ['Cảnh sát 113', 'Cứu nạn cứu hộ 114 / Cấp cứu 115'],
      legalTemplate: `BIÊN BẢN GHI NHẬN SỰ VIỆC HIỆN TRƯỜNG\nHôm nay, ngày [Ngày/Tháng/Năm], tại địa điểm: [Ghi rõ vị trí]\nChúng tôi gồm:\nBên A: [Họ tên, SĐT, Số CCCD] - Phương tiện/Tài sản: [...]\nBên B: [Họ tên, SĐT, Số CCCD] - Phương tiện/Tài sản: [...]\nCùng xác nhận hiện trạng:\n1. Mô tả sự việc: [...]\n2. Thiệt hại ghi nhận thực tế: [...]\nHai bên cam kết giữ nguyên bằng chứng hình ảnh và phối hợp giải quyết theo quy định pháp luật.\nChữ ký Bên A                         Chữ ký Bên B`
    };

    return NextResponse.json({ success: true, data: fallbackGuide, source: 'heuristic-engine' });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 });
  }
}
