'use client';

import React, { useEffect, useState } from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'register';
  onClose: () => void;
  onSuccess: (userName: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, initialMode, onClose, onSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [name, setName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // `initialMode` previously only seeded state on first mount, so reopening
  // the modal with a different mode (e.g. clicking "Đăng nhập" after it had
  // been opened in "register" mode) kept showing the stale tab. Re-sync
  // whenever the modal is opened.
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onSuccess(name || 'Bạn thành viên');
      onClose();
    }, 1500);
  };

  const handleQuickDemo = (demoName: string) => {
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onSuccess(demoName);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 p-6 sm:p-8 space-y-6 my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 36 36" fill="none">
              <circle cx="11" cy="13" r="7" fill="#FF2D55" />
              <circle cx="25" cy="13" r="7" fill="#FF4D6D" />
              <circle cx="18" cy="24" r="7.5" fill="#E11D48" />
              <circle cx="18" cy="17" r="3.5" fill="white" />
            </svg>
            <span className="text-lg font-black text-slate-900">
              {mode === 'login' ? 'Đăng nhập vào Cùng Làm' : 'Tham gia cộng đồng Cùng Làm'}
            </span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-bold">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-2 rounded-lg transition-colors cursor-pointer ${
              mode === 'login' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Đăng nhập
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`flex-1 py-2 rounded-lg transition-colors cursor-pointer ${
              mode === 'register' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Tham gia mới
          </button>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-2">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-slate-900 text-base">
              {mode === 'login' ? 'Đăng nhập thành công!' : 'Chào mừng bạn đến với cộng đồng!'}
            </h4>
            <p className="text-xs text-slate-500">Đang chuyển bạn về không gian kết nối...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Họ và tên bạn *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ví dụ: Hoàng Minh"
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-[#FF2D55]"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Số điện thoại hoặc Email *</label>
              <input
                type="text"
                required
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="09xx.xxx.xxx hoặc email@example.com"
                className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-[#FF2D55]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Mật khẩu *</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-[#FF2D55]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#FF2D55] hover:bg-[#E01E45] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2 active:scale-98"
            >
              <span>{mode === 'login' ? 'Đăng nhập ngay' : 'Tham gia cộng đồng ngay'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Quick Demo Login shortcuts */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <span className="text-[11px] text-slate-400 block text-center">
                Trải nghiệm nhanh với tư cách thành viên:
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemo('Minh (Người khởi tạo)')}
                  className="flex-1 py-1.5 px-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-medium border border-slate-200 cursor-pointer"
                >
                  Minh (Khởi tạo dự án)
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('Hà (Thành viên chia sẻ)')}
                  className="flex-1 py-1.5 px-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-medium border border-slate-200 cursor-pointer"
                >
                  Hà (Không gian chia sẻ)
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
