import React from 'react';
import { OPPORTUNITY_CATEGORIES, type OpportunityCategory } from '@/data/categories';

interface PillarsProps {
  onSelectCategory: (category: OpportunityCategory) => void;
}

/**
 * Marketing headline & description shown for each category on the landing
 * page. Kept separate from the canonical category label (used for filters
 * and forms) since this copy is intentionally more descriptive.
 */
const PILLAR_COPY: Record<OpportunityCategory, { headline: string; description: string }> = {
  project: {
    headline: 'Dự án & ý tưởng',
    description:
      'Chia sẻ những ý tưởng đang ấp ủ, khám phá các dự án mới và kết nối với những cá nhân có chung định hướng phát triển.',
  },
  resource: {
    headline: 'Kết nối nguồn lực',
    description:
      'Kết hợp kiến thức, kỹ năng, kinh nghiệm, tài chính, thiết bị và những nguồn lực sẵn có để mở rộng khả năng hợp tác.',
  },
  space: {
    headline: 'Không gian chia sẻ',
    description:
      'Kết nối và khai thác hiệu quả không gian sống, làm việc, kinh doanh hoặc sáng tạo thông qua những hình thức chia sẻ linh hoạt.',
  },
  partner: {
    headline: 'Cộng đồng đồng hành',
    description:
      'Xây dựng các mối quan hệ dựa trên sự bổ trợ, tin tưởng và những mục tiêu chung, từ đó hình thành các hoạt động hợp tác lâu dài.',
  },
};

export const Pillars: React.FC<PillarsProps> = ({ onSelectCategory }) => {
  return (
    <section className="py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FF2D55] block">
            GIÁ TRỊ CỐT LÕI
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Mỗi nguồn lực đều có thể tạo nên cơ hội.
          </h2>
        </div>

        {/* Pillars Card Grid */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {OPPORTUNITY_CATEGORIES.map((category) => {
              const Icon = category.icon;
              const copy = PILLAR_COPY[category.key];

              return (
                <button
                  key={category.key}
                  onClick={() => onSelectCategory(category.key)}
                  className="flex items-start gap-4 text-left group cursor-pointer focus:outline-none"
                >
                  <div
                    className={`w-12 h-12 rounded-2xl ${category.bgClassName} ${category.iconClassName} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform mt-0.5`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <span className="font-bold text-slate-900 text-sm sm:text-base block group-hover:text-[#FF2D55] transition-colors">
                      {copy.headline}
                    </span>
                    <span className="text-xs text-slate-500 font-normal leading-relaxed block">
                      {copy.description}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
