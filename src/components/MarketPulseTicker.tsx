'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, ChevronRight, Zap, RefreshCw, ExternalLink } from 'lucide-react';
import { IndustryInsightItem } from '../data/industryInsightsData';

interface MarketPulseTickerProps {
  insights: IndustryInsightItem[];
  onSelectInsight: (insight: IndustryInsightItem) => void;
  onExploreAll: () => void;
}

export const MarketPulseTicker: React.FC<MarketPulseTickerProps> = ({
  insights,
  onSelectInsight,
  onExploreAll,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeInsights = insights.length > 0 ? insights : [];

  useEffect(() => {
    if (activeInsights.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeInsights.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [activeInsights.length]);

  if (activeInsights.length === 0) return null;
  const currentItem = activeInsights[currentIndex];

  return (
    <div className="bg-slate-900 text-slate-100 border-b border-slate-800 text-xs py-2 px-3 sm:px-6 relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left Badge */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#FF2D55]/20 border border-[#FF2D55]/40 text-[#FF5A7A] font-bold text-[11px] uppercase tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF2D55] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF2D55]"></span>
            </span>
            <span className="hidden sm:inline">Nhịp đập B2B</span>
            <span className="sm:hidden">Tin mới</span>
          </div>
          <span className="text-slate-500 hidden md:inline">|</span>
        </div>

        {/* Center Animated Headline */}
        <div className="flex-1 min-w-0 flex items-center gap-2">
          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 shrink-0 hidden sm:inline">
            {currentItem.categoryLabel}
          </span>

          <button
            onClick={() => onSelectInsight(currentItem)}
            className="text-left font-medium text-slate-200 hover:text-white truncate transition-colors cursor-pointer group flex items-center gap-1.5"
            title={currentItem.title}
          >
            <span className="truncate group-hover:underline underline-offset-2">
              {currentItem.title}
            </span>
            <span className="text-[10px] text-slate-400 shrink-0 hidden lg:inline">
              ({currentItem.publishedAt})
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-[#FF2D55] group-hover:translate-x-0.5 transition-transform shrink-0" />
          </button>
        </div>

        {/* Right CTA Links */}
        <div className="flex items-center gap-2.5 shrink-0 text-[11px]">
          <button
            onClick={onExploreAll}
            className="text-slate-300 hover:text-white font-semibold transition-colors flex items-center gap-1 cursor-pointer bg-slate-800/80 hover:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700/60"
          >
            <TrendingUp className="w-3.5 h-3.5 text-[#FF2D55]" />
            <span className="hidden sm:inline">Bản tin ngành</span>
          </button>
        </div>
      </div>
    </div>
  );
};
