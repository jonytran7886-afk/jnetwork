import { NextRequest, NextResponse } from 'next/server';
import { ai } from '@/src/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const { productOrService, targetRegion } = await req.json();

    if (!productOrService) {
      return NextResponse.json({ error: 'productOrService là bắt buộc' }, { status: 400 });
    }

    if (ai) {
      try {
        const prompt = `
Tại Việt Nam, người bán thường gặp tình trạng "Sản phẩm làm ra thiếu người mua vì không biết người mua thực sự cần gì".
Phân tích sản phẩm / dịch vụ: "${productOrService}" tại khu vực: "${targetRegion || 'Toàn quốc / Đô thị lớn'}"

Trả về DUY NHẤT một chuỗi JSON:
{
  "realBuyerNeeds": [string, string, string] (3 điều khách hàng THỰC SỰ sẵn sàng rút ví trả tiền ngay khi mua thứ này),
  "whyMostSellersFail": string (Lý do cốt tử tại sao người bán trước đây ế ẩm),
  "reverseOfferFormula": string (Cách đóng gói gói dịch vụ/sản phẩm theo kiểu "Đảm bảo kết quả" để khách hàng không thể từ chối),
  "targetBuyerProfile": string (Chính xác ai là người có sẵn tiền và đang tìm kiếm giải pháp này hôm nay)
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
        console.error('Error in market-demand:', err?.message || err);
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        realBuyerNeeds: [
          'Sự tin cậy và cam kết chịu trách nhiệm nếu xảy ra sự cố',
          'Giá thành trọn gói rõ ràng ngay từ đầu, không phát sinh phụ phí',
          'Tiết kiệm thời gian, giao nhận hoặc xử lý tận nơi nhanh chóng'
        ],
        whyMostSellersFail: 'Quá tập trung khoe tính năng sản phẩm mà không trả lời được câu hỏi: Khách hàng bớt được nỗi lo hay tiết kiệm được bao nhiêu tiền?',
        reverseOfferFormula: 'Bán gói dùng thử rủi ro bằng 0: Cho khách hàng kiểm tra trước hoặc hoàn tiền 100% nếu không hài lòng.',
        targetBuyerProfile: 'Các hộ gia đình bận rộn và chủ doanh nghiệp nhỏ muốn mua sự an tâm.'
      },
      source: 'heuristic-engine'
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 });
  }
}
