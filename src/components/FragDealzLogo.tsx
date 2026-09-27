import React from 'react';

interface FragDealzLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'gold';
  showSubtitle?: boolean;
}

export const FragDealzLogo: React.FC<FragDealzLogoProps> = ({ 
  className = 'h-8 sm:h-9 w-auto',
  variant = 'gold',
  showSubtitle = false
}) => {
  return (
    <div className="flex flex-col items-start select-none">
      <svg
        viewBox="0 0 620 160"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="FragDealz"
        role="img"
      >
        <defs>
          {/* Primary Champagne to Warm Amber Gold Gradient */}
          <linearGradient id="fdGoldMain" x1="0%" y1="20%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#FFF2D6" />
            <stop offset="15%" stopColor="#F7DF9E" />
            <stop offset="35%" stopColor="#E2B75E" />
            <stop offset="50%" stopColor="#FDE19E" />
            <stop offset="68%" stopColor="#C9861E" />
            <stop offset="85%" stopColor="#F9DB8C" />
            <stop offset="100%" stopColor="#A86E14" />
          </linearGradient>

          {/* Deep Amber Accent Gradient for the Capital 'D' */}
          <linearGradient id="fdGoldD" x1="10%" y1="10%" x2="90%" y2="90%">
            <stop offset="0%" stopColor="#F7DB9A" />
            <stop offset="25%" stopColor="#E0A638" />
            <stop offset="50%" stopColor="#BC7512" />
            <stop offset="75%" stopColor="#FCE3A1" />
            <stop offset="100%" stopColor="#965809" />
          </linearGradient>

          {/* Subtle 3D Bevel Shadow filter */}
          <filter id="fdMetallicDepth" x="-10%" y="-10%" width="125%" height="130%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#422904" floodOpacity="0.3" />
          </filter>
        </defs>

        <g filter="url(#fdMetallicDepth)">
          {/* Frag */}
          <text
            x="8"
            y="124"
            fontFamily="'Bodoni Moda', 'Cormorant Garamond', 'Didot', 'Playfair Display', serif"
            fontSize="140"
            fontWeight="700"
            letterSpacing="-2px"
            fill="url(#fdGoldMain)"
          >
            Frag
          </text>

          {/* Capital D with deep golden gradient */}
          <text
            x="292"
            y="124"
            fontFamily="'Bodoni Moda', 'Cormorant Garamond', 'Didot', 'Playfair Display', serif"
            fontSize="145"
            fontWeight="700"
            letterSpacing="-4px"
            fill="url(#fdGoldD)"
          >
            D
          </text>

          {/* ealz with bright reflective gold */}
          <text
            x="414"
            y="124"
            fontFamily="'Bodoni Moda', 'Cormorant Garamond', 'Didot', 'Playfair Display', serif"
            fontSize="140"
            fontWeight="700"
            letterSpacing="-3px"
            fill="url(#fdGoldMain)"
          >
            ealz
          </text>
        </g>
      </svg>

      {showSubtitle && (
        <span className="text-[9px] tracking-[0.22em] text-[#777777] uppercase font-light pl-1 -mt-0.5">
          Fine Fragrance Purveyor
        </span>
      )}
    </div>
  );
};
