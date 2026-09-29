'use client';

import React, { useEffect, useState } from 'react';
import { X, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';

type PrinciplesTab = 'principles' | 'support' | 'terms' | 'privacy';

interface CommunityPrinciplesModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: PrinciplesTab;
}

export const CommunityPrinciplesModal: React.FC<CommunityPrinciplesModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'principles',
}) => {
  const [tab, setTab] = useState<PrinciplesTab>(defaultTab);

  // `defaultTab` previously only seeded state on first mount, so opening the
  // modal again from a different footer link (e.g. "Điều khoản" after
  // "Nguyên tắc") kept showing whichever tab was active before. Re-sync
  // whenever the modal is opened.
  useEffect(() => {
    if (isOpen) {
      setTab(defaultTab);
    }
  }, [isOpen, defaultTab]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 p-6 sm:p-8 space-y-6 my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF2D55] block">
              VĂN HÓA CỘNG ĐỒNG CÙNG LÀM
            </span>
            <h3 className="text-xl font-black text-slate-900">
              {tab === 'principles' && 'Nguyên tắc cộng đồng'}
              {tab === 'support' && 'Trung tâm hỗ trợ & An toàn'}
              {tab === 'terms' && 'Điều khoản sử dụng'}
              {tab === 'privacy' && 'Chính sách quyền riêng tư'}
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-bold">
          <button
            type="button"
            onClick={() => setTab('principles')}
            className={`flex-1 py-2 rounded-lg transition-colors cursor-pointer ${
              tab === 'principles' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Nguyên tắc
          </button>
          <button
            type="button"
            onClick={() => setTab('support')}
            className={`flex-1 py-2 rounded-lg transition-colors cursor-pointer ${
              tab === 'support' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Hỗ trợ &amp; An toàn
          </button>
          <button
            type="button"
            onClick={() => setTab('terms')}
            className={`flex-1 py-2 rounded-lg transition-colors cursor-pointer ${
              tab === 'terms' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Điều khoản
          </button>
          <button
            type="button"
            onClick={() => setTab('privacy')}
            className={`flex-1 py-2 rounded-lg transition-colors cursor-pointer ${
              tab === 'privacy' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Quyền riêng tư
          </button>
        </div>

        {/* Content based on tab */}
        {tab === 'principles' && (
          <div className="space-y-3.5 text-xs text-slate-600 leading-relaxed">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
              <span className="font-bold text-slate-900 text-sm block flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-[#FF2D55]" />
                1. Bình đẳng &amp; Tôn trọng lẫn nhau
              </span>
              <p>
                Mọi thành viên tham gia đều có quyền chia sẻ nguồn lực, khởi tạo cơ hội hoặc đề xuất hợp tác bình
                đẳng, không phân biệt quy mô cá nhân hay tổ chức.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
              <span className="font-bold text-slate-900 text-sm block flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                2. Minh bạch &amp; Thực chất
              </span>
              <p>
                Mô tả trung thực về nguồn lực sẵn có và mục tiêu hợp tác. Cùng Làm nói không với các thông tin tuyển
                dụng trá hình, môi giới nhân sự hay hứa hẹn lợi ích tài chính ảo.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
              <span className="font-bold text-slate-900 text-sm block flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sky-600" />
                3. Đồng hành vì giá trị chung
              </span>
              <p>
                Ưu tiên tinh thần hỗ trợ, học hỏi và cộng hưởng thế mạnh để cùng hiện thực hóa các ý tưởng có ích
                cho xã hội.
              </p>
            </div>
          </div>
        )}

        {tab === 'support' && (
          <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1">
              <span className="font-bold text-slate-900 block">1. Cách kết nối an toàn với thành viên khác</span>
              <p>
                Nên trao đổi cởi mở qua tin nhắn trên nền tảng, tìm hiểu rõ định hướng của đối tác trước khi tiến
                hành gặp gỡ hoặc thống nhất thỏa thuận hợp tác.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1">
              <span className="font-bold text-slate-900 block">2. Báo cáo nội dung không phù hợp</span>
              <p>
                Nếu phát hiện nội dung có dấu hiệu tuyển dụng lao động trái quy định, lôi kéo đầu tư mạo hiểm hoặc
                vi phạm nguyên tắc cộng đồng, vui lòng bấm nút Báo cáo để đội ngũ kiểm duyệt xử lý trong 2 giờ.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1">
              <span className="font-bold text-slate-900 block">3. Kênh liên hệ hỗ trợ chính thức</span>
              <p>
                Email hỗ trợ: <strong>hotro@cunglam.vn</strong> · Đường dây tiếp nhận phản ánh: <strong>1900.6868</strong>{' '}
                (08:30 - 18:00 hàng ngày).
              </p>
            </div>
          </div>
        )}

        {tab === 'terms' && (
          <div className="space-y-3 text-xs text-slate-600 leading-relaxed max-h-[40vh] overflow-y-auto pr-1">
            <p>
              Cùng Làm cung cấp không gian mở cho việc kết nối và chia sẻ thông tin nguồn lực hợp tác tự nguyện giữa
              các thành viên.
            </p>
            <p>
              Thành viên tự chịu trách nhiệm về tính xác thực của nguồn lực mình chia sẻ và các thỏa thuận hợp tác
              dân sự được thiết lập giữa các bên.
            </p>
            <p>
              Nghiêm cấm các hành vi sử dụng nền tảng cho mục đích lừa đảo, phát tán nội dung sai sự thật hoặc môi
              giới trung gian thu phí trái quy định.
            </p>
          </div>
        )}

        {tab === 'privacy' && (
          <div className="space-y-3 text-xs text-slate-600 leading-relaxed max-h-[40vh] overflow-y-auto pr-1">
            <p>
              Cùng Làm cam kết bảo vệ thông tin cá nhân và dữ liệu liên lạc của thành viên. Thông tin số điện thoại
              chỉ được hiển thị khi bạn chủ động gửi lời mở hợp tác đến đối tác.
            </p>
            <p>Chúng tôi không chia sẻ hoặc bán dữ liệu thành viên cho bên thứ ba vì bất kỳ mục đích thương mại nào.</p>
          </div>
        )}

        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl cursor-pointer"
          >
            Đã hiểu &amp; Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
