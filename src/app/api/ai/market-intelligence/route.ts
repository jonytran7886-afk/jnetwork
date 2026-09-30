import { NextRequest, NextResponse } from 'next/server';
import { ai } from '@/src/lib/gemini';
import { INITIAL_INDUSTRY_INSIGHTS, IndustryInsightItem } from '@/src/data/industryInsightsData';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const pillar = searchParams.get('pillar');
    const region = searchParams.get('region');

    let results = INITIAL_INDUSTRY_INSIGHTS;
    if (category && category !== 'all') {
      results = results.filter((item) => item.category === category);
    }
    if (pillar && pillar !== 'all') {
      results = results.filter((item) => item.pillar === pillar);
    }
    if (region && region !== 'all') {
      results = results.filter((item) => item.region === region || item.region === 'Toàn quốc');
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
    const { topic, industrySector, customNote, pillar } = body;

    const queryTopic = topic || 'Cơ hội giao thương, đầu tư và liên minh dự án B2B tại Việt Nam';
    const activePillar = pillar || 'trade';

    if (ai) {
      try {
        const prompt = `
Bạn là Giám đốc Phân tích Thị trường & Chiến lược Thương mại cấp cao (Chief Strategy Officer & Market Intelligence Lead).
Hãy sử dụng công cụ tìm kiếm Google Search để cập nhật những dữ liệu, báo cáo, chính sách hoặc diễn biến kinh doanh mới nhất tại Việt Nam liên quan đến:

Chủ đề tìm kiếm: "${queryTopic}"
Lĩnh vực/Ngành: "${industrySector || 'Giao thương, Đầu tư & Hợp tác đa ngành'}"
Trụ cột trọng tâm: "${activePillar}" (Một trong 4 trụ cột: trade = Giao thương/Xuất nhập khẩu, investment = Đầu tư/Vốn/M&A, cooperation = Hợp tác/Nhượng quyền/Nguồn lực, projects = Dự án/Đấu thầu/KCN)
Ghi chú thêm: "${customNote || 'Tập trung vào cơ hội hợp tác đôi bên cùng có lợi và số liệu thực tế'}"

Yêu cầu đầu ra:
1. Thông tin thực tế, cập nhật, dẫn nguồn uy tín (Bộ Công Thương, Bộ KH&ĐT, VCCI, Tổng cục Hải quan, Báo Đầu Tư, Ban Quản lý KCN...).
2. Tóm tắt 1 câu ngắn gọn dành cho lãnh đạo bận rộn (Executive 30s briefing).
3. 3 điểm đúc kết then chốt (Key Takeaways) có số liệu hoặc phân tích thực tế.
4. Một cơ hội hành động cụ thể (Actionable Opportunity): Doanh nghiệp A và Doanh nghiệp B có thể liên kết gì với nhau ngay hôm nay để đón đầu xu hướng này?
5. Gợi ý cấu trúc đàm phán hợp tác mẫu (Default Deal Prompt) để nạp thẳng vào phòng giao thương (Commercial Deal Room).

Hãy trả về DUY NHẤT một chuỗi JSON hợp lệ theo cấu trúc sau (không kèm markdown thừa):
{
  "title": string (Tiêu đề sắc nét, thu hút dưới 20 từ),
  "category": "trade_commerce" | "investment_capital" | "b2b_cooperation" | "projects_tenders" | "policy_tax" | "tech_ai",
  "categoryLabel": string (Tiếng Việt: Giao Thương & Xuất Khẩu / Đầu Tư & Dòng Vốn / Hợp Tác & Nguồn Lực / Dự Án & Đấu Thầu / Chính Sách & Thuế),
  "pillar": "trade" | "investment" | "cooperation" | "projects",
  "summary": string (1 câu tóm tắt cốt lõi dưới 45 từ),
  "content": string (Bài phân tích 2 đoạn khoảng 120-160 từ giải thích rõ bối cảnh và tiềm năng hợp tác),
  "keyTakeaways": [string, string, string] (3 gạch đầu dòng then chốt),
  "actionableOpportunity": string (Cơ hội hợp tác thực chiến cho các thành viên mạng lưới),
  "defaultDealPrompt": {
    "partyAResources": string,
    "partyBResources": string,
    "dealType": string,
    "targetGoal": string
  },
  "source": string (Tổ chức/Báo chí uy tín tham chiếu, ví dụ: Bộ Công Thương, VCCI, Bộ Kế hoạch & Đầu tư, Báo Đầu Tư...),
  "sourceUrl": string (URL trang web uy tín),
  "readTime": "3 phút đọc",
  "imageUrl": string (URL ảnh Unsplash chất lượng cao liên quan đến ngành),
  "region": "Toàn quốc" | "Miền Bắc" | "Miền Trung" | "Miền Nam" | "Quốc tế"
}
`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            tools: [{ googleSearch: {} }],
          },
        });

        const rawText = response.text?.trim() || '';
        // Clean markdown backticks if returned
        let cleanJsonText = rawText;
        if (cleanJsonText.startsWith('```json')) {
          cleanJsonText = cleanJsonText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
        } else if (cleanJsonText.startsWith('```')) {
          cleanJsonText = cleanJsonText.replace(/^```\s*/, '').replace(/\s*```$/, '');
        }

        let parsed: any = {};
        try {
          parsed = JSON.parse(cleanJsonText);
        } catch {
          // Attempt to extract JSON substring
          const jsonMatch = cleanJsonText.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            parsed = JSON.parse(jsonMatch[0]);
          }
        }

        // Extract Google Search Grounding Metadata citations if available
        const groundingChunks = (response.candidates?.[0] as any)?.groundingMetadata?.groundingChunks;
        if (Array.isArray(groundingChunks) && groundingChunks.length > 0) {
          const webChunk = groundingChunks.find((c: any) => c.web?.uri);
          if (webChunk?.web?.uri) {
            parsed.sourceUrl = webChunk.web.uri;
          }
          if (webChunk?.web?.title && (!parsed.source || parsed.source.length < 3)) {
            parsed.source = webChunk.web.title;
          }
        }

        if (parsed.title) {
          const newInsight: IndustryInsightItem = {
            id: `ai-grounded-${Date.now()}`,
            title: parsed.title,
            category: parsed.category || (activePillar === 'trade' ? 'trade_commerce' : activePillar === 'investment' ? 'investment_capital' : activePillar === 'projects' ? 'projects_tenders' : 'b2b_cooperation'),
            categoryLabel: parsed.categoryLabel || (activePillar === 'trade' ? 'Giao Thương & Xuất Khẩu' : activePillar === 'investment' ? 'Đầu Tư & Dòng Vốn' : activePillar === 'projects' ? 'Dự Án & Đấu Thầu' : 'Hợp Tác & Nguồn Lực'),
            pillar: parsed.pillar || activePillar,
            summary: parsed.summary || 'Thông tin thị trường cập nhật theo thời gian thực.',
            content: parsed.content || 'Đang cập nhật nội dung chi tiết theo diễn biến thực tế.',
            keyTakeaways: Array.isArray(parsed.keyTakeaways) && parsed.keyTakeaways.length > 0 ? parsed.keyTakeaways : ['Cơ hội mở rộng chuỗi liên kết giá trị.', 'Tối ưu chi phí vận hành và rủi ro thị trường.', 'Tăng cường hợp tác liên ngành bền vững.'],
            actionableOpportunity: parsed.actionableOpportunity || 'Kết nối ngay với các thành viên phù hợp trên J-Network.',
            suggestedActionType: 'deal_room',
            suggestedActionLabel: 'Mở Phòng Giao Thương Đàm Phán',
            defaultDealPrompt: parsed.defaultDealPrompt || {
              partyAResources: 'Năng lực cung ứng hoặc chuyên môn cốt lõi của đơn vị.',
              partyBResources: 'Kênh phân phối, nguồn vốn hoặc cơ sở hạ tầng bổ trợ.',
              dealType: 'Liên minh hợp tác chiến lược',
              targetGoal: 'Thực hiện dự án thử nghiệm trong 60 ngày.'
            },
            source: parsed.source || 'Bộ Công Thương & Cổng Dữ Liệu B2B',
            sourceUrl: parsed.sourceUrl || 'https://moit.gov.vn',
            publishedAt: 'Vừa xong (Google Search Grounding)',
            readTime: parsed.readTime || '3 phút đọc',
            imageUrl: parsed.imageUrl || 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
            isTrending: true,
            viewsCount: 1,
            region: parsed.region || 'Toàn quốc',
          };

          return NextResponse.json({ success: true, data: newInsight, source: 'gemini-3.8-flash-grounded' });
        }
      } catch (err: any) {
        console.error('Lỗi Gemini Search Grounding:', err?.message || err);
      }
    }

    // Heuristic Fallback per Pillar
    const pillarConfig = {
      trade: {
        category: 'trade_commerce' as const,
        label: 'Giao Thương & Xuất Khẩu',
        img: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
        source: 'Bộ Công Thương & Vietrade',
        url: 'https://vietrade.gov.vn'
      },
      investment: {
        category: 'investment_capital' as const,
        label: 'Đầu Tư & Dòng Vốn',
        img: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
        source: 'Cục Đầu tư Nước ngoài & Báo Đầu Tư',
        url: 'https://baodautu.vn'
      },
      cooperation: {
        category: 'b2b_cooperation' as const,
        label: 'Hợp Tác & Nguồn Lực',
        img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
        source: 'Hiệp hội Doanh nghiệp TP.HCM (HUBA)',
        url: 'https://huba.vn'
      },
      projects: {
        category: 'projects_tenders' as const,
        label: 'Dự Án & Đấu Thầu',
        img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
        source: 'Bộ Kế hoạch & Đầu tư & Mạng Đấu Thầu',
        url: 'https://mpi.gov.vn'
      }
    };

    const curPillarInfo = pillarConfig[activePillar as keyof typeof pillarConfig] || pillarConfig.trade;

    const fallbackInsight: IndustryInsightItem = {
      id: `fallback-insight-${Date.now()}`,
      title: `Radar Thị Trường: ${queryTopic} — Cơ hội tối ưu chi phí và liên minh chiến lược 2026`,
      category: curPillarInfo.category,
      categoryLabel: curPillarInfo.label,
      pillar: activePillar as any,
      summary: 'Dữ liệu thị trường cho thấy thời điểm thuận lợi để các doanh nghiệp vừa và nhỏ chia sẻ tài nguyên dư thừa và hợp tác đa kênh.',
      content: 'Trong bối cảnh áp lực chi phí đầu vào và biến động chuỗi cung ứng, việc liên kết nguồn lực giữa các đối tác có năng lực bổ trợ là chiến lược tăng trưởng bền vững nhất. Thay vì đơn độc triển khai mọi khâu từ kho bãi đến thị trường, các liên minh 2-3 doanh nghiệp có thể cắt giảm tới 35-40% chi phí vận hành hàng tháng.',
      keyTakeaways: [
        'Tối ưu dòng tiền và giảm áp lực vốn thông qua cơ chế hợp tác chia sẻ nguồn lực thực tế.',
        'Mở rộng tệp đối tác tiềm năng mà không phải tốn ngân sách lớn vào quảng cáo dàn trải.',
        'Đưa ngay các điều khoản hợp tác vào Phòng Giao Thương để kiểm tra tính khả thi và lập MOU nhanh chóng.'
      ],
      actionableOpportunity: 'Khảo sát ngay các đơn vị có thế mạnh bổ trợ trên J-Network để khởi tạo mô hình liên minh cùng phát triển.',
      suggestedActionType: 'deal_room',
      suggestedActionLabel: 'Đàm Phán Hợp Tác Tại Deal Room',
      defaultDealPrompt: {
        partyAResources: 'Năng lực cốt lõi về sản phẩm và nguồn cung ổn định.',
        partyBResources: 'Kênh phân phối, mạng lưới khách hàng hoặc cơ sở hạ tầng.',
        dealType: 'Liên minh hợp tác chiến lược & Chia sẻ doanh thu ròng',
        targetGoal: 'Tiết kiệm 30% chi phí vận hành và tăng trưởng doanh số trong 60 ngày.'
      },
      source: curPillarInfo.source,
      sourceUrl: curPillarInfo.url,
      publishedAt: 'Hôm nay, vừa cập nhật',
      readTime: '3 phút đọc',
      imageUrl: curPillarInfo.img,
      isTrending: true,
      viewsCount: 320,
      region: 'Toàn quốc',
    };

    return NextResponse.json({ success: true, data: fallbackInsight, source: 'heuristic-matrix' });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 });
  }
}

