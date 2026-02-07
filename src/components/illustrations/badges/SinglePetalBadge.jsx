/** BADGE 7: First Petal — Single fallen petal. Minimal: teardrop shape, center vein, pollen dots. */
export default function SinglePetalBadge({ stroke = '#5B1A2E', leafStroke = '#6B7F5E', strokeWidth = 1.5 }) {
  return (
    <svg width="70" height="100" viewBox="0 0 70 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Single petal - two curves forming teardrop, lying at angle */}
      <path d="M15 55 Q8 48 12 42 Q18 38 25 42 Q32 48 28 55 Q22 60 15 55" stroke={stroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Center vein */}
      <path d="M12 42 Q18 48 25 52 Q22 55 18 52" stroke={stroke} strokeWidth="0.8" fill="none" strokeLinecap="round" />
      {/* Pollen dots */}
      <circle cx="18" cy="48" r="0.8" stroke={stroke} strokeWidth="0.5" fill="none" />
      <circle cx="20" cy="46" r="0.6" stroke={stroke} strokeWidth="0.5" fill="none" />
      <circle cx="16" cy="50" r="0.6" stroke={stroke} strokeWidth="0.5" fill="none" />
    </svg>
  )
}
