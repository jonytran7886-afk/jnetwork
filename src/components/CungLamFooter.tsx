import React from 'react';
import { Facebook, Youtube } from 'lucide-react';

interface CungLamFooterProps {
  onNavigateSection: (sectionId: string) => void;
  onSelectCategory: (category: 'project' | 'resource' | 'space' | 'partner') => void;
  onOpenPrinciples: () => void;
  onOpenSupport: (topic?: string) => void;
}

export const CungLamFooter: React.FC<CungLamFooterProps> = ({
  onNavigateSection,
  onSelectCategory,
  onOpenPrinciples,
  onOpenSupport,
}) => {
  return (
    <footer id="about-us" className="bg-white border-t border-slate-100 pt-16 pb-12 text-sm text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Top 4 Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-slate-100">
          
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <svg width="28" height="28" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="13" r="7" fill="#FF2D55" />
                <circle cx="25" cy="13" r="7" fill="#FF4D6D" />
                <circle cx="18" cy="24" r="7.5" fill="#E11D48" />
                <circle cx="18" cy="17" r="3.5" fill="white" />
              </svg>
              <span className="text-xl font-black tracking-tight text-slate-900">
                Cùng Làm
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm">
              Cùng Làm — Mạng xã hội kết nối nguồn lực, chia sẻ cơ hội và phát triển những giá trị hợp tác.
            </p>
          </div>

          {/* Col 1: Khám phá */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
              Khám phá
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li>
                <button
                  onClick={() => onSelectCategory('project')}
                  className="hover:text-[#FF2D55] transition-colors cursor-pointer text-left"
                >
                  Dự án &amp; ý tưởng
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('resource')}
                  className="hover:text-[#FF2D55] transition-colors cursor-pointer text-left"
                >
                  Nguồn lực hợp tác
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('space')}
                  className="hover:text-[#FF2D55] transition-colors cursor-pointer text-left"
                >
                  Không gian chia sẻ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('partner')}
                  className="hover:text-[#FF2D55] transition-colors cursor-pointer text-left"
                >
                  Cộng đồng chuyên môn
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Về Cùng Làm */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
              Về Cùng Làm
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li>
                <button
                  onClick={() => onNavigateSection('hero')}
                  className="hover:text-[#FF2D55] transition-colors cursor-pointer text-left"
                >
                  Giới thiệu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('how-it-works')}
                  className="hover:text-[#FF2D55] transition-colors cursor-pointer text-left"
                >
                  Cách hoạt động
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPrinciples}
                  className="hover:text-[#FF2D55] transition-colors cursor-pointer text-left"
                >
                  Nguyên tắc cộng đồng
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Hỗ trợ & MXH */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                Hỗ trợ
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                <li>
                  <button
                    onClick={() => onOpenSupport('help-center')}
                    className="hover:text-[#FF2D55] transition-colors cursor-pointer text-left"
                  >
                    Trung tâm trợ giúp
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onOpenSupport('safety')}
                    className="hover:text-[#FF2D55] transition-colors cursor-pointer text-left"
                  >
                    An toàn cộng đồng
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onOpenSupport('terms')}
                    className="hover:text-[#FF2D55] transition-colors cursor-pointer text-left"
                  >
                    Điều khoản sử dụng
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onOpenSupport('privacy')}
                    className="hover:text-[#FF2D55] transition-colors cursor-pointer text-left"
                  >
                    Chính sách quyền riêng tư
                  </button>
                </li>
              </ul>
            </div>

            {/* Social Icons */}
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                Kết nối với chúng tôi
              </h4>
              <div className="flex items-center gap-3 text-slate-600">
                <a
                  href="#facebook"
                  onClick={(e) => { e.preventDefault(); }}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-rose-50 hover:text-[#FF2D55] flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#youtube"
                  onClick={(e) => { e.preventDefault(); }}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-rose-50 hover:text-[#FF2D55] flex items-center justify-center transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="#tiktok"
                  onClick={(e) => { e.preventDefault(); }}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-rose-50 hover:text-[#FF2D55] flex items-center justify-center transition-colors"
                  aria-label="TikTok"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.29 1.76-.35 1.25.13 2.68 1.15 3.44.82.63 1.91.82 2.9.59 1.04-.21 1.95-.98 2.3-1.97.23-.62.3-1.28.29-1.94V.02h-.03z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Rights */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 Cùng Làm. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => onOpenSupport('privacy')} className="hover:text-slate-600 transition-colors">
              Chính sách quyền riêng tư
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => onOpenSupport('terms')} className="hover:text-slate-600 transition-colors">
              Điều khoản sử dụng
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={onOpenPrinciples} className="hover:text-slate-600 transition-colors">
              Nguyên tắc cộng đồng
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
