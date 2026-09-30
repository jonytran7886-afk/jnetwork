'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Search,
  Plus,
  Phone,
  MessageCircle,
  Mail,
  Download,
  Share2,
  Sparkles,
  QrCode,
  FileText,
  Building2,
  MapPin,
  Tag,
  CheckCircle2,
  Briefcase,
  FolderOpen,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  ChevronRight,
  Zap,
  ArrowRight,
  ShieldCheck,
  User as UserIcon,
  RefreshCw,
  Contact,
  Lock,
} from 'lucide-react';
import {
  BusinessContactItem,
  BusinessContactDocument,
  INITIAL_BUSINESS_CONTACTS,
  downloadVCard,
} from '../data/businessContactsData';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

interface BusinessRolodexModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser?: {
    uid: string;
    displayName: string;
    email: string;
    photoURL?: string;
  } | null;
  onRequireAuth?: () => void;
  onOpenDealRoomWithPrompt?: (prompt: {
    partyAResources: string;
    partyBResources: string;
    dealType: string;
    targetGoal: string;
  }) => void;
}

export const BusinessRolodexModal: React.FC<BusinessRolodexModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onRequireAuth,
  onOpenDealRoomWithPrompt,
}) => {
  const [contacts, setContacts] = useState<BusinessContactItem[]>([]);
  const [activeTab, setActiveTab] = useState<'contacts' | 'ai_parser' | 'my_card' | 'vault'>('contacts');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [selectedContact, setSelectedContact] = useState<BusinessContactItem | null>(null);

  // AI Parser State
  const [pastedText, setPastedText] = useState<string>('');
  const [isParsing, setIsParsing] = useState<boolean>(false);
  const [parsedPreview, setParsedPreview] = useState<(Partial<BusinessContactItem> & { suggestedTags?: string[] }) | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);

  // Quick Notification Toast
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Add Contact Form State
  const [isAddingManual, setIsAddingManual] = useState<boolean>(false);
  const [manualForm, setManualForm] = useState({
    contactName: '',
    company: '',
    position: '',
    phone: '',
    zaloPhone: '',
    email: '',
    industry: '',
    location: '',
    tags: '',
    coreStrengths: '',
    needs: '',
    meetingContext: '',
  });

  // User-specific storage key to isolate contacts per individual account
  const userStorageKey = currentUser?.uid ? `jnetwork_contacts_${currentUser.uid}` : null;

  // Load from local storage and Firestore per user on mount or user switch
  useEffect(() => {
    if (!currentUser?.uid || !userStorageKey) {
      setContacts([]);
      return;
    }

    let hasLocal = false;
    const saved = localStorage.getItem(userStorageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setContacts(parsed);
          hasLocal = true;
        }
      } catch (e) {
        console.error('Error loading saved contacts', e);
      }
    }

    // Also sync from Firestore for this user
    const fetchRemoteContacts = async () => {
      try {
        const q = query(
          collection(db, 'business_contacts'),
          where('userId', '==', currentUser.uid)
        );
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const remoteList: BusinessContactItem[] = [];
          snapshot.forEach((d) => {
            const data = d.data();
            remoteList.push({ id: d.id, ...data } as BusinessContactItem);
          });
          setContacts(remoteList);
          localStorage.setItem(userStorageKey, JSON.stringify(remoteList));
        } else if (!hasLocal) {
          // If brand new account with 0 contacts, initialize with starter sample contacts
          setContacts(INITIAL_BUSINESS_CONTACTS);
          localStorage.setItem(userStorageKey, JSON.stringify(INITIAL_BUSINESS_CONTACTS));
        }
      } catch (err) {
        console.warn('Firestore contacts fetch fallback to local:', err);
        if (!hasLocal) {
          setContacts(INITIAL_BUSINESS_CONTACTS);
        }
      }
    };

    fetchRemoteContacts();
  }, [currentUser?.uid, userStorageKey]);

  // Save to isolated local storage whenever contacts change for current user
  useEffect(() => {
    if (!userStorageKey || !currentUser?.uid) return;
    try {
      localStorage.setItem(userStorageKey, JSON.stringify(contacts));
    } catch (e) {
      console.error('Error storing contacts to local storage', e);
    }
  }, [contacts, userStorageKey, currentUser?.uid]);

  if (!isOpen) return null;

  // STRICT AUTH GATE: Feature strictly requires login because data is managed per individual user
  if (!currentUser) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
        <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 text-center space-y-6 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-3xl bg-rose-50 border border-rose-200 text-[#FF2D55] flex items-center justify-center mx-auto shadow-md">
            <Contact className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold border border-amber-200">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>BẢO MẬT DỮ LIỆU ĐỐI TÁC THEO TÀI KHOẢN</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Sổ Danh Bạ B2B Yêu Cầu Đăng Nhập
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
              Sổ danh bạ đối tác, danh thiếp số và kho hồ sơ năng lực được quản lý và bảo mật riêng biệt theo từng tài khoản người dùng.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-left space-y-2 text-xs text-slate-700">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Quyền lợi tài khoản của riêng bạn:</span>
            </div>
            <ul className="space-y-1.5 text-slate-600 pl-6 list-disc text-[11px] leading-relaxed">
              <li>Không sợ thất lạc số liên hệ khi thay đổi điện thoại hoặc SIM.</li>
              <li>Bóc tách thông tin danh thiếp và tin nhắn Zalo tự động bằng AI.</li>
              <li>Mã QR danh thiếp động cập nhật thông tin tự động sang đối tác.</li>
              <li>Kho hồ sơ năng lực &amp; bảng giá lưu trữ vĩnh viễn không hết hạn.</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-1/3 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl border border-slate-200 cursor-pointer"
            >
              Để sau
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onRequireAuth) onRequireAuth();
              }}
              className="w-full sm:w-2/3 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#FF2D55] to-[#E01E45] hover:from-[#E01E45] hover:to-[#C01538] rounded-xl shadow-md shadow-[#FF2D55]/25 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <UserIcon className="w-4 h-4" />
              <span>Đăng nhập / Đăng ký ngay</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Extract all unique tags
  const allTags = Array.from(
    new Set(contacts.flatMap((c) => c.tags || []))
  );

  // Filtered contacts
  const filteredContacts = contacts.filter((c) => {
    const matchTag = selectedTag === 'all' || (c.tags && c.tags.includes(selectedTag));
    const q = searchQuery.toLowerCase().trim();
    const matchSearch =
      !q ||
      c.contactName.toLowerCase().includes(q) ||
      c.company.toLowerCase().includes(q) ||
      c.industry.toLowerCase().includes(q) ||
      c.location.toLowerCase().includes(q) ||
      c.phone.includes(q) ||
      c.coreStrengths.toLowerCase().includes(q) ||
      c.needs.toLowerCase().includes(q) ||
      c.meetingContext.toLowerCase().includes(q);
    return matchTag && matchSearch;
  });

  // Handle AI Contact Parser
  const handleParseWithAi = async () => {
    if (!pastedText.trim()) return;
    setIsParsing(true);
    setParseError(null);
    setParsedPreview(null);

    try {
      const res = await fetch('/api/ai/parse-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawText: pastedText.trim() }),
      });

      const json = await res.json();
      if (json.data) {
        setParsedPreview(json.data);
        showToast('AI đã bóc tách thành công thông tin danh thiếp!');
      } else {
        setParseError(json.error || 'Không thể bóc tách thông tin');
      }
    } catch (err: any) {
      setParseError(err?.message || 'Lỗi kết nối máy chủ phân tích');
    } finally {
      setIsParsing(false);
    }
  };

  const handleSaveParsedContact = () => {
    if (!parsedPreview) return;

    const newContact: BusinessContactItem = {
      id: `contact-${Date.now()}`,
      contactName: parsedPreview.contactName || 'Đối tác mới',
      company: parsedPreview.company || 'Doanh nghiệp liên kết',
      position: parsedPreview.position || 'Đại diện',
      phone: parsedPreview.phone || '',
      zaloPhone: parsedPreview.zaloPhone || parsedPreview.phone || '',
      email: parsedPreview.email || '',
      industry: parsedPreview.industry || 'Thương mại',
      location: parsedPreview.location || 'Toàn quốc',
      avatarUrl: `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 1000)}?auto=format&fit=crop&w=400&q=80`,
      tags: parsedPreview.suggestedTags || ['Đối tác mới', 'AI Parser'],
      coreStrengths: parsedPreview.coreStrengths || 'Đang cập nhật thế mạnh',
      needs: parsedPreview.needs || 'Hợp tác kinh doanh',
      meetingContext: parsedPreview.meetingContext || 'Bóc tách từ tin nhắn Zalo',
      isVerified: false,
      rating: 5,
      createdAt: new Date().toISOString().split('T')[0],
      documents: [],
    };

    setContacts([newContact, ...contacts]);
    setSelectedContact(newContact);
    setPastedText('');
    setParsedPreview(null);
    setActiveTab('contacts');
    showToast(`Đã lưu "${newContact.contactName}" vào Sổ Danh Bạ!`);

    // Sync to Firestore for authenticated user
    if (currentUser?.uid) {
      try {
        addDoc(collection(db, 'business_contacts'), {
          ...newContact,
          userId: currentUser.uid,
          updatedAt: new Date().toISOString(),
        }).catch((err) => console.warn('Firestore addDoc error:', err));
      } catch (err) {
        console.warn(err);
      }
    }
  };

  // Handle Manual Contact Save
  const handleSaveManual = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualForm.contactName.trim() || !manualForm.phone.trim()) {
      alert('Vui lòng nhập Họ tên và Số điện thoại');
      return;
    }

    const tagList = manualForm.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const newContact: BusinessContactItem = {
      id: `contact-manual-${Date.now()}`,
      contactName: manualForm.contactName.trim(),
      company: manualForm.company.trim() || 'Doanh nghiệp độc lập',
      position: manualForm.position.trim() || 'Đại diện liên hệ',
      phone: manualForm.phone.trim(),
      zaloPhone: manualForm.zaloPhone.trim() || manualForm.phone.trim(),
      email: manualForm.email.trim(),
      industry: manualForm.industry.trim() || 'Đa ngành',
      location: manualForm.location.trim() || 'Toàn quốc',
      tags: tagList.length > 0 ? tagList : ['Đối tác mới'],
      coreStrengths: manualForm.coreStrengths.trim() || 'Đang cập nhật thế mạnh',
      needs: manualForm.needs.trim() || 'Mở rộng hợp tác',
      meetingContext: manualForm.meetingContext.trim() || 'Nhập thủ công',
      isVerified: true,
      rating: 5,
      createdAt: new Date().toISOString().split('T')[0],
      documents: [],
    };

    setContacts([newContact, ...contacts]);
    setIsAddingManual(false);
    setSelectedContact(newContact);
    showToast(`Đã thêm "${newContact.contactName}" vào Danh bạ!`);

    // Sync to Firestore for authenticated user
    if (currentUser?.uid) {
      try {
        addDoc(collection(db, 'business_contacts'), {
          ...newContact,
          userId: currentUser.uid,
          updatedAt: new Date().toISOString(),
        }).catch((err) => console.warn('Firestore addDoc error:', err));
      } catch (err) {
        console.warn(err);
      }
    }
  };

  // Delete Contact
  const handleDeleteContact = (id: string, name: string) => {
    if (confirm(`Bạn có chắc muốn xóa đối tác "${name}" khỏi Sổ Danh Bạ không?`)) {
      setContacts(contacts.filter((c) => c.id !== id));
      if (selectedContact?.id === id) {
        setSelectedContact(null);
      }
      showToast(`Đã xóa liên hệ "${name}".`);

      if (currentUser?.uid && !id.startsWith('contact-sample')) {
        try {
          deleteDoc(doc(db, 'business_contacts', id)).catch((err) => console.warn(err));
        } catch (err) {
          console.warn(err);
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden relative">
        
        {/* Header Bar */}
        <div className="px-5 sm:px-7 py-4.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FF2D55] to-amber-500 text-white flex items-center justify-center shadow-md shadow-[#FF2D55]/20">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-slate-900 tracking-tight">
                  Sổ Danh Bạ Đối Tác & Danh Thiếp B2B
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-[#FF2D55] border border-rose-200 px-2 py-0.5 rounded-full">
                  Không Sợ Mất Số
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Lưu trữ liên lạc vĩnh viễn, phân loại năng lực và chia sẻ tài liệu không bao giờ hết hạn.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors cursor-pointer"
              title="Đóng cửa sổ"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 sm:gap-2 px-5 sm:px-7 py-2.5 bg-white border-b border-slate-100 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => {
              setActiveTab('contacts');
              setIsAddingManual(false);
            }}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'contacts' && !isAddingManual
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Danh Bạ Đối Tác ({contacts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('ai_parser')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'ai_parser'
                ? 'bg-[#FF2D55] text-white shadow-xs'
                : 'text-rose-600 hover:bg-rose-50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bóc Tách Zalo / Namecard AI</span>
          </button>

          <button
            onClick={() => setActiveTab('my_card')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'my_card'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Danh Thiếp Số Của Bạn</span>
          </button>

          <button
            onClick={() => setActiveTab('vault')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'vault'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FolderOpen className="w-3.5 h-3.5" />
            <span>Kho Hồ Sơ & Báo Giá Vĩnh Viễn</span>
          </button>
        </div>

        {/* Toast Alert */}
        {toastMsg && (
          <div className="absolute top-18 right-6 z-50 bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 animate-in slide-in-from-top-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/50">
          
          {/* TAB 1: CONTACTS DIRECTORY */}
          {activeTab === 'contacts' && !isAddingManual && (
            <div className="space-y-4">
              {/* Search & Actions Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm theo tên, công ty, ngành, số điện thoại, thế mạnh..."
                    className="w-full bg-white border border-slate-200 rounded-xl pl-9.5 pr-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#FF2D55]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('ai_parser')}
                    className="px-3.5 py-2 bg-rose-50 text-[#FF2D55] hover:bg-rose-100 border border-rose-200 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Dán tin nhắn Zalo</span>
                  </button>

                  <button
                    onClick={() => setIsAddingManual(true)}
                    className="px-3.5 py-2 bg-slate-900 hover:bg-[#FF2D55] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Thêm đối tác</span>
                  </button>
                </div>
              </div>

              {/* Tag Filters */}
              {allTags.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    onClick={() => setSelectedTag('all')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                      selectedTag === 'all'
                        ? 'bg-slate-900 text-white'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Tất cả thẻ
                  </button>
                  {allTags.slice(0, 8).map((tag, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedTag(tag)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                        selectedTag === tag
                          ? 'bg-[#FF2D55] text-white'
                          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              )}

              {/* Contacts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="bg-white border border-slate-200/90 hover:border-[#FF2D55]/40 rounded-2xl p-4.5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Info Header */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                            {contact.avatarUrl ? (
                              <img
                                src={contact.avatarUrl}
                                alt={contact.contactName}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-rose-50 text-[#FF2D55] font-bold text-lg">
                                {contact.contactName.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#FF2D55] transition-colors">
                                {contact.contactName}
                              </h4>
                              {contact.isVerified && (
                                <span title="Đã xác thực">
                                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                </span>
                              )}
                            </div>
                            <div className="text-xs font-medium text-slate-700">{contact.position}</div>
                            <div className="text-xs text-slate-500 line-clamp-1">{contact.company}</div>
                          </div>
                        </div>

                        {/* Delete Action */}
                        <button
                          onClick={() => handleDeleteContact(contact.id, contact.contactName)}
                          className="text-slate-300 hover:text-rose-600 p-1 rounded-md transition-colors cursor-pointer"
                          title="Xóa liên hệ này"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Location & Industry */}
                      <div className="flex items-center gap-3 text-[11px] text-slate-500 mb-2.5">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span className="truncate max-w-[150px]">{contact.location}</span>
                        </span>
                        <span>·</span>
                        <span className="truncate max-w-[140px] text-slate-700 font-medium">{contact.industry}</span>
                      </div>

                      {/* Core Strength Box */}
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 mb-2.5">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">
                          Thế mạnh / Nguồn lực sẵn có:
                        </div>
                        <p className="text-xs text-slate-700 line-clamp-2 leading-relaxed">
                          {contact.coreStrengths}
                        </p>
                      </div>

                      {/* Needs & Meeting Context */}
                      <div className="text-xs text-slate-600 space-y-1 mb-3">
                        {contact.needs && (
                          <div className="flex items-start gap-1">
                            <strong className="text-rose-600 font-bold shrink-0">Cần tìm:</strong>
                            <span className="line-clamp-1 text-slate-700">{contact.needs}</span>
                          </div>
                        )}
                        {contact.meetingContext && (
                          <div className="text-[11px] text-slate-500 flex items-center gap-1">
                            <span>Ngữ cảnh:</span>
                            <span className="italic truncate">{contact.meetingContext}</span>
                          </div>
                        )}
                      </div>

                      {/* Tags */}
                      {contact.tags && contact.tags.length > 0 && (
                        <div className="flex items-center gap-1.5 flex-wrap mb-3">
                          {contact.tags.map((t, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom Action Buttons: Phone, Zalo, vCard, Deal Room */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-1.5">
                      <div className="flex items-center gap-1">
                        {/* Native Call */}
                        {contact.phone && (
                          <a
                            href={`tel:${contact.phone}`}
                            className="p-2 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 transition-colors flex items-center gap-1 text-xs font-bold"
                            title={`Gọi điện: ${contact.phone}`}
                          >
                            <Phone className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="hidden sm:inline">{contact.phone}</span>
                          </a>
                        )}

                        {/* Direct Zalo */}
                        {contact.zaloPhone && (
                          <a
                            href={`https://zalo.me/${contact.zaloPhone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors flex items-center gap-1 text-xs font-bold"
                            title="Mở nhắn tin Zalo trực tiếp"
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-blue-600" />
                            <span>Zalo</span>
                          </a>
                        )}

                        {/* Export vCard to Smartphone contacts */}
                        <button
                          onClick={() => {
                            downloadVCard(contact);
                            showToast(`Đã tải file vCard cho ${contact.contactName}!`);
                          }}
                          className="p-2 rounded-xl bg-slate-100 hover:bg-amber-50 hover:text-amber-800 text-slate-600 transition-colors flex items-center gap-1 text-xs font-semibold cursor-pointer"
                          title="Tải vCard (.vcf) lưu thẳng vào danh bạ điện thoại"
                        >
                          <Download className="w-3.5 h-3.5 text-amber-600" />
                          <span className="hidden lg:inline">vCard</span>
                        </button>
                      </div>

                      {/* Transfer to Deal Room */}
                      {onOpenDealRoomWithPrompt && (
                        <button
                          onClick={() => {
                            onClose();
                            onOpenDealRoomWithPrompt({
                              partyAResources: 'Nguồn lực và năng lực cốt lõi của doanh nghiệp bạn',
                              partyBResources: `${contact.contactName} (${contact.company}): ${contact.coreStrengths}`,
                              dealType: 'Liên kết kinh doanh & Đối tác cung ứng',
                              targetGoal: `Hợp tác thương mại thử nghiệm với ${contact.company}`,
                            });
                          }}
                          className="px-3 py-1.5 bg-slate-900 hover:bg-[#FF2D55] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer shadow-xs"
                          title="Mở phòng giao thương tính toán tỷ lệ ăn chia với đối tác này"
                        >
                          <Briefcase className="w-3 h-3" />
                          <span>Deal Room</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {filteredContacts.length === 0 && (
                <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center max-w-md mx-auto">
                  <Building2 className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <div className="text-sm font-bold text-slate-800 mb-1">Không tìm thấy liên hệ phù hợp</div>
                  <p className="text-xs text-slate-500 mb-4">
                    Thử tìm với từ khóa khác hoặc bấm nút bóc tách tin nhắn Zalo để thêm đối tác mới.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedTag('all');
                    }}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                  >
                    Xem lại toàn bộ danh bạ
                  </button>
                </div>
              )}
            </div>
          )}

          {/* MANUAL ADD FORM */}
          {activeTab === 'contacts' && isAddingManual && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-2xl mx-auto shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                <div>
                  <h4 className="text-base font-bold text-slate-900">Thêm Đối Tác Mới Vào Sổ Danh Bạ</h4>
                  <p className="text-xs text-slate-500">Lưu thông tin chi tiết để kết nối và cập nhật vĩnh viễn</p>
                </div>
                <button
                  onClick={() => setIsAddingManual(false)}
                  className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
                >
                  Quay lại
                </button>
              </div>

              <form onSubmit={handleSaveManual} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Họ và Tên Đối Tác <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={manualForm.contactName}
                      onChange={(e) => setManualForm({ ...manualForm, contactName: e.target.value })}
                      placeholder="VD: Nguyễn Văn Cường"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs focus:bg-white focus:border-[#FF2D55] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Số Điện Thoại <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={manualForm.phone}
                      onChange={(e) => setManualForm({ ...manualForm, phone: e.target.value })}
                      placeholder="VD: 0912345678"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs focus:bg-white focus:border-[#FF2D55] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Công Ty / Thương Hiệu</label>
                    <input
                      type="text"
                      value={manualForm.company}
                      onChange={(e) => setManualForm({ ...manualForm, company: e.target.value })}
                      placeholder="VD: Xưởng Gỗ Mỹ Nghệ Tân Thịnh"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs focus:bg-white focus:border-[#FF2D55] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Chức Vụ</label>
                    <input
                      type="text"
                      value={manualForm.position}
                      onChange={(e) => setManualForm({ ...manualForm, position: e.target.value })}
                      placeholder="VD: Giám Đốc Sản Xuất"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs focus:bg-white focus:border-[#FF2D55] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Ngành Nghề</label>
                    <input
                      type="text"
                      value={manualForm.industry}
                      onChange={(e) => setManualForm({ ...manualForm, industry: e.target.value })}
                      placeholder="VD: Chế Biến Gỗ & Nội Thất"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs focus:bg-white focus:border-[#FF2D55] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Địa Điểm / Tỉnh Thành</label>
                    <input
                      type="text"
                      value={manualForm.location}
                      onChange={(e) => setManualForm({ ...manualForm, location: e.target.value })}
                      placeholder="VD: KCN Biên Hòa 2, Đồng Nai"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs focus:bg-white focus:border-[#FF2D55] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Thế Mạnh / Nguồn Lực Đối Tác Có Sẵn
                  </label>
                  <textarea
                    rows={2}
                    value={manualForm.coreStrengths}
                    onChange={(e) => setManualForm({ ...manualForm, coreStrengths: e.target.value })}
                    placeholder="VD: Xưởng 1.500m2 có 4 máy cắt CNC, nhận gia công đơn hàng xuất khẩu từ 300 sản phẩm..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs focus:bg-white focus:border-[#FF2D55] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nhu Cầu Đối Tác Cần Tìm</label>
                  <input
                    type="text"
                    value={manualForm.needs}
                    onChange={(e) => setManualForm({ ...manualForm, needs: e.target.value })}
                    placeholder="VD: Tìm nguồn gỗ sồi nhập khẩu giá tốt và đơn vị sơn phủ UV"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs focus:bg-white focus:border-[#FF2D55] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Thẻ Phân Loại (Phân tách bằng dấu phẩy)
                    </label>
                    <input
                      type="text"
                      value={manualForm.tags}
                      onChange={(e) => setManualForm({ ...manualForm, tags: e.target.value })}
                      placeholder="VD: Gỗ, Đồng Nai, Xưởng Gia Công, Khách VIP"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs focus:bg-white focus:border-[#FF2D55] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Ngữ Cảnh Gặp Gỡ</label>
                    <input
                      type="text"
                      value={manualForm.meetingContext}
                      onChange={(e) => setManualForm({ ...manualForm, meetingContext: e.target.value })}
                      placeholder="VD: Gặp tại BNI Chapter Pioneer tháng 9/2026"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs focus:bg-white focus:border-[#FF2D55] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsAddingManual(false)}
                    className="px-4 py-2 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-100"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-slate-900 hover:bg-[#FF2D55] text-white font-bold text-xs rounded-xl transition-all shadow-sm"
                  >
                    Lưu Vào Danh Bạ
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: AI CONTACT & NAMECARD PARSER */}
          {activeTab === 'ai_parser' && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-gradient-to-r from-rose-50 to-amber-50 border border-rose-200/80 rounded-3xl p-5 sm:p-6">
                <div className="flex items-start gap-3.5 mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#FF2D55] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">
                      Bóc Tách Tin Nhắn Zalo / Namecard Nhanh Bằng AI
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                      Sau khi đi hội thảo, kết bạn Zalo hoặc nhận tin nhắn tự giới thiệu: Chỉ cần copy toàn bộ đoạn chat
                      và dán vào đây. AI sẽ tự động phân loại tên, công ty, hotline, thế mạnh và lưu vào danh bạ trong 2 giây!
                    </p>
                  </div>
                </div>

                {/* Textarea */}
                <div className="space-y-3">
                  <textarea
                    rows={5}
                    value={pastedText}
                    onChange={(e) => setPastedText(e.target.value)}
                    placeholder="Dán tin nhắn Zalo hoặc thông tin danh thiếp tại đây...
Ví dụ:
'Chào anh, em là Hùng - Giám đốc Công ty Vận tải Nam Hà. Bên em có 12 xe tải thùng kín 5 tấn chuyên tuyến Hà Nội - Hải Phòng. Hotline/Zalo: 0987.654.321, email: hung@namha.vn. Rất mong được hợp tác chở hàng cho bên anh!'"
                    className="w-full bg-white border border-slate-300 rounded-2xl p-4 text-xs text-slate-800 focus:outline-none focus:border-[#FF2D55] focus:ring-1 focus:ring-[#FF2D55]"
                  />

                  {/* Sample Templates to try */}
                  <div className="flex items-center gap-2 flex-wrap text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-600">Mẫu thử nhanh:</span>
                    <button
                      type="button"
                      onClick={() =>
                        setPastedText(
                          'Em là Đỗ Minh Khang - Chủ xưởng may Khang Thịnh tại Tân Bình, HCM. SĐT: 0909123456. Xưởng em 30 công nhân chuyên nhận gia công áo thun đồng phục và đồ thể thao xuất khẩu, nhận từ 200 chiếc. Cần tìm đối tác in lụa và đại lý phân phối sỉ.'
                        )
                      }
                      className="px-2.5 py-1 bg-white border border-slate-200 hover:border-slate-400 rounded-lg text-slate-700"
                    >
                      Xưởng may Khang Thịnh
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setPastedText(
                          'Chị Vân Anh - Giám đốc Công ty Nông sản Sạch Đà Lạt. Điện thoại: 0918776655. Đang có vùng trồng 20ha rau củ đạt chuẩn VietGAP sản lượng 30 tấn/tháng. Đang tìm chuỗi siêu thị hoặc cửa hàng thực phẩm tại TP.HCM để bao tiêu dài hạn.'
                        )
                      }
                      className="px-2.5 py-1 bg-white border border-slate-200 hover:border-slate-400 rounded-lg text-slate-700"
                    >
                      Nông sản Đà Lạt
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {parseError && <div className="text-xs text-rose-600 font-bold">{parseError}</div>}
                    <div />
                    <button
                      type="button"
                      onClick={handleParseWithAi}
                      disabled={isParsing || !pastedText.trim()}
                      className="px-5 py-2.5 bg-slate-900 hover:bg-[#FF2D55] disabled:opacity-50 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      {isParsing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>AI đang bóc tách...</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 text-amber-400" />
                          <span>Bóc Tách Bằng AI Ngay</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Parsed Preview Card */}
              {parsedPreview && (
                <div className="bg-white border-2 border-[#FF2D55]/30 rounded-3xl p-6 shadow-md animate-in slide-in-from-bottom-2">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <h4 className="text-sm font-black text-slate-900">Kết Quả Bóc Tách Sẵn Sàng Lưu</h4>
                    </div>
                    <span className="text-[11px] font-bold text-[#FF2D55] bg-rose-50 px-2.5 py-0.5 rounded-full">
                      Kiểm tra trước khi lưu
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-4">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Họ và Tên:</span>
                      <strong className="text-slate-800 text-sm">{parsedPreview.contactName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Số Điện Thoại:</span>
                      <strong className="text-emerald-700 font-mono text-sm">{parsedPreview.phone || 'Chưa rõ'}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Công Ty / Cơ Sở:</span>
                      <strong className="text-slate-800">{parsedPreview.company}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Chức Vụ:</span>
                      <span className="text-slate-700">{parsedPreview.position}</span>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Thế Mạnh Cốt Lõi:</span>
                      <p className="text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100 mt-1">
                        {parsedPreview.coreStrengths}
                      </p>
                    </div>
                    {parsedPreview.needs && (
                      <div className="sm:col-span-2">
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Nhu Cầu Hợp Tác:</span>
                        <p className="text-rose-700 font-medium">{parsedPreview.needs}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setParsedPreview(null)}
                      className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-100"
                    >
                      Bỏ qua
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveParsedContact}
                      className="px-5 py-2 bg-[#FF2D55] hover:bg-[#E01E45] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      <span>Xác Nhận Lưu Vào Danh Bạ</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: DYNAMIC DIGITAL CARD & QR */}
          {activeTab === 'my_card' && (
            <div className="max-w-xl mx-auto space-y-6">
              <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-700 relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-[#FF2D55]/20 rounded-full blur-2xl" />

                {/* Card Top */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3.5">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FF2D55] to-amber-500 text-white flex items-center justify-center font-black text-xl shadow-lg">
                      {currentUser?.displayName ? currentUser.displayName.charAt(0) : 'J'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg font-bold text-white">
                          {currentUser?.displayName || 'Thành Viên J-Network'}
                        </h4>
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-500/40">
                          Active
                        </span>
                      </div>
                      <div className="text-xs text-slate-300">Chủ Doanh Nghiệp / Đối Tác Kết Nối</div>
                      <div className="text-[11px] text-slate-400">J-Network ID: {currentUser?.uid?.slice(0, 10) || 'member-888'}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-black tracking-wider text-rose-400">J-NETWORK</div>
                    <div className="text-[10px] text-slate-400">B2B Live Rolodex</div>
                  </div>
                </div>

                {/* QR Code Demonstration Box */}
                <div className="bg-white rounded-2xl p-5 text-center text-slate-900 shadow-md mb-6 flex flex-col sm:flex-row items-center gap-5 justify-between">
                  <div className="w-32 h-32 bg-slate-50 border border-slate-200 rounded-xl p-2 flex items-center justify-center shrink-0">
                    {/* Visual QR Code Pattern */}
                    <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900">
                      <rect width="100" height="100" fill="white" />
                      {/* 3 Corner Markers */}
                      <rect x="10" y="10" width="25" height="25" fill="#1e293b" />
                      <rect x="15" y="15" width="15" height="15" fill="white" />
                      <rect x="18" y="18" width="9" height="9" fill="#FF2D55" />

                      <rect x="65" y="10" width="25" height="25" fill="#1e293b" />
                      <rect x="70" y="15" width="15" height="15" fill="white" />
                      <rect x="73" y="18" width="9" height="9" fill="#FF2D55" />

                      <rect x="10" y="65" width="25" height="25" fill="#1e293b" />
                      <rect x="15" y="70" width="15" height="15" fill="white" />
                      <rect x="18" y="73" width="9" height="9" fill="#FF2D55" />

                      {/* Random Data Dots */}
                      <rect x="42" y="12" width="6" height="6" fill="#1e293b" />
                      <rect x="52" y="18" width="6" height="6" fill="#1e293b" />
                      <rect x="45" y="45" width="12" height="12" fill="#FF2D55" />
                      <rect x="25" y="45" width="6" height="6" fill="#1e293b" />
                      <rect x="65" y="45" width="8" height="8" fill="#1e293b" />
                      <rect x="45" y="65" width="8" height="8" fill="#1e293b" />
                      <rect x="65" y="70" width="6" height="6" fill="#1e293b" />
                      <rect x="78" y="78" width="8" height="8" fill="#1e293b" />
                    </svg>
                  </div>

                  <div className="text-left flex-1">
                    <div className="text-sm font-bold text-slate-900 mb-1">Mã QR Danh Thiếp Động</div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-3">
                      Đối tác chỉ cần mở camera điện thoại quét mã này là lưu toàn bộ thông tin của bạn vào máy.
                      Khi bạn cập nhật số điện thoại hay địa chỉ, danh thiếp của bạn bên máy họ tự động cập nhật!
                    </p>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `https://jnetwork.ai.studio/card/${currentUser?.uid || 'member'}`
                        );
                        showToast('Đã sao chép link danh thiếp số của bạn!');
                      }}
                      className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Sao chép liên kết danh thiếp</span>
                    </button>
                  </div>
                </div>

                <div className="text-xs text-slate-400 flex items-center justify-between">
                  <span>Hỗ trợ iOS Contact & Google Contacts</span>
                  <span className="text-slate-300 font-semibold">Tự động đồng bộ vĩnh viễn</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ZERO-EXPIRY B2B VAULT */}
          {activeTab === 'vault' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <FolderOpen className="w-5 h-5 text-[#FF2D55]" />
                      <h4 className="text-base font-bold text-slate-900">
                        Kho Hồ Sơ Năng Lực & Báo Giá Vĩnh Viễn
                      </h4>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Giải quyết triệt để vấn đề "File đã hết hạn trên Zalo". Mọi tài liệu (Company Profile, Catalogue, Bảng Giá, Giấy Kiểm Định) lưu trữ tại đây đều mở được trọn đời.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      alert('Tính năng tải lên tài liệu mới đang kết nối kho lưu trữ đám mây. Bạn có thể xem các tài liệu mẫu bên dưới.');
                    }}
                    className="px-3.5 py-2 bg-slate-900 hover:bg-[#FF2D55] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tải lên tài liệu mới</span>
                  </button>
                </div>

                {/* Documents Table / Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {contacts.flatMap((c) =>
                    (c.documents || []).map((doc) => (
                      <div
                        key={doc.id}
                        className="bg-slate-50 border border-slate-200 rounded-2xl p-4 hover:border-[#FF2D55]/40 transition-colors flex items-start justify-between gap-3 group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#FF2D55] shrink-0 shadow-2xs">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div>
                            <h5 className="text-xs font-bold text-slate-900 group-hover:text-[#FF2D55] transition-colors line-clamp-1">
                              {doc.title}
                            </h5>
                            <div className="text-[11px] text-slate-500 mt-0.5">
                              <span>Thuộc đối tác: </span>
                              <strong className="text-slate-700">{c.contactName} ({c.company})</strong>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                              <span>Dung lượng: {doc.fileSize || '2.5 MB'}</span>
                              <span>·</span>
                              <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded">
                                Vĩnh viễn (Zero-Expiry)
                              </span>
                            </div>
                          </div>
                        </div>

                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-slate-400 hover:text-[#FF2D55] hover:bg-white rounded-lg transition-colors cursor-pointer shrink-0"
                          title="Xem hoặc tải tài liệu"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
