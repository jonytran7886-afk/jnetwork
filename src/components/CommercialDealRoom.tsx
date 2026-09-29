'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Briefcase,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  DollarSign,
  Handshake,
  Clock,
  Copy,
  Check,
  Download,
  Store,
  Factory,
  Truck,
  Code2,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';

export interface CommercialDealRoomProps {
  initialPrompt?: {
    partyAResources: string;
    partyBResources: string;
    dealType: string;
    targetGoal: string;
  } | null;
}

interface PresetScenario {
  id: string;
  icon: React.ElementType;
  label: string;
  dealType: string;
  partyAName: string;
  partyAResources: string;
  partyBName: string;
  partyBResources: string;
  targetGoal: string;
  investmentBudget: string;
}

const PRACTICAL_PRESETS: PresetScenario[] = [
  {
    id: 'space_share',
    icon: Store,
    label: 'Dùng chung mặt bằng F&B / Bán lẻ',
    dealType: 'Chia sẻ mặt bằng kinh doanh theo khung giờ & Tối ưu tiền thuê',
    partyAName: 'Bên A (Chủ hợp đồng thuê mặt bằng)',
    partyAResources: 'Mặt bằng 70m² tại trục đường chính, đã hoàn thiện quầy kệ, điện nước, bàn ghế. Hoạt động cà phê từ 6h30 - 17h00.',
    partyBName: 'Bên B (Mô hình kinh doanh buổi tối)',
    partyBResources: 'Thương hiệu trà hoa quả & tráng miệng buổi tối, có sẵn tệp khách hàng trẻ, tự quản lý nhân viên ca tối từ 17h30 - 23h00.',
    targetGoal: 'Chia sẻ 45% tiền thuê mặt bằng hàng tháng (15 triệu/tháng) và cùng chia đôi chi phí điện nước, internet.',
    investmentBudget: '30 Triệu VNĐ (Đặt cọc 2 tháng tiền thuê chia sẻ)',
  },
  {
    id: 'factory_oem',
    icon: Factory,
    label: 'Chủ xưởng may / cơ khí gia công theo đơn',
    dealType: 'Gia công ODM/OEM tối ưu công suất máy móc nhàn rỗi',
    partyAName: 'Bên A (Xưởng sản xuất)',
    partyAResources: 'Xưởng may 600m² tại Bình Chánh với 25 máy may công nghiệp, dư thừa 35% công suất vào các tuần giữa tháng.',
    partyBName: 'Bên B (Thương hiệu thời trang thiết kế)',
    partyBResources: 'Thương hiệu bán lẻ online có 80.000 followers, có sẵn mẫu rập và vải, cần gia công lô hàng nhỏ từ 300 - 800 sản phẩm/tháng.',
    targetGoal: 'Ký hợp đồng gia công ổn định trong 6 tháng, đảm bảo tiêu chuẩn đường may và tiến độ giao hàng trong 10 ngày.',
    investmentBudget: '80 Triệu VNĐ (Tạm ứng 40% giá trị mỗi lô đơn hàng)',
  },
  {
    id: 'warehouse_fulfillment',
    icon: Truck,
    label: 'Liên minh kho bãi & gom đơn logistics',
    dealType: 'Dùng chung kho fulfillment & Tối ưu cước bưu chính',
    partyAName: 'Bên A (Chủ kho bãi)',
    partyAResources: 'Kho chứa 200m² đạt chuẩn PCCC tại Tân Bình, có giá kệ, camera an ninh và 2 nhân viên đóng gói chuyên nghiệp.',
    partyBName: 'Bên B (Shop kinh doanh online)',
    partyBResources: 'Doanh số 120 - 200 đơn hàng/ngày, cần không gian lưu trữ 30m² và đội ngũ phụ trách đóng hàng giao trong ngày.',
    targetGoal: 'Giảm 30% chi phí thuê kho riêng lẻ và gom sản lượng để đàm phán cước vận chuyển chiết khấu 15% với bưu cục.',
    investmentBudget: '12 Triệu VNĐ/tháng (Phí lưu kho & đóng gói trọn gói)',
  },
  {
    id: 'tech_distribution',
    icon: Code2,
    label: 'Hợp tác Công nghệ & Kênh phân phối',
    dealType: 'Chia sẻ doanh thu ròng (Net Revenue Share) dựa trên kết quả bán lẻ',
    partyAName: 'Bên A (Đơn vị giải pháp phần mềm)',
    partyAResources: 'Hệ thống phần mềm quản lý kho & bán hàng đa kênh tự động, chịu trách nhiệm bảo trì kỹ thuật và hướng dẫn sử dụng.',
    partyBName: 'Bên B (Doanh nghiệp phân phối / Chuỗi cửa hàng)',
    partyBResources: 'Mạng lưới 20 đại lý bán buôn và tệp 1.500 khách hàng doanh nghiệp thân thiết.',
    targetGoal: 'Triển khai giải pháp cho 50 đại lý trong 90 ngày, Bên A nhận 25% doanh thu bản quyền ròng mỗi tháng.',
    investmentBudget: 'Tự cân đối nguồn lực, không cần chi phí đầu tư phần cứng ban đầu',
  },
];

