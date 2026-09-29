'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Briefcase,
  TrendingUp,
  ShieldCheck,
  FileText,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Building2,
  DollarSign,
  Handshake,
  Clock,
  Award,
  Copy,
  Check,
  Filter,
} from 'lucide-react';

interface DealItem {
  id: string;
  title: string;
  category: string;
  partyA: string;
  partyANeed: string;
  partyAOffer: string;
  estimatedValue: string;
  trustScore: number;
  stage: 'negotiation' | 'mou_signed' | 'executing' | 'open';
  stageLabel: string;
  location: string;
  updatedAt: string;
}

const SAMPLE_COMMERCIAL_DEALS: DealItem[] = [
  {
    id: 'deal-01',
    title: 'Hợp tác nhượng quyền & liên minh phân phối 25 cửa hàng bán lẻ tiện lợi',
    category: 'Phân phối & Bán lẻ',
    partyA: 'Công ty Cổ phần Thực phẩm Xanh An Nhiên',
    partyANeed: 'Mặt bằng vị trí vàng và đối tác quản lý vận hành cơ sở tại Đà Nẵng, Nha Trang',
    partyAOffer: 'Cung cấp 100% quy trình, hệ sinh thái sản phẩm độc quyền và bảo chứng dòng vốn',
    estimatedValue: '3.2 Tỷ VNĐ',
    trustScore: 96,
    stage: 'mou_signed',
    stageLabel: 'Đã ký kết MOU',
    location: 'Đà Nẵng & Duyên hải miền Trung',
    updatedAt: '2 giờ trước',
  },
  {
    id: 'deal-02',
    title: 'Gia công xuất khẩu ODM & tối ưu công suất nhàn rỗi nhà máy may 1.800m²',
    category: 'Sản xuất & Chuỗi cung ứng',
    partyA: 'Xưởng May Công nghệ Cao Việt Thắng',
    partyANeed: 'Đối tác thương hiệu thời trang thiết kế cần sản xuất lô hàng từ 500 - 5.000 sp/tháng',
    partyAOffer: 'Dây chuyền chuẩn ISO, hỗ trợ lưu kho 30 ngày và linh hoạt điều khoản thanh toán',
    estimatedValue: '1.8 Tỷ VNĐ/năm',
    trustScore: 93,
    stage: 'negotiation',
    stageLabel: 'Đang đàm phán hợp đồng',
    location: 'TP. Hồ Chí Minh & Bình Dương',
    updatedAt: '5 giờ trước',
  },
  {
    id: 'deal-03',
    title: 'Tích hợp giải pháp AI tự động hóa chăm sóc khách hàng vào chuỗi phòng khám',
    category: 'Công nghệ & Y tế',
    partyA: 'Phòng khám Đa khoa Sài Gòn Medic',
    partyANeed: 'Giải pháp phần mềm CRM + AI nhận diện bệnh án và đặt lịch không tắc nghẽn',
    partyAOffer: 'Ngân sách triển khai trọn gói + Chia sẻ 5% doanh thu thặng dư từ lượng bệnh nhân tăng',
    estimatedValue: '850 Triệu VNĐ',
    trustScore: 98,
    stage: 'executing',
    stageLabel: 'Đang triển khai thực tế',
    location: 'Hà Nội & TP. Hồ Chí Minh',
    updatedAt: '1 ngày trước',
  },
  {
    id: 'deal-04',
    title: 'Tìm Nhà đầu tư thiên thần (Angel Investor) mở rộng nền tảng LogTech nông sản',
    category: 'Đầu tư & Vốn',
    partyA: 'Dự án Nông sản Kết Nối Vùng Miền',
    partyANeed: '1.5 Tỷ VNĐ vốn lưu động mở rộng thêm 3 kho trung chuyển lạnh tại ĐBSCL',
    partyAOffer: '15% cổ phần ưu đãi cổ tức cố định 18%/năm + Quyền tham gia ban kiểm soát',
    estimatedValue: '1.5 Tỷ VNĐ',
    trustScore: 91,
    stage: 'open',
    stageLabel: 'Mở nhận hồ sơ',
    location: 'Cần Thơ & Miền Tây',
    updatedAt: 'Hôm nay',
  },
];

