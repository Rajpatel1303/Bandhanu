import React from 'react';

interface BandhaniMotifDividerProps {
  className?: string;
  lineWidth?: string;
}

/**
 * Authentic Bandhani 'Chaukadi' (5-dot diamond cluster) section divider
 * Commonly found on selvages and borders of Kutch Bandhej textiles.
 */
export const BandhaniMotifDivider: React.FC<BandhaniMotifDividerProps> = ({
  className = '',
  lineWidth = 'max-w-xs'
}) => {
  return (
    <div className={`hidden sm:flex items-center gap-3 flex-grow ${lineWidth} ${className}`}>
      {/* Leading subtle thread line */}
      <div className="h-[1px] bg-gradient-to-r from-transparent to-[#D8C7B5] flex-grow" />

      {/* Traditional Bandhani 5-Dot Diamond Cluster ('Chaukadi') */}
      <div className="relative flex items-center justify-center w-7 h-7 text-[#4A121A] group cursor-default">
        {/* Outer subtle breathing glow */}
        <div className="absolute inset-0 rounded-full bg-[#4A121A]/5 scale-75 group-hover:scale-125 transition-transform duration-700 ease-out" />

        <svg viewBox="0 0 28 28" className="w-5 h-5 fill-current">
          {/* Top Dot */}
          <circle cx="14" cy="4.5" r="1.8" className="text-[#C29D59] group-hover:scale-110 transition-transform duration-300" />
          <circle cx="14" cy="4.5" r="0.7" fill="#FBF8F3" />

          {/* Bottom Dot */}
          <circle cx="14" cy="23.5" r="1.8" className="text-[#C29D59] group-hover:scale-110 transition-transform duration-300" />
          <circle cx="14" cy="23.5" r="0.7" fill="#FBF8F3" />

          {/* Left Dot */}
          <circle cx="4.5" cy="14" r="1.8" className="text-[#C29D59] group-hover:scale-110 transition-transform duration-300" />
          <circle cx="4.5" cy="14" r="0.7" fill="#FBF8F3" />

          {/* Right Dot */}
          <circle cx="23.5" cy="14" r="1.8" className="text-[#C29D59] group-hover:scale-110 transition-transform duration-300" />
          <circle cx="23.5" cy="14" r="0.7" fill="#FBF8F3" />

          {/* Center Main Resisted Knot Dot */}
          <circle cx="14" cy="14" r="3" className="text-[#4A121A]" />
          <circle cx="14" cy="14" r="1.2" fill="#FBF8F3" />
        </svg>
      </div>

      {/* Trailing subtle thread line */}
      <div className="h-[1px] bg-gradient-to-r from-[#D8C7B5] to-transparent flex-grow" />
    </div>
  );
};
