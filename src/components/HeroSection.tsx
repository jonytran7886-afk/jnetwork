'use client';

import React from 'react';
import {
  Search,
  FileText,
  Coins,
  Home,
  Users,
  ArrowRight,
  Lightbulb,
  ShieldCheck,
  Globe2,
  HeartHandshake
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
}) => {
  const suggestionTags = [
    'Dự án kinh doanh',
    'Không gian làm việc',
    'Phát triển sản phẩm',
    'Hợp tác kỹ thuật',
    'Nguồn lực sản xuất',
  ];

  return (
    <section id="hero" className="pt-6 sm:pt-10 pb-12 sm:pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Copy & Search Engine */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            {/* Eyebrow */}
            <div className="inline-block">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FF2D55]">
                KẾT NỐI NGUỒN LỰC · CHIA SẺ CƠ HỘI · CÙNG PHÁT TRIỂN
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black text-slate-900 tracking-tight leading-[1.15]">
              Kết nối nguồn lực.<br />
              <span className="text-[#FF2D55]">Kiến tạo cơ hội.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              Một không gian mở, nơi mỗi ý tưởng, kỹ năng và nguồn lực đều có cơ hội kết nối để tạo nên những giá trị mới. Chia sẻ điều bạn có, khám phá những khả năng hợp tác và cùng phát triển.
            </p>

            {/* Interactive Search Card */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-lg border border-slate-100 space-y-4">
              
              {/* Category Filter Tabs */}
              <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                <button
                  type="button"
                  onClick={() => setActiveHeroTab('project')}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                    activeHeroTab === 'project'
                      ? 'bg-rose-50 text-[#FF2D55] border border-rose-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <FileText className="w-4 h-4 text-[#FF2D55]" />
                  <span>Dự án &amp; ý tưởng</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveHeroTab('resource')}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                    activeHeroTab === 'resource'
                      ? 'bg-rose-50 text-[#FF2D55] border border-rose-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <Coins className="w-4 h-4 text-amber-500" />
                  <span>Nguồn lực hợp tác</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveHeroTab('space')}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                    activeHeroTab === 'space'
                      ? 'bg-rose-50 text-[#FF2D55] border border-rose-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <Home className="w-4 h-4 text-sky-500" />
                  <span>Không gian chia sẻ</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveHeroTab('partner')}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                    activeHeroTab === 'partner'
                      ? 'bg-rose-50 text-[#FF2D55] border border-rose-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <Users className="w-4 h-4 text-indigo-500" />
                  <span>Cộng đồng chuyên môn</span>
                </button>
              </div>

              {/* Search Form */}
              <form onSubmit={onSearchSubmit} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Bạn muốn khám phá cơ hội nào?"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 focus:border-[#FF2D55] rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-100 transition-all"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                    >
                      Xóa
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    className="px-5 py-3 bg-[#FF2D55] hover:bg-[#E01E45] text-white text-sm font-bold rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0 active:scale-98"
                  >
                    <Search className="w-4 h-4" />
                    <span>Khám phá cơ hội</span>
                  </button>

                  <button
                    type="button"
                    onClick={onOpenPostDemand}
                    className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-bold rounded-xl transition-all cursor-pointer shrink-0 active:scale-98 whitespace-nowrap"
                  >
                    <span>Chia sẻ nguồn lực</span>
                  </button>
                </div>
              </form>

              {/* Tag Suggestions */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="text-slate-400 font-medium">Gợi ý khám phá:</span>
                {suggestionTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => onTagClick(tag)}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-rose-50 hover:text-[#FF2D55] text-slate-600 rounded-lg transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Core Positioning Values */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-50 text-[#FF2D55] flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block leading-tight">
                    Bình đẳng &amp; Đồng hành
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                    Mọi nguồn lực đều có giá trị kết nối
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Globe2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block leading-tight">
                    Đa dạng nguồn lực
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                    Ý tưởng, kỹ năng, không gian &amp; công sức
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block leading-tight">
                    Hợp tác minh bạch
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                    Hướng đến những kết quả thực tế
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative accents */}
              <svg className="absolute -top-6 -right-6 w-24 h-24 text-amber-400 opacity-80 pointer-events-none" viewBox="0 0 100 100" fill="none">
                <path d="M10,50 Q30,20 60,30 T90,10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <path d="M20,70 Q40,40 70,50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              <svg className="absolute -bottom-6 left-12 w-20 h-20 text-blue-400 opacity-70 pointer-events-none" viewBox="0 0 100 100" fill="none">
                <path d="M20,20 Q50,70 80,40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <path d="M40,30 Q60,80 90,60" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>

              <div className="space-y-4">
                
                {/* 1. Primary Feature Badge */}
                <div className="relative group">
                  <div className="h-44 sm:h-52 w-full rounded-3xl overflow-hidden shadow-md">
                    <img
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                      alt="Khởi tạo ý tưởng và kết nối nguồn lực"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <button
                    onClick={() => onSelectCard('opp-1')}
                    className="absolute -bottom-4 right-2 sm:right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-slate-100 flex items-center gap-3 hover:border-rose-200 transition-all cursor-pointer text-left max-w-xs"
                  >
                    <div className="w-9 h-9 rounded-xl bg-rose-50 text-[#FF2D55] flex items-center justify-center shrink-0">
                      <Lightbulb className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0 pr-1">
                      <span className="font-bold text-xs text-slate-900 block truncate">
                        Tôi có ý tưởng
                      </span>
                      <span className="text-[11px] text-slate-500 block truncate">
                        Sẵn sàng chia sẻ để cùng phát triển
                      </span>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-[#FF2D55] text-white flex items-center justify-center shrink-0 shadow-2xs group-hover:bg-[#E01E45]">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </button>
                </div>

                {/* Bottom row */}
                <div className="grid grid-cols-2 gap-4 pt-3">
                  
                  {/* 2. Skills Showcase */}
                  <div className="relative group">
                    <div className="h-40 sm:h-44 w-full rounded-3xl overflow-hidden shadow-md">
                      <img
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
                        alt="Thành viên chia sẻ kỹ năng"
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <button
                      onClick={() => onSelectCard('opp-4')}
                      className="absolute -bottom-4 -left-2 sm:left-0 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-lg border border-slate-100 flex items-center gap-2 hover:border-rose-200 transition-all cursor-pointer text-left w-[180px] sm:w-[210px]"
                    >
                      <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                        <Users className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-bold text-[11px] text-slate-900 block truncate">
                          Tôi có kỹ năng
                        </span>
                        <span className="text-[10px] text-slate-500 block truncate">
                          Kết nối năng lực bổ trợ
                        </span>
                      </div>
                      <div className="w-6 h-6 rounded-full bg-[#FF2D55] text-white flex items-center justify-center shrink-0">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </button>
                  </div>

                  {/* 3. Space Showcase */}
                  <div className="relative group">
                    <div className="h-40 sm:h-44 w-full rounded-3xl overflow-hidden shadow-md">
                      <img
                        src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80"
                        alt="Không gian chia sẻ"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <button
                      onClick={() => onSelectCard('opp-2')}
                      className="absolute -bottom-4 -right-2 sm:right-0 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-lg border border-slate-100 flex items-center gap-2 hover:border-rose-200 transition-all cursor-pointer text-left w-[180px] sm:w-[210px]"
                    >
                      <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                        <Home className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-bold text-[11px] text-slate-900 block truncate">
                          Tôi có không gian
                        </span>
                        <span className="text-[10px] text-slate-500 block truncate">
                          Mở rộng khả năng chia sẻ
                        </span>
                      </div>
                      <div className="w-6 h-6 rounded-full bg-[#FF2D55] text-white flex items-center justify-center shrink-0">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </button>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
