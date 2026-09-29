'use client';

import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
}) => {
  const iconDimensions = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14',
  }[size];

  const textStyles = {
    sm: 'text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
    xl: 'text-3xl sm:text-4xl',
  }[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Light, Clean, Professional Logo Icon - No Black Background */}
      <div className={`relative ${iconDimensions} rounded-2xl bg-gradient-to-br from-rose-50 via-white to-pink-50 border border-rose-200/70 shadow-xs flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shrink-0 overflow-hidden`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full p-1.5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="logo-coral-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF2D55" />
              <stop offset="60%" stopColor="#E11D48" />
              <stop offset="100%" stopColor="#BE123C" />
            </linearGradient>
            <linearGradient id="logo-accent-pink" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FDA4AF" />
              <stop offset="100%" stopColor="#FF2D55" />
            </linearGradient>
            <linearGradient id="logo-cyan-node" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
          </defs>

          {/* Delicate network connection lines */}
          <path
            d="M40 24 L70 24"
            stroke="url(#logo-accent-pink)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M62 24 L62 58 C62 72 52 80 38 80 C28 80 22 75 18 69"
            stroke="url(#logo-coral-grad)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M62 46 L80 60"
            stroke="url(#logo-coral-grad)"
            strokeWidth="4.5"
            strokeLinecap="round"
          />

          {/* Network Nodes */}
          {/* Top right node */}
          <circle cx="70" cy="24" r="5" fill="#FF2D55" />
          <circle cx="70" cy="24" r="2.2" fill="#FFFFFF" />

          {/* Top left node */}
          <circle cx="40" cy="24" r="4" fill="#FB7185" />
          <circle cx="40" cy="24" r="1.8" fill="#FFFFFF" />

          {/* Mid junction */}
          <circle cx="62" cy="46" r="3.5" fill="#FF2D55" />

          {/* Branch node */}
          <circle cx="80" cy="60" r="5" fill="url(#logo-cyan-node)" />
          <circle cx="80" cy="60" r="2" fill="#FFFFFF" />

          {/* J terminal node */}
          <circle cx="18" cy="69" r="5" fill="#E11D48" />
          <circle cx="18" cy="69" r="2.2" fill="#FFFFFF" />
        </svg>
      </div>

      {showText && (
        <span className={`${textStyles} font-extrabold tracking-tight text-slate-900 group-hover:text-[#FF2D55] transition-colors leading-none`}>
          J-Network
        </span>
      )}
    </div>
  );
};
