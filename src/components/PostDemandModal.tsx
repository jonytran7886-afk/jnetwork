import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  FileText,
  Home,
  Coins,
  Users,
  ArrowRight,
  Lock,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { OpportunityItem, pickOpportunityImage } from '../data/opportunitiesData';
import { auth } from '../lib/firebase';
import { createOpportunity } from '../lib/firestoreService';

interface PostDemandModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddOpportunity: (newItem: OpportunityItem) => void;
  currentUser?: {
    uid: string;
    displayName: string;
    email: string;
    photoURL?: string;
  } | null;
  onRequireAuth?: () => void;
  usedImageUrls?: string[];
}

export const PostDemandModal: React.FC<PostDemandModalProps> = ({
  isOpen,
  onClose,
  onAddOpportunity,
  currentUser,
  onRequireAuth,
  usedImageUrls = [],
}) => {
  const [category, setCategory] = useState<'project' | 'resource' | 'space' | 'partner'>('project');
  const [title, setTitle] = useState('');
  const [whatIHave, setWhatIHave] = useState('');
  const [whatINeed, setWhatINeed] = useState('');
  const [location, setLocation] = useState('TP. Hồ Chí Minh');
  const [resourceHighlight, setResourceHighlight] = useState('Nguồn lực sẵn sàng kết nối');
  const [cooperationType, setCooperationType] = useState('Đồng hành triển khai');
  const [contactName, setContactName] = useState('');
  const [phoneContact, setPhoneContact] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Auto-populate user name if authenticated
  useEffect(() => {
    if (currentUser?.displayName) {
      setContactName(currentUser.displayName);
    }
  }, [currentUser]);

  if (!isOpen) return null;

  // STRICT AUTHENTICATION GATE: Unauthenticated users MUST log in before posting
  if (!currentUser) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 p-6 sm:p-8 space-y-5 text-center animate-in fade-in zoom-in-95">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 text-[#FF2D55] flex items-center justify-center mx-auto border border-rose-100">
            <Lock className="w-7 h-7" />
          </div>

          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-[#FF2D55] uppercase tracking-wider">
              XÁC THỰC THÀNH VIÊN B2B
            </span>
            <h3 className="text-xl font-black text-slate-900">
              Yêu Cầu Đăng Nhập Tài Khoản
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
              Để bảo vệ an toàn cho mạng lưới J-Network, chống tin spam và xác minh danh tính người khởi tạo nguồn lực, bạn cần đăng nhập trước khi đăng cơ hội.
            </p>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 text-left space-y-2 text-xs text-slate-700">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Quyền lợi khi đăng nhập:</span>
            </div>
            <div className="text-[11px] text-slate-600 space-y-1 pl-6">
              <div>• Quản lý, chỉnh sửa hoặc đóng cơ hội bất kỳ lúc nào</div>
              <div>• Nhận thông báo tức thì khi có đối tác gửi lời mời hợp tác</div>
              <div>• Tiếp cận kho hợp đồng mẫu BCC &amp; phòng đàm phán thương vụ</div>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onRequireAuth?.();
              }}
              className="w-full py-3 bg-[#FF2D55] hover:bg-[#E01E45] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-[#FF2D55]/20 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98"
            >
              <span>Đăng Nhập Ngay Để Tiếp Tục</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
            >
              Để sau
            </button>
          </div>
        </div>
      </div>
    );
  }

  const categoryLabels = {
    project: 'Dự án & ý tưởng',
    resource: 'Nguồn lực hợp tác',
    space: 'Không gian chia sẻ',
    partner: 'Cộng đồng chuyên môn',
  } as const;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!currentUser) {
      onClose();
      onRequireAuth?.();
      return;
    }

    if (!title.trim() || !contactName.trim()) {
      setErrorMessage('Vui lòng điền tiêu đề và họ tên liên hệ.');
      return;
    }

    const newItem: OpportunityItem = {
      id: `opp-${Date.now()}`,
      category,
      categoryLabel: categoryLabels[category],
      title: title.trim(),
      location: location.trim(),
      resourceHighlight: resourceHighlight.trim() || 'Nguồn lực sẵn có',
      cooperationType: cooperationType.trim() || 'Hợp tác phát triển',
      imageUrl: pickOpportunityImage(category, usedImageUrls),
      whatIHave: whatIHave.trim() || 'Có sẵn ý tưởng và nguồn lực ban đầu',
      whatINeed: whatINeed.trim() || 'Tìm cộng sự có chuyên môn cùng làm',
      detailedDescription: `${whatIHave.trim()}. Hướng mở rộng hợp tác: ${whatINeed.trim()}. Địa điểm: ${location}.`,
      creatorName: contactName.trim() || currentUser.displayName || 'Thành viên J-Network',
      creatorRole: 'Người khởi tạo',
      createdTime: 'Vừa xong',
      isBookmarked: false,
      ownerId: currentUser.uid,
    };

    try {
      // Save directly to Firestore with authenticated ownerId
      await createOpportunity({
        ownerId: currentUser.uid,
        ownerName: contactName.trim() || currentUser.displayName || 'Thành viên J-Network',
        ownerAvatar: currentUser.photoURL || '',
        title: title.trim(),
        category,
        description: newItem.detailedDescription,
        location: location.trim(),
        scale: cooperationType.trim(),
        reward: resourceHighlight.trim(),
        imageUrl: newItem.imageUrl,
        status: 'active',
      });

      onAddOpportunity(newItem);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setTitle('');
        setWhatIHave('');
        setWhatINeed('');
      }, 1600);
    } catch (err: any) {
      console.error('Lỗi đăng cơ hội:', err);
      setErrorMessage(err.message || 'Có lỗi xảy ra khi lưu cơ hội lên hệ thống.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 p-6 sm:p-8 space-y-6 my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF2D55] block">
              BƯỚC 1: CHIA SẺ NGUỒN LỰC
            </span>
            <h3 className="text-xl font-black text-slate-900">
              Giới thiệu nguồn lực &amp; cơ hội của bạn
            </h3>
            <p className="text-xs text-slate-500">
              Cho cộng đồng biết bạn có gì và đang mong muốn mở rộng cơ hội hợp tác nào.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Identity Verified Banner */}
        <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl px-3.5 py-2 flex items-center justify-between text-xs text-emerald-900">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Đăng dưới tư cách: <strong>{currentUser.displayName || currentUser.email}</strong>
            </span>
          </div>
          <span className="text-[10px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full">
            Đã xác thực
          </span>
        </div>

        {isSuccess ? (
          <div className="py-12 text-center space-y-3">
            <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
            <h4 className="font-black text-slate-900 text-lg">
              Nguồn lực đã được chia sẻ thành công!
            </h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Cơ hội của bạn đã được xuất bản lên bảng tin và lưu trữ an toàn trong không gian làm việc.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
                {errorMessage}
              </div>
            )}

            {/* 1. Lĩnh vực nguồn lực */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-900">
                1. Lĩnh vực nguồn lực bạn muốn chia sẻ *
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setCategory('project')}
                  className={`p-3 rounded-2xl text-left border cursor-pointer transition-all flex items-center gap-2.5 ${
                    category === 'project'
                      ? 'border-[#FF2D55] bg-rose-50/60 text-[#FF2D55] font-bold shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <FileText className="w-4 h-4 shrink-0" />
                  <span className="text-xs">Dự án &amp; ý tưởng</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCategory('resource')}
                  className={`p-3 rounded-2xl text-left border cursor-pointer transition-all flex items-center gap-2.5 ${
                    category === 'resource'
                      ? 'border-[#FF2D55] bg-rose-50/60 text-[#FF2D55] font-bold shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <Coins className="w-4 h-4 shrink-0" />
                  <span className="text-xs">Nguồn lực hợp tác</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCategory('space')}
                  className={`p-3 rounded-2xl text-left border cursor-pointer transition-all flex items-center gap-2.5 ${
                    category === 'space'
                      ? 'border-[#FF2D55] bg-rose-50/60 text-[#FF2D55] font-bold shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <Home className="w-4 h-4 shrink-0" />
                  <span className="text-xs">Không gian chia sẻ</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCategory('partner')}
                  className={`p-3 rounded-2xl text-left border cursor-pointer transition-all flex items-center gap-2.5 ${
                    category === 'partner'
                      ? 'border-[#FF2D55] bg-rose-50/60 text-[#FF2D55] font-bold shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <Users className="w-4 h-4 shrink-0" />
                  <span className="text-xs">Cộng đồng chuyên môn</span>
                </button>
              </div>
            </div>

            {/* 2. Tiêu đề cơ hội */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-900">
                2. Tiêu đề cơ hội hợp tác *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ví dụ: Đồng hành phát triển chuỗi đồ uống hữu cơ tại TP. HCM"
                className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-[#FF2D55]"
              />
            </div>

            {/* 3. Nguồn lực có & Cần */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-900">
                  Nguồn lực bạn sẵn có *
                </label>
                <textarea
                  required
                  rows={3}
                  value={whatIHave}
                  onChange={(e) => setWhatIHave(e.target.value)}
                  placeholder="Ý tưởng, kinh nghiệm, mặt bằng, trang thiết bị, thời gian..."
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-[#FF2D55]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-900">
                  Khả năng mong muốn kết nối *
                </label>
                <textarea
                  required
                  rows={3}
                  value={whatINeed}
                  onChange={(e) => setWhatINeed(e.target.value)}
                  placeholder="Kỹ năng chuyên môn bổ trợ, đối tác đồng hành, chia sẻ không gian..."
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-[#FF2D55]"
                />
              </div>
            </div>

            {/* 4. Địa điểm & Điểm nhấn */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-900">
                  Địa điểm hoạt động
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="TP. Hồ Chí Minh, Hà Nội..."
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-[#FF2D55]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-900">
                  Điểm nhấn nguồn lực
                </label>
                <input
                  type="text"
                  value={resourceHighlight}
                  onChange={(e) => setResourceHighlight(e.target.value)}
                  placeholder="Nguồn lực sẵn sàng kết nối"
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-[#FF2D55]"
                />
              </div>
            </div>

            {/* 5. Thông tin liên hệ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-900">
                  Họ tên bạn *
                </label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Ví dụ: Hoàng Minh"
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-[#FF2D55]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-900">
                  Số điện thoại / Zalo để kết nối *
                </label>
                <input
                  type="text"
                  required
                  value={phoneContact}
                  onChange={(e) => setPhoneContact(e.target.value)}
                  placeholder="09xx.xxx.xxx"
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-[#FF2D55]"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
              >
                Hủy bỏ
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#FF2D55] hover:bg-[#E01E45] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-2 active:scale-98"
              >
                <span>Chia sẻ nguồn lực ngay</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
