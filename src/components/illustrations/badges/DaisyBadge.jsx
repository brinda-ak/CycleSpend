/** BADGE 1: First Bloom — DAISY (Gerbera style). 3/4 view, crosshatch center, 10-12 overlapping petals. */
export default function DaisyBadge({ stroke = '#5B1A2E', leafStroke = '#6B7F5E', strokeWidth = 1.5 }) {
  return (
    <svg width="70" height="100" viewBox="0 0 70 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Center disc with crosshatch */}
      <circle cx="35" cy="25" r="8" stroke={stroke} strokeWidth={strokeWidth} fill="none" />
      <line x1="30" y1="22" x2="40" y2="28" stroke={stroke} strokeWidth="0.8" />
      <line x1="32" y1="28" x2="38" y2="22" stroke={stroke} strokeWidth="0.8" />
      <line x1="35" y1="18" x2="35" y2="32" stroke={stroke} strokeWidth="0.8" />
      <line x1="28" y1="25" x2="42" y2="25" stroke={stroke} strokeWidth="0.8" />
      <line x1="29" y1="20" x2="41" y2="30" stroke={stroke} strokeWidth="0.8" />
      <line x1="29" y1="30" x2="41" y2="20" stroke={stroke} strokeWidth="0.8" />
      {/* Petals - each teardrop: two curves from center edge to tip and back */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
        const a = (i / 11) * Math.PI * 2 - 0.2
        const len = 18 + (i % 2) * 2
        const x0 = 35 + Math.cos(a) * 8
        const y0 = 25 + Math.sin(a) * 8
        const xt = 35 + Math.cos(a) * len
        const yt = 25 + Math.sin(a) * len
        const x1 = 35 + Math.cos(a - 0.12) * 8
        const y1 = 25 + Math.sin(a - 0.12) * 8
        return (
          <path key={i} d={`M${x0} ${y0} Q${35 + Math.cos(a) * 14} ${25 + Math.sin(a) * 14} ${xt} ${yt} Q${35 + Math.cos(a + 0.12) * 14} ${25 + Math.sin(a + 0.12) * 14} ${x1} ${y1}`} stroke={stroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        )
      })}
      {/* Stem - S-curve */}
      <path d="M35 33 Q34 50 36 65 Q35 80 35 95" stroke={leafStroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Leaves */}
      <path d="M35 65 Q23 58 18 52 Q17 50 20 48 Q25 52 35 58 Q45 52 50 48 Q53 50 52 52 Q47 58 35 65" stroke={leafStroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M35 65 Q28 62 22 58" stroke={leafStroke} strokeWidth="0.8" fill="none" strokeLinecap="round" />
      <path d="M35 75 Q42 70 48 66 Q50 64 48 62 Q44 66 35 72 Q26 66 22 62 Q20 64 22 66 Q28 70 35 75" stroke={leafStroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M35 75 Q32 72 28 70" stroke={leafStroke} strokeWidth="0.8" fill="none" strokeLinecap="round" />
    </svg>
  )
}
