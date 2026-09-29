'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  FolderKanban,
  Inbox,
  MessageSquare,
  Plus,
  Trash2,
  Edit3,
  Check,
  Send,
  User as UserIcon,
  Clock,
  Sparkles,
  MapPin,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import {
  OpportunityDoc,
  InvitationDoc,
  ConversationDoc,
  deleteOpportunity,
  updateOpportunity,
  createConversation,
  sendMessage,
} from '../lib/firestoreService';
import { OpportunityItem } from '../data/opportunitiesData';

interface MemberHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: {
    uid: string;
    displayName: string;
    email: string;
    photoURL?: string;
  } | null;
  onOpenPostDemand: () => void;
  onSelectOpportunity: (opp: OpportunityItem) => void;
  initialTab?: 'opportunities' | 'invitations' | 'messages';
}

export const MemberHubModal: React.FC<MemberHubModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onOpenPostDemand,
  onSelectOpportunity,
  initialTab = 'opportunities',
}) => {
  const [activeTab, setActiveTab] = useState<'opportunities' | 'invitations' | 'messages'>(initialTab);

  // Data states
  const [myOpportunities, setMyOpportunities] = useState<OpportunityDoc[]>([]);
  const [receivedInvitations, setReceivedInvitations] = useState<InvitationDoc[]>([]);
  const [sentInvitations, setSentInvitations] = useState<InvitationDoc[]>([]);
  const [conversations, setConversations] = useState<ConversationDoc[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessageText, setNewMessageText] = useState('');
  const [isSubmittingMessage, setIsSubmittingMessage] = useState(false);

  // Edit Opportunity Modal state inside hub
  const [editingOpp, setEditingOpp] = useState<OpportunityDoc | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [editReward, setEditReward] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  // Synchronize initialTab when prop changes
  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab]);

  // 1. Listen to My Opportunities
  useEffect(() => {
    if (!currentUser?.uid || !isOpen) return;

    try {
      const q = query(
        collection(db, 'opportunities'),
        where('ownerId', '==', currentUser.uid)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const items = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        })) as OpportunityDoc[];
        setMyOpportunities(items);
      }, (err) => console.warn('My opportunities listener error:', err));

      return () => unsubscribe();
    } catch (e) {
      console.warn('Error setting up my opportunities listener:', e);
    }
  }, [currentUser?.uid, isOpen]);

  // 2. Listen to Received & Sent Invitations
  useEffect(() => {
    if (!currentUser?.uid || !isOpen) return;

    try {
      // Received
      const qReceived = query(
        collection(db, 'invitations'),
        where('receiverId', '==', currentUser.uid)
      );
      const unsubReceived = onSnapshot(qReceived, (snapshot) => {
        const items = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        })) as InvitationDoc[];
        setReceivedInvitations(items);
      }, (err) => console.warn('Received invitations listener error:', err));

      // Sent
      const qSent = query(
        collection(db, 'invitations'),
        where('senderId', '==', currentUser.uid)
      );
      const unsubSent = onSnapshot(qSent, (snapshot) => {
        const items = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        })) as InvitationDoc[];
        setSentInvitations(items);
      }, (err) => console.warn('Sent invitations listener error:', err));

      return () => {
        unsubReceived();
        unsubSent();
      };
    } catch (e) {
      console.warn('Error setting up invitations listener:', e);
    }
  }, [currentUser?.uid, isOpen]);

  // 3. Listen to Conversations
  useEffect(() => {
    if (!currentUser?.uid || !isOpen) return;

    try {
      const q = query(
        collection(db, 'conversations'),
        where('participantIds', 'array-contains', currentUser.uid)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const items = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        })) as ConversationDoc[];
        setConversations(items);
        if (items.length > 0 && !activeConversationId) {
          setActiveConversationId(items[0].id || null);
        }
      }, (err) => console.warn('Conversations listener error:', err));

      return () => unsubscribe();
    } catch (e) {
      console.warn('Error setting up conversations listener:', e);
    }
  }, [currentUser?.uid, isOpen, activeConversationId]);

  // 4. Listen to Messages in Active Conversation
  useEffect(() => {
    if (!activeConversationId || !isOpen) return;

    try {
      const msgsRef = collection(db, 'conversations', activeConversationId, 'messages');
      const q = query(msgsRef, orderBy('timestamp', 'asc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const msgs = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setMessages(msgs);
      }, (err) => console.warn('Messages listener error:', err));

      return () => unsubscribe();
    } catch (e) {
      console.warn('Error setting up messages listener:', e);
    }
  }, [activeConversationId, isOpen]);

  if (!isOpen || !currentUser) return null;

  // Handlers for Opportunities
  const handleDeleteOpportunity = async (oppId?: string) => {
    if (!oppId) return;
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa cơ hội này không? Thao tác này không thể hoàn tác.');
    if (!confirmDelete) return;

    try {
      await deleteOpportunity(oppId, currentUser.uid);
    } catch (err: any) {
      alert(err.message || 'Xóa cơ hội thất bại');
    }
  };

  const handleToggleStatus = async (opp: OpportunityDoc) => {
    if (!opp.id) return;
    const newStatus = opp.status === 'closed' ? 'active' : 'closed';
    try {
      await updateOpportunity(opp.id, currentUser.uid, { status: newStatus });
    } catch (err: any) {
      alert(err.message || 'Cập nhật trạng thái thất bại');
    }
  };

  const handleStartEdit = (opp: OpportunityDoc) => {
    setEditingOpp(opp);
    setEditTitle(opp.title);
    setEditDesc(opp.description);
    setEditLocation(opp.location);
    setEditReward(opp.reward);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOpp?.id) return;
    setIsUpdating(true);
    try {
      await updateOpportunity(editingOpp.id, currentUser.uid, {
        title: editTitle,
        description: editDesc,
        location: editLocation,
        reward: editReward,
      });
      setEditingOpp(null);
    } catch (err: any) {
      alert(err.message || 'Cập nhật cơ hội thất bại');
    } finally {
      setIsUpdating(false);
    }
  };

  // Handlers for Invitations
  const handleAcceptInvitation = async (inv: InvitationDoc) => {
    if (!inv.id) return;
    try {
      const invRef = doc(db, 'invitations', inv.id);
      await updateDoc(invRef, { status: 'accepted' });

      // Automatically create a conversation between the two users
      const participantNames: Record<string, string> = {
        [currentUser.uid]: currentUser.displayName,
        [inv.senderId]: inv.senderName,
      };

      const newConvId = await createConversation(
        [currentUser.uid, inv.senderId],
        participantNames,
        `Chào bạn! Tôi đã đồng ý lời mời hợp tác cho cơ hội "${inv.opportunityTitle}". Chúng ta cùng trao đổi nhé!`,
        currentUser.uid
      );

      setActiveConversationId(newConvId);
      setActiveTab('messages');
    } catch (err: any) {
      alert(err.message || 'Chấp nhận lời mời thất bại');
    }
  };

  const handleDeclineInvitation = async (invId?: string) => {
    if (!invId) return;
    try {
      const invRef = doc(db, 'invitations', invId);
      await updateDoc(invRef, { status: 'rejected' });
    } catch (err: any) {
      alert(err.message || 'Thao tác thất bại');
    }
  };

  // Handler for Sending Message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim() || !activeConversationId || isSubmittingMessage) return;

    setIsSubmittingMessage(true);
    try {
      await sendMessage(
        activeConversationId,
        currentUser.uid,
        currentUser.displayName,
        newMessageText.trim()
      );
      setNewMessageText('');
    } catch (err: any) {
      alert(err.message || 'Gửi tin nhắn thất bại');
    } finally {
      setIsSubmittingMessage(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-100 overflow-hidden my-auto flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-rose-100 border border-rose-200 flex items-center justify-center shrink-0">
              {currentUser.photoURL ? (
                <img src={currentUser.photoURL} alt={currentUser.displayName} className="w-full h-full object-cover" />
              ) : (
                <UserIcon className="w-5 h-5 text-[#FF2D55]" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                  {currentUser.displayName}
                </h3>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Đã xác thực
                </span>
              </div>
              <p className="text-xs text-slate-500">{currentUser.email}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 px-6 bg-white gap-2 sm:gap-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('opportunities')}
            className={`py-3.5 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'opportunities'
                ? 'border-[#FF2D55] text-[#FF2D55]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <FolderKanban className="w-4 h-4" />
            <span>Cơ hội của tôi</span>
            <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-semibold">
              {myOpportunities.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('invitations')}
            className={`py-3.5 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'invitations'
                ? 'border-[#FF2D55] text-[#FF2D55]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Lời mời hợp tác</span>
            {receivedInvitations.filter(i => i.status === 'pending').length > 0 && (
              <span className="text-[11px] bg-rose-500 text-white px-2 py-0.5 rounded-full font-bold">
                {receivedInvitations.filter(i => i.status === 'pending').length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`py-3.5 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'messages'
                ? 'border-[#FF2D55] text-[#FF2D55]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Tin nhắn trao đổi</span>
            <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-semibold">
              {conversations.length}
            </span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/40 min-h-[350px]">
          
          {/* TAB 1: MY OPPORTUNITIES */}
          {activeTab === 'opportunities' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                    Danh sách cơ hội bạn đã đăng
                  </h4>
                  <p className="text-xs text-slate-500">
                    Chỉ bạn có quyền chỉnh sửa, chuyển đổi trạng thái hoặc xóa các cơ hội này.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onOpenPostDemand();
                  }}
                  className="px-3.5 py-2 bg-[#FF2D55] hover:bg-[#E01E45] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Đăng mới</span>
                </button>
              </div>

              {myOpportunities.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-rose-50 text-[#FF2D55] flex items-center justify-center mx-auto">
                    <FolderKanban className="w-6 h-6" />
                  </div>
                  <h5 className="font-bold text-slate-900 text-sm">Bạn chưa đăng cơ hội nào</h5>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Hãy đăng các nguồn lực sẵn có hoặc nhu cầu tìm đối tác để các thành viên khác trong mạng lưới kết nối với bạn.
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenPostDemand();
                    }}
                    className="px-4 py-2 bg-[#FF2D55] text-white text-xs font-bold rounded-xl hover:bg-[#E01E45] transition-colors"
                  >
                    Đăng nhu cầu ngay
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {myOpportunities.map((opp) => (
                    <div
                      key={opp.id}
                      className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-300 transition-all shadow-xs"
                    >
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                              opp.status === 'closed'
                                ? 'bg-slate-100 text-slate-600'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {opp.status === 'closed' ? 'Đã đóng' : 'Đang tìm đối tác'}
                          </span>
                          <span className="text-[10px] font-semibold bg-rose-50 text-[#FF2D55] px-2 py-0.5 rounded-full">
                            {opp.category}
                          </span>
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {opp.location}
                          </span>
                        </div>

                        <h5 className="text-sm font-bold text-slate-900 truncate">
                          {opp.title}
                        </h5>
                        <p className="text-xs text-slate-600 line-clamp-1">
                          {opp.description}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0">
                        <button
                          onClick={() => handleToggleStatus(opp)}
                          className={`text-xs px-3 py-1.5 font-semibold rounded-xl border transition-colors cursor-pointer ${
                            opp.status === 'closed'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                              : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                          }`}
                        >
                          {opp.status === 'closed' ? 'Mở lại' : 'Đóng cơ hội'}
                        </button>

                        <button
                          onClick={() => handleStartEdit(opp)}
                          className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                          title="Chỉnh sửa"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDeleteOpportunity(opp.id)}
                          className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                          title="Xóa cơ hội"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: INVITATIONS */}
          {activeTab === 'invitations' && (
            <div className="space-y-6">
              
              {/* Received Invitations */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <span>Lời mời nhận được ({receivedInvitations.length})</span>
                </h4>

                {receivedInvitations.length === 0 ? (
                  <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
                    Chưa có lời mời hợp tác nào gửi đến các cơ hội của bạn.
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {receivedInvitations.map((inv) => (
                      <div
                        key={inv.id}
                        className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-rose-100 text-[#FF2D55] flex items-center justify-center font-bold text-xs">
                              {inv.senderName.slice(0, 1).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-900">{inv.senderName}</p>
                              <p className="text-[11px] text-slate-500">
                                Gửi tới cơ hội: <strong className="text-slate-800">{inv.opportunityTitle}</strong>
                              </p>
                            </div>
                          </div>
                          
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              inv.status === 'accepted'
                                ? 'bg-emerald-100 text-emerald-800'
                                : inv.status === 'rejected'
                                ? 'bg-slate-100 text-slate-600'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {inv.status === 'accepted'
                              ? 'Đã chấp nhận'
                              : inv.status === 'rejected'
                              ? 'Đã từ chối'
                              : 'Chờ phản hồi'}
                          </span>
                        </div>

                        <div className="bg-slate-50 p-3 rounded-xl text-xs text-slate-700 leading-relaxed border border-slate-100">
                          &ldquo;{inv.message}&rdquo;
                        </div>

                        {inv.status === 'pending' && (
                          <div className="flex items-center justify-end gap-2 pt-1">
                            <button
                              onClick={() => handleDeclineInvitation(inv.id)}
                              className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                            >
                              Từ chối
                            </button>
                            <button
                              onClick={() => handleAcceptInvitation(inv)}
                              className="px-4 py-1.5 text-xs font-bold bg-[#FF2D55] hover:bg-[#E01E45] text-white rounded-xl transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Chấp nhận &amp; Nhắn tin</span>
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Sent Invitations */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm">
                  Lời mời bạn đã gửi ({sentInvitations.length})
                </h4>

                {sentInvitations.length === 0 ? (
                  <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
                    Bạn chưa gửi lời mời hợp tác nào. Hãy khám phá trang chủ và bấm &ldquo;Mở lời hợp tác&rdquo; trên cơ hội bạn quan tâm.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {sentInvitations.map((inv) => (
                      <div
                        key={inv.id}
                        className="bg-white rounded-xl border border-slate-200 p-3.5 flex items-center justify-between text-xs"
                      >
                        <div className="space-y-0.5">
                          <p className="font-bold text-slate-900">
                            Cơ hội: {inv.opportunityTitle}
                          </p>
                          <p className="text-slate-500 text-[11px] truncate max-w-sm">
                            Nội dung: {inv.message}
                          </p>
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            inv.status === 'accepted'
                              ? 'bg-emerald-100 text-emerald-800'
                              : inv.status === 'rejected'
                              ? 'bg-slate-100 text-slate-600'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {inv.status === 'accepted'
                            ? 'Đã chấp nhận'
                            : inv.status === 'rejected'
                            ? 'Đã từ chối'
                            : 'Đang chờ'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 3: MESSAGES & CHAT */}
          {activeTab === 'messages' && (
            <div className="bg-white rounded-2xl border border-slate-200 h-[480px] flex flex-col sm:flex-row overflow-hidden">
              
              {/* Conversation List */}
              <div className="w-full sm:w-1/3 border-b sm:border-b-0 sm:border-r border-slate-200 overflow-y-auto bg-slate-50/50">
                <div className="p-3 border-b border-slate-200 bg-white">
                  <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                    Cuộc trò chuyện
                  </h5>
                </div>

                {conversations.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400">
                    Chưa có cuộc trò chuyện nào. Khi bạn chấp nhận một lời mời, kênh chat riêng tư sẽ tự động mở tại đây.
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {conversations.map((conv) => {
                      const otherParticipantId = conv.participantIds.find((id) => id !== currentUser.uid);
                      const otherName = otherParticipantId && conv.participantNames
                        ? conv.participantNames[otherParticipantId]
                        : 'Thành viên đối tác';

                      const isSelected = activeConversationId === conv.id;

                      return (
                        <button
                          key={conv.id}
                          onClick={() => setActiveConversationId(conv.id || null)}
                          className={`w-full text-left p-3.5 transition-colors flex items-start gap-2.5 cursor-pointer ${
                            isSelected ? 'bg-rose-50/80 border-l-4 border-[#FF2D55]' : 'hover:bg-slate-100/60'
                          }`}
                        >
                          <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                            {otherName.slice(0, 1).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-slate-900 truncate">{otherName}</p>
                            <p className="text-[11px] text-slate-500 truncate mt-0.5">
                              {conv.lastMessage || 'Bắt đầu cuộc trò chuyện'}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Chat Window */}
              <div className="flex-1 flex flex-col bg-white">
                {activeConversationId ? (
                  <>
                    {/* Message History */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-3">
                      {messages.map((msg, index) => {
                        const isMe = msg.senderId === currentUser.uid;
                        return (
                          <div
                            key={msg.id || index}
                            className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                          >
                            <span className="text-[10px] text-slate-400 mb-0.5 px-1">
                              {isMe ? 'Bạn' : msg.senderName}
                            </span>
                            <div
                              className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                                isMe
                                  ? 'bg-[#FF2D55] text-white rounded-br-xs'
                                  : 'bg-slate-100 text-slate-900 rounded-bl-xs'
                              }`}
                            >
                              {msg.content}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Chat Input */}
                    <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 flex items-center gap-2">
                      <input
                        type="text"
                        required
                        value={newMessageText}
                        onChange={(e) => setNewMessageText(e.target.value)}
                        placeholder="Nhập tin nhắn trao đổi bảo mật..."
                        className="flex-1 text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-[#FF2D55]"
                      />
                      <button
                        type="submit"
                        disabled={isSubmittingMessage || !newMessageText.trim()}
                        className="p-2.5 bg-[#FF2D55] hover:bg-[#E01E45] disabled:opacity-50 text-white rounded-xl transition-colors cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center p-6 text-center text-xs text-slate-400">
                    Chọn một cuộc trò chuyện để bắt đầu nhắn tin
                  </div>
                )}
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Quick Edit Opportunity Modal Sub-dialog */}
      {editingOpp && (
        <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="font-bold text-slate-900 text-sm">Chỉnh sửa cơ hội hợp tác</h4>
              <button
                onClick={() => setEditingOpp(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Tiêu đề cơ hội</label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#FF2D55]"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Khu vực / Địa điểm</label>
                <input
                  type="text"
                  required
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#FF2D55]"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nguồn lực sẵn có</label>
                <input
                  type="text"
                  required
                  value={editReward}
                  onChange={(e) => setEditReward(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#FF2D55]"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Mô tả chi tiết</label>
                <textarea
                  rows={3}
                  required
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#FF2D55]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingOpp(null)}
                  className="px-3 py-1.5 font-semibold text-slate-600"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-4 py-2 bg-[#FF2D55] text-white font-bold rounded-xl hover:bg-[#E01E45] transition-colors"
                >
                  {isUpdating ? 'Đang lưu...' : 'Lưu thay đổi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
