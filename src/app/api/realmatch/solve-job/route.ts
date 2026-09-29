import { NextRequest, NextResponse } from 'next/server';
import { ai } from '@/src/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const { businessProblem, industry, budget } = await req.json();

    if (!businessProblem) {
      return NextResponse.json({ error: 'businessProblem là bắt buộc' }, { status: 400 });
    }

    if (ai) {
      try {
        const prompt = `
Bạn là Giám đốc Vận hành (COO) thực chiến tại Việt Nam. Doanh nghiệp đang gặp bài toán khó sau và cần tuyển đúng người làm được việc ngay (không cần CV chém gió):
- Bài toán cụ thể: "${businessProblem}"
- Ngành nghề: "${industry || 'Kinh doanh / Dịch vụ'}"
- Ngân sách / Mức chi trả dự kiến: "${budget || 'Thỏa thuận theo năng lực'}"

Hãy phân tích và trả về DUY NHẤT một chuỗi JSON chuẩn:
{
  "exactRoleNeeded": string (Chức danh / Vai trò thực chất cần tuyển, vd: "Trưởng kho thực chiến", "Kế toán trưởng soát xét theo dự án"),
  "threeCoreSkills": [string, string, string] (3 kỹ năng bắt buộc phải làm được ngay, không lý thuyết),
  "threeMinuteTest": {
    "question": string (Một tình huống thực tế khó đỡ sát sườn để hỏi ứng viên),
    "goodAnswerKey": string (Dấu hiệu câu trả lời của người có nghề và làm thật),
    "redFlags": string (Dấu hiệu của kẻ chỉ nói lý thuyết suông hoặc copy AI)
  },
  "suggestedEngagement": "Toàn thời gian" | "Bán thời gian / Cố vấn" | "Theo gói kết quả (Milestone)",
  "fairCompensationAdvice": string (Mức thù lao thực tế trên thị trường Việt Nam)
}
`;
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: { responseMimeType: 'application/json', temperature: 0.4 },
        });
        const data = JSON.parse(response.text?.trim() || '{}');
        return NextResponse.json({ success: true, data, source: 'gemini-2.5-flash' });
      } catch (err: any) {
        console.error('Error in solve-job:', err?.message || err);
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        exactRoleNeeded: `Chuyên viên xử lý bài toán: ${businessProblem.slice(0, 30)}`,
        threeCoreSkills: [
          'Kỹ năng thao tác thực tế không phụ thuộc phần mềm phức tạp',
          'Khả năng tự chịu trách nhiệm kết quả đầu ra đo đếm được',
          'Giao tiếp trung thực và báo cáo số liệu đúng sự thật'
        ],
        threeMinuteTest: {
          question: `Nếu ngày mai bạn bắt tay vào giải quyết bài toán: "${businessProblem.slice(0, 50)}", 3 việc bạn sẽ làm trong 4 giờ đầu tiên là gì?`,
          goodAnswerKey: 'Đi thẳng vào hiện trường kiểm tra số liệu gốc, không vội hứa hẹn, hỏi rõ quy trình đang tắc ở đâu.',
          redFlags: 'Nói những từ ngữ sáo rỗng như "tối ưu hóa", "chuyển đổi số" mà không có hành động cụ thể.'
        },
        suggestedEngagement: 'Theo gói kết quả (Milestone)',
        fairCompensationAdvice: 'Thỏa thuận trả 50% khi bắt đầu và 50% khi nghiệm thu kết quả thực tế.'
      },
      source: 'heuristic-engine'
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 });
  }
}
