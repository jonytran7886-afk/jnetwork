import React from 'react';
import { Lightbulb, Coins, Home, Users } from 'lucide-react';

interface CungLamPillarsProps {
  onSelectCategory: (category: 'project' | 'resource' | 'space' | 'partner') => void;
}

export const CungLamPillars: React.FC<CungLamPillarsProps> = ({ onSelectCategory }) => {
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

        {/* 4 Pillars Card Grid */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            
            {/* Pillar 1 */}
            <button
              onClick={() => onSelectCategory('project')}
              className="flex items-start gap-4 text-left group cursor-pointer focus:outline-none"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#FF2D55] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform mt-0.5">
                <Lightbulb className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="font-bold text-slate-900 text-sm sm:text-base block group-hover:text-[#FF2D55] transition-colors">
                  Dự án &amp; ý tưởng
                </span>
                <span className="text-xs text-slate-500 font-normal leading-relaxed block">
                  Chia sẻ những ý tưởng đang ấp ủ, khám phá các dự án mới và kết nối với những cá nhân có chung định hướng phát triển.
                </span>
              </div>
            </button>

            {/* Pillar 2 */}
            <button
              onClick={() => onSelectCategory('resource')}
              className="flex items-start gap-4 text-left group cursor-pointer focus:outline-none"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform mt-0.5">
                <Coins className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="font-bold text-slate-900 text-sm sm:text-base block group-hover:text-[#FF2D55] transition-colors">
                  Kết nối nguồn lực
                </span>
                <span className="text-xs text-slate-500 font-normal leading-relaxed block">
                  Kết hợp kiến thức, kỹ năng, kinh nghiệm, tài chính, thiết bị và những nguồn lực sẵn có để mở rộng khả năng hợp tác.
                </span>
              </div>
            </button>

            {/* Pillar 3 */}
            <button
              onClick={() => onSelectCategory('space')}
              className="flex items-start gap-4 text-left group cursor-pointer focus:outline-none"
            >
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform mt-0.5">
                <Home className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="font-bold text-slate-900 text-sm sm:text-base block group-hover:text-[#FF2D55] transition-colors">
                  Không gian chia sẻ
                </span>
                <span className="text-xs text-slate-500 font-normal leading-relaxed block">
                  Kết nối và khai thác hiệu quả không gian sống, làm việc, kinh doanh hoặc sáng tạo thông qua những hình thức chia sẻ linh hoạt.
                </span>
              </div>
            </button>

            {/* Pillar 4 */}
            <button
              onClick={() => onSelectCategory('partner')}
              className="flex items-start gap-4 text-left group cursor-pointer focus:outline-none"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform mt-0.5">
                <Users className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="font-bold text-slate-900 text-sm sm:text-base block group-hover:text-[#FF2D55] transition-colors">
                  Cộng đồng đồng hành
                </span>
                <span className="text-xs text-slate-500 font-normal leading-relaxed block">
                  Xây dựng các mối quan hệ dựa trên sự bổ trợ, tin tưởng và những mục tiêu chung, từ đó hình thành các hoạt động hợp tác lâu dài.
                </span>
              </div>
            </button>

          </div>
        </div>

      </div>
    </section>
  );
};
