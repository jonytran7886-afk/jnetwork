'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

export interface SuccessStoryItem {
  id: string;
  name: string;
  role: string;
  location: string;
  avatarUrl: string;
  quote: string;
}

const SUCCESS_STORIES: SuccessStoryItem[] = [
  {
    id: 'story-1',
    name: 'Anh Minh',
    role: 'Chủ quán cà phê',
    location: 'TP.HCM',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80',
    quote: '“Mình có mặt bằng nhưng không có kinh nghiệm vận hành. Nhờ Cùng Làm đã tìm được bạn partner rất phù hợp. Hiện quán đã hoạt động 3 tháng.”',
  },
  {
    id: 'story-2',
    name: 'Chị Hà',
    role: 'Freelancer thiết kế',
    location: 'Hà Nội',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80',
    quote: '“Thuê chung văn phòng giúp mình giảm được 50% chi phí mà vẫn có môi trường làm việc thoải mái.”',
  },
  {
    id: 'story-3',
    name: 'Anh Tuấn',
    role: 'Nhà sáng lập',
    location: 'Đà Nẵng',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80',
    quote: '“Nhờ nền tảng mình tìm được 1 bạn lập trình để cùng làm dự án nhỏ. Giờ đã có sản phẩm đầu tiên và đang có khách hàng.”',
  },
];

interface SuccessStoriesSectionProps {
  onViewAll?: () => void;
}

export const SuccessStoriesSection: React.FC<SuccessStoriesSectionProps> = ({ onViewAll }) => {
  return (
    <section id="success-stories" className="py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex items-end justify-between gap-4 mb-6 sm:mb-8">
          <div className="space-y-1">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FF2D55] block">
              CÂU CHUYỆN THÀNH CÔNG
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Những kết nối tạo ra giá trị thật
            </h2>
          </div>

          <button
            type="button"
            onClick={onViewAll}
            className="text-xs sm:text-sm font-bold text-[#FF2D55] hover:text-[#E01E45] flex items-center gap-1 cursor-pointer transition-colors group shrink-0"
          >
            <span>Xem tất cả</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3 Success Stories Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {SUCCESS_STORIES.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-xs hover:border-rose-200 transition-all flex items-start gap-4 group"
            >
              {/* Circular Avatar */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden shrink-0 border border-slate-100 bg-slate-100">
                <img
                  src={story.avatarUrl}
                  alt={story.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* Quote & Author Info */}
              <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal mb-3">
                  {story.quote}
                </p>

                <div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm leading-tight">
                    {story.name}
                  </h4>
                  <span className="text-[11px] sm:text-xs text-slate-500 font-medium block mt-0.5">
                    {story.role} · {story.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
