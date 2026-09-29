import React from 'react';
import { FileText, Search, MessageSquare, HeartHandshake, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    stepLabel: '01',
    icon: FileText,
    title: 'Chia sẻ nguồn lực',
    description: 'Tạo hồ sơ, giới thiệu năng lực, ý tưởng, tài sản hoặc những nguồn lực bạn sẵn sàng chia sẻ.',
  },
  {
    stepLabel: '02',
    icon: Search,
    title: 'Khám phá cơ hội',
    description: 'Tiếp cận các dự án, cộng đồng và cơ hội hợp tác phù hợp với mối quan tâm và định hướng của bạn.',
  },
  {
    stepLabel: '03',
    icon: MessageSquare,
    title: 'Kết nối & trao đổi',
    description: 'Chủ động tương tác, tìm hiểu mục tiêu chung và thảo luận những khả năng hợp tác.',
  },
  {
    stepLabel: '04',
    icon: HeartHandshake,
    title: 'Đồng hành & phát triển',
    description:
      'Hình thành nhóm hợp tác, thống nhất vai trò và cùng triển khai những kế hoạch đã được các bên đồng thuận.',
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="space-y-2 mb-10 sm:mb-12">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FF2D55] block">
            CÁCH CÙNG LÀM KẾT NỐI
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Từ nguồn lực riêng đến giá trị chung.
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-normal max-w-2xl">
            Mỗi hành trình hợp tác bắt đầu từ việc chia sẻ những gì bạn có và khám phá những cơ hội phù hợp.
          </p>
        </div>

        {/* Connected Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative">
          {STEPS.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={step.stepLabel} className="relative flex flex-col justify-between">
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:border-rose-200 transition-all space-y-4 h-full">
                  {/* Step Number in red badge */}
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-full bg-[#FF2D55] text-white text-xs font-bold flex items-center justify-center">
                      {step.stepLabel}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-rose-50 text-[#FF2D55] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5 pt-1">
                    <h3 className="font-bold text-slate-900 text-base">{step.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{step.description}</p>
                  </div>
                </div>

                {/* Arrow connector between cards on desktop */}
                {index < STEPS.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-slate-100 text-slate-400 items-center justify-center">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
