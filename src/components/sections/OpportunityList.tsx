import React from 'react';
import Image from 'next/image';
import { MapPin, Bookmark, ArrowRight } from 'lucide-react';
import type { OpportunityItem } from '@/data/opportunities';
import { OPPORTUNITY_CATEGORIES } from '@/data/categories';

interface OpportunityListProps {
  opportunities: OpportunityItem[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onBookmarkToggle: (id: string, e: React.MouseEvent) => void;
  onSelectOpportunity: (opportunity: OpportunityItem) => void;
  onViewAll: () => void;
}

const FILTERS = [{ key: 'all', label: 'Tất cả' }, ...OPPORTUNITY_CATEGORIES.map((c) => ({ key: c.key, label: c.label }))];

export const OpportunityList: React.FC<OpportunityListProps> = ({
  opportunities,
  selectedCategory,
  onSelectCategory,
  onBookmarkToggle,
  onSelectOpportunity,
  onViewAll,
}) => {
  const filtered = opportunities.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  return (
    <section id="opportunities" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div className="space-y-1.5 max-w-2xl">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FF2D55] block">
              KHÁM PHÁ CỘNG ĐỒNG
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Những cơ hội đang được chia sẻ.
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Từ những ý tưởng mới đến các nguồn lực sẵn có, mỗi chia sẻ có thể mở ra một khả năng hợp tác.
            </p>
          </div>

          <button
            onClick={onViewAll}
            className="text-sm font-bold text-[#FF2D55] hover:text-[#E01E45] flex items-center gap-1 cursor-pointer transition-colors group self-start sm:self-auto shrink-0"
          >
            <span>Khám phá tất cả</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Filter Badges Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {FILTERS.map((filter) => (
            <button
              key={filter.key}
              onClick={() => onSelectCategory(filter.key)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === filter.key
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((item) => (
            <article
              key={item.id}
              onClick={() => onSelectOpportunity(item)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md hover:border-rose-200 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Photo Banner with Category Tag & Bookmark */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Dark Tag on Photo */}
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
                    {item.categoryLabel}
                  </div>

                  {/* Bookmark Button */}
                  <button
                    type="button"
                    onClick={(e) => onBookmarkToggle(item.id, e)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-xl bg-white/90 backdrop-blur-xs text-slate-700 hover:text-[#FF2D55] hover:bg-white flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                    aria-label="Lưu cơ hội"
                  >
                    <Bookmark className={`w-4 h-4 ${item.isBookmarked ? 'fill-[#FF2D55] text-[#FF2D55]' : ''}`} />
                  </button>
                </div>

                {/* Content */}
                <div className="px-5 space-y-2">
                  <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-[#FF2D55] transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{item.detailedDescription}</p>

                  <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Details Row & Card CTA */}
              <div className="px-5 pt-3 pb-5 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-600 truncate max-w-[130px]">{item.resourceHighlight}</span>

                <button
                  type="button"
                  onClick={() => onSelectOpportunity(item)}
                  className="text-xs font-bold text-[#FF2D55] group-hover:text-[#E01E45] flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Xem cơ hội</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
