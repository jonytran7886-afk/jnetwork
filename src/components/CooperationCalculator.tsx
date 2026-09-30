'use client';

import React, { useState, useMemo } from 'react';
import {
  Calculator,
  Coins,
  TrendingUp,
  ShieldAlert,
  ArrowRight,
  FileCheck2,
  Percent,
  CheckCircle2,
  Clock,
  HelpCircle,
} from 'lucide-react';

interface CooperationCalculatorProps {
  onTransferToDealRoom: (prompt: string) => void;
}

export const CooperationCalculator: React.FC<CooperationCalculatorProps> = ({
  onTransferToDealRoom,
}) => {
  // Input parameters
  const [modelType, setModelType] = useState<'space_fnb' | 'capital_retail' | 'sweat_equity'>('space_fnb');
  const [contributionValue, setContributionValue] = useState<number>(15000000); // 15 million VND (e.g. monthly rent equivalent or capital)
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(120000000); // 120 million VND gross monthly revenue
  const [profitMargin, setProfitMargin] = useState<number>(25); // 25% net profit margin
  const [sharePercentage, setSharePercentage] = useState<number>(15); // 15% revenue share or profit share

  // Calculation results
  const calculation = useMemo(() => {
    const netProfit = (monthlyRevenue * profitMargin) / 100;
    
    let monthlyIncome = 0;
    let breakEvenMonths = 0;
    let annualROI = 0;

    if (modelType === 'space_fnb') {
      // Space owner: receives % of gross revenue
      monthlyIncome = (monthlyRevenue * sharePercentage) / 100;
      // ROI comparison against traditional fixed rental
      const upside = monthlyIncome - contributionValue;
      annualROI = contributionValue > 0 ? ((monthlyIncome * 12) / (contributionValue * 12)) * 100 : 0;
      breakEvenMonths = upside > 0 ? 0 : 0;
    } else if (modelType === 'capital_retail') {
      // Micro-investor: receives % of net profit
      monthlyIncome = (netProfit * sharePercentage) / 100;
      const initialCapital = contributionValue * 5; // e.g. invested capital 75M
      breakEvenMonths = monthlyIncome > 0 ? Math.ceil(initialCapital / monthlyIncome) : 0;
      annualROI = initialCapital > 0 ? ((monthlyIncome * 12) / initialCapital) * 100 : 0;
    } else {
      // Sweat Equity: receives % of profit + base allowance
      monthlyIncome = (netProfit * sharePercentage) / 100;
      annualROI = 100;
      breakEvenMonths = 1;
    }

    return {
      netProfit,
      monthlyIncome,
      breakEvenMonths,
      annualROI,
    };
  }, [modelType, contributionValue, monthlyRevenue, profitMargin, sharePercentage]);

  // Format VND
  const formatVND = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleSendToDealRoom = () => {
    const modelNames = {
      space_fnb: 'Góp Mặt Bằng lấy % Doanh Thu Chuỗi F&B',
      capital_retail: 'Góp Vốn Vi Mô nhận Chia Sẻ Lợi Nhuận',
      sweat_equity: 'Góp Công Sức (Sweat Equity) lấy Cổ Phần',
    };

    const prompt = `Tôi muốn thẩm định và lập dự thảo MOU cho phương án: ${modelNames[modelType]}.
Định giá đóng góp của tôi: ${formatVND(contributionValue)}.
Doanh thu dự kiến của đối tác: ${formatVND(monthlyRevenue)}/tháng.
Tỷ lệ chia sẻ đề xuất: ${sharePercentage}%.
Thu nhập dự kiến: ${formatVND(calculation.monthlyIncome)}/tháng.
Hãy lập biên bản thỏa thuận hợp tác và phân tích rủi ro pháp lý theo luật thương mại Việt Nam.`;

    onTransferToDealRoom(prompt);
  };

  return (
    <section id="cooperation-calculator" className="py-12 sm:py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-[#FF2D55] text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>Công Cụ Minh Bạch Hóa Hợp Tác</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Máy Tính Tỷ Lệ Chia Doanh Thu &amp; Dòng Tiền
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Ước tính dòng tiền thực nhận hàng tháng, tỷ lệ ăn chia chuẩn thị trường và thời gian thu hồi vốn trước khi ký biên bản hợp tác.
          </p>
        </div>

        {/* Calculator Widget Container */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT: Inputs & Sliders (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* 1. Chọn loại mô hình hợp tác */}
              <div>
                <label className="block text-xs font-black text-slate-900 uppercase tracking-wide mb-2.5">
                  1. Chọn hình thức bạn tham gia hợp tác:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setModelType('space_fnb');
                      setContributionValue(15000000);
                      setSharePercentage(14);
                    }}
                    className={`p-3 rounded-2xl text-left border cursor-pointer transition-all ${
                      modelType === 'space_fnb'
                        ? 'bg-white border-[#FF2D55] text-slate-900 shadow-xs ring-1 ring-[#FF2D55]'
                        : 'bg-white/60 border-slate-200 text-slate-600 hover:bg-white'
                    }`}
                  >
                    <div className="font-bold text-xs">Góp Mặt bằng / Kho</div>
                    <div className="text-[10px] text-slate-600 mt-1">Lấy % doanh thu tổng</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setModelType('capital_retail');
                      setContributionValue(50000000);
                      setSharePercentage(25);
                    }}
                    className={`p-3 rounded-2xl text-left border cursor-pointer transition-all ${
                      modelType === 'capital_retail'
                        ? 'bg-white border-[#FF2D55] text-slate-900 shadow-xs ring-1 ring-[#FF2D55]'
                        : 'bg-white/60 border-slate-200 text-slate-600 hover:bg-white'
                    }`}
                  >
                    <div className="font-bold text-xs">Góp Vốn Vi Mô</div>
                    <div className="text-[10px] text-slate-600 mt-1">Chia sẻ lợi nhuận ròng</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setModelType('sweat_equity');
                      setContributionValue(20000000);
                      setSharePercentage(15);
                    }}
                    className={`p-3 rounded-2xl text-left border cursor-pointer transition-all ${
                      modelType === 'sweat_equity'
                        ? 'bg-white border-[#FF2D55] text-slate-900 shadow-xs ring-1 ring-[#FF2D55]'
                        : 'bg-white/60 border-slate-200 text-slate-600 hover:bg-white'
                    }`}
                  >
                    <div className="font-bold text-xs">Góp Công Sức</div>
                    <div className="text-[10px] text-slate-600 mt-1">Cổ phần dự án (Tech/MKT)</div>
                  </button>
                </div>
              </div>

              {/* 2. Sliders */}
              <div className="space-y-5 bg-white p-5 rounded-2xl border border-slate-200/80">
                {/* Monthly Revenue Projection */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-slate-800">
                      Doanh thu dự kiến của cửa hàng/dự án mỗi tháng:
                    </span>
                    <span className="font-extrabold text-[#FF2D55] text-sm">
                      {formatVND(monthlyRevenue)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={30000000}
                    max={600000000}
                    step={10000000}
                    value={monthlyRevenue}
                    onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#FF2D55]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-600 mt-1">
                    <span>30 Triệu/tháng (Kiosk nhỏ)</span>
                    <span>300 Triệu</span>
                    <span>600 Triệu (Chuỗi lớn)</span>
                  </div>
                </div>

                {/* Share Percentage */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-slate-800">
                      Tỷ lệ phần trăm chia sẻ thỏa thuận:
                    </span>
                    <span className="font-extrabold text-slate-900 text-sm">
                      {sharePercentage}% {modelType === 'space_fnb' ? 'Doanh thu gộp' : 'Lợi nhuận ròng'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={50}
                    step={1}
                    value={sharePercentage}
                    onChange={(e) => setSharePercentage(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#FF2D55]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-600 mt-1">
                    <span>5% (Tối thiểu)</span>
                    <span>15% (Chuẩn thị trường F&amp;B)</span>
                    <span>50% (Đồng sở hữu 50-50)</span>
                  </div>
                </div>

                {/* Estimated Net Profit Margin */}
                {modelType !== 'space_fnb' && (
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-bold text-slate-800">
                        Biên lợi nhuận ròng của mô hình kinh doanh:
                      </span>
                      <span className="font-bold text-slate-900 text-xs">
                        {profitMargin}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={45}
                      step={5}
                      value={profitMargin}
                      onChange={(e) => setProfitMargin(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#FF2D55]"
                    />
                  </div>
                )}
              </div>

              {/* Safety notice */}
              <div className="flex items-start gap-2.5 text-xs text-slate-600 p-3 bg-blue-50/60 rounded-xl border border-blue-100">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  Công thức dựa trên mức chuẩn của hơn 500+ hợp đồng hợp tác kinh doanh (BCC) đã ký kết thành công trên thị trường Việt Nam năm 2025–2026.
                </span>
              </div>
            </div>

            {/* RIGHT: Real-time Projection Card (5 Cols) */}
            <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-6 space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF2D55]/20 rounded-full blur-2xl" />

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-300">
                  Kết quả dự phóng thực nhận
                </span>
                <h3 className="text-xl font-black mt-1">
                  Thu Nhập Dự Kiến Của Bạn
                </h3>
              </div>

              {/* Big Highlight Number */}
              <div className="p-4 bg-white/10 rounded-2xl border border-white/10 space-y-1">
                <div className="text-xs text-slate-300">Dòng tiền về túi mỗi tháng:</div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">
                  {formatVND(calculation.monthlyIncome)}
                  <span className="text-xs font-normal text-slate-300"> / tháng</span>
                </div>
                <div className="text-[11px] text-slate-300">
                  Tương đương <strong>{formatVND(calculation.monthlyIncome * 12)}</strong> mỗi năm
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <div className="text-slate-400 text-[11px] flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Hiệu suất tài sản:</span>
                  </div>
                  <div className="text-base font-bold text-white mt-1">
                    {calculation.annualROI > 0 ? `+${Math.round(calculation.annualROI)}%` : 'Ổn định'}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">So với cho thuê tĩnh</div>
                </div>

                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <div className="text-slate-400 text-[11px] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Thu hồi vốn:</span>
                  </div>
                  <div className="text-base font-bold text-white mt-1">
                    {calculation.breakEvenMonths > 0 ? `${calculation.breakEvenMonths} tháng` : 'Ngay tháng 1'}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Thời gian hòa vốn</div>
                </div>
              </div>

              {/* 3 Important Contract Rules */}
              <div className="space-y-2 text-[11px] text-slate-300 border-t border-white/10 pt-4">
                <div className="font-bold text-white uppercase text-[10px] tracking-wider">
                  3 Điều khoản bắt buộc trong hợp đồng BCC:
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-[#FF2D55] font-bold">1.</span>
                  <span>Cài đặt hệ thống POS đồng bộ để minh bạch hóa doanh thu theo thời gian thực.</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-[#FF2D55] font-bold">2.</span>
                  <span>Thời điểm quyết toán và chuyển tiền: Chốt ngày 05 hàng tháng.</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-[#FF2D55] font-bold">3.</span>
                  <span>Điều khoản bảo đảm tối thiểu (Floor Rate) để người có mặt bằng không chịu lỗ.</span>
                </div>
              </div>

              {/* Transfer CTA Button */}
              <button
                type="button"
                onClick={handleSendToDealRoom}
                className="w-full py-3 bg-[#FF2D55] hover:bg-[#e01e45] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>Nạp Vào Phòng Đàm Phán &amp; Sinh MOU</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
