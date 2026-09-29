'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, LogOut, User as UserIcon } from 'lucide-react';
import { auth, signOutUser } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

interface NavbarProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
  onNavigateSection: (sectionId: string) => void;
  userName?: string | null;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAuth,
  onNavigateSection,
  userName,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

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
        
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-2.5 cursor-pointer focus:outline-none group text-left"
        >
          <div className="w-8 h-8 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="13" r="7" fill="#FF2D55" />
              <circle cx="25" cy="13" r="7" fill="#FF4D6D" />
              <circle cx="18" cy="24" r="7.5" fill="#E11D48" />
              <circle cx="18" cy="17" r="3.5" fill="white" />
            </svg>
          </div>
          <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-[#FF2D55] transition-colors">
            Cùng Làm
          </span>
        </button>

        {/* Center Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-700">
          <button
            onClick={() => handleNavClick('hero')}
            className="text-[#FF2D55] hover:text-[#E01E45] transition-colors cursor-pointer"
          >
            Trang chủ
          </button>
          <button
            onClick={() => handleNavClick('opportunities')}
            className="hover:text-[#FF2D55] transition-colors cursor-pointer"
          >
            Khám phá
          </button>
          <button
            onClick={() => handleNavClick('how-it-works')}
            className="hover:text-[#FF2D55] transition-colors cursor-pointer"
          >
            Cách hoạt động
          </button>
          <button
            onClick={() => handleNavClick('community-values')}
            className="hover:text-[#FF2D55] transition-colors cursor-pointer"
          >
            Cộng đồng
          </button>
          <button
            onClick={() => handleNavClick('about-us')}
            className="hover:text-[#FF2D55] transition-colors cursor-pointer"
          >
            Về chúng tôi
          </button>
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {displayName ? (
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-1.5">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-rose-100 border border-rose-200 flex items-center justify-center shrink-0">
                {currentUser?.photoURL ? (
                  <img src={currentUser.photoURL} alt={displayName} className="w-full h-full object-cover" />
                ) : (
                  <UserIcon className="w-4 h-4 text-[#FF2D55]" />
                )}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-slate-900 leading-tight truncate max-w-[130px]">
                  {displayName}
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold leading-none">
                  Thành viên Cùng Làm
                </span>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                title="Đăng xuất"
                className="ml-1 p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => onOpenAuth('login')}
                className="px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                Đăng nhập
              </button>

              <button
                onClick={() => onOpenAuth('register')}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-[#FF2D55] hover:bg-[#E01E45] rounded-xl transition-all shadow-xs cursor-pointer active:scale-98"
              >
                Tham gia cộng đồng
              </button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-3">
          <nav className="flex flex-col space-y-2 text-sm font-semibold text-slate-700">
            <button
              onClick={() => handleNavClick('hero')}
              className="text-left px-3 py-2 rounded-lg text-[#FF2D55] bg-rose-50"
            >
              Trang chủ
            </button>
            <button
              onClick={() => handleNavClick('opportunities')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Khám phá
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Cách hoạt động
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
            {displayName ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="w-9 h-9 rounded-full overflow-hidden bg-rose-100 border border-rose-200 flex items-center justify-center shrink-0">
                    {currentUser?.photoURL ? (
                      <img src={currentUser.photoURL} alt={displayName} className="w-full h-full object-cover" />
                    ) : (
                      <UserIcon className="w-5 h-5 text-[#FF2D55]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-sm font-bold text-slate-900 truncate">{displayName}</p>
                    <p className="text-xs text-emerald-600 font-medium">Thành viên Cùng Làm</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleSignOut();
                  }}
                  className="w-full py-2.5 text-center text-sm font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
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
