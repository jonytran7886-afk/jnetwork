'use client';

import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  ArrowRight,
  MapPin,
  CheckCircle2,
  Building2,
  Coins,
  Cpu,
  Package,
  Store,
  Layers,
  Search,
  Filter,
} from 'lucide-react';
import { OpportunityItem } from '../data/opportunitiesData';

interface InteractiveResourceMatchmakerProps {
  opportunities: OpportunityItem[];
  onSelectOpportunity: (opp: OpportunityItem) => void;
  onPostDemand: () => void;
}

export const InteractiveResourceMatchmaker: React.FC<InteractiveResourceMatchmakerProps> = ({
  opportunities,
  onSelectOpportunity,
  onPostDemand,
}) => {
  // Selection states
  const [haveType, setHaveType] = useState<string>('space');
  const [needType, setNeedType] = useState<string>('franchise');
  const [locationFilter, setLocationFilter] = useState<string>('all');

  // Options for "Tôi đang có"
  const haveOptions = [
    {
      id: 'space',
      label: 'Mặt bằng / Nhà xưởng / Kho bãi',
      icon: Building2,
      desc: 'Mặt tiền, shophouse, kho bãi hoặc văn phòng nhàn rỗi',
    },
    {
      id: 'capital',
      label: 'Vốn nhàn rỗi (30Tr - 500Tr)',
      icon: Coins,
      desc: 'Muốn góp vốn chia sẻ dòng tiền, không tự vận hành',
    },
    {
      id: 'skill',
      label: 'Kỹ năng Tech / Marketing / Vận hành',
      icon: Cpu,
      desc: 'Kỹ sư, chuyên gia muốn góp công sức lấy cổ phần (Sweat Equity)',
    },
    {
      id: 'product',
      label: 'Sản phẩm tốt / Nguồn hàng độc quyền',
      icon: Package,
      desc: 'Có công thức, nguồn hàng xưởng cần kênh phân phối',
    },
  ];

  // Options for "Tôi muốn tìm đối tác"
  const needOptions = [
    {
      id: 'franchise',
      label: 'Mô hình F&B / Dịch vụ nhượng quyền',
      icon: Store,
      desc: 'Đã có thương hiệu, công thức, đối tác vào vận hành cùng',
    },
    {
      id: 'cofounder',
      label: 'Cộng sự đồng sáng lập & Vận hành',
      icon: Layers,
      desc: 'Người cùng gánh vác, trực tiếp triển khai dự án',
    },
    {
      id: 'capital',
      label: 'Nhà tài trợ vốn / Cổ đông thiên thần',
      icon: Coins,
      desc: 'Cần vốn lưu động mở rộng quy mô kinh doanh',
    },
    {
      id: 'distribution',
      label: 'Đại lý phân phối & Kênh bán lẻ',
      icon: Package,
      desc: 'Hệ thống showroom, chuỗi cửa hàng đưa sản phẩm ra thị trường',
    },
  ];

  // Locations
  const locationOptions = [
    { id: 'all', label: 'Tất cả khu vực' },
    { id: 'hcm', label: 'TP. Hồ Chí Minh' },
    { id: 'hanoi', label: 'Hà Nội' },
    { id: 'danang', label: 'Đà Nẵng & Miền Trung' },
  ];

  // Match algorithm: Filter opportunities according to selection
  const matchedOpportunities = useMemo(() => {
    return opportunities
      .filter((opp) => {
        // Location filter
        if (locationFilter === 'hcm' && !opp.location.includes('TP. HCM') && !opp.location.includes('Hồ Chí Minh') && !opp.location.includes('Toàn quốc')) {
          return false;
        }
        if (locationFilter === 'hanoi' && !opp.location.includes('Hà Nội') && !opp.location.includes('Toàn quốc')) {
          return false;
        }
        if (locationFilter === 'danang' && !opp.location.includes('Đà Nẵng') && !opp.location.includes('Toàn quốc')) {
          return false;
        }

        // Category filter matching logic
        if (haveType === 'space') {
          return opp.category === 'space' || opp.whatINeed.toLowerCase().includes('mặt bằng') || opp.cooperationType.toLowerCase().includes('không gian');
        }
        if (haveType === 'capital') {
          return opp.category === 'resource' || opp.category === 'project' || opp.whatINeed.toLowerCase().includes('vốn') || opp.resourceHighlight.includes('Vốn');
        }
        if (haveType === 'skill') {
          return opp.category === 'partner' || opp.whatINeed.toLowerCase().includes('kỹ thuật') || opp.whatINeed.toLowerCase().includes('marketing');
        }
        if (haveType === 'product') {
          return opp.category === 'project' || opp.whatINeed.toLowerCase().includes('phân phối') || opp.cooperationType.toLowerCase().includes('đại lý');
        }
        return true;
      })
      .slice(0, 3);
  }, [opportunities, haveType, needType, locationFilter]);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden p-6 sm:p-8 space-y-6">
      
      {/* Title & Quick Value Prop */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2 text-[#FF2D55] text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Công cụ thực tế 60 giây dành cho người mới</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Ghép Nối Nguồn Lực Thông Minh
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Không cần gõ tìm kiếm. Hãy chọn thứ bạn đang có, hệ thống sẽ lọc ngay đối tác đang cần bạn!
          </p>
        </div>

        {/* Quick Location Dropdown */}
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-3 py-1.5 self-start sm:self-auto">
          <MapPin className="w-4 h-4 text-slate-400" />
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="text-xs font-bold text-slate-800 bg-transparent outline-none cursor-pointer"
          >
            {locationOptions.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* STEP 1 & 2 SELECTORS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* VẾ 1: TÔI ĐANG CÓ */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-[#FF2D55] text-white flex items-center justify-center text-[10px]">
                1
              </span>
              <span>Bạn đang có nguồn lực gì?</span>
            </span>
            <span className="text-[11px] text-slate-600">Chọn 1 nguồn lực</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {haveOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = haveType === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setHaveType(opt.id)}
                  className={`p-3 rounded-2xl text-left transition-all border cursor-pointer relative ${
                    isSelected
                      ? 'bg-rose-50/70 border-[#FF2D55] text-slate-900 shadow-xs ring-1 ring-[#FF2D55]'
                      : 'bg-slate-50/60 border-slate-200/70 text-slate-700 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                        isSelected ? 'bg-[#FF2D55] text-white' : 'bg-white text-slate-600 border border-slate-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-[#FF2D55]" />}
                  </div>
                  <div className="font-bold text-xs leading-snug">{opt.label}</div>
                  <div className="text-[10px] text-slate-600 mt-1 line-clamp-1">{opt.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* VẾ 2: TÔI MUỐN TÌM */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">
                2
              </span>
              <span>Bạn muốn tìm kiểu đối tác nào?</span>
            </span>
            <span className="text-[11px] text-slate-600">Mục tiêu hợp tác</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {needOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = needType === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setNeedType(opt.id)}
                  className={`p-3 rounded-2xl text-left transition-all border cursor-pointer relative ${
                    isSelected
                      ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                      : 'bg-slate-50/60 border-slate-200/70 text-slate-700 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-white text-slate-600 border border-slate-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <div className="font-bold text-xs leading-snug">{opt.label}</div>
                  <div className={`text-[10px] mt-1 line-clamp-1 ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                    {opt.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* REAL-TIME MATCH RESULT BOX */}
      <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/80 space-y-3.5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-900">
              Tìm thấy <strong className="text-[#FF2D55]">{matchedOpportunities.length}</strong> cơ hội sẵn sàng kết nối ngay:
            </span>
          </div>
          <span className="text-[11px] text-slate-600">
            Xem hồ sơ & đàm phán hoàn toàn miễn phí
          </span>
        </div>

        {/* List of Matched Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {matchedOpportunities.map((opp) => (
            <div
              key={opp.id}
              onClick={() => onSelectOpportunity(opp)}
              className="bg-white rounded-xl p-3.5 border border-slate-200 hover:border-[#FF2D55] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-600">
                  <span className="font-semibold text-slate-900">{opp.categoryLabel}</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {opp.location}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-2 group-hover:text-[#FF2D55] transition-colors leading-snug">
                  {opp.title}
                </h4>
                <div className="text-[11px] text-slate-600 line-clamp-2">
                  <span className="font-medium text-slate-900">Cần: </span>
                  {opp.whatINeed}
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] font-bold text-emerald-600">
                  {opp.resourceHighlight}
                </span>
                <span className="text-[#FF2D55] font-bold flex items-center gap-0.5 text-xs group-hover:translate-x-0.5 transition-transform">
                  <span>Chi tiết</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Not finding what you need? Quick Post Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 border-t border-slate-200/60">
          <span>Bạn chưa thấy đối tác ưng ý? Hãy đăng ngay nhu cầu của bạn để hệ thống tự động thông báo.</span>
          <button
            type="button"
            onClick={onPostDemand}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            <span>Đăng nhu cầu của tôi (Miễn phí)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
