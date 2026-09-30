import { NextRequest, NextResponse } from 'next/server';
import { ai } from '@/src/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const { rawText } = await req.json();

    if (!rawText || typeof rawText !== 'string' || !rawText.trim()) {
      return NextResponse.json({ error: 'Nội dung danh thiếp hoặc tin nhắn không được để trống' }, { status: 400 });
    }

    if (ai) {
      try {
        const prompt = `
Bạn là Trợ lý AI Bóc Tách Danh Thiếp & Thông Tin Liên Lạc Doanh Nghiệp (AI Business Contact & Namecard Parser).
Hãy đọc đoạn tin nhắn hoặc thông tin danh thiếp sau đây và bóc tách thành các trường thông tin chuẩn mực:

Nội dung đầu vào:
"""
${rawText.trim()}
"""

Yêu cầu bóc tách chính xác:
1. contactName: Họ và tên người liên hệ.
2. company: Tên công ty / doanh nghiệp / xưởng / thương hiệu.
3. position: Chức vụ / vai trò (Giám đốc, Quản lý, Chủ xưởng, Trưởng phòng kinh doanh...).
4. phone: Số điện thoại liên hệ (chuẩn hóa dạng 09xx hoặc +84xx).
5. zaloPhone: Số Zalo (nếu có ghi chú hoặc mặc định trùng số điện thoại).
6. email: Địa chỉ email liên hệ.
7. industry: Lĩnh vực / ngành nghề hoạt động chính.
8. location: Tỉnh thành / địa chỉ văn phòng hoặc nhà xưởng.
9. coreStrengths: Năng lực cốt lõi / sản phẩm thế mạnh / máy móc / tài sản sẵn có (Tối đa 1-2 câu súc tích).
10. needs: Nhu cầu cần tìm kiếm / hợp tác (nếu có).
11. suggestedTags: Mảng 2-4 nhãn gắn kết (ví dụ: ["Cung Ứng", "Cơ Khí", "Miền Nam", "F&B"]).
12. meetingContext: Gợi ý ngữ cảnh gặp gỡ hoặc nguồn tin nhắn.

Trả về DUY NHẤT một chuỗi JSON hợp lệ (không kèm markdown):
{
  "contactName": string,
  "company": string,
  "position": string,
  "phone": string,
  "zaloPhone": string,
  "email": string,
  "industry": string,
  "location": string,
  "coreStrengths": string,
  "needs": string,
  "suggestedTags": string[],
  "meetingContext": string
}
`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
        });

        const rawResult = response.text?.trim() || '';
        let cleanJsonText = rawResult;
        if (cleanJsonText.startsWith('```json')) {
          cleanJsonText = cleanJsonText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
        } else if (cleanJsonText.startsWith('```')) {
          cleanJsonText = cleanJsonText.replace(/^```\s*/, '').replace(/\s*```$/, '');
        }

        let parsed: any = {};
        try {
          parsed = JSON.parse(cleanJsonText);
        } catch {
          const jsonMatch = cleanJsonText.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            parsed = JSON.parse(jsonMatch[0]);
          }
        }

        if (parsed.contactName || parsed.phone || parsed.company) {
          return NextResponse.json({
            success: true,
            data: {
              contactName: parsed.contactName || 'Đối tác mới',
              company: parsed.company || 'Doanh nghiệp tư nhân',
              position: parsed.position || 'Đại diện kinh doanh',
              phone: parsed.phone || '',
              zaloPhone: parsed.zaloPhone || parsed.phone || '',
              email: parsed.email || '',
              industry: parsed.industry || 'Đa ngành',
              location: parsed.location || 'Toàn quốc',
              coreStrengths: parsed.coreStrengths || 'Đang cập nhật thế mạnh đối tác',
              needs: parsed.needs || 'Mở rộng đối tác kinh doanh',
              suggestedTags: Array.isArray(parsed.suggestedTags) ? parsed.suggestedTags : ['Đối tác mới'],
              meetingContext: parsed.meetingContext || 'Bóc tách từ tin nhắn Zalo/SMS',
            },
            source: 'gemini-3.8-flash',
          });
        }
      } catch (err: any) {
        console.error('Lỗi Gemini khi bóc tách liên hệ:', err?.message || err);
      }
    }

    // Heuristic Regex Fallback
    const phoneMatch = rawText.match(/(?:(?:\+84|84|0)[3|5|7|8|9][0-9]{8})/);
    const emailMatch = rawText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const lines = rawText.split('\n').map((l) => l.trim()).filter(Boolean);

    const fallbackData = {
      contactName: lines[0] && lines[0].length < 40 ? lines[0] : 'Đối tác B2B',
      company: lines[1] && lines[1].length < 60 ? lines[1] : 'Doanh nghiệp liên kết',
      position: 'Đại diện hợp tác',
      phone: phoneMatch ? phoneMatch[0] : '',
      zaloPhone: phoneMatch ? phoneMatch[0] : '',
      email: emailMatch ? emailMatch[0] : '',
      industry: 'Thương mại & Dịch vụ',
      location: 'Toàn quốc',
      coreStrengths: rawText.slice(0, 150),
      needs: 'Tìm kiếm đối tác chia sẻ nguồn lực',
      suggestedTags: ['Đối tác mới', 'Bóc tách nhanh'],
      meetingContext: 'Nhập từ tin nhắn',
    };

    return NextResponse.json({ success: true, data: fallbackData, source: 'heuristic-regex' });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 });
  }
}
