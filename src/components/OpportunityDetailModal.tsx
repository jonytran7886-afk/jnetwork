import React, { useState, useEffect } from 'react';
import {
  X,
  MapPin,
  CheckCircle2,
  Send,
  Sparkles,
  Bookmark,
  Layers,
  HeartHandshake,
  Trash2,
  ShieldCheck,
  Edit3,
} from 'lucide-react';
import { OpportunityItem } from '../data/opportunitiesData';
import { sendInvitation, deleteOpportunity, updateOpportunity } from '../lib/firestoreService';

interface OpportunityDetailModalProps {
  opportunity: OpportunityItem | null;
  onClose: () => void;
  onBookmarkToggle: (id: string, e: React.MouseEvent) => void;
  currentUser?: {
    uid: string;
    displayName: string;
    email: string;
    photoURL?: string;
  } | null;
  onRequireAuth?: () => void;
}

export const OpportunityDetailModal: React.FC<OpportunityDetailModalProps> = ({
  opportunity,
  onClose,
  onBookmarkToggle,
  currentUser,
  onRequireAuth,
}) => {
  const [senderName, setSenderName] = useState('');
  const [senderContact, setSenderContact] = useState('');
  const [senderProposal, setSenderProposal] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  useEffect(() => {
    if (currentUser?.displayName) {
      setSenderName(currentUser.displayName);
    }
  }, [currentUser]);

  if (!opportunity) return null;

  const isOwner = currentUser && opportunity.ownerId && currentUser.uid === opportunity.ownerId;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser && onRequireAuth) {
      onRequireAuth();
      return;
    }

    try {
      if (currentUser && opportunity.id) {
        await sendInvitation({
          senderId: currentUser.uid,
          senderName: senderName || currentUser.displayName || 'Thành viên',
          receiverId: opportunity.ownerId || '',
          opportunityId: opportunity.id,
          opportunityTitle: opportunity.title,
          message: `${senderProposal} (Liên hệ: ${senderContact})`,
        });
      }
      setIsSent(true);
      setTimeout(() => {
        setIsSent(false);
        onClose();
      }, 2000);
    } catch (err: any) {
      alert(err.message || 'Gửi lời mời thất bại');
    }
  };

  const handleDelete = async () => {
    if (!isOwner || !opportunity.id || !currentUser?.uid) return;
    const confirm = window.confirm('Bạn có chắc chắn muốn xóa cơ hội này? Thao tác không thể hoàn tác.');
    if (!confirm) return;

    setIsDeleting(true);
    try {
      await deleteOpportunity(opportunity.id, currentUser.uid);
      onClose();
    } catch (err: any) {
      alert(err.message || 'Xóa cơ hội thất bại');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleStatus = async () => {
    if (!isOwner || !opportunity.id || !currentUser?.uid) return;
    setIsUpdatingStatus(true);
    try {
      const nextStatus = opportunity.status === 'closed' ? 'active' : 'closed';
      await updateOpportunity(opportunity.id, currentUser.uid, { status: nextStatus });
      opportunity.status = nextStatus;
    } catch (err: any) {
      alert(err.message || 'Cập nhật trạng thái thất bại');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Banner with Image */}
        <div className="relative h-56 sm:h-64 w-full bg-slate-100">
          <img
            src={opportunity.imageUrl}
            alt={opportunity.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badge & Bookmark */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="bg-[#FF2D55] text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
              {opportunity.categoryLabel}
            </span>
          </div>

          {/* Bottom Title on Image */}
          <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
            <h2 className="text-lg sm:text-xl font-black leading-snug">
              {opportunity.title}
            </h2>
            <div className="flex items-center gap-3 text-xs text-slate-200">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                {opportunity.location}
              </span>
              <span aria-hidden="true">·</span>
              <span>Chia sẻ {opportunity.createdTime}</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {/* Key Resource Highlights */}
          <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
            <div>
              <span className="text-slate-500 block">Nguồn lực sẵn có:</span>
              <span className="font-extrabold text-slate-900 text-sm mt-0.5 block flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#FF2D55]" />
                {opportunity.resourceHighlight}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Định hướng hợp tác:</span>
              <span className="font-extrabold text-[#FF2D55] text-sm mt-0.5 block flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-amber-500" />
                {opportunity.cooperationType}
              </span>
            </div>
          </div>

          {/* What I have & What I need */}
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-1">
              <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Nguồn lực sẵn có:
              </span>
              <p className="text-emerald-900 leading-relaxed pl-5">
                {opportunity.whatIHave}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-100 space-y-1">
              <span className="font-bold text-rose-950 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#FF2D55]" />
                Cơ hội &amp; Năng lực mong muốn kết nối:
              </span>
              <p className="text-rose-900 leading-relaxed pl-5">
                {opportunity.whatINeed}
              </p>
            </div>
          </div>

          {/* Detailed description */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-500 text-xs uppercase tracking-wider">
              Chi tiết cơ hội hợp tác
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
              {opportunity.detailedDescription}
            </p>
          </div>

          {/* Contact Person */}
          <div className="flex items-center justify-between p-3.5 bg-slate-100/60 rounded-2xl text-xs">
            <div>
              <span className="text-slate-500 block">Người khởi tạo cơ hội:</span>
              <span className="font-bold text-slate-900 text-sm block">
                {opportunity.creatorName} ({opportunity.creatorRole})
              </span>
            </div>
            <button
              onClick={(e) => onBookmarkToggle(opportunity.id, e)}
              className="px-3 py-1.5 bg-white text-slate-700 hover:text-[#FF2D55] border border-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Bookmark className={`w-3.5 h-3.5 ${opportunity.isBookmarked ? 'fill-[#FF2D55] text-[#FF2D55]' : ''}`} />
              <span>{opportunity.isBookmarked ? 'Đã lưu' : 'Lưu cơ hội'}</span>
            </button>
          </div>

          {/* Connect Form or Owner Management */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            {isOwner ? (
              <div className="p-4 bg-rose-50/60 rounded-2xl border border-rose-200/60 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#FF2D55]" />
                    <span className="text-xs font-bold text-slate-900">
                      Bạn là người khởi tạo cơ hội này (Owner)
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      opportunity.status === 'closed'
                        ? 'bg-slate-200 text-slate-700'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {opportunity.status === 'closed' ? 'Đã đóng' : 'Đang hoạt động'}
                  </span>
                </div>

                <p className="text-xs text-slate-600">
                  Theo quy tắc bảo mật hệ thống: Chỉ bạn mới có quyền chuyển đổi trạng thái hoặc xóa cơ hội này khỏi nền tảng.
                </p>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-rose-200/50">
                  <button
                    type="button"
                    onClick={handleToggleStatus}
                    disabled={isUpdatingStatus}
                    className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer"
                  >
                    {opportunity.status === 'closed' ? 'Mở lại cơ hội' : 'Đóng cơ hội (Đã tìm được đối tác)'}
                  </button>

                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="px-3.5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{isDeleting ? 'Đang xóa...' : 'Xóa cơ hội'}</span>
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h4 className="font-bold text-slate-900 text-sm">
                  Mở lời hợp tác với người khởi tạo
                </h4>

                {isSent ? (
                  <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                    <h5 className="font-bold text-emerald-950 text-sm">
                      Gửi lời mở hợp tác thành công!
                    </h5>
                    <p className="text-xs text-emerald-800">
                      Đề xuất hợp tác của bạn đã được gửi an toàn tới {opportunity.creatorName}.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Họ và tên bạn *
                        </label>
                        <input
                          type="text"
                          required
                          value={senderName}
                          onChange={(e) => setSenderName(e.target.value)}
                          placeholder="Ví dụ: Hoàng Minh"
                          className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-[#FF2D55]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Số điện thoại / Zalo để kết nối *
                        </label>
                        <input
                          type="text"
                          required
                          value={senderContact}
                          onChange={(e) => setSenderContact(e.target.value)}
                          placeholder="09xx.xxx.xxx"
                          className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-[#FF2D55]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Nguồn lực hoặc đề xuất hợp tác của bạn *
                      </label>
                      <textarea
                        required
                        rows={2}
                        value={senderProposal}
                        onChange={(e) => setSenderProposal(e.target.value)}
                        placeholder="Giới thiệu ngắn về nguồn lực sẵn có hoặc hướng đồng hành bạn muốn thảo luận cùng người khởi tạo..."
                        className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-[#FF2D55]"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
                      >
                        Đóng
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#FF2D55] hover:bg-[#E01E45] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-2 active:scale-98"
                      >
                        <span>Mở lời hợp tác</span>
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