export function CommercialDealRoom() {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'validator' | 'trust_system'>('validator');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  // Form State for AI Deal Validator
  const [partyAName, setPartyAName] = useState<string>('Doanh nghiệp A (Cung ứng sản phẩm)');
  const [partyAResources, setPartyAResources] = useState<string>(
    'Sở hữu nhà xưởng 1.200m², sản phẩm đạt chuẩn OCOP 4 sao, năng lực sản xuất 10.000 sản phẩm/tháng nhưng thiếu kênh bán hàng số.'
  );
  const [partyBName, setPartyBName] = useState<string>('Đối tác B (Kênh phân phối)');
  const [partyBResources, setPartyBResources] = useState<string>(
    'Hệ thống 15 đại lý phân phối tại miền Bắc, kênh TikTok Shop 350.000 followers với doanh số ổn định 300tr/tháng.'
  );
  const [dealType, setDealType] = useState<string>('Liên minh phân phối & Chia sẻ doanh thu (Revenue Share)');
  const [targetGoal, setTargetGoal] = useState<string>('Đạt doanh thu 1 Tỷ/tháng sau 60 ngày triển khai và cùng xây dựng thương hiệu chung.');
  const [investmentBudget, setInvestmentBudget] = useState<string>('300 Triệu VNĐ (Chi phí Marketing & Mẫu thử)');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dealResult, setDealResult] = useState<any | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleValidateDeal = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setDealResult(null);

    try {
      const res = await fetch('/api/ai/deal-validator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          partyAName,
          partyAResources,
          partyBName,
          partyBResources,
          dealType,
          targetGoal,
          investmentBudget,
        }),
      });

      const json = await res.json();
      if (json.data) {
        setDealResult(json.data);
      }
    } catch (err) {
      console.error('Error running deal validator:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyMOU = () => {
    if (!dealResult?.draftMOU) return;
    const text = `
${dealResult.draftMOU.title}
Mục đích: ${dealResult.draftMOU.purpose}

Cam kết Bên A: ${dealResult.draftMOU.commitmentsA}
Cam kết Bên B: ${dealResult.draftMOU.commitmentsB}

Giải quyết tranh chấp: ${dealResult.draftMOU.disputeResolution}
Khuyến nghị từ CCO J-Network: ${dealResult.ccoRecommendation}
    `.trim();

    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const filteredDeals =
    selectedFilter === 'all'
      ? SAMPLE_COMMERCIAL_DEALS
      : SAMPLE_COMMERCIAL_DEALS.filter((d) => d.stage === selectedFilter);

  return (
    <div className="py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 relative overflow-hidden border-t border-b border-slate-200">
      {/* Subtle Warm Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF2D55]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF2D55] bg-rose-50 border border-rose-100 px-3 py-1 rounded-full mb-3 shadow-2xs">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Phòng Giao Thương Chiến Lược & Hợp Tác Doanh Nghiệp</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 mb-4">
            Phòng Giao Thương Chiến Lược
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Nơi chuyển hóa nguồn lực tiềm năng thành <span className="text-slate-900 font-bold">thương vụ sinh lời thực tế</span>.
            Thẩm định dòng tiền, tính toán cơ chế phân chia lợi nhuận và lập biên bản thỏa thuận cùng Trợ lý Giám đốc Kinh doanh AI.
          </p>
        </div>

        {/* Commercial Highlights Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-[#FF2D55]/30 transition-all">
            <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">
              Giá trị thương vụ lưu chuyển
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 flex items-baseline gap-1">
              18.5+ <span className="text-sm font-bold text-[#FF2D55]">Tỷ VNĐ</span>
            </div>
            <div className="text-xs text-slate-500 mt-2 flex items-center gap-1 font-medium">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>+24.6% so với tháng trước</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-[#FF2D55]/30 transition-all">
            <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">
              Tỷ lệ ký kết thành công
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 flex items-baseline gap-1">
              78.4%
            </div>
            <div className="text-xs text-slate-500 mt-2 flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Thẩm định rủi ro song phương</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-[#FF2D55]/30 transition-all">
            <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">
              Điểm tín nhiệm trung bình
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 flex items-baseline gap-1">
              92.8 <span className="text-sm font-semibold text-slate-400">/ 100</span>
            </div>
            <div className="text-xs text-slate-500 mt-2 flex items-center gap-1 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
              <span>Được bảo chứng bởi mạng lưới</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-[#FF2D55]/30 transition-all">
            <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">
              Thời gian chốt thỏa thuận
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 flex items-baseline gap-1">
              4.2 <span className="text-sm font-semibold text-slate-400">ngày</span>
            </div>
            <div className="text-xs text-slate-500 mt-2 flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5 text-sky-600" />
              <span>Rút ngắn 75% chu kỳ đàm phán</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 border-b border-slate-200 pb-4">
          <button
            onClick={() => setActiveTab('validator')}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'validator'
                ? 'bg-[#FF2D55] text-white shadow-md shadow-[#FF2D55]/20'
                : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Thẩm Định Hợp Tác & Lập Biên Bản</span>
          </button>

          <button
            onClick={() => setActiveTab('pipeline')}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'pipeline'
                ? 'bg-[#FF2D55] text-white shadow-md shadow-[#FF2D55]/20'
                : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Handshake className="w-4 h-4" />
            <span>Cơ Hội Giao Thương Đang Đàm Phán</span>
          </button>

          <button
            onClick={() => setActiveTab('trust_system')}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'trust_system'
                ? 'bg-[#FF2D55] text-white shadow-md shadow-[#FF2D55]/20'
                : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Hệ Thống Đánh Giá Tín Nhiệm (J-Trust)</span>
          </button>
        </div>

        {/* Tab 1: AI Deal Validator & MOU Generator */}
        {activeTab === 'validator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Form Column */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#FF2D55]">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Thiết Kế Cơ Chế Giao Thương</h3>
                  <p className="text-xs text-slate-500">Đóng gói điều khoản, thẩm định rủi ro & tạo MOU</p>
                </div>
              </div>

              <form onSubmit={handleValidateDeal} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Loại hình hợp tác thương mại
                  </label>
                  <select
                    value={dealType}
                    onChange={(e) => setDealType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#FF2D55] focus:ring-1 focus:ring-[#FF2D55]"
                  >
                    <option value="Liên minh phân phối & Chia sẻ doanh thu (Revenue Share)">
                      Liên minh phân phối & Chia sẻ doanh thu (Revenue Share)
                    </option>
                    <option value="Hợp tác nhượng quyền & Chuỗi cung ứng (Franchise)">
                      Hợp tác nhượng quyền & Chuỗi cung ứng (Franchise)
                    </option>
                    <option value="Gia công sản xuất ODM / Tối ưu công suất dư thừa">
                      Gia công sản xuất ODM / Tối ưu công suất dư thừa
                    </option>
                    <option value="Góp vốn & Hợp tác đầu tư thiên thần (Equity Share)">
                      Góp vốn & Hợp tác đầu tư thiên thần (Equity Share)
                    </option>
                    <option value="Chuyển giao công nghệ & Cố vấn C-Level">
                      Chuyển giao công nghệ & Cố vấn C-Level
                    </option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Đại diện Bên A
                    </label>
                    <input
                      type="text"
                      value={partyAName}
                      onChange={(e) => setPartyAName(e.target.value)}
                      placeholder="VD: Cty A (Cung ứng)"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#FF2D55] focus:ring-1 focus:ring-[#FF2D55]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Đại diện Bên B
                    </label>
                    <input
                      type="text"
                      value={partyBName}
                      onChange={(e) => setPartyBName(e.target.value)}
                      placeholder="VD: Đối tác B (Kênh bán lẻ)"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#FF2D55] focus:ring-1 focus:ring-[#FF2D55]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nguồn lực Bên A mang vào thương vụ
                  </label>
                  <textarea
                    rows={2}
                    value={partyAResources}
                    onChange={(e) => setPartyAResources(e.target.value)}
                    placeholder="Năng lực sản xuất, sản phẩm, bằng sáng chế, mặt bằng..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#FF2D55] focus:ring-1 focus:ring-[#FF2D55] resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nguồn lực Bên B mang vào thương vụ
                  </label>
                  <textarea
                    rows={2}
                    value={partyBResources}
                    onChange={(e) => setPartyBResources(e.target.value)}
                    placeholder="Tệp khách hàng, mạng lưới phân phối, đội ngũ bán hàng, vốn..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#FF2D55] focus:ring-1 focus:ring-[#FF2D55] resize-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mục tiêu thương mại chính
                    </label>
                    <input
                      type="text"
                      value={targetGoal}
                      onChange={(e) => setTargetGoal(e.target.value)}
                      placeholder="Doanh thu, thị phần, số cửa hàng..."
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#FF2D55] focus:ring-1 focus:ring-[#FF2D55]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Ngân sách / Định giá dự kiến
                    </label>
                    <input
                      type="text"
                      value={investmentBudget}
                      onChange={(e) => setInvestmentBudget(e.target.value)}
                      placeholder="VD: 500 Triệu VNĐ"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#FF2D55] focus:ring-1 focus:ring-[#FF2D55]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-4 bg-gradient-to-r from-[#FF2D55] to-[#E01E45] hover:from-[#E01E45] hover:to-[#C01538] text-white font-bold py-3 px-4 rounded-xl shadow-md shadow-[#FF2D55]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Trợ Lý AI Đang Thẩm Định Dòng Tiền & Rủi Ro...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Thẩm Định Khả Thi & Lập Biên Bản Hợp Tác</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Results Column */}
            <div className="lg:col-span-7 space-y-6">
              {dealResult ? (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Verdict & Score Card */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs relative">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
                      <div>
                        <div className="text-xs uppercase tracking-wider text-[#FF2D55] font-bold mb-1">
                          Đánh giá từ Giám Đốc Kinh Doanh
                        </div>
                        <h4 className="text-lg sm:text-xl font-bold text-slate-900">
                          {dealResult.commercialVerdict}
                        </h4>
                      </div>

                      <div className="flex items-center gap-3 bg-rose-50 border border-rose-200 rounded-xl px-4 py-2.5">
                        <div className="text-right">
                          <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                            Điểm khả thi
                          </div>
                          <div className="text-2xl font-black text-[#FF2D55]">
                            {dealResult.dealFeasibilityScore}/100
                          </div>
                        </div>
                        <TrendingUp className="w-7 h-7 text-emerald-600" />
                      </div>
                    </div>

                    {/* Win-win Analysis */}
                    <div className="mb-5">
                      <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Handshake className="w-4 h-4 text-sky-600" />
                        <span>Phân Tích Tương Hỗ Đôi Bên Cùng Có Lợi</span>
                      </div>
                      <p className="text-slate-700 text-sm leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                        {dealResult.winWinAnalysis}
                      </p>
                    </div>

                    {/* Revenue Sharing Formula */}
                    <div className="mb-5">
                      <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <DollarSign className="w-4 h-4 text-emerald-600" />
                        <span>Cơ Chế Phân Chia Doanh Thu Khuyến Nghị</span>
                      </div>
                      <p className="text-emerald-900 text-sm font-semibold leading-relaxed bg-emerald-50 p-3.5 rounded-xl border border-emerald-200">
                        {dealResult.revenueShareFormula}
                      </p>
                    </div>

                    {/* Financial Risk Alerts */}
                    <div className="mb-5">
                      <div className="text-xs font-bold text-rose-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-rose-600" />
                        <span>2 Điểm Rủi Ro Cần Lưu Ý Vào Điều Khoản Hợp Đồng</span>
                      </div>
                      <div className="space-y-2">
                        {dealResult.financialRiskAlerts?.map((risk: string, idx: number) => (
                          <div
                            key={idx}
                            className="text-xs text-slate-800 bg-rose-50/70 border border-rose-200 rounded-xl p-3 flex items-start gap-2.5"
                          >
                            <span className="text-[#FF2D55] font-black shrink-0">#{idx + 1}</span>
                            <span className="leading-relaxed">{risk}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 30-60-90 Day Milestones */}
                    <div>
                      <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-amber-600" />
                        <span>Lộ Trình Hành Động Triển Khai Thực Tế</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {dealResult.actionMilestones?.map((m: any, idx: number) => (
                          <div
                            key={idx}
                            className="bg-slate-50 border border-slate-200 rounded-xl p-3"
                          >
                            <div className="text-[11px] font-bold text-amber-700 mb-1">
                              {m.timeline}
                            </div>
                            <div className="text-xs text-slate-700 leading-snug">
                              {m.deliverable}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Draft MOU Card */}
                  {dealResult.draftMOU && (
                    <div className="bg-amber-50/40 border border-dashed border-amber-300 rounded-2xl p-6 relative">
                      <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-amber-200">
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-amber-700" />
                          <h4 className="text-base font-bold text-slate-900">
                            Biên Bản Thỏa Thuận Giao Thương Sơ Bộ
                          </h4>
                        </div>
                        <button
                          onClick={handleCopyMOU}
                          className="px-3.5 py-1.5 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer border border-slate-300 shadow-2xs"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700">Đã Sao Chép!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-slate-600" />
                              <span>Sao Chép Bản Thỏa Thuận</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs text-slate-800 space-y-3 font-mono shadow-2xs">
                        <div className="font-bold text-slate-900 text-center uppercase tracking-wide">
                          {dealResult.draftMOU.title}
                        </div>
                        <div>
                          <strong className="text-slate-900">1. Mục đích:</strong>{' '}
                          {dealResult.draftMOU.purpose}
                        </div>
                        <div>
                          <strong className="text-slate-900">2. Cam kết Bên A:</strong>{' '}
                          {dealResult.draftMOU.commitmentsA}
                        </div>
                        <div>
                          <strong className="text-slate-900">3. Cam kết Bên B:</strong>{' '}
                          {dealResult.draftMOU.commitmentsB}
                        </div>
                        <div>
                          <strong className="text-slate-900">4. Cơ chế giải quyết:</strong>{' '}
                          {dealResult.draftMOU.disputeResolution}
                        </div>
                      </div>

                      {/* CCO Golden Recommendation */}
                      <div className="mt-4 p-3.5 bg-rose-50 border border-rose-200 rounded-xl">
                        <div className="text-[11px] font-bold text-[#FF2D55] uppercase tracking-wider mb-1 flex items-center gap-1">
                          <Award className="w-3.5 h-3.5" />
                          <span>Chiến Lược Từ Giám Đốc Kinh Doanh:</span>
                        </div>
                        <p className="text-xs text-slate-800 leading-relaxed italic">
                          "{dealResult.ccoRecommendation}"
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                /* Empty / Intro state */
                <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[460px] shadow-xs">
                  <div className="w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center text-[#FF2D55] mb-4 border border-rose-100">
                    <Handshake className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">
                    Chưa Có Dữ Liệu Thẩm Định Thương Vụ
                  </h4>
                  <p className="text-sm text-slate-600 max-w-md mb-6 leading-relaxed">
                    Nhập nguồn lực của hai bên ở cột bên trái và bấm{' '}
                    <span className="text-[#FF2D55] font-bold">"Thẩm Định Khả Thi & Lập Biên Bản Hợp Tác"</span>.
                    Hệ thống AI sẽ mô phỏng góc nhìn của một Giám đốc Kinh doanh cấp cao để đưa ra công thức chia lợi nhuận và biên bản hợp tác chính thức.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-lg text-left text-xs text-slate-600">
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                      <div className="font-bold text-slate-900 mb-0.5">1. Khớp nối nguồn lực</div>
                      <div>Cân đối thực lực, bù trừ điểm yếu giữa đôi bên.</div>
                    </div>
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                      <div className="font-bold text-slate-900 mb-0.5">2. Cơ chế tài chính</div>
                      <div>Phân chia doanh thu, cổ phần & bảo vệ dòng tiền.</div>
                    </div>
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                      <div className="font-bold text-slate-900 mb-0.5">3. Biên bản thỏa thuận</div>
                      <div>Văn bản thỏa thuận sơ bộ sẵn sàng tiến hành.</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Commercial Deals Pipeline */}
        {activeTab === 'pipeline' && (
          <div className="space-y-6">
            {/* Filter Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-wider">
                <Filter className="w-4 h-4 text-[#FF2D55]" />
                <span>Lọc theo giai đoạn đàm phán:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { key: 'all', label: 'Tất cả thương vụ' },
                  { key: 'open', label: 'Đang mở nhận hồ sơ' },
                  { key: 'negotiation', label: 'Đang đàm phán' },
                  { key: 'mou_signed', label: 'Đã ký thỏa thuận' },
                  { key: 'executing', label: 'Đang triển khai' },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setSelectedFilter(item.key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      selectedFilter === item.key
                        ? 'bg-[#FF2D55] text-white'
                        : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Deals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredDeals.map((deal) => (
                <div
                  key={deal.id}
                  className="bg-white border border-slate-200 hover:border-[#FF2D55]/40 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-md"
                >
                  <div>
                    {/* Top Meta */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-bold text-[#FF2D55] uppercase tracking-wider">
                        {deal.category}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span>{deal.stageLabel}</span>
                      </div>
                    </div>

                    <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-2 leading-snug">
                      {deal.title}
                    </h4>

                    <div className="text-xs text-slate-500 mb-4 flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>{deal.partyA}</span>
                      <span>·</span>
                      <span>{deal.location}</span>
                    </div>

                    <div className="space-y-2.5 mb-5 text-xs">
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                        <strong className="text-slate-900">Bên A Cung Cấp:</strong>{' '}
                        <span className="text-slate-700">{deal.partyAOffer}</span>
                      </div>
                      <div className="bg-rose-50/50 p-2.5 rounded-xl border border-rose-100">
                        <strong className="text-[#FF2D55]">Bên A Tìm Kiếm:</strong>{' '}
                        <span className="text-slate-700">{deal.partyANeed}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Stats & Action */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                        Định giá thương vụ
                      </div>
                      <div className="text-sm font-black text-emerald-700">
                        {deal.estimatedValue}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                          Điểm Tín Nhiệm
                        </div>
                        <div className="text-xs font-bold text-[#FF2D55]">
                          {deal.trustScore}/100
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setPartyAName(deal.partyA);
                          setPartyAResources(deal.partyAOffer);
                          setPartyBName('Đối tác kết nối');
                          setPartyBResources(deal.partyANeed);
                          setActiveTab('validator');
                        }}
                        className="px-3.5 py-2 bg-slate-900 hover:bg-[#FF2D55] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <span>Vào Thẩm Định</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: J-Trust Scoring System */}
        {activeTab === 'trust_system' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-4xl mx-auto shadow-xs">
            <div className="text-center max-w-xl mx-auto mb-10">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#FF2D55] border border-rose-100 flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">
                Hệ Thống Đo Lường Tín Nhiệm Doanh Nghiệp (J-Trust)
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Thước đo độc quyền của J-Network giúp loại bỏ 95% đối tác ảo, giúp các Giám đốc Kinh doanh và Nhà đầu tư đưa ra quyết định hợp tác trong vài ngày thay vì hàng tháng ròng.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <div className="text-xs font-bold uppercase tracking-wider text-[#FF2D55] mb-2">
                  1. Xác thực Thực Thể Pháp Lý (40%)
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Kiểm tra mã số thuế, trụ sở hoạt động, đại diện pháp luật và lịch sử tín dụng doanh nghiệp qua cổng thông tin quốc gia.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <div className="text-xs font-bold uppercase tracking-wider text-sky-700 mb-2">
                  2. Lịch Sử Thực Thi Cam Kết (35%)
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Đánh giá mức độ đúng hạn trong giải ngân dòng vốn, giao nhận hàng mẫu và minh bạch báo cáo đối soát doanh thu.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">
                  3. Bảo Chứng Từ Mạng Lưới (25%)
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Điểm số được cộng dồn khi nhận được sự giới thiệu và bảo lãnh uy tín từ ít nhất 3 thành viên cấp Vàng hoặc Kim Cương trong hệ thống.
                </p>
              </div>
            </div>

            {/* Trust Badges Tier */}
            <div className="border-t border-slate-200 pt-6">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 text-center">
                Các Cấp Bậc Tín Nhiệm Doanh Nghiệp Trên J-Network
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center">
                  <div className="text-sm font-bold text-slate-800 mb-1">Hạng Bạc</div>
                  <div className="text-xs text-slate-600 font-mono font-bold mb-2">Điểm 70 - 84</div>
                  <p className="text-[11px] text-slate-500">Đã xác minh định danh và có ít nhất 1 cơ hội hợp tác thực tế thành công.</p>
                </div>

                <div className="bg-amber-50/60 border border-amber-200 p-4 rounded-xl text-center">
                  <div className="text-sm font-bold text-amber-800 mb-1">Hạng Vàng</div>
                  <div className="text-xs text-amber-700 font-mono font-bold mb-2">Điểm 85 - 94</div>
                  <p className="text-[11px] text-amber-900/80">Có từ 3 thương vụ ký kết hợp tác thành công, ưu tiên hiển thị đầu trang Giao Thương.</p>
                </div>

                <div className="bg-rose-50/60 border border-rose-200 p-4 rounded-xl text-center">
                  <div className="text-sm font-bold text-[#FF2D55] mb-1">Hạng Kim Cương</div>
                  <div className="text-xs text-[#FF2D55] font-mono font-bold mb-2">Điểm 95 - 100</div>
                  <p className="text-[11px] text-rose-900/80">Đối tác chiến lược bảo chứng nguồn vốn, có quyền triệu tập phòng đàm phán cấp cao.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
