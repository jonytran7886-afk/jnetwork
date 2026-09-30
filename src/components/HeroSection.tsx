'use client';

import React from 'react';
import {
  Search,
  FileText,
  Coins,
  Home,
  Users,
  ArrowRight,
  ShieldCheck,
  Globe2,
  HeartHandshake,
  Sparkles,
  FileCode2,
  CheckCircle2,
  Building2,
  Store,
  Compass,
  Contact,
} from 'lucide-react';

interface HeroSectionProps {
  activeHeroTab: 'project' | 'resource' | 'space' | 'partner';
  setActiveHeroTab: (tab: 'project' | 'resource' | 'space' | 'partner') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  onTagClick: (tag: string) => void;
  onSelectCard: (sampleId: string) => void;
  onOpenPostDemand: () => void;
  onScrollToMatchmaker: () => void;
  onScrollToRoles: () => void;
  onOpenLegalTemplates: () => void;
  onOpenRolodex?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  activeHeroTab,
  setActiveHeroTab,
  searchQuery,
  setSearchQuery,
  onSearchSubmit,
  onTagClick,
  onSelectCard,
  onOpenPostDemand,
  onScrollToMatchmaker,
  onScrollToRoles,
  onOpenLegalTemplates,
  onOpenRolodex,
}) => {
  const suggestionTags = [
    'Mặt bằng mở quán F&B',
    'Góp vốn vi mô chia sẻ lợi nhuận',
    'Tìm xưởng may gia công',
    'Nhượng quyền thương hiệu',
    'Tìm đồng sáng lập Tech',
  ];

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-rose-50/50 via-white to-slate-50/70 pt-8 sm:pt-12 pb-14 sm:pb-20 border-b border-slate-200/70">
      
      {/* Decorative Subtle Background Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-rose-200/30 rounded-full blur-3xl opacity-60" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-pink-100/40 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* TOP BRAND POSITIONING ANNOUNCEMENT BAR */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8 bg-white border border-rose-100/80 rounded-2xl px-4 py-2.5 shadow-xs">
          <div className="flex items-center gap-2.5 text-xs">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF2D55] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF2D55]"></span>
            </span>
            <span className="font-extrabold text-[#FF2D55] uppercase tracking-wider text-[11px] sm:text-xs">
              MẠNG LƯỚI HỢP TÁC NGUỒN LỰC DOANH NGHIỆP &amp; KHỞI NGHIỆP
            </span>
            <span className="hidden md:inline text-slate-300">|</span>
            <span className="hidden md:inline text-slate-600 font-medium text-xs">
              Kết Nối Trực Tiếp · Không Thu Phí Trung Gian · Hợp Đồng Mẫu Minh Bạch
            </span>
          </div>

          <button
            type="button"
            onClick={onOpenLegalTemplates}
            className="text-[11px] sm:text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <FileCode2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Tải Bộ Mẫu Hợp Đồng Hợp Tác Miễn Phí</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: BRAND PROPOSITION & SMART SEARCH (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7">
            
            {/* Slogan Kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-[#FF2D55] text-xs font-black tracking-wider uppercase shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>KẾT NỐI NGUỒN LỰC · CHIA SẺ CƠ HỘI · ĐỒNG HÀNH PHÁT TRIỂN</span>
            </div>

            {/* Repositioned Official Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black text-slate-900 tracking-tight leading-[1.15]">
              Hợp Tác Nguồn Lực.<br />
              <span className="text-[#FF2D55]">Kiến Tạo Cơ Hội Kinh Doanh.</span>
            </h1>

            {/* Value Description with Professional Tone */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              Nền tảng gắn kết trực tiếp giữa chủ mặt bằng, nhà tài trợ vốn, xưởng sản xuất và các thương hiệu vận hành — cùng hợp tác minh bạch, cùng phát triển bền vững.
            </p>

            {/* Quick Action Navigation Bar */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={onScrollToMatchmaker}
                className="px-5 py-3 bg-[#FF2D55] hover:bg-[#E01E45] text-white text-xs sm:text-sm font-bold rounded-2xl shadow-md shadow-[#FF2D55]/20 transition-all flex items-center gap-2 cursor-pointer active:scale-98"
              >
                <Compass className="w-4 h-4" />
                <span>Ghép Nối Nguồn Lực 60 Giây</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onOpenPostDemand}
                className="px-5 py-3 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs sm:text-sm font-bold rounded-2xl shadow-2xs transition-all flex items-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Đăng Nhu Cầu Hợp Tác</span>
              </button>

              {onOpenRolodex && (
                <button
                  type="button"
                  onClick={onOpenRolodex}
                  className="px-4 py-3 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs sm:text-sm font-bold rounded-2xl shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-98"
                  title="Sổ danh bạ đối tác & Danh thiếp số B2B (Không sợ mất số)"
                >
                  <Contact className="w-4 h-4 text-amber-600" />
                  <span>Sổ Danh Bạ B2B</span>
                </button>
              )}

              <button
                type="button"
                onClick={onScrollToRoles}
                className="px-3 py-3 text-slate-600 hover:text-slate-900 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                4 Lối đi cho người mới →
              </button>
            </div>

            {/* Search Engine Card in Clean Luminous White */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-lg shadow-slate-100 space-y-3.5">
              
              {/* Category Quick Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
                <button
                  type="button"
                  onClick={() => setActiveHeroTab('project')}
                  className={`px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                    activeHeroTab === 'project'
                      ? 'bg-rose-50 text-[#FF2D55] border border-rose-200'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-transparent'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Dự án &amp; Sản phẩm</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveHeroTab('space')}
                  className={`px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                    activeHeroTab === 'space'
                      ? 'bg-rose-50 text-[#FF2D55] border border-rose-200'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-transparent'
                  }`}
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Mặt bằng &amp; Kho xưởng</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveHeroTab('resource')}
                  className={`px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                    activeHeroTab === 'resource'
                      ? 'bg-rose-50 text-[#FF2D55] border border-rose-200'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-transparent'
                  }`}
                >
                  <Coins className="w-3.5 h-3.5" />
                  <span>Vốn &amp; Nguồn lực</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveHeroTab('partner')}
                  className={`px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                    activeHeroTab === 'partner'
                      ? 'bg-rose-50 text-[#FF2D55] border border-rose-200'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-transparent'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Cộng sự &amp; Chuyên gia</span>
                </button>
              </div>

              {/* Search Bar Input */}
              <form onSubmit={onSearchSubmit} className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm cơ hội: Mặt bằng mở quán cafe, xưởng may gia công, vốn 100tr..."
                  className="w-full text-xs sm:text-sm py-3.5 pl-4 pr-28 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-[#FF2D55] transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-[#FF2D55] hover:bg-[#E01E45] text-white rounded-lg text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer active:scale-98 shadow-xs"
                >
                  <Search className="w-4 h-4" />
                  <span>Tìm kiếm</span>
                </button>
              </form>

              {/* Tag suggestions */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs pt-0.5">
                <span className="text-slate-400 font-medium text-[11px]">Gợi ý tìm nhanh:</span>
                {suggestionTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => onTagClick(tag)}
                    className="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 rounded-lg text-[11px] transition-colors border border-slate-200 cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Social Proof & Trust Assurance Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-200">
              <div>
                <div className="text-xl sm:text-2xl font-black text-slate-900">350+</div>
                <div className="text-[11px] text-slate-500 font-medium">Mặt bằng &amp; Kho trống</div>
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-black text-emerald-600">1,240+</div>
                <div className="text-[11px] text-slate-500 font-medium">Đối tác đã xác minh</div>
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-black text-amber-600">98.5%</div>
                <div className="text-[11px] text-slate-500 font-medium">Ký kết thỏa thuận BCC</div>
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-black text-[#FF2D55]">0 VNĐ</div>
                <div className="text-[11px] text-slate-500 font-medium">Phí môi giới trung gian</div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: OPPORTUNITIES SHOWCASE (5 Cols) */}
          <div className="lg:col-span-5 relative space-y-3.5">
            
            {/* Header Badge */}
            <div className="flex items-center justify-between text-xs px-1">
              <span className="font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#FF2D55]" />
                <span>Cơ Hội Đang Chờ Ghép Nối</span>
              </span>
              <span className="text-[11px] text-slate-400">Đã xác minh thông tin</span>
            </div>

            {/* FEATURED OPPORTUNITY CARD 1 (Shophouse F&B) */}
            <div
              onClick={() => onSelectCard('opp-1')}
              className="bg-white rounded-3xl p-5 border-2 border-rose-100 hover:border-[#FF2D55] shadow-lg hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#FF2D55] border border-rose-100 flex items-center justify-center shrink-0">
                    <Store className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#FF2D55] uppercase">Mặt Bằng &amp; Nhượng Quyền F&amp;B</span>
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-[#FF2D55] transition-colors leading-snug">
                      Chuỗi Trà Trái Cây &amp; Cafe Tìm Mặt Bằng Shophouse Q.1 &amp; Q.3
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  Đã có sẵn thương hiệu, thiết bị pha chế và tệp khách hàng. Hợp tác chia sẻ <strong>15% tổng doanh thu hàng tháng</strong> theo biên bản hợp tác kinh doanh minh bạch.
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Đã kiểm định hệ thống POS</span>
                  </div>
                  <div className="text-[#FF2D55] font-extrabold flex items-center gap-1 text-xs group-hover:translate-x-1 transition-transform">
                    <span>Xem chi tiết</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* FEATURED OPPORTUNITY CARD 2 (Micro Investment) */}
            <div
              onClick={() => onSelectCard('opp-4')}
              className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 hover:border-amber-400 shadow-xs hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0">
                    <Coins className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-amber-600 uppercase">Hợp Tác Vốn Dòng Tiền</span>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-amber-600 transition-colors">
                      Mở Trạm Giặt Sấy Tự Động 24/7 (Vốn Góp 80 Triệu)
                    </h4>
                  </div>
                </div>
                <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-lg shrink-0">
                  Chia sẻ lợi nhuận
                </span>
              </div>

              <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                <span>Hà Nội · Q. Cầu Giấy</span>
                <span className="text-amber-600 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  <span>Chi tiết</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>

            {/* FEATURED OPPORTUNITY CARD 3 (Factory & Warehouse Sharing) */}
            <div
              onClick={() => onSelectCard('opp-3')}
              className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 hover:border-sky-400 shadow-xs hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-sky-600 uppercase">Kho Bãi &amp; Logistics</span>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-sky-600 transition-colors">
                      Chia Sẻ 300m² Kho Tiêu Chuẩn Tại Bình Tân
                    </h4>
                  </div>
                </div>
                <span className="text-[11px] font-extrabold text-sky-700 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-lg shrink-0">
                  Có sẵn xe nâng
                </span>
              </div>

              <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                <span>TP. Hồ Chí Minh · Xe tải ra vào thuận tiện</span>
                <span className="text-sky-600 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  <span>Chi tiết</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>

            {/* Trust Assurance Strip */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between text-[11px] text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Mọi cơ hội đều được hỗ trợ <strong>Mẫu thỏa thuận hợp tác BCC</strong>.</span>
              </div>
              <button
                type="button"
                onClick={onOpenLegalTemplates}
                className="text-[#FF2D55] font-bold hover:underline shrink-0 cursor-pointer"
              >
                Xem mẫu
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
