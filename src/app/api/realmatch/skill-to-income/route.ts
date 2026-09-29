import { NextRequest, NextResponse } from 'next/server';
import { ai } from '@/src/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const { currentSkills, ageGroup, situation } = await req.json();

    if (!currentSkills) {
      return NextResponse.json({ error: 'currentSkills là bắt buộc' }, { status: 400 });
    }

    if (ai) {
      try {
        const prompt = `
Bạn là chuyên gia tư vấn sinh kế thực tế tại Việt Nam. Người dùng đang gặp khó khăn về việc làm / thu nhập:
- Kỹ năng & Kinh nghiệm họ có: "${currentSkills}"
- Độ tuổi: "${ageGroup || 'Trung niên 35-50 tuổi'}"
- Hoàn cảnh hiện tại: "${situation || 'Đang thất nghiệp / Bấp bênh thu nhập'}"

Hãy đưa ra lời khuyên THỰC CHIẾN, KHÔNG LÝ THUYẾT, giúp họ có thể kiếm được tiền trong 48-72 giờ tới bằng những gì họ sẵn có:
Trả về DUY NHẤT một chuỗi JSON:
{
  "immediateIncomes": [
    {
      "method": string (Cách làm cụ thể, vd: Nhận làm sổ sách thuế bán thời gian cho quán ăn, dịch vụ sửa chữa cơ điện tại nhà...),
      "estimatedEarnings": string (Thu nhập ước tính, vd: 300.000đ - 800.000đ/ngày),
      "firstActionToday": string (Hành động đầu tiên cần làm ngay trong chiều nay để có khách),
      "targetBuyers": string (Ai là người đang cần trả tiền cho việc này quanh bạn)
    }
  ],
  "seniorAdvantageAnalysis": string (Lợi thế cạnh tranh vượt trội của họ so với người trẻ hoặc công nghệ AI),
  "skillsToSharpen": string (1 kỹ năng nhỏ bổ sung nhanh trong 3 ngày để tăng giá trị dịch vụ)
}
`;
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: { responseMimeType: 'application/json', temperature: 0.5 },
        });
        const data = JSON.parse(response.text?.trim() || '{}');
        return NextResponse.json({ success: true, data, source: 'gemini-2.5-flash' });
      } catch (err: any) {
        console.error('Error in skill-to-income:', err?.message || err);
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        immediateIncomes: [
          {
            method: 'Cung cấp dịch vụ chuyên môn theo giờ/buổi cho các cửa hàng, hộ kinh doanh gần khu vực sinh sống',
            estimatedEarnings: '300.000đ - 600.000đ / buổi',
            firstActionToday: 'Lập danh sách 5 chủ cửa hàng/doanh nghiệp quen biết và gửi lời đề nghị hỗ trợ cụ thể đúng việc họ đang thiếu người.',
            targetBuyers: 'Các chủ shop, cơ sở sản xuất nhỏ đang quá tải việc quản lý hàng ngày.'
          },
          {
            method: 'Nhận gói khoán công việc hoàn thành tại nhà hoặc bán thời gian',
            estimatedEarnings: '1.500.000đ - 4.000.000đ / dự án ngắn hạn',
            firstActionToday: 'Đăng tải năng lực thực tế lên Chợ Khớp Lệnh Nhu Cầu kèm cam kết chỉ nhận thù lao khi làm xong.',
            targetBuyers: 'Doanh nghiệp SME cần hoàn thiện gấp hồ sơ, sổ sách hoặc kiểm kê.'
          }
        ],
        seniorAdvantageAnalysis: 'Sự cẩn trọng, tính cam kết cao, không bỏ dở việc giữa chừng và vốn hiểu biết đời sống phong phú mà người trẻ chưa có.',
        skillsToSharpen: 'Sử dụng Zalo OA và bảng tính Google Sheets trên điện thoại để cập nhật tiến độ công việc cho khách hàng.'
      },
      source: 'heuristic-engine'
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 });
  }
}
