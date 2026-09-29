'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CtaSectionProps {
  onJoinCommunity: () => void;
  onExploreOpportunities: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({
  onJoinCommunity,
  onExploreOpportunities,
}) => {
  return (
    <section className="py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden bg-gradient-to-r from-rose-50/90 via-pink-50/80 to-rose-50/90 rounded-3xl p-8 sm:p-12 border border-rose-100/80 shadow-sm">
          
          {/* Subtle paper airplane flight line */}
          <div className="hidden md:block absolute top-8 left-1/2 -translate-x-1/2 pointer-events-none opacity-40">
            <svg width="220" height="60" viewBox="0 0 220 60" fill="none">
              <path
                d="M5,45 Q70,5 140,30 T200,10"
                stroke="#FF2D55"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <path
                d="M198,12 L206,8 L202,17 Z"
                fill="#FF2D55"
              />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            
            {/* Left Copy */}
            <div className="space-y-2 max-w-xl">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                Cơ hội mới bắt đầu từ những kết nối.
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                Chia sẻ nguồn lực, khám phá những ý tưởng và kết nối với cộng đồng cùng hướng đến những giá trị chung.
              </p>
            </div>

            {/* Right Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 shrink-0">
              <button
                type="button"
                onClick={onJoinCommunity}
                className="px-6 py-3.5 bg-[#FF2D55] hover:bg-[#E01E45] text-white text-sm font-bold rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-2 active:scale-98"
              >
                <span>Tham gia cộng đồng</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onExploreOpportunities}
                className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 text-sm font-bold rounded-xl border border-slate-200 transition-all cursor-pointer active:scale-98 shadow-2xs"
              >
                Khám phá cơ hội
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
