'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  Sparkles,
  BookOpen,
  ArrowRight,
  Clock,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Share2,
  Copy,
  Check,
  X,
  Search,
  Zap,
  Filter,
  Briefcase,
  Layers,
  Compass,
  MapPin,
  Building2,
  DollarSign,
  Handshake,
  FileCheck,
} from 'lucide-react';
import { IndustryInsightItem, INITIAL_INDUSTRY_INSIGHTS } from '../data/industryInsightsData';

interface IndustryInsightsSectionProps {
  onOpenDealRoomWithPrompt?: (prompt: {
    partyAResources: string;
    partyBResources: string;
    dealType: string;
    targetGoal: string;
  }) => void;
  onOpenPostDemand?: () => void;
  onExploreOpportunities?: (category?: string) => void;
}

export const IndustryInsightsSection: React.FC<IndustryInsightsSectionProps> = ({
  onOpenDealRoomWithPrompt,
  onOpenPostDemand,
  onExploreOpportunities,
}) => {
  const [insights, setInsights] = useState<IndustryInsightItem[]>(INITIAL_INDUSTRY_INSIGHTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [selectedModalInsight, setSelectedModalInsight] = useState<IndustryInsightItem | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Custom AI Intelligence Request State
  const [aiCustomTopic, setAiCustomTopic] = useState<string>('');
  const [isAiGenerating, setIsAiGenerating] = useState<boolean>(false);
  const [aiGenerateSuccessMsg, setAiGenerateSuccessMsg] = useState<string | null>(null);

  const categories = [
    { key: 'all', label: 'Tất cả cơ hội' },
    { key: 'trade', label: '🌐 Giao Thương & Xuất Khẩu' },
    { key: 'investment', label: '💰 Đầu Tư & Dòng Vốn' },
    { key: 'cooperation', label: '🤝 Hợp Tác & Nguồn Lực' },
    { key: 'projects', label: '🏗️ Dự Án & Đấu Thầu' },
    { key: 'policy_tax', label: '📋 Chính Sách & Pháp Lý' },
  ];

  const quickHotTopics = [
    { label: 'Xuất khẩu nông sản chính ngạch', topic: 'Cơ hội xuất khẩu nông sản và trái cây sấy sang Trung Quốc và ASEAN' },
    { label: 'Gói thầu phụ trợ KCN', topic: 'Dự án thầu phụ gia công cơ khí và bao bì cho nhà máy FDI' },
    { label: 'Đầu tư nhượng quyền F&B', topic: 'Tìm nhà đầu tư hợp tác kinh doanh chuỗi F&B dòng tiền ổn định' },
    { label: 'Chia sẻ kho xưởng nhàn rỗi', topic: 'Chia sẻ công suất nhà xưởng cơ khí và kho bãi logistics' },
    { label: 'Điện mặt trời mái xưởng ESCO', topic: 'Hợp tác quỹ năng lượng lắp điện mặt trời áp mái 0 đồng vốn' },
  ];

  const handleGenerateAiInsight = async (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const query = (customQuery || aiCustomTopic).trim();
    if (!query) return;

    setIsAiGenerating(true);
    setAiGenerateSuccessMsg(null);

    try {
      const res = await fetch('/api/ai/market-intelligence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: query,
          industrySector: selectedCategory !== 'all' ? selectedCategory : 'Giao thương, Đầu tư & Hợp tác B2B',
          pillar: selectedCategory !== 'all' ? selectedCategory : 'trade',
        }),
      });

      const json = await res.json();
      if (json.data) {
        setInsights((prev) => [json.data, ...prev]);
        setSelectedModalInsight(json.data);
        setAiCustomTopic('');
        setAiGenerateSuccessMsg('Đã cập nhật bản phân tích cơ hội mới từ thị trường!');
        setTimeout(() => setAiGenerateSuccessMsg(null), 4000);
      }
    } catch (err) {
      console.error('Lỗi quét tin tức thị trường AI:', err);
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handleQuickChipClick = (topicText: string) => {
    setAiCustomTopic(topicText);
    handleGenerateAiInsight(undefined, topicText);
  };

  const handleCopyInsight = (item: IndustryInsightItem) => {
    const text = `
[BẢN TIN CƠ HỘI GIAO THƯƠNG & ĐẦU TƯ — J-NETWORK]
Tiêu đề: ${item.title}
Lĩnh vực: ${item.categoryLabel}
Nguồn uy tín: ${item.source} (${item.publishedAt})
Khu vực: ${item.region || 'Toàn quốc'}

Tóm tắt lãnh đạo: ${item.summary}

Điểm đúc kết then chốt:
${item.keyTakeaways.map((t) => `• ${t}`).join('\n')}

Cơ hội hợp tác thực tế: ${item.actionableOpportunity}
    `.trim();

    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const filteredInsights = insights.filter((item) => {
    const matchCategory =
      selectedCategory === 'all' ||
      item.category === selectedCategory ||
      (selectedCategory === 'trade' && (item.pillar === 'trade' || item.category === 'trade_commerce')) ||
      (selectedCategory === 'investment' && (item.pillar === 'investment' || item.category === 'investment_capital' || item.category === 'funding_market')) ||
      (selectedCategory === 'cooperation' && (item.pillar === 'cooperation' || item.category === 'b2b_cooperation' || item.category === 'case_study')) ||
      (selectedCategory === 'projects' && (item.pillar === 'projects' || item.category === 'projects_tenders')) ||
      (selectedCategory === 'policy_tax' && item.category === 'policy_tax');

    const matchSearch =
      !searchKeyword.trim() ||
      item.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.categoryLabel.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      (item.actionableOpportunity && item.actionableOpportunity.toLowerCase().includes(searchKeyword.toLowerCase())) ||
      (item.region && item.region.toLowerCase().includes(searchKeyword.toLowerCase()));

    return matchCategory && matchSearch;
  });

  return (
    <section id="industry-insights" className="py-20 bg-slate-50 relative overflow-hidden border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: Optimized Wording */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF2D55] bg-rose-50 border border-rose-100 px-3.5 py-1 rounded-full mb-3 shadow-2xs">
            <Compass className="w-3.5 h-3.5 text-[#FF2D55]" />
            <span>Dữ Liệu Thị Trường & Radar Cơ Hội B2B</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 mb-4">
            Bản Tin Giao Thương & Cơ Hội Hợp Tác Thực Tế
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Cập nhật đa chiều về xuất nhập khẩu, dòng vốn đầu tư, gói thầu dự án và liên minh nguồn lực — giúp doanh nghiệp chủ động đón đầu xu thế, tối ưu chi phí và liên kết cùng phát triển.
          </p>
        </div>

        {/* AI Custom Intelligence Generator Bar: Refined */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs mb-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF2D55] to-amber-500 text-white flex items-center justify-center shadow-xs">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <span>Radar Quét Cơ Hội Giao Thương & Đầu Tư AI</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-1.5 py-0.5 rounded">Thời gian thực</span>
                </div>
                <div className="text-xs text-slate-500">
                  Khảo sát nhanh dữ liệu ngành, dự án đấu thầu và nhu cầu liên kết chuỗi giá trị
                </div>
              </div>
            </div>

            <form onSubmit={(e) => handleGenerateAiInsight(e)} className="w-full md:w-auto flex-1 max-w-xl flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={aiCustomTopic}
                  onChange={(e) => setAiCustomTopic(e.target.value)}
                  placeholder="Nhập ngành nghề hoặc cơ hội cần tìm (VD: Xuất khẩu sầu riêng, Thầu cơ khí, Nhượng quyền F&B...)"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-3.5 pr-8 py-2.5 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#FF2D55] focus:ring-1 focus:ring-[#FF2D55]"
                />
                {aiCustomTopic && (
                  <button
                    type="button"
                    onClick={() => setAiCustomTopic('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <button
                type="submit"
                disabled={isAiGenerating || !aiCustomTopic.trim()}
                className="px-4 py-2.5 bg-slate-900 hover:bg-[#FF2D55] disabled:opacity-50 text-white text-xs sm:text-sm font-bold rounded-xl transition-all shrink-0 flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                {isAiGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span className="hidden sm:inline">Đang quét...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>Quét cơ hội</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Quick Hot Topic Chips */}
          <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center gap-2 flex-wrap text-xs">
            <span className="text-slate-500 font-medium shrink-0 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-[#FF2D55]" />
              <span>Gợi ý quét nhanh:</span>
            </span>
            {quickHotTopics.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleQuickChipClick(chip.topic)}
                disabled={isAiGenerating}
                className="text-[11px] bg-slate-100 hover:bg-rose-50 hover:text-[#FF2D55] text-slate-600 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors cursor-pointer"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {aiGenerateSuccessMsg && (
            <div className="mt-3 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{aiGenerateSuccessMsg}</span>
            </div>
          )}
        </div>

        {/* Filter and Search Controls: 4 Pillars */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Tabs: 4 Pillars */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.key
                    ? 'bg-[#FF2D55] text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Tìm kiếm cơ hội, vùng miền..."
              className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#FF2D55]"
            />
          </div>
        </div>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInsights.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200/90 hover:border-[#FF2D55]/30 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image Banner */}
                <div className="h-44 w-full relative overflow-hidden bg-slate-100">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                  {/* Badges on image */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-md text-white border border-white/20">
                        {item.categoryLabel}
                      </span>
                      {item.isTrending && (
                        <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-[#FF2D55] text-white flex items-center gap-1 shadow-2xs">
                          <TrendingUp className="w-3 h-3" />
                          <span>Nổi bật</span>
                        </span>
                      )}
                    </div>
                    {item.region && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/95 backdrop-blur-md text-slate-800 flex items-center gap-1 border border-white/40 shadow-2xs">
                        <MapPin className="w-2.5 h-2.5 text-[#FF2D55]" />
                        <span>{item.region}</span>
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-white/90 font-medium">
                    {item.sourceUrl ? (
                      <a
                        href={item.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="hover:underline flex items-center gap-1 text-white hover:text-rose-200 transition-colors"
                        title="Mở bài viết gốc ở tab mới"
                      >
                        <span className="truncate max-w-[170px]">{item.source}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    ) : (
                      <span className="truncate max-w-[170px]">{item.source}</span>
                    )}
                    <span className="flex items-center gap-1 shrink-0">
                      <Clock className="w-3 h-3 text-white/80" />
                      {item.readTime}
                    </span>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-5">
                  <h3
                    onClick={() => setSelectedModalInsight(item)}
                    className="text-base font-bold text-slate-900 hover:text-[#FF2D55] transition-colors line-clamp-2 mb-2.5 cursor-pointer leading-snug"
                    title={item.title}
                  >
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                    {item.summary}
                  </p>

                  {/* 3 Key Takeaways */}
                  <div className="space-y-1.5 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Điểm đúc kết then chốt:
                    </div>
                    {item.keyTakeaways.slice(0, 2).map((point, idx) => (
                      <div key={idx} className="text-xs text-slate-700 flex items-start gap-1.5 leading-snug">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{point}</span>
                      </div>
                    ))}
                  </div>

                  {/* Actionable Opportunity Callout */}
                  <div className="bg-rose-50/60 border border-rose-100 p-3 rounded-xl">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#FF2D55] mb-0.5 flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      <span>Cơ hội cho bạn:</span>
                    </div>
                    <p className="text-xs text-slate-800 line-clamp-2 leading-relaxed">
                      {item.actionableOpportunity}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-5 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedModalInsight(item)}
                    className="text-xs font-bold text-slate-700 hover:text-[#FF2D55] transition-colors py-2 flex items-center gap-1 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Đọc phân tích</span>
                  </button>

                  {item.sourceUrl && (
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-slate-500 hover:text-[#FF2D55] transition-colors py-2 flex items-center gap-1"
                      title="Mở bài viết gốc ở tab mới"
                    >
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                      <span className="hidden sm:inline">Bài gốc</span>
                    </a>
                  )}
                </div>

                {item.defaultDealPrompt && onOpenDealRoomWithPrompt ? (
                  <button
                    type="button"
                    onClick={() => onOpenDealRoomWithPrompt(item.defaultDealPrompt!)}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-[#FF2D55] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
                    title="Mở Deal Room để tính toán cơ chế phân chia lợi nhuận theo xu hướng này"
                  >
                    <Briefcase className="w-3 h-3" />
                    <span>Vào Deal Room</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onOpenPostDemand && onOpenPostDemand()}
                    className="px-3 py-1.5 bg-[#FF2D55] hover:bg-[#E01E45] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
                    title="Đăng tải nguồn lực của bạn để đón đầu xu hướng này"
                  >
                    <span>Chia sẻ nguồn lực</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredInsights.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-md mx-auto">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-800 mb-1">Không tìm thấy bản tin phù hợp</h4>
            <p className="text-xs text-slate-500 mb-4">Hãy thử tìm kiếm với từ khóa khác hoặc bấm nút phân tích AI ở trên.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchKeyword('');
              }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl"
            >
              Xem tất cả bản tin
            </button>
          </div>
        )}
      </div>

      {/* Insight Detail Modal */}
      {selectedModalInsight && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedModalInsight(null)}
              className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Top Meta */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-rose-50 text-[#FF2D55] border border-rose-200">
                {selectedModalInsight.categoryLabel}
              </span>
              {selectedModalInsight.region && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 flex items-center gap-1 border border-slate-200">
                  <MapPin className="w-3 h-3 text-[#FF2D55]" />
                  <span>{selectedModalInsight.region}</span>
                </span>
              )}
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <span>Nguồn:</span>
                {selectedModalInsight.sourceUrl ? (
                  <a
                    href={selectedModalInsight.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF2D55] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                    title="Mở bài viết gốc ở tab mới"
                  >
                    <span>{selectedModalInsight.source}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <strong className="text-slate-800">{selectedModalInsight.source}</strong>
                )}
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-500">{selectedModalInsight.publishedAt}</span>
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight mb-4">
              {selectedModalInsight.title}
            </h3>

            {/* Image */}
            <div className="h-52 w-full rounded-2xl overflow-hidden mb-6 bg-slate-100">
              <img
                src={selectedModalInsight.imageUrl}
                alt={selectedModalInsight.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Executive Summary */}
            <div className="bg-slate-50 border-l-4 border-[#FF2D55] p-4 rounded-r-xl mb-6">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Tóm tắt dành cho lãnh đạo:
              </div>
              <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                {selectedModalInsight.summary}
              </p>
            </div>

            {/* Main Content */}
            <div className="text-sm text-slate-700 leading-relaxed space-y-4 mb-6">
              <p>{selectedModalInsight.content}</p>
            </div>

            {/* Key Takeaways */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>3 Điểm Đúc Kết Then Chốt:</span>
              </div>
              <div className="space-y-2">
                {selectedModalInsight.keyTakeaways.map((point, idx) => (
                  <div key={idx} className="text-xs text-slate-800 flex items-start gap-2 leading-relaxed">
                    <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actionable Opportunity */}
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 mb-6">
              <div className="text-xs font-bold uppercase tracking-wider text-[#FF2D55] mb-1.5 flex items-center gap-1.5">
                <Zap className="w-4 h-4" />
                <span>Hành Động Khuyến Nghị Cho Doanh Nghiệp:</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                {selectedModalInsight.actionableOpportunity}
              </p>
            </div>

            {/* Footer Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopyInsight(selectedModalInsight)}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">Đã sao chép!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-500" />
                      <span>Sao chép bản tin</span>
                    </>
                  )}
                </button>

                {selectedModalInsight.sourceUrl && (
                  <a
                    href={selectedModalInsight.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                    title="Mở bài viết gốc ở tab mới"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-slate-600" />
                    <span>Xem bài viết gốc</span>
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2">
                {selectedModalInsight.defaultDealPrompt && onOpenDealRoomWithPrompt && (
                  <button
                    type="button"
                    onClick={() => {
                      onOpenDealRoomWithPrompt(selectedModalInsight.defaultDealPrompt!);
                      setSelectedModalInsight(null);
                    }}
                    className="px-4 py-2 bg-slate-900 hover:bg-[#FF2D55] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Vào Deal Room Đàm Phán</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    onOpenPostDemand && onOpenPostDemand();
                    setSelectedModalInsight(null);
                  }}
                  className="px-4 py-2 bg-[#FF2D55] hover:bg-[#E01E45] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Chia sẻ nguồn lực mới</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
