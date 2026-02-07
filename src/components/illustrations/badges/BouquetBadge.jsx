/** BADGE 5: Bouquet — Cosmos + Tulip + Lavender tied together with ribbon. */
export default function BouquetBadge({ stroke = '#5B1A2E', leafStroke = '#6B7F5E', strokeWidth = 1.5 }) {
  return (
    <svg width="70" height="100" viewBox="0 0 70 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cosmos - center, tallest, 8 rounded petals with notched tips */}
      <circle cx="35" cy="22" r="2" stroke={stroke} strokeWidth="0.8" fill="none" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const a = (i / 8) * Math.PI * 2
        const x1 = 35 + Math.cos(a) * 2
        const y1 = 22 + Math.sin(a) * 2
        const x2 = 35 + Math.cos(a) * 14
        const y2 = 22 + Math.sin(a) * 14
        const notch = 2
        const x3 = 35 + Math.cos(a) * (14 + notch) + Math.cos(a + 0.3) * 2
        const y3 = 22 + Math.sin(a) * (14 + notch) + Math.sin(a + 0.3) * 2
        const x4 = 35 + Math.cos(a + 0.15) * 2
        const y4 = 22 + Math.sin(a + 0.15) * 2
        return (
          <path key={i} d={`M${x1} ${y1} Q${35 + Math.cos(a) * 10} ${22 + Math.sin(a) * 10} ${x2} ${y2} Q${x3} ${y3} ${x4} ${y4}`} stroke={stroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        )
      })}
      {/* Tulip - left, cup shape */}
      <path d="M22 38 Q18 42 18 48 Q19 52 22 54 Q25 52 26 48 Q26 42 22 38" stroke={stroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 38 Q20 40 18 45 Q18 50 22 52 Q26 50 26 45 Q26 40 24 38 Q23 36 22 38" stroke={stroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 38 Q24 40 26 45 Q26 50 22 52 Q18 50 18 45 Q18 40 20 38 Q21 36 22 38" stroke={stroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Lavender - right, spike of tiny paired buds */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <g key={i}>
          <ellipse cx="50" cy={42 + i * 4} rx="2" ry="1.5" stroke={stroke} strokeWidth="0.8" fill="none" />
          <ellipse cx="52" cy={42 + i * 4} rx="2" ry="1.5" stroke={stroke} strokeWidth="0.8" fill="none" />
        </g>
      ))}
      {/* Stems */}
      <path d="M35 38 L35 75" stroke={leafStroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" />
      <path d="M22 54 L24 75" stroke={leafStroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" />
      <path d="M50 78 L46 75" stroke={leafStroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" />
      {/* Ribbon/bow */}
      <path d="M28 75 Q32 72 36 75 Q40 72 44 75 Q42 78 36 80 Q30 78 28 75" stroke={stroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 76 Q36 74 42 76" stroke={stroke} strokeWidth="0.8" fill="none" strokeLinecap="round" />
      {/* Leaves */}
      <path d="M35 55 Q30 52 28 50" stroke={leafStroke} strokeWidth="0.8" fill="none" strokeLinecap="round" />
      <path d="M35 60 Q40 58 42 56" stroke={leafStroke} strokeWidth="0.8" fill="none" strokeLinecap="round" />
      <path d="M24 65 Q20 62 18 60" stroke={leafStroke} strokeWidth="0.8" fill="none" strokeLinecap="round" />
    </svg>
  )
}
