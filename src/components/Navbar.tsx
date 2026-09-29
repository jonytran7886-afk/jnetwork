'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, LogOut, User as UserIcon, Plus, Bell, MessageSquare, FolderKanban, Inbox } from 'lucide-react';
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
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAuth,
  onNavigateSection,
  userName,
  onLogout,
  onOpenMemberHub,
  onOpenPostDemand,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [pendingInvCount, setPendingInvCount] = useState<number>(0);

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
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 2xl:gap-8 text-xs xl:text-sm font-semibold text-slate-700 shrink-0">
          <button
            onClick={() => handleNavClick('opportunities')}
            className="hover:text-[#FF2D55] transition-colors cursor-pointer shrink-0"
          >
            Khám phá
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
            onClick={() => handleNavClick('community-values')}
            className="hover:text-[#FF2D55] transition-colors cursor-pointer shrink-0"
          >
            Cộng đồng
          </button>
          <button
            onClick={() => handleNavClick('about-us')}
            className="hover:text-[#FF2D55] transition-colors cursor-pointer shrink-0"
          >
            Về chúng tôi
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

              {/* User Profile Badge */}
              <div
                onClick={() => onOpenMemberHub && onOpenMemberHub('opportunities')}
                className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl px-2.5 py-1.5 cursor-pointer transition-colors"
                title="Bấm để mở Bảng điều khiển thành viên"
              >
                <div className="w-7 h-7 rounded-full overflow-hidden bg-rose-100 border border-rose-200 flex items-center justify-center shrink-0">
                  {currentUser?.photoURL ? (
                    <img src={currentUser.photoURL} alt={displayName} className="w-full h-full object-cover" />
                  ) : (
                    <UserIcon className="w-3.5 h-3.5 text-[#FF2D55]" />
                  )}
                </div>
                <span className="text-xs font-bold text-slate-900 truncate max-w-[85px] xl:max-w-[110px] hidden md:inline-block">
                  {displayName}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSignOut();
                  }}
                  title="Đăng xuất"
                  className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
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
              onClick={() => handleNavClick('opportunities')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Khám phá
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
