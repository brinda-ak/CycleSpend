/** BADGE 6: Meadow — Row of wildflowers: grass, daisy, poppy, bell flower, coneflower. */
export default function MeadowBadge({ stroke = '#5B1A2E', leafStroke = '#6B7F5E', strokeWidth = 1.5 }) {
  return (
    <svg width="70" height="100" viewBox="0 0 70 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Ground line */}
      <path d="M5 95 Q15 93 25 95 Q35 97 45 95 Q55 93 65 95" stroke={leafStroke} strokeWidth="1" fill="none" strokeLinecap="round" />
      {/* Grass tufts left */}
      <path d="M8 95 Q7 85 8 80" stroke={leafStroke} strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M10 95 Q9 82 10 78" stroke={leafStroke} strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M12 95 Q11 85 12 80" stroke={leafStroke} strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.7" />
      {/* Daisy - tall thin stem */}
      <path d="M18 95 L18 60" stroke={leafStroke} strokeWidth="0.8" fill="none" strokeLinecap="round" />
      <circle cx="18" cy="55" r="3" stroke={stroke} strokeWidth="0.8" fill="none" />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const a = (i / 6) * Math.PI * 2
        const x1 = 18 + Math.cos(a) * 3
        const y1 = 55 + Math.sin(a) * 3
        const x2 = 18 + Math.cos(a) * 8
        const y2 = 55 + Math.sin(a) * 8
        const x3 = 18 + Math.cos(a + 0.2) * 3
        const y3 = 55 + Math.sin(a + 0.2) * 3
        return <path key={i} d={`M${x1} ${y1} Q${18 + Math.cos(a) * 6} ${55 + Math.sin(a) * 6} ${x2} ${y2} Q${18 + Math.cos(a + 0.2) * 6} ${55 + Math.sin(a + 0.2) * 6} ${x3} ${y3}`} stroke={stroke} strokeWidth="0.8" fill="none" strokeLinecap="round" />
      })}
      {/* Poppy - 4 cup petals */}
      <path d="M32 95 L32 70" stroke={leafStroke} strokeWidth="0.8" fill="none" strokeLinecap="round" />
      <path d="M32 68 Q28 64 26 68 Q27 72 32 72 Q37 72 38 68 Q36 64 32 68" stroke={stroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 68 Q36 64 38 68 Q37 72 32 72 Q27 72 26 68 Q28 64 32 68" stroke={stroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 68 Q30 62 28 66 Q29 70 32 70 Q35 70 36 66 Q34 62 32 68" stroke={stroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 68 Q34 62 36 66 Q35 70 32 70 Q29 70 28 66 Q30 62 32 68" stroke={stroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Bell flower - drooping */}
      <path d="M45 95 Q48 75 46 58" stroke={leafStroke} strokeWidth="0.8" fill="none" strokeLinecap="round" />
      <path d="M46 55 Q42 58 42 65 Q43 70 46 72 Q49 70 50 65 Q50 58 46 55" stroke={stroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Coneflower/thistle - spiky head */}
      <path d="M58 95 L58 50" stroke={leafStroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" />
      <circle cx="58" cy="45" r="6" stroke={stroke} strokeWidth={strokeWidth} fill="none" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
        const a = (i / 10) * Math.PI * 2
        const x1 = 58 + Math.cos(a) * 6
        const y1 = 45 + Math.sin(a) * 6
        const x2 = 58 + Math.cos(a) * 12
        const y2 = 45 + Math.sin(a) * 12
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth="0.8" strokeLinecap="round" />
      })}
      {/* Grass blades */}
      <path d="M25 95 Q24 88 25 85" stroke={leafStroke} strokeWidth="0.6" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M40 95 Q41 88 40 85" stroke={leafStroke} strokeWidth="0.6" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M52 95 Q51 90 52 88" stroke={leafStroke} strokeWidth="0.6" fill="none" strokeLinecap="round" opacity="0.6" />
    </svg>
  )
}
