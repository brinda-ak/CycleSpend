/** Small jar icon for Cycle Cushion stat — fill aligned to jar border */
export default function JarIcon({ fillPct = 0, className = 'w-10 h-12' }) {
  const fillHeight = (fillPct / 100) * 30
  const fillY = 39 - fillHeight
  return (
    <svg viewBox="0 0 40 48" className={className}>
      <defs>
        <clipPath id="jarIconClip">
          <path d="M9 9 L11.5 5 L28.5 5 L31 9 L31 39 Q20 42.5 9 39 Z" />
        </clipPath>
      </defs>
      <path d="M8 8 L12 4 L28 4 L32 8 L32 40 Q20 44 8 40 Z" fill="none" stroke="#7A4B5E" strokeWidth="1.5" />
      <g clipPath="url(#jarIconClip)">
        <rect
          x="9"
          y={fillY}
          width="22"
          height={fillHeight}
          rx="2"
          fill="#7A4B5E"
        />
      </g>
    </svg>
  )
}
