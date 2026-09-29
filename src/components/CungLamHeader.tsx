import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface CungLamHeaderProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
  onNavigateSection: (sectionId: string) => void;
}

export const CungLamHeader: React.FC<CungLamHeaderProps> = ({
  onOpenAuth,
  onNavigateSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onNavigateSection(sectionId);
    setMobileMenuOpen(false);
  };

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
          </div>
        </div>
      )}
    </header>
  );
};
