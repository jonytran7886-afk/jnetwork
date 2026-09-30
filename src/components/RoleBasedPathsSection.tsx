'use client';

import React from 'react';
import {
  Building2,
  Coins,
  Store,
  Briefcase,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';

interface RoleBasedPathsSectionProps {
  onSelectRolePath: (category: 'space' | 'resource' | 'project' | 'partner') => void;
  onOpenCalculator: () => void;
}

export const RoleBasedPathsSection: React.FC<RoleBasedPathsSectionProps> = ({
  onSelectRolePath,
  onOpenCalculator,
}) => {
  const roles = [
    {
      id: 'space',
      category: 'space' as const,
      icon: Building2,
      badge: 'Dành cho chủ tài sản',
      title: 'Bạn có Mặt bằng, Kho xưởng hoặc Văn phòng bỏ trống?',
      tagline: 'Biến tài sản nhàn rỗi thành dòng tiền thụ động',
      benefitList: [
        'Hợp tác mở quầy F&B, kiosk trà sữa hoặc trạm sạc xe điện',
        'Chia sẻ mặt bằng làm điểm giao vận hoặc văn phòng đồng làm việc',
        'Nhận tiền thuê cố định hoặc phần trăm chia sẻ doanh thu hàng tháng',
      ],
      activeCount: '24 đối tác đang tìm mặt bằng kinh doanh',
      actionText: 'Xem đối tác cần mặt bằng',
      accentColor: 'border-sky-200 hover:border-sky-500',
      iconBg: 'bg-sky-50 text-sky-600',
      btnBg: 'hover:bg-sky-50 text-sky-700',
    },
    {
      id: 'capital',
      category: 'resource' as const,
      icon: Coins,
      badge: 'Dành cho người có vốn',
      title: 'Bạn có Vốn nhỏ nhàn rỗi (30 Triệu – 500 Triệu)?',
      tagline: 'Đồng sở hữu mô hình kinh doanh có doanh thu thật',
      benefitList: [
        'Góp vốn vi mô vào các chuỗi cửa hàng, tiệm giặt ủi, rửa xe tự động',
        'Nhận chia sẻ doanh thu minh bạch (Revenue Share) định kỳ',
        'Có thỏa thuận pháp lý BCC và phương án bảo toàn vốn ban đầu',
      ],
      activeCount: '16 dự án đang gọi vốn hợp tác dòng tiền',
      actionText: 'Xem dự án cần vốn',
      accentColor: 'border-amber-200 hover:border-amber-500',
      iconBg: 'bg-amber-50 text-amber-600',
      btnBg: 'hover:bg-amber-50 text-amber-700',
    },
    {
      id: 'product',
      category: 'project' as const,
      icon: Store,
      badge: 'Dành cho xưởng & nhà sản xuất',
      title: 'Bạn có Sản phẩm tốt nhưng thiếu Kênh phân phối?',
      tagline: 'Mở rộng thị trường không tốn chi phí xây showroom',
      benefitList: [
        'Kết nối với hệ thống cửa hàng, đại lý bán sỉ & lẻ trên toàn quốc',
        'Hợp tác đưa hàng vào chuỗi siêu thị mini và điểm bán lẻ sẵn có',
        'Ký gửi sản phẩm theo mô hình chia sẻ hoa hồng sau khi bán',
      ],
      activeCount: '31 đại lý & điểm bán sẵn sàng nhận hàng',
      actionText: 'Tìm kênh phân phối ngay',
      accentColor: 'border-rose-200 hover:border-[#FF2D55]',
      iconBg: 'bg-rose-50 text-[#FF2D55]',
      btnBg: 'hover:bg-rose-50 text-[#FF2D55]',
    },
    {
      id: 'expert',
      category: 'partner' as const,
      icon: Briefcase,
      badge: 'Dành cho chuyên gia & kỹ sư',
      title: 'Bạn có Tay nghề, Kỹ năng Tech hoặc Marketing?',
      tagline: 'Góp công sức (Sweat Equity) nhận cổ phần dự án',
      benefitList: [
        'Tham gia đồng sáng lập các startup tiềm năng trong giờ rảnh',
        'Được định giá công sức rõ ràng và ghi nhận tỷ lệ cổ phần/lợi nhuận',
        'Học hỏi kinh nghiệm quản trị và xây dựng thương hiệu cá nhân',
      ],
      activeCount: '19 nhà sáng lập đang tìm cộng sự kỹ thuật',
      actionText: 'Gia nhập dự án tiềm năng',
      accentColor: 'border-purple-200 hover:border-purple-500',
      iconBg: 'bg-purple-50 text-purple-600',
      btnBg: 'hover:bg-purple-50 text-purple-700',
    },
  ];

  return (
    <section id="role-paths" className="py-12 sm:py-16 bg-slate-100/60 border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5 text-[#FF2D55]" />
            <span>Lộ Trình Thực Chiến Dành Cho Người Mới</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Bạn Đến Đây Để Làm Gì? Chọn Lối Đi Của Bạn
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Chúng tôi thiết kế từng lộ trình riêng biệt để mọi nguồn lực nhàn rỗi của bạn đều tìm được đối tác tương xứng trong vòng chưa đầy 24 giờ.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <div
                key={role.id}
                className={`bg-white rounded-3xl p-5 sm:p-6 border transition-all duration-200 flex flex-col justify-between shadow-xs hover:shadow-xl ${role.accentColor}`}
              >
                <div className="space-y-4">
                  {/* Top Icon & Badge */}
                  <div className="flex items-center justify-between">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${role.iconBg}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">
                      {role.badge}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base leading-snug">
                      {role.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-600 mt-1">
                      {role.tagline}
                    </p>
                  </div>

                  {/* Key Benefits */}
                  <ul className="space-y-2 pt-1 text-xs text-slate-600">
                    {role.benefitList.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Active Count & CTA */}
                <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
                  <div className="text-[11px] font-bold text-emerald-800 bg-emerald-50/80 px-2.5 py-1 rounded-lg text-center">
                    {role.activeCount}
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectRolePath(role.category)}
                    className={`w-full py-2.5 px-3 rounded-xl border border-slate-200 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${role.btnBg}`}
                  >
                    <span>{role.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Helper Banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="font-bold text-sm">Chưa biết cách định giá đóng góp của mình?</div>
              <div className="text-xs text-slate-300">
                Sử dụng công cụ tính toán tỷ lệ chia sẻ doanh thu và thẩm định pháp lý miễn phí của chúng tôi.
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenCalculator}
            className="px-5 py-2.5 bg-[#FF2D55] hover:bg-[#e01e45] text-white font-bold text-xs rounded-xl transition-colors cursor-pointer shrink-0"
          >
            Mở Bảng Tính Lợi Nhuận
          </button>
        </div>

      </div>
    </section>
  );
};
