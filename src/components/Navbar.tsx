'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  LogOut,
  User as UserIcon,
  Plus,
  Bell,
  MessageSquare,
  FolderKanban,
  Inbox,
  Contact,
  QrCode,
  ChevronDown,
  Edit3,
  Eye,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { auth, signOutUser, db } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { Logo } from './Logo';

interface NavbarProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
  onNavigateSection: (sectionId: string) => void;
  userName?: string | null;
  onLogout?: () => void;
  onOpenMemberHub?: (tab?: 'opportunities' | 'invitations' | 'messages') => void;
  onOpenPostDemand?: () => void;
  onOpenRolodex?: (tab?: 'contacts' | 'ai_parser' | 'my_card' | 'vault', startEditingCard?: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAuth,
  onNavigateSection,
  userName,
  onLogout,
  onOpenMemberHub,
  onOpenPostDemand,
  onOpenRolodex,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [pendingInvCount, setPendingInvCount] = useState<number>(0);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Listen to pending invitations for badge
  useEffect(() => {
    if (!currentUser?.uid) return;
    try {
      const q = query(
        collection(db, 'invitations'),
        where('receiverId', '==', currentUser.uid),
        where('status', '==', 'pending')
      );
      const unsub = onSnapshot(q, (snapshot) => {
        setPendingInvCount(snapshot.size);
      }, (err) => console.warn(err));
      return () => unsub();
    } catch (e) {
      console.warn(e);
    }
  }, [currentUser?.uid]);

  const handleNavClick = (sectionId: string) => {
    onNavigateSection(sectionId);
    setMobileMenuOpen(false);
  };

  const handleSignOut = async () => {
    await signOutUser();
    if (onLogout) onLogout();
  };

  const displayName = currentUser?.displayName || userName;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        
        {/* Brand Logo - Click returns to home */}
        <button
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-2.5 cursor-pointer focus:outline-none group text-left shrink-0"
          title="Về trang chủ J-Network"
        >
          <Logo size="md" />
        </button>

        {/* Center Navigation Links - Streamlined to prevent overflow */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-xs xl:text-sm font-semibold text-slate-700 shrink-0">
          <button
            onClick={() => handleNavClick('matchmaker')}
            className="text-[#FF2D55] font-black hover:text-[#e01e45] transition-colors cursor-pointer shrink-0"
          >
            Ghép nối 60s
          </button>
          <button
            onClick={() => handleNavClick('role-paths')}
            className="hover:text-[#FF2D55] transition-colors cursor-pointer shrink-0"
          >
            4 Lối đi
          </button>
          <button
            onClick={() => handleNavClick('opportunities')}
            className="hover:text-[#FF2D55] transition-colors cursor-pointer shrink-0"
          >
            Cơ hội
          </button>
          <button
            onClick={() => handleNavClick('industry-insights')}
            className="text-slate-700 hover:text-[#FF2D55] transition-colors cursor-pointer flex items-center gap-1 shrink-0"
          >
            <span>Bản tin thị trường</span>
          </button>
          <button
            onClick={() => handleNavClick('deal-room')}
            className="hover:text-[#FF2D55] transition-colors cursor-pointer shrink-0"
          >
            <span>Phòng Giao Thương</span>
          </button>
          <button
            type="button"
            onClick={() => {
              if (onOpenRolodex) onOpenRolodex();
            }}
            className="text-amber-800 hover:text-[#FF2D55] font-bold transition-colors cursor-pointer flex items-center gap-1 shrink-0"
            title="Sổ danh bạ đối tác & Danh thiếp số B2B (Không sợ mất số)"
          >
            <Contact className="w-3.5 h-3.5 text-amber-600" />
            <span>Sổ Danh Bạ</span>
          </button>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Primary Action Button: ICON ONLY as requested, frees maximum space */}
          <button
            type="button"
            onClick={() => (onOpenPostDemand ? onOpenPostDemand() : onOpenAuth('register'))}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-white bg-gradient-to-r from-[#FF2D55] to-[#E01E45] hover:from-[#E01E45] hover:to-[#C01538] shadow-md shadow-[#FF2D55]/25 transition-all flex items-center justify-center cursor-pointer active:scale-95 shrink-0"
            title="Chia sẻ nguồn lực / Đăng cơ hội mới"
            aria-label="Chia sẻ nguồn lực"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
          </button>

          {displayName ? (
            <div className="hidden sm:flex items-center gap-2">
              {/* Notification Quick Bell */}
              <button
                type="button"
                onClick={() => onOpenMemberHub && onOpenMemberHub('invitations')}
                className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer border border-slate-200"
                title="Thông báo & Lời mời hợp tác"
              >
                <Bell className="w-4 h-4 text-slate-700" />
                {pendingInvCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-[#FF2D55] text-[10px] font-bold text-white shadow-2xs">
                    {pendingInvCount}
                  </span>
                )}
              </button>

              {/* User Profile Badge with Rich Dropdown Menu */}
              <div className="relative" ref={profileDropdownRef}>
                <button
                  type="button"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl px-2.5 py-1.5 cursor-pointer transition-all active:scale-98"
                  title="Menu tài khoản & Thiết lập Card ID"
                  aria-expanded={profileDropdownOpen}
                >
                  <div className="w-7 h-7 rounded-full overflow-hidden bg-rose-100 border border-rose-200 flex items-center justify-center shrink-0">
                    {currentUser?.photoURL ? (
                      <img src={currentUser.photoURL} alt={displayName || 'User'} className="w-full h-full object-cover" />
                    ) : (
                      <UserIcon className="w-3.5 h-3.5 text-[#FF2D55]" />
                    )}
                  </div>
                  <span className="text-xs font-bold text-slate-900 truncate max-w-[85px] xl:max-w-[110px] hidden md:inline-block">
                    {displayName}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180 text-[#FF2D55]' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-3xl shadow-2xl border border-slate-200/90 py-3 z-50 animate-in fade-in slide-in-from-top-2 overflow-hidden text-left">
                    
                    {/* User Identity Header */}
                    <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/70">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FF2D55] to-amber-500 text-white flex items-center justify-center font-black text-sm shadow-md shrink-0">
                          {displayName ? displayName.charAt(0).toUpperCase() : 'J'}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-black text-slate-900 truncate">{displayName}</p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              Active Member
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono truncate">
                              ID: {currentUser?.uid ? currentUser.uid.slice(0, 8) : 'member'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* FEATURE GROUP 1: CARD ID & DANH THIẾP SỐ */}
                    <div className="p-2 border-b border-slate-100 space-y-1">
                      <div className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-rose-500 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Danh Thiếp Số B2B &amp; Card ID</span>
                      </div>

                      {/* 1. Thiết Lập Danh Thiếp Số */}
                      <button
                        type="button"
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          if (onOpenRolodex) onOpenRolodex('my_card', true);
                        }}
                        className="w-full px-3 py-2.5 rounded-xl hover:bg-rose-50/80 text-left transition-colors flex items-center gap-3 group cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-lg bg-rose-100 text-[#FF2D55] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          <Edit3 className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-900 group-hover:text-[#FF2D55] transition-colors">
                            Thiết Lập Danh Thiếp &amp; Card ID
                          </p>
                          <p className="text-[11px] text-slate-500 truncate">
                            Cập nhật SĐT, Zalo, chức vụ, công ty &amp; mã QR
                          </p>
                        </div>
                      </button>

                      {/* 2. Xem Trang Card ID Online */}
                      <a
                        href={`/card/${currentUser?.uid || 'member'}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="w-full px-3 py-2 rounded-xl hover:bg-slate-50 text-left transition-colors flex items-center gap-3 group cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          <Eye className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-800 flex items-center gap-1">
                            <span>Xem Trang Card ID Online</span>
                            <ExternalLink className="w-3 h-3 text-slate-400" />
                          </p>
                          <p className="text-[11px] text-slate-500 truncate">
                            Mở trang thực tế đối tác quét mã QR
                          </p>
                        </div>
                      </a>

                      {/* 3. Sổ Danh Bạ Đối Tác (B2B Rolodex) */}
                      <button
                        type="button"
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          if (onOpenRolodex) onOpenRolodex('contacts');
                        }}
                        className="w-full px-3 py-2 rounded-xl hover:bg-slate-50 text-left transition-colors flex items-center gap-3 group cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          <Contact className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-800">
                            Sổ Danh Bạ Đối Tác (B2B Rolodex)
                          </p>
                          <p className="text-[11px] text-slate-500 truncate">
                            Lưu vĩnh viễn, bóc tách tin nhắn Zalo bằng AI
                          </p>
                        </div>
                      </button>
                    </div>

                    {/* FEATURE GROUP 2: MEMBER WORKSPACE HUB */}
                    <div className="p-2 border-b border-slate-100 space-y-0.5">
                      <div className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Bảng Điều Khiển Thành Viên
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          if (onOpenMemberHub) onOpenMemberHub('opportunities');
                        }}
                        className="w-full px-3 py-2 rounded-xl hover:bg-slate-50 text-left transition-colors flex items-center justify-between text-xs font-semibold text-slate-700 cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <FolderKanban className="w-4 h-4 text-slate-500" />
                          <span>Cơ hội &amp; Nguồn lực của tôi</span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          if (onOpenMemberHub) onOpenMemberHub('invitations');
                        }}
                        className="w-full px-3 py-2 rounded-xl hover:bg-slate-50 text-left transition-colors flex items-center justify-between text-xs font-semibold text-slate-700 cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <Inbox className="w-4 h-4 text-slate-500" />
                          <span>Lời mời kết nối &amp; Đàm phán</span>
                        </div>
                        {pendingInvCount > 0 && (
                          <span className="px-1.5 py-0.5 bg-[#FF2D55] text-white text-[10px] font-bold rounded-full">
                            {pendingInvCount}
                          </span>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          if (onOpenMemberHub) onOpenMemberHub('messages');
                        }}
                        className="w-full px-3 py-2 rounded-xl hover:bg-slate-50 text-left transition-colors flex items-center justify-between text-xs font-semibold text-slate-700 cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <MessageSquare className="w-4 h-4 text-slate-500" />
                          <span>Tin nhắn trực tiếp</span>
                        </div>
                      </button>
                    </div>

                    {/* FEATURE GROUP 3: SIGN OUT */}
                    <div className="p-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          handleSignOut();
                        }}
                        className="w-full px-3 py-2 rounded-xl hover:bg-rose-50 text-rose-600 text-xs font-bold transition-colors flex items-center gap-2.5 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Đăng xuất tài khoản</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <button
              onClick={() => onOpenAuth('login')}
              className="hidden sm:inline-block px-3.5 xl:px-4 py-2 text-xs xl:text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer shrink-0"
            >
              Đăng nhập
            </button>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer shrink-0"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-3">
          <nav className="flex flex-col space-y-2 text-sm font-semibold text-slate-700">
            <button
              onClick={() => handleNavClick('matchmaker')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-50 font-bold text-[#FF2D55]"
            >
              Ghép nối nguồn lực 60s
            </button>
            <button
              onClick={() => handleNavClick('role-paths')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-50 font-semibold text-slate-800"
            >
              4 Lối đi cho người mới
            </button>
            <button
              onClick={() => handleNavClick('opportunities')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Danh sách cơ hội
            </button>
            <button
              onClick={() => handleNavClick('industry-insights')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-50 font-semibold text-slate-800"
            >
              Bản tin thị trường
            </button>
            <button
              onClick={() => handleNavClick('deal-room')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Phòng Giao Thương
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenRolodex) onOpenRolodex();
              }}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-50 font-bold text-amber-800 flex items-center gap-2"
            >
              <Contact className="w-4 h-4 text-amber-600" />
              <span>Sổ Danh Bạ Đối Tác (B2B Rolodex)</span>
            </button>
            <button
              onClick={() => handleNavClick('community-values')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Cộng đồng
            </button>
            <button
              onClick={() => handleNavClick('about-us')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Về chúng tôi
            </button>
          </nav>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {/* Primary Action in Mobile */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPostDemand ? onOpenPostDemand() : onOpenAuth('register');
              }}
              className="w-full py-3 text-sm font-bold text-white bg-gradient-to-r from-[#FF2D55] to-[#E01E45] rounded-xl shadow-md shadow-[#FF2D55]/20 flex items-center justify-center gap-2 mb-1 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Chia sẻ nguồn lực ngay</span>
            </button>

            {displayName ? (
              <div className="space-y-2">
                <div
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenMemberHub && onOpenMemberHub('opportunities');
                  }}
                  className="flex items-center gap-3 p-2.5 bg-slate-50 rounded-2xl border border-slate-200 cursor-pointer hover:bg-slate-100"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-rose-100 border border-rose-200 flex items-center justify-center shrink-0">
                    {currentUser?.photoURL ? (
                      <img src={currentUser.photoURL} alt={displayName} className="w-full h-full object-cover" />
                    ) : (
                      <UserIcon className="w-5 h-5 text-[#FF2D55]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-sm font-bold text-slate-900 truncate">{displayName}</p>
                    <p className="text-xs text-emerald-600 font-medium">Thành viên J-Network</p>
                  </div>
                </div>

                {/* Mobile Card ID Quick Actions */}
                <div className="grid grid-cols-2 gap-2 pt-1 pb-1">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (onOpenRolodex) onOpenRolodex('my_card', true);
                    }}
                    className="p-2.5 text-left bg-rose-50 border border-rose-200 rounded-xl text-xs font-bold text-[#FF2D55] flex items-center gap-2 cursor-pointer"
                  >
                    <Edit3 className="w-4 h-4 text-[#FF2D55] shrink-0" />
                    <span className="truncate">Sửa Card ID &amp; QR</span>
                  </button>

                  <a
                    href={`/card/${currentUser?.uid || 'member'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 text-left bg-slate-900 border border-slate-800 rounded-xl text-xs font-bold text-white flex items-center gap-2 cursor-pointer"
                  >
                    <Eye className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="truncate">Xem Card Online</span>
                  </a>
                </div>

                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenMemberHub && onOpenMemberHub('opportunities');
                    }}
                    className="p-2 text-center bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 flex flex-col items-center gap-1"
                  >
                    <FolderKanban className="w-4 h-4 text-[#FF2D55]" />
                    <span>Cơ hội</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenMemberHub && onOpenMemberHub('invitations');
                    }}
                    className="relative p-2 text-center bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 flex flex-col items-center gap-1"
                  >
                    <Inbox className="w-4 h-4 text-amber-500" />
                    <span>Lời mời</span>
                    {pendingInvCount > 0 && (
                      <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-rose-500" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenMemberHub && onOpenMemberHub('messages');
                    }}
                    className="p-2 text-center bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 flex flex-col items-center gap-1"
                  >
                    <MessageSquare className="w-4 h-4 text-indigo-500" />
                    <span>Tin nhắn</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleSignOut();
                  }}
                  className="w-full py-2.5 text-center text-sm font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 mt-1"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Đăng xuất</span>
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('login');
                  }}
                  className="w-full py-2.5 text-center text-sm font-semibold text-slate-700 border border-slate-200 rounded-xl"
                >
                  Đăng nhập
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('register');
                  }}
                  className="w-full py-2.5 text-center text-sm font-semibold text-white bg-[#FF2D55] rounded-xl"
                >
                  Tham gia cộng đồng
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
