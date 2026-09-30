import { NextRequest, NextResponse } from 'next/server';
import { ai } from '@/src/lib/gemini';
import { INITIAL_INDUSTRY_INSIGHTS } from '@/src/data/industryInsightsData';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');

    let results = INITIAL_INDUSTRY_INSIGHTS;
    if (category && category !== 'all') {
      results = results.filter((item) => item.category === category);
    }

    return NextResponse.json({
      success: true,
      data: results,
      total: results.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Lỗi server' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { topic, industrySector, customNote } = body;

    const queryTopic = topic || 'Xu hướng liên kết nguồn lực và tối ưu chi phí vận hành doanh nghiệp Việt Nam';

    if (ai) {
      try {
        const prompt = `
Bạn là Giám đốc Phân tích Thị trường & Chiến lược Thương mại cấp cao (Chief Strategy Officer & Market Intelligence Lead).
Hãy phân tích và viết một bài báo cáo "Nhịp đập Thị trường & Cơ hội Hợp tác B2B (Market Intelligence Brief)" cho cộng đồng doanh nghiệp J-Network:

Chủ đề yêu cầu: "${queryTopic}"
Lĩnh vực mục tiêu: "${industrySector || 'Kinh doanh & Sản xuất tổng hợp'}"
Ghi chú thêm: "${customNote || 'Tập trung vào tính thực chiến, số liệu và cơ hội hợp tác đôi bên cùng có lợi'}"

Bài phân tích cần:
1. Độc quyền, sắc bén, ngôn ngữ kinh doanh chuyên nghiệp.
2. Tóm tắt 1 câu dành cho lãnh đạo bận rộn (Executive 30s briefing).
3. 3 ý đúc kết then chốt (Key Takeaways) có giá trị thực tiễn.
4. Một cơ hội hành động cụ thể (Actionable Opportunity): Doanh nghiệp A và Doanh nghiệp B có thể liên kết gì với nhau ngay hôm nay để đón đầu xu hướng này?
5. Gợi ý thông tin đàm phán mẫu để đưa thẳng vào phòng giao thương (Deal Room).

Trả về DUY NHẤT một chuỗi JSON hợp lệ (không kèm markdown thừa):
{
  "title": string (Tiêu đề sắc nét, thu hút dưới 20 từ),
  "category": "supply_chain" | "policy_tax" | "funding_market" | "case_study" | "tech_ai",
  "categoryLabel": string (Tiếng Việt: Chuỗi Cung Ứng / Chính Sách & Thuế / Dòng Vốn & Thị Trường / Bài Học Thực Chiến / AI & Công Nghệ),
  "summary": string (1 câu tóm tắt cốt lõi dưới 40 từ),
  "content": string (Bài phân tích 2 đoạn khoảng 120-150 từ giải thích rõ nguyên nhân và diễn biến),
  "keyTakeaways": [string, string, string] (3 gạch đầu dòng then chốt),
  "actionableOpportunity": string (Cơ hội hợp tác thực chiến cho các thành viên mạng lưới),
  "defaultDealPrompt": {
    "partyAResources": string,
    "partyBResources": string,
    "dealType": string,
    "targetGoal": string
  },
  "source": string (Tổ chức/Nguồn uy tín tham chiếu),
  "sourceUrl": string (URL trang báo hoặc cổng thông tin uy tín, ví dụ: https://baochinhphu.vn, https://vcci.com.vn, https://sbv.gov.vn, https://moit.gov.vn...),
  "readTime": "3 phút đọc",
  "imageUrl": string (URL Unsplash chất lượng cao phù hợp)
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
        const parsed = JSON.parse(responseText);

        const newInsight = {
          id: `ai-insight-${Date.now()}`,
          ...parsed,
          sourceUrl: parsed.sourceUrl || 'https://baochinhphu.vn',
          publishedAt: 'Vừa xong (AI Real-time Intelligence)',
          isTrending: true,
          viewsCount: 1,
        };

        return NextResponse.json({ success: true, data: newInsight, source: 'gemini-2.5-flash' });
      } catch (err: any) {
        console.error('Gemini error in market-intelligence:', err?.message || err);
      }
    }

    // Heuristic Fallback
    const fallbackInsight = {
      id: `fallback-insight-${Date.now()}`,
      title: `Phân tích chuyên sâu: ${queryTopic} — Cơ hội tái cấu trúc chuỗi giá trị và tối ưu chi phí 2026`,
      category: 'supply_chain',
      categoryLabel: 'Chuỗi Cung Ứng & Thị Trường',
      summary: 'Biến động thị trường mở ra thời cơ vàng cho các doanh nghiệp vừa và nhỏ chia sẻ tài nguyên dư thừa và liên minh đa kênh.',
      content: 'Trong bối cảnh chi phí thu hút khách hàng mới (CAC) tăng hơn 35% trên các kênh truyền thống, việc liên kết nguồn lực giữa các đối tác có tệp khách hàng tương đồng nhưng không cạnh tranh trực tiếp đang là chiến lược tăng trưởng bền vững nhất. Thay vì đơn độc gánh vác mọi khâu từ kho bãi đến bán hàng, các liên minh 2-3 doanh nghiệp có thể cắt giảm tới 40% chi phí vận hành hàng tháng.',
      keyTakeaways: [
        'Giảm thiểu áp lực vốn lưu động thông qua cơ chế hoán đổi và chia sẻ công suất máy móc/kho bãi.',
        'Khai thác chéo tệp khách hàng trung thành của nhau với chi phí tiếp thị gần như bằng 0.',
        'Ký kết thỏa thuận hợp tác thử nghiệm (Pilot 30 ngày) để đo lường tỷ lệ chuyển đổi trước khi rót ngân sách lớn.'
      ],
      actionableOpportunity: 'Khảo sát ngay các đơn vị có thế mạnh bổ trợ với bạn trên sàn J-Network để khởi tạo mô hình liên minh phân phối doanh thu ròng.',
      defaultDealPrompt: {
        partyAResources: 'Năng lực cốt lõi về sản phẩm và nguồn cung ổn định.',
        partyBResources: 'Kênh phân phối hiện hữu và tệp khách hàng có nhu cầu cao.',
        dealType: 'Liên minh phân phối & Chia sẻ doanh thu ròng (Revenue Share)',
        targetGoal: 'Tiết kiệm 30% chi phí tiếp thị và gia tăng 50% doanh số trong 60 ngày.'
      },
      source: 'Hội đồng Cố vấn Doanh nghiệp J-Network',
      sourceUrl: 'https://vcci.com.vn',
      publishedAt: 'Hôm nay, vừa cập nhật',
      readTime: '3 phút đọc',
      imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      isTrending: true,
      viewsCount: 320,
    };

    return NextResponse.json({ success: true, data: fallbackInsight, source: 'heuristic-matrix' });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 });
  }
}
