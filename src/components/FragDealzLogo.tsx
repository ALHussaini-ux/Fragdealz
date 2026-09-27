import React from 'react';

interface FragDealzLogoProps {
  className?: string;
  symbolOnly?: boolean;
  showSubtitle?: boolean;
  onDarkPlate?: boolean;
}

export const FragDealzLogo: React.FC<FragDealzLogoProps> = ({ 
  className = 'h-8 sm:h-9 w-auto',
  symbolOnly = false,
  showSubtitle = false,
  onDarkPlate = false,
}) => {
  const logoContent = (
    <div className="flex items-center gap-2.5 select-none shrink-0">
      {/* Bespoke Interlocking "F" & "D" Lettermark with Perfume Stopper Detail */}
      <svg
        viewBox="0 0 48 48"
        className="h-8 sm:h-9 w-auto shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          {/* Exact FragDealz Warm Metallic Gold Gradient */}
          <linearGradient id="fdGoldMark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EAD1A6" />
            <stop offset="35%" stopColor="#D4A86A" />
            <stop offset="70%" stopColor="#BF8F4A" />
            <stop offset="100%" stopColor="#9E7334" />
          </linearGradient>
        </defs>

        {/* Perfume Flacon Stopper Crown */}
        <rect x="20" y="3" width="8" height="3" rx="0.5" fill="url(#fdGoldMark)" />
        <path d="M22 6 L26 6 L25 8 L23 8 Z" fill="url(#fdGoldMark)" />
        <rect x="23" y="8" width="2" height="2" fill="url(#fdGoldMark)" />

        {/* Interlocking F & D Monogram */}
        {/* 'F' vertical stem & horizontal arms */}
        <rect x="11" y="10" width="3.5" height="32" rx="0.5" fill="url(#fdGoldMark)" />
        <path d="M11 11.5 H28 C28.5 11.5 28.5 14.5 28 14.5 H14.5 V22.5 H25 C25.5 22.5 25.5 25.5 25 25.5 H14.5 V42 H11 V11.5 Z" fill="url(#fdGoldMark)" />

        {/* Interlocking 'D' looping through the F */}
        <path
          d="M21 16 H29.5 C36.5 16 41 20.5 41 27.5 C41 34.5 36.5 39 29.5 39 H21 V35.5 H29.5 C34.5 35.5 37.5 32 37.5 27.5 C37.5 23 34.5 19.5 29.5 19.5 H21 V16 Z"
          fill="url(#fdGoldMark)"
        />
        {/* Subtle inner stopper neck line */}
        <circle cx="24" cy="4.5" r="0.75" fill="#0B0B0B" />
      </svg>

      {/* Matching "FragDealz" Wordmark in Playfair Display */}
      {!symbolOnly && (
        <div className="flex flex-col">
          <span 
            className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#BF8F4A] leading-none"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Frag<span className="text-[#EAD1A6] font-semibold">Dealz</span>
          </span>
          {showSubtitle && (
            <span 
              className="text-[9px] font-sans font-medium uppercase tracking-[0.2em] text-[#8B877F] mt-1 leading-none"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Curated Fragrance Purveyor
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (onDarkPlate) {
    return (
      <div className="bg-[#0B0B0B] border border-[#1A1A1A] px-3 py-1.5 rounded-[2px] inline-flex items-center shadow-xs">
        {logoContent}
      </div>
    );
  }

  return logoContent;
};
