import React from 'react';
import { Compass, Puzzle, Sparkles, type LucideIcon } from 'lucide-react';
import { COMMUNITY_VALUES, type CommunityValueItem } from '@/data/opportunities';

const ICON_BY_NAME: Record<CommunityValueItem['iconName'], LucideIcon> = {
  compass: Compass,
  puzzle: Puzzle,
  sparkles: Sparkles,
};

const STYLE_BY_NAME: Record<CommunityValueItem['iconName'], { bgClassName: string; iconClassName: string }> = {
  compass: { bgClassName: 'bg-rose-50', iconClassName: 'text-[#FF2D55]' },
  puzzle: { bgClassName: 'bg-amber-50', iconClassName: 'text-amber-600' },
  sparkles: { bgClassName: 'bg-sky-50', iconClassName: 'text-sky-600' },
};

export const CommunityValues: React.FC = () => {
  return (
    <section id="community-values" className="py-12 sm:py-16 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="space-y-2 mb-10 sm:mb-12">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FF2D55] block">
            GIÁ TRỊ CỘNG ĐỒNG
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Những kết nối mở ra khả năng mới.
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-normal max-w-xl">
            Tập trung vào giá trị thực sự của sự hợp tác bình đẳng, cùng nhau phát triển và tạo ra những kết quả bền
            vững.
          </p>
        </div>

        {/* Core Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COMMUNITY_VALUES.map((value) => {
            const Icon = ICON_BY_NAME[value.iconName];
            const style = STYLE_BY_NAME[value.iconName];

            return (
              <div
                key={value.id}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col justify-between space-y-5 hover:border-rose-200 transition-all group"
              >
                <div className="space-y-4">
                  <div
                    className={`w-12 h-12 rounded-2xl ${style.bgClassName} ${style.iconClassName} flex items-center justify-center group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-bold text-slate-900 text-lg">{value.title}</h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{value.description}</p>
                </div>

                <div className="pt-4 border-t border-slate-100 text-[11px] font-semibold text-slate-400">
                  Cộng đồng hợp tác Cùng Làm
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
