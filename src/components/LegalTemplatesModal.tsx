'use client';

import React, { useState } from 'react';
import {
  X,
  FileText,
  Download,
  Copy,
  Check,
  ShieldCheck,
  Lock,
  Handshake,
  CheckCircle2,
} from 'lucide-react';

interface LegalTemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onToast: (msg: string) => void;
}

export const LegalTemplatesModal: React.FC<LegalTemplatesModalProps> = ({
  isOpen,
  onClose,
  onToast,
}) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('bcc');
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  const templates = [
    {
      id: 'bcc',
      title: 'Hợp Đồng Hợp Tác Kinh Doanh (BCC)',
      subtitle: 'Chia sẻ doanh thu / lợi nhuận theo Luật Thương Mại',
      tag: 'Phổ biến nhất',
      icon: Handshake,
      content: `CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
Độc lập - Tự do - Hạnh phúc
-----------------------------

HỢP ĐỒNG HỢP TÁC KINH DOANH (BCC)
(V/v: Hợp tác khai thác mặt bằng và phân chia doanh thu theo tỷ lệ)

Hôm nay, ngày ... tháng ... năm 2026, tại ..., chúng tôi gồm có:

BÊN A (Bên góp tài sản / mặt bằng / nguồn lực):
- Ông/Bà: .............................................................
- Số CCCD: .................... Ngày cấp: ................. Nơi cấp: ...
- Địa chỉ thường trú: .................................................
- Nguồn lực đóng góp: Mặt bằng tại địa chỉ ............................
  (Diện tích: ... m2, Thời hạn hợp tác: ... năm)

BÊN B (Bên góp vốn / mô hình / vận hành):
- Ông/Bà / Tổ chức: ..................................................
- Đại diện: ................................. Chức vụ: ................
- Địa chỉ: ...........................................................
- Nguồn lực đóng góp: Thương hiệu, thiết bị, quy trình vận hành và toàn bộ nhân sự phục vụ hoạt động kinh doanh.

HAI BÊN THỐNG NHẤT CÁC ĐIỀU KHOẢN SAU:

ĐIỀU 1: NGUYÊN TẮC HỢP TÁC
1. Hai bên hợp tác trên tinh thần bình đẳng, cùng có lợi, không thành lập pháp nhân mới.
2. Bên A cam kết quyền sở hữu/sử dụng hợp pháp đối với mặt bằng nêu trên.
3. Bên B chịu trách nhiệm toàn bộ về pháp lý giấy phép kinh doanh, chất lượng dịch vụ và quản trị nhân sự.

ĐIỀU 2: CƠ CHẾ PHÂN CHIA DOANH THU & TÀI CHÍNH
1. Tỷ lệ phân chia: Bên A được hưởng ...% trên TỔNG DOANH THU GỘP (hoặc ...% trên Lợi nhuận ròng hàng tháng).
2. Mức bảo đảm tối thiểu: Trong mọi trường hợp, số tiền Bên A nhận được không thấp hơn ... VNĐ/tháng.
3. Hệ thống kiểm soát: Bên B có trách nhiệm cấp quyền truy cập tài khoản phần mềm bán hàng (POS) để Bên A giám sát số liệu thời gian thực.
4. Thời hạn thanh toán: Chốt số liệu vào ngày cuối cùng của tháng và thanh toán trước ngày 05 của tháng tiếp theo qua tài khoản ngân hàng.

ĐIỀU 3: HIỆU LỰC & GIẢI QUYẾT TRANH CHẤP
Hợp đồng có hiệu lực kể từ ngày ký. Mọi tranh chấp phát sinh sẽ được giải quyết trước tiên thông qua thương lượng hòa giải.`,
    },
    {
      id: 'nda',
      title: 'Thỏa Thuận Bảo Mật Thông Tin (NDA)',
      subtitle: 'Bảo vệ ý tưởng kinh doanh & công thức độc quyền',
      tag: 'Bảo mật',
      icon: Lock,
      content: `CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
Độc lập - Tự do - Hạnh phúc
-----------------------------

THỎA THUẬN BẢO MẬT THÔNG TIN (NDA)

Các bên tham gia ký kết:
1. BÊN TIẾT LỘ THÔNG TIN: .................................................
2. BÊN TIẾP NHẬN THÔNG TIN: ..............................................

MỤC ĐÍCH: Trao đổi để đánh giá cơ hội hợp tác kinh doanh tại nền tảng J-Network.

NỘI DUNG CAM KẾT:
1. Thông tin bảo mật bao gồm: Ý tưởng kinh doanh, kế hoạch tài chính, bí quyết công nghệ, danh sách nhà cung ứng và cơ sở khách hàng.
2. Bên Tiếp nhận cam kết:
   - Không sao chép, phổ biến hoặc cung cấp cho bất kỳ bên thứ ba nào khi chưa có văn bản đồng ý.
   - Không sử dụng thông tin bảo mật để tự mình triển khai dự án cạnh tranh trực tiếp.
3. Thời hạn bảo mật: Có hiệu lực trong vòng 03 năm kể từ ngày ký biên bản này.
4. Chế tài vi phạm: Bồi thường toàn bộ thiệt hại thực tế phát sinh nếu để lộ lọt thông tin.`,
    },
    {
      id: 'checklist',
      title: 'Checklist 10 Điểm Thẩm Định Đối Tác',
      subtitle: 'Bộ lọc an toàn trước khi rót vốn hoặc giao mặt bằng',
      tag: 'Thẩm định an toàn',
      icon: ShieldCheck,
      content: `BẢNG KIỂM 10 ĐIỂM THẨM ĐỊNH ĐỐI TÁC TRƯỚC KHI KÝ KẾT:

[ ] 1. Kiểm tra tính pháp lý của mặt bằng: Sổ hồng/sổ đỏ chính chủ, thời hạn hợp đồng thuê gốc (nếu là thuê lại), giấy phép xây dựng.
[ ] 2. Kiểm tra tư cách pháp nhân: Tra cứu mã số thuế doanh nghiệp, tình trạng nợ thuế hoặc tranh chấp pháp lý trên cổng quốc gia.
[ ] 3. Kiểm tra năng lực vận hành thực tế: Đối tác đã từng mở cửa hàng thành công nào chưa? Đến tận nơi khảo sát giờ cao điểm.
[ ] 4. Thẩm định mô hình doanh thu: Doanh thu đối tác đưa ra có biên lai POS đối chứng không, hay chỉ là ước lượng bằng miệng?
[ ] 5. Kiểm tra thiết bị POS và tài khoản ngân hàng thụ hưởng: Tiền khách thanh toán có vào tài khoản minh bạch hai bên cùng kiểm tra được không?
[ ] 6. Thỏa thuận mức sàn (Floor Price): Nếu kinh doanh ế ẩm, ai chịu chi phí mặt bằng và tiền điện nước tối thiểu?
[ ] 7. Cơ chế rút lui (Exit Strategy): Nếu sau 6 tháng không đạt KPI doanh thu tối thiểu, thủ tục chấm dứt hợp đồng và thanh lý tài sản như thế nào?
[ ] 8. Kiểm tra trách nhiệm phòng cháy chữa cháy (PCCC) và an toàn vệ sinh thực phẩm: Ai đứng tên giấy phép?
[ ] 9. Thẩm định nguồn vốn đối ứng: Đối tác có sẵn khoản tiền dự phòng ít nhất 3 tháng chi phí vận hành không?
[ ] 10. Chữ ký và con dấu: Ký giáp lai từng trang hợp đồng kèm bản sao CCCD có công chứng của người đại diện.`,
    },
  ];

  const currentTemplate = templates.find((t) => t.id === selectedTemplateId) || templates[0];

  const handleCopyContent = () => {
    navigator.clipboard.writeText(currentTemplate.content);
    setIsCopied(true);
    onToast(`Đã sao chép nội dung: ${currentTemplate.title}`);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    const element = document.createElement('a');
    const file = new Blob([currentTemplate.content], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${currentTemplate.id}_template_jnetwork.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    onToast(`Đang tải xuống tệp: ${currentTemplate.title}`);
  };

  return (
    <div className="fixed inset-0 z-60 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-100 p-6 sm:p-8 space-y-6 my-8 animate-in fade-in zoom-in-95">
        
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#FF2D55] flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                Bộ Tài Liệu &amp; Hợp Đồng Mẫu Hợp Tác Chuẩn B2B
              </h3>
              <p className="text-xs text-slate-600">
                Miễn phí cho mọi thành viên cộng đồng J-Network nhằm bảo vệ quyền lợi và minh bạch hóa giao thương.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {templates.map((tpl) => {
            const Icon = tpl.icon;
            const isSelected = selectedTemplateId === tpl.id;
            return (
              <button
                key={tpl.id}
                type="button"
                onClick={() => setSelectedTemplateId(tpl.id)}
                className={`p-3.5 rounded-2xl text-left border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-rose-50/70 border-[#FF2D55] text-slate-900 shadow-xs'
                    : 'bg-slate-50/60 border-slate-200 text-slate-700 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-[#FF2D55]' : 'text-slate-500'}`} />
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-[#FF2D55] text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {tpl.tag}
                  </span>
                </div>
                <div className="font-bold text-xs line-clamp-1">{tpl.title}</div>
                <div className="text-[10px] text-slate-600 mt-0.5 line-clamp-1">{tpl.subtitle}</div>
              </button>
            );
          })}
        </div>

        {/* Preview box */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800">
              Nội dung văn bản ({currentTemplate.title}):
            </span>
            
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyContent}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{isCopied ? 'Đã chép' : 'Sao chép'}</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadTxt}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải tệp .txt</span>
              </button>
            </div>
          </div>

          <pre className="bg-slate-900 text-slate-100 p-4 sm:p-5 rounded-2xl text-xs font-mono overflow-x-auto max-h-72 leading-relaxed whitespace-pre-wrap select-all border border-slate-800">
            {currentTemplate.content}
          </pre>
        </div>

        {/* Legal Disclaimer Footer */}
        <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            <strong>Khuyến cáo:</strong> Các biểu mẫu trên mang tính chất tham khảo thực tiễn chuẩn hóa. Các bên nên rà soát lại thông tin nhân thân, thời hạn và số liệu cụ thể trước khi ký kết chính thức.
          </span>
        </div>

      </div>
    </div>
  );
};
