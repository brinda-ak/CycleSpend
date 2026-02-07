/** Small jar icon for Cycle Cushion stat */
export default function JarIcon({ fillPct = 0, className = 'w-10 h-12' }) {
  return (
    <svg viewBox="0 0 40 48" className={className}>
      <path d="M8 8 L12 4 L28 4 L32 8 L32 40 Q20 44 8 40 Z" fill="none" stroke="#7A4B5E" strokeWidth="1.5" />
      <rect x="10" y={44 - (fillPct / 100) * 32} width="20" height={(fillPct / 100) * 32} rx="2" fill="#8B2942" opacity="0.8" />
    </svg>
  )
}