export function CommercialDealRoom({ initialPrompt }: CommercialDealRoomProps = {}) {
  // Form State
  const [partyAName, setPartyAName] = useState<string>(PRACTICAL_PRESETS[0].partyAName);
  const [partyAResources, setPartyAResources] = useState<string>(PRACTICAL_PRESETS[0].partyAResources);
  const [partyBName, setPartyBName] = useState<string>(PRACTICAL_PRESETS[0].partyBName);
  const [partyBResources, setPartyBResources] = useState<string>(PRACTICAL_PRESETS[0].partyBResources);
  const [dealType, setDealType] = useState<string>(PRACTICAL_PRESETS[0].dealType);
  const [targetGoal, setTargetGoal] = useState<string>(PRACTICAL_PRESETS[0].targetGoal);
  const [investmentBudget, setInvestmentBudget] = useState<string>(PRACTICAL_PRESETS[0].investmentBudget);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dealResult, setDealResult] = useState<any | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Sync initialPrompt if provided externally (from Industry Insights)
  React.useEffect(() => {
    if (initialPrompt) {
      if (initialPrompt.partyAResources) setPartyAResources(initialPrompt.partyAResources);
      if (initialPrompt.partyBResources) setPartyBResources(initialPrompt.partyBResources);
      if (initialPrompt.dealType) setDealType(initialPrompt.dealType);
      if (initialPrompt.targetGoal) setTargetGoal(initialPrompt.targetGoal);
    }
  }, [initialPrompt]);

  const handleApplyPreset = (preset: PresetScenario) => {
    setPartyAName(preset.partyAName);
    setPartyAResources(preset.partyAResources);
    setPartyBName(preset.partyBName);
    setPartyBResources(preset.partyBResources);
    setDealType(preset.dealType);
    setTargetGoal(preset.targetGoal);
    setInvestmentBudget(preset.investmentBudget);
    setDealResult(null);
  };

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

  const getFullMOUText = () => {
    if (!dealResult?.draftMOU) return '';
    return `
======================================================
${dealResult.draftMOU.title || 'BIÊN BẢN GHI NHỚ HỢP TÁC CHIẾN LƯỢC (MOU)'}
======================================================

I. THÔNG TIN CÁC BÊN:
- Bên A: ${partyAName}
  Nguồn lực đóng góp: ${partyAResources}
- Bên B: ${partyBName}
  Nguồn lực đóng góp: ${partyBResources}

II. MỤC TIÊU HỢP TÁC:
${dealResult.draftMOU.purpose || targetGoal}

III. CAM KẾT VÀ NGHĨA VỤ:
1. Cam kết Bên A:
   ${dealResult.draftMOU.commitmentsA}
2. Cam kết Bên B:
   ${dealResult.draftMOU.commitmentsB}

IV. CƠ CHẾ TÀI CHÍNH & PHÂN CHIA QUYỀN LỢI:
${dealResult.revenueShareFormula}

V. CÁC ĐIỀU KHOẢN QUẢN TRỊ RỦI RO & BẢO MẬT:
${dealResult.financialRiskAlerts?.map((r: string, i: number) => `(${i + 1}) ${r}`).join('\n') || ''}

VI. CƠ CHẾ GIẢI QUYẾT TRANH CHẤP & RÚT LUI THIỆN CHÍ:
${dealResult.draftMOU.disputeResolution}

VII. LỘ TRÌNH THỰC HIỆN THỬ NGHIỆM (PILOT):
${dealResult.actionMilestones?.map((m: any) => `• ${m.timeline}: ${m.deliverable}`).join('\n') || ''}

VIII. KHUYẾN NGHỊ THỰC THI TỪ GIÁM ĐỐC KINH DOANH:
"${dealResult.ccoRecommendation}"

---
Biên bản này được lập thành 02 bản có giá trị pháp lý sơ bộ như nhau nhằm ghi nhận thiện chí hợp tác.
Đại diện Bên A                            Đại diện Bên B
(Ký, ghi rõ họ tên)                      (Ký, ghi rõ họ tên)
    `.trim();
  };

  const handleCopyMOU = () => {
    const text = getFullMOUText();
    if (!text) return;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleDownloadMOU = () => {
    const text = getFullMOUText();
    if (!text) return;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Bien-Ban-Ghi-Nho-Hop-Tac-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="py-16 sm:py-20 bg-slate-50 text-slate-900 relative overflow-hidden border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF2D55] bg-rose-50 border border-rose-100 px-3 py-1 rounded-full mb-3 shadow-2xs">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Công Cụ Hỗ Trợ Đàm Phán & Soạn Thảo Hợp Tác Thực Tế</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 mb-3">
            Phòng Soạn Thảo & Thẩm Định Thỏa Thuận Hợp Tác
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Giúp hai bên làm rõ nghĩa vụ đóng góp, tính toán tỷ lệ chia sẻ doanh thu công bằng và tự động tạo <span className="text-slate-900 font-bold">Biên bản ghi nhớ 1 trang (MOU)</span> để gửi đối tác trước khi ký hợp đồng chính thức.
          </p>
        </div>

        {/* Practical Quick Presets Row */}
        <div className="mb-8">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#FF2D55]" />
            <span>Chọn nhanh mẫu tình huống thực tế thường gặp:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PRACTICAL_PRESETS.map((preset) => {
              const IconComp = preset.icon;
              const isSelected = dealType === preset.dealType;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleApplyPreset(preset)}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                    isSelected
                      ? 'bg-white border-[#FF2D55] shadow-xs ring-1 ring-[#FF2D55]'
                      : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-rose-50 text-[#FF2D55]' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 leading-snug truncate">
                      {preset.label}
                    </div>
                    <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {preset.dealType}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Workspace Grid: Form on Left, Output on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Input Column */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#FF2D55]" />
                <h3 className="text-sm font-bold text-slate-900">Thông Tin Thỏa Thuận Của Hai Bên</h3>
              </div>
              <span className="text-[11px] text-slate-400">Tùy chỉnh linh hoạt</span>
            </div>

            <form onSubmit={handleValidateDeal} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Hình thức hợp tác
                </label>
                <input
                  type="text"
                  value={dealType}
                  onChange={(e) => setDealType(e.target.value)}
                  placeholder="VD: Chia sẻ mặt bằng, Gia công OEM, Đại lý phân phối..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#FF2D55]"
                  required
                />
              </div>

              {/* Party A */}
              <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">Bên A (Khởi xướng / Chủ nguồn lực)</span>
                </div>
                <input
                  type="text"
                  value={partyAName}
                  onChange={(e) => setPartyAName(e.target.value)}
                  placeholder="Tên Bên A..."
                  className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-[#FF2D55]"
                  required
                />
                <textarea
                  rows={2}
                  value={partyAResources}
                  onChange={(e) => setPartyAResources(e.target.value)}
                  placeholder="Nguồn lực mang vào: Mặt bằng, máy móc, xưởng, sản phẩm..."
                  className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:outline-none focus:border-[#FF2D55] resize-none"
                  required
                />
              </div>

              {/* Party B */}
              <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">Bên B (Đối tác liên minh / Vận hành)</span>
                </div>
                <input
                  type="text"
                  value={partyBName}
                  onChange={(e) => setPartyBName(e.target.value)}
                  placeholder="Tên Bên B..."
                  className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-[#FF2D55]"
                  required
                />
                <textarea
                  rows={2}
                  value={partyBResources}
                  onChange={(e) => setPartyBResources(e.target.value)}
                  placeholder="Nguồn lực mang vào: Khách hàng, đội ngũ bán hàng, vốn lưu động..."
                  className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:outline-none focus:border-[#FF2D55] resize-none"
                  required
                />
              </div>

              {/* Goals & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Mục tiêu chính
                  </label>
                  <input
                    type="text"
                    value={targetGoal}
                    onChange={(e) => setTargetGoal(e.target.value)}
                    placeholder="Mục tiêu cụ thể..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#FF2D55]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Chi phí / Đặt cọc dự kiến
                  </label>
                  <input
                    type="text"
                    value={investmentBudget}
                    onChange={(e) => setInvestmentBudget(e.target.value)}
                    placeholder="VD: 15 Triệu/tháng..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#FF2D55]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 bg-gradient-to-r from-[#FF2D55] to-[#E01E45] hover:from-[#E01E45] hover:to-[#C01538] text-white font-bold py-3 px-4 rounded-xl shadow-md shadow-[#FF2D55]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 text-xs sm:text-sm"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Đang Thẩm Định Rủi Ro & Soạn Thảo MOU...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Thẩm Định Rủi Ro & Xuất Biên Bản Thỏa Thuận (MOU)</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Results Output Column */}
          <div className="lg:col-span-7 space-y-5">
            {dealResult ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5"
              >
                {/* 1. Fast Assessment & Revenue Share Formula */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
                    <div>
                      <div className="text-[11px] font-bold text-[#FF2D55] uppercase tracking-wider mb-0.5">
                        Đánh giá tính khả thi thực tế
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        {dealResult.commercialVerdict}
                      </h4>
                    </div>
                    <div className="px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-right shrink-0">
                      <span className="text-[10px] text-slate-500 uppercase block font-semibold">Độ tương thích</span>
                      <span className="text-lg font-black text-[#FF2D55]">{dealResult.dealFeasibilityScore}/100</span>
                    </div>
                  </div>

                  {/* Revenue Sharing */}
                  <div className="mb-4">
                    <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Cơ chế tài chính & Phân chia quyền lợi khuyến nghị:</span>
                    </div>
                    <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed bg-emerald-50/80 p-3 rounded-xl border border-emerald-200">
                      {dealResult.revenueShareFormula}
                    </p>
                  </div>

                  {/* 2 Practical Risk Clauses */}
                  <div className="mb-4">
                    <div className="text-xs font-bold text-rose-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 text-[#FF2D55]" />
                      <span>2 Điểm rủi ro thực tế cần đưa vào điều khoản hợp đồng:</span>
                    </div>
                    <div className="space-y-1.5">
                      {dealResult.financialRiskAlerts?.map((risk: string, idx: number) => (
                        <div
                          key={idx}
                          className="text-xs text-slate-800 bg-rose-50/50 border border-rose-100 rounded-xl p-2.5 flex items-start gap-2"
                        >
                          <span className="text-[#FF2D55] font-bold shrink-0">#{idx + 1}</span>
                          <span className="leading-relaxed">{risk}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Milestones */}
                  <div>
                    <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>Lộ trình chạy thử nghiệm đề xuất:</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {dealResult.actionMilestones?.map((m: any, idx: number) => (
                        <div key={idx} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs">
                          <div className="font-bold text-slate-800 mb-0.5">{m.timeline}</div>
                          <div className="text-slate-600 leading-snug line-clamp-2">{m.deliverable}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 2. Draft MOU Paper Card */}
                {dealResult.draftMOU && (
                  <div className="bg-white border-2 border-slate-300 rounded-2xl p-5 sm:p-6 shadow-sm relative">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-200">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-slate-700" />
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                          Biên Bản Ghi Nhớ Thỏa Thuận Sơ Bộ (MOU 1 Trang)
                        </h4>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleCopyMOU}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer border border-slate-200"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700">Đã chép!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-slate-600" />
                              <span>Sao chép gửi Zalo</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={handleDownloadMOU}
                          className="px-3 py-1.5 bg-slate-900 hover:bg-[#FF2D55] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Tải file .txt</span>
                        </button>
                      </div>
                    </div>

                    {/* MOU Formatted Document Box */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-800 font-mono space-y-3 leading-relaxed shadow-inner max-h-[350px] overflow-y-auto">
                      <div className="font-bold text-center text-slate-900 uppercase">
                        {dealResult.draftMOU.title || 'BIÊN BẢN GHI NHỚ HỢP TÁC CHIẾN LƯỢC'}
                      </div>
                      <div>
                        <strong className="text-slate-900">1. Mục đích:</strong>{' '}
                        {dealResult.draftMOU.purpose || targetGoal}
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
                        <strong className="text-slate-900">4. Phân chia quyền lợi:</strong>{' '}
                        {dealResult.revenueShareFormula}
                      </div>
                      <div>
                        <strong className="text-slate-900">5. Hòa giải tranh chấp:</strong>{' '}
                        {dealResult.draftMOU.disputeResolution}
                      </div>
                    </div>

                    {/* CCO Recommendation */}
                    <div className="mt-3.5 p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-950 leading-relaxed">
                      <strong className="text-amber-900">Lời khuyên xúc tiến:</strong> "{dealResult.ccoRecommendation}"
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              /* Empty Initial State - Clear, practical guide */
              <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[420px] shadow-xs">
                <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center text-[#FF2D55] mb-4 border border-rose-100">
                  <Handshake className="w-7 h-7" />
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">
                  Bắt Đầu Soạn Thảo Biên Bản Thỏa Thuận
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mb-6 leading-relaxed">
                  Chọn một trong 4 mẫu tình huống thực tế phía trên hoặc nhập nguồn lực của hai bên, sau đó bấm{' '}
                  <span className="text-[#FF2D55] font-bold">"Thẩm Định Rủi Ro & Xuất Biên Bản Thỏa Thuận (MOU)"</span>.
                  Hệ thống sẽ cung cấp một bản thỏa thuận 1 trang để hai bên làm cơ sở thảo luận trước khi ký kết.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-lg text-left text-xs">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <div className="font-bold text-slate-900 mb-0.5">1. Minh bạch quyền lợi</div>
                    <div className="text-slate-500">Thống nhất tỷ lệ chia sẻ doanh thu và chi phí gánh chịu.</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <div className="font-bold text-slate-900 mb-0.5">2. Phòng ngừa rủi ro</div>
                    <div className="text-slate-500">Cài đặt điều khoản đối soát công nợ và rút lui thiện chí.</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <div className="font-bold text-slate-900 mb-0.5">3. Sử dụng ngay</div>
                    <div className="text-slate-500">Sao chép gửi qua Zalo hoặc tải file văn bản in ra họp.</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
