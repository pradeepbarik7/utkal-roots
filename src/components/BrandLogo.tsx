import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  inverted?: boolean;
  variant?: 'light' | 'dark';
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showText = true,
  inverted = false,
  variant,
  className = '',
  onClick
}) => {
  const isDark = inverted || variant === 'light';
  const dimensions = {
    sm: { seal: 38, text: 'text-lg', subtext: 'text-[9px]' },
    md: { seal: 48, text: 'text-xl', subtext: 'text-[10px]' },
    lg: { seal: 64, text: 'text-2xl', subtext: 'text-xs' },
    xl: { seal: 96, text: 'text-4xl', subtext: 'text-sm' }
  }[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none cursor-pointer group ${className}`}
      id="brand-logo-container"
    >
      {/* Circular Emblem Seal */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          width={dimensions.seal}
          height={dimensions.seal}
          viewBox="0 0 160 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 group-hover:rotate-6 drop-shadow-xs"
        >
          {/* Outer circle rings */}
          <circle cx="80" cy="80" r="76" stroke={isDark ? '#D8F3DC' : '#B85D34'} strokeWidth="2.5" />
          <circle cx="80" cy="80" r="70" stroke={isDark ? '#F4ECE1' : '#E6D7BD'} strokeWidth="1.2" strokeDasharray="3 2" />
          <circle cx="80" cy="80" r="64" stroke={isDark ? '#74C69D' : '#2D6A4F'} strokeWidth="1.5" />

          {/* Background fill */}
          <circle cx="80" cy="80" r="63" fill={isDark ? '#1E2721' : '#FBF8F3'} />

          {/* Top curved text path */}
          <path id="top-curve" d="M 32 80 A 48 48 0 0 1 128 80" fill="none" />
          <text fill={isDark ? '#D8F3DC' : '#1B4332'} fontSize="14" fontWeight="bold" letterSpacing="3.5">
            <textPath href="#top-curve" startOffset="50%" textAnchor="middle">
              UTKAL ROOTS
            </textPath>
          </text>

          {/* Sacred Kalash Pot at center-top */}
          <g transform="translate(80, 52) scale(0.65)">
            {/* Coconut & sacred tip */}
            <path d="M 0 -18 L 6 -6 L -6 -6 Z" fill="#B85D34" />
            <circle cx="0" cy="-6" r="6" fill="#8C411E" />
            {/* Kalash body */}
            <path
              d="M -12 2 C -15 12, -10 20, 0 20 C 10 20, 15 12, 12 2 Z"
              fill="#B85D34"
            />
            {/* Kalash neck & rim */}
            <rect x="-9" y="-2" width="18" height="4" rx="1.5" fill="#E6D7BD" />
            {/* Diamond emblem on pot */}
            <polygon points="0,5 5,10 0,15 -5,10" fill="#FBF8F3" />
          </g>

          {/* Three paddy / wheat stalks */}
          <g transform="translate(80, 88)">
            {/* Central stalk */}
            <path d="M 0 20 L 0 -10" stroke="#B85D34" strokeWidth="2" strokeLinecap="round" />
            <path d="M 0 -10 C -4 -16, -4 -22, 0 -26 C 4 -22, 4 -16, 0 -10 Z" fill="#B85D34" />
            <path d="M 0 -3 C -5 -8, -6 -13, 0 -17 C 6 -13, 5 -8, 0 -3 Z" fill="#C97A4A" />
            <path d="M 0 5 C -6 0, -6 -5, 0 -9 C 6 -5, 6 0, 0 5 Z" fill="#D99B6A" />

            {/* Left stalk */}
            <g transform="rotate(-24)">
              <path d="M 0 20 L 0 -8" stroke="#B85D34" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 0 -8 C -4 -13, -3 -18, 0 -22 C 3 -18, 4 -13, 0 -8 Z" fill="#B85D34" />
              <path d="M 0 -2 C -5 -6, -5 -11, 0 -15 C 5 -11, 5 -6, 0 -2 Z" fill="#C97A4A" />
              <path d="M 0 5 C -5 1, -5 -3, 0 -7 C 5 -3, 5 1, 0 5 Z" fill="#D99B6A" />
            </g>

            {/* Right stalk */}
            <g transform="rotate(24)">
              <path d="M 0 20 L 0 -8" stroke="#B85D34" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 0 -8 C -3 -18, -4 -13, 0 -22 C 4 -13, 3 -18, 0 -8 Z" fill="#B85D34" />
              <path d="M 0 -2 C -5 -11, -5 -6, 0 -15 C 5 -6, 5 -11, 0 -2 Z" fill="#C97A4A" />
              <path d="M 0 5 C -5 -3, -5 1, 0 -7 C 5 1, 5 -3, 0 5 Z" fill="#D99B6A" />
            </g>

            {/* Ground / root arches */}
            <path d="M -22 22 C -10 14, 10 14, 22 22" stroke="#2D6A4F" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M -16 26 C -6 20, 6 20, 16 26" stroke="#B85D34" strokeWidth="1.6" strokeLinecap="round" />
          </g>

          {/* Bottom curved text path */}
          <path id="bottom-curve" d="M 28 80 A 52 52 0 0 0 132 80" fill="none" />
          <text fill={isDark ? '#A7D7C5' : '#8C411E'} fontSize="9.5" fontWeight="600" letterSpacing="2.2">
            <textPath href="#bottom-curve" startOffset="50%" textAnchor="middle">
              ODISHA • SINCE 1998
            </textPath>
          </text>
        </svg>
      </div>

      {/* Brand Name Typography */}
      {showText && (
        <div className="flex flex-col text-left">
          <span
            className={`font-serif tracking-tight font-bold leading-none ${dimensions.text} ${
              isDark ? 'text-[#FBF8F3]' : 'text-[#1B4332]'
            }`}
          >
            Utkal Roots
          </span>
          <span
            className={`font-sans tracking-widest uppercase font-medium mt-1 ${dimensions.subtext} ${
              isDark ? 'text-[#74C69D]' : 'text-[#8C411E]'
            }`}
          >
            Organic Odisha Harvest
          </span>
        </div>
      )}
    </div>
  );
};
