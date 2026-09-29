import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  FileText,
  Home,
  Coins,
  Users,
  ArrowRight
} from 'lucide-react';
import { OpportunityItem } from '../data/opportunitiesData';
import { auth } from '../lib/firebase';
import { createOpportunity } from '../lib/firestoreService';

interface PostDemandModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddOpportunity: (newItem: OpportunityItem) => void;
}

export const PostDemandModal: React.FC<PostDemandModalProps> = ({
  isOpen,
  onClose,
  onAddOpportunity,
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

  if (!isOpen) return null;

  const categoryLabels = {
    project: 'Dự án & ý tưởng',
    resource: 'Nguồn lực hợp tác',
    space: 'Không gian chia sẻ',
    partner: 'Cộng đồng chuyên môn',
  } as const;

  const categoryImages = {
    project: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
    resource: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80',
    space: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    partner: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !contactName.trim()) return;

    const newItem: OpportunityItem = {
      id: `opp-${Date.now()}`,
      category,
      categoryLabel: categoryLabels[category],
      title: title.trim(),
      location: location.trim(),
      resourceHighlight: resourceHighlight.trim() || 'Nguồn lực sẵn có',
      cooperationType: cooperationType.trim() || 'Hợp tác phát triển',
      imageUrl: categoryImages[category],
      whatIHave: whatIHave.trim() || 'Có sẵn ý tưởng và nguồn lực ban đầu',
      whatINeed: whatINeed.trim() || 'Tìm cộng sự có chuyên môn cùng làm',
      detailedDescription: `${whatIHave.trim()}. Hướng mở rộng hợp tác: ${whatINeed.trim()}. Địa điểm: ${location}.`,
      creatorName: contactName.trim(),
      creatorRole: 'Người khởi tạo',
      createdTime: 'Vừa xong',
      isBookmarked: false,
    };

    // If user is logged into Firebase, save directly to Firestore
    if (auth.currentUser) {
      createOpportunity({
        ownerId: auth.currentUser.uid,
        ownerName: contactName.trim() || auth.currentUser.displayName || 'Thành viên Cùng Làm',
        ownerAvatar: auth.currentUser.photoURL || '',
        title: title.trim(),
        category,
        description: newItem.detailedDescription,
        location: location.trim(),
        scale: cooperationType.trim(),
        reward: resourceHighlight.trim(),
        status: 'active',
      }).catch((err) => console.warn('Lưu Firestore phụ:', err));
    }

    onAddOpportunity(newItem);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      setTitle('');
      setWhatIHave('');
      setWhatINeed('');
      setContactName('');
      setPhoneContact('');
    }, 1800);
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

        {isSuccess ? (
          <div className="py-10 text-center space-y-3">
            <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
            <h4 className="text-lg font-bold text-slate-900">
              Chia sẻ nguồn lực thành công!
            </h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              Cơ hội của bạn đã xuất hiện trong mục <strong>Những cơ hội đang được chia sẻ</strong>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* 1. Category Picker */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                1. Lĩnh vực nguồn lực bạn muốn chia sẻ *
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setCategory('project')}
                  className={`p-3 rounded-xl border text-left text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    category === 'project'
                      ? 'border-[#FF2D55] bg-rose-50/60 text-[#FF2D55]'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <FileText className="w-4 h-4 text-[#FF2D55]" />
                  <span>Dự án &amp; ý tưởng</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCategory('resource')}
                  className={`p-3 rounded-xl border text-left text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    category === 'resource'
                      ? 'border-[#FF2D55] bg-rose-50/60 text-[#FF2D55]'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Coins className="w-4 h-4 text-amber-500" />
                  <span>Nguồn lực hợp tác</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCategory('space')}
                  className={`p-3 rounded-xl border text-left text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    category === 'space'
                      ? 'border-[#FF2D55] bg-rose-50/60 text-[#FF2D55]'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Home className="w-4 h-4 text-sky-500" />
                  <span>Không gian chia sẻ</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCategory('partner')}
                  className={`p-3 rounded-xl border text-left text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    category === 'partner'
                      ? 'border-[#FF2D55] bg-rose-50/60 text-[#FF2D55]'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Users className="w-4 h-4 text-indigo-500" />
                  <span>Cộng đồng chuyên môn</span>
                </button>
              </div>
            </div>

            {/* 2. Title */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                2. Tiêu đề cơ hội hợp tác *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ví dụ: Đồng hành phát triển xưởng gốm thủ công kết hợp trải nghiệm"
                className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-[#FF2D55]"
              />
            </div>

            {/* 3. What I Have & Need */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nguồn lực bạn sẵn có *
                </label>
                <textarea
                  required
                  rows={2}
                  value={whatIHave}
                  onChange={(e) => setWhatIHave(e.target.value)}
                  placeholder="Ý tưởng, kinh nghiệm, mặt bằng, trang thiết bị, thời gian..."
                  className="w-full text-xs px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-[#FF2D55]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Khả năng mong muốn kết nối *
                </label>
                <textarea
                  required
                  rows={2}
                  value={whatINeed}
                  onChange={(e) => setWhatINeed(e.target.value)}
                  placeholder="Kỹ năng chuyên môn bổ trợ, đối tác đồng hành, chia sẻ không gian..."
                  className="w-full text-xs px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-[#FF2D55]"
                />
              </div>
            </div>

            {/* 4. Location & Highlight */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Địa điểm hoạt động
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="TP.HCM, Hà Nội, Linh hoạt / Từ xa..."
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-[#FF2D55]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Điểm nhấn nguồn lực
                </label>
                <input
                  type="text"
                  value={resourceHighlight}
                  onChange={(e) => setResourceHighlight(e.target.value)}
                  placeholder="Ví dụ: Thiết bị sẵn có, Mặt bằng trung tâm..."
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-[#FF2D55]"
                />
              </div>
            </div>

            {/* 5. Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-slate-100">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
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

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
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
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#FF2D55] hover:bg-[#E01E45] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5 active:scale-98"
              >
                <span>Chia sẻ nguồn lực ngay</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
