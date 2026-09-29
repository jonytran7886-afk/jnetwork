import React from 'react';
import { Compass, Puzzle, Sparkles } from 'lucide-react';

export const CungLamCommunityValues: React.FC = () => {
  const values = [
    {
      id: 'val-1',
      title: 'Mở rộng góc nhìn',
      description: 'Tiếp cận những ý tưởng, kinh nghiệm và cách làm khác nhau thông qua các kết nối đa lĩnh vực.',
      icon: Compass,
      bgColor: 'bg-rose-50',
      iconColor: 'text-[#FF2D55]',
    },
    {
      id: 'val-2',
      title: 'Bổ trợ thế mạnh',
      description: 'Kết hợp những năng lực và nguồn lực khác nhau để mở rộng khả năng triển khai các dự án.',
      icon: Puzzle,
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600',
    },
    {
      id: 'val-3',
      title: 'Cùng tạo giá trị',
      description: 'Xây dựng mối quan hệ hợp tác dựa trên mục tiêu chung, sự minh bạch và tinh thần đồng hành.',
      icon: Sparkles,
      bgColor: 'bg-sky-50',
      iconColor: 'text-sky-600',
    },
  ];

  return (
    <section id="community-values" className="py-12 sm:py-16 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="space-y-2 mb-10 sm:mb-12">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FF2D55] block">
            GIÁ TRỊ CỘNG ĐỒNG
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Những kết nối mở ra khả năng mới.
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-normal max-w-xl">
            Tập trung vào giá trị thực sự của sự hợp tác bình đẳng, cùng nhau phát triển và tạo ra những kết quả bền vững.
          </p>
        </div>

        {/* 3 Core Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v) => {
            const Icon = v.icon;

            return (
              <div
                key={v.id}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col justify-between space-y-5 hover:border-rose-200 transition-all group"
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-2xl ${v.bgColor} ${v.iconColor} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-bold text-slate-900 text-lg">
                    {v.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {v.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 text-[11px] font-semibold text-slate-400">
                  Cộng đồng hợp tác Cùng Làm
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
