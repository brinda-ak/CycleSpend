/** BADGE 2: Rooted — SUNFLOWER. Large center with spiral, 16-18 pointed petals in two rings, thick stem, heart-shaped serrated leaves. */
export default function SunflowerBadge({ stroke = '#5B1A2E', leafStroke = '#6B7F5E', strokeWidth = 1.5 }) {
  return (
    <svg width="70" height="100" viewBox="0 0 70 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Center disc with spiral */}
      <circle cx="35" cy="22" r="12" stroke={stroke} strokeWidth={strokeWidth} fill="none" />
      <path d="M35 22 Q36 16 40 14 Q44 16 42 22 Q40 28 35 26 Q30 28 32 22 Q31 16 35 14 Q39 16 38 22 Q37 26 35 28 Q33 26 34 22 Q35 18 38 20 Q41 22 35 22" stroke={stroke} strokeWidth="0.8" fill="none" strokeLinecap="round" />
      {/* Outer ring petals - pointed, drooping */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((i) => {
        const a = (i / 17) * Math.PI * 2 - Math.PI / 2
        const x1 = 35 + Math.cos(a) * 12
        const y1 = 22 + Math.sin(a) * 12
        const x2 = 35 + Math.cos(a) * 32
        const y2 = 22 + Math.sin(a) * 28 + 4
        const x3 = 35 + Math.cos(a + 0.15) * 12
        const y3 = 22 + Math.sin(a + 0.15) * 12
        return (
          <path key={i} d={`M${x1} ${y1} Q${35 + Math.cos(a) * 24} ${22 + Math.sin(a) * 22} ${x2} ${y2} Q${35 + Math.cos(a + 0.15) * 24} ${22 + Math.sin(a + 0.15) * 22} ${x3} ${y3}`} stroke={stroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        )
      })}
      {/* Inner ring - shorter petals in gaps */}
      {[0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5, 10.5, 11.5, 12.5, 13.5, 14.5, 15.5].map((i) => {
        const a = (i / 17) * Math.PI * 2 - Math.PI / 2
        const x1 = 35 + Math.cos(a) * 12
        const y1 = 22 + Math.sin(a) * 12
        const x2 = 35 + Math.cos(a) * 26
        const y2 = 22 + Math.sin(a) * 22 + 2
        const x3 = 35 + Math.cos(a + 0.12) * 12
        const y3 = 22 + Math.sin(a + 0.12) * 12
        return (
          <path key={i} d={`M${x1} ${y1} Q${35 + Math.cos(a) * 20} ${22 + Math.sin(a) * 18} ${x2} ${y2} Q${35 + Math.cos(a + 0.12) * 20} ${22 + Math.sin(a + 0.12) * 18} ${x3} ${y3}`} stroke={stroke} strokeWidth={strokeWidth - 0.2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        )
      })}
      {/* Stem - thick */}
      <path d="M35 34 L34 50 Q35 70 36 95" stroke={leafStroke} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Heart-shaped leaves with serrations */}
      <path d="M34 55 Q20 48 18 42 Q17 38 20 36 Q24 40 28 44 Q34 50 34 55 Q34 60 30 64 Q26 62 22 58 Q18 54 18 50 Q20 46 24 48 Q30 52 34 55" stroke={leafStroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 40 Q22 38 24 40" stroke={leafStroke} strokeWidth="0.6" fill="none" />
      <path d="M22 44 Q24 42 26 44" stroke={leafStroke} strokeWidth="0.6" fill="none" />
      <path d="M34 55 Q48 48 52 42 Q53 38 50 36 Q46 40 42 44 Q36 50 36 55 Q36 60 40 64 Q44 62 48 58 Q52 54 52 50 Q50 46 46 48 Q40 52 36 55" stroke={leafStroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M50 40 Q48 38 46 40" stroke={leafStroke} strokeWidth="0.6" fill="none" />
      <path d="M48 44 Q46 42 44 44" stroke={leafStroke} strokeWidth="0.6" fill="none" />
      <path d="M34 55 Q30 52 26 50" stroke={leafStroke} strokeWidth="0.6" fill="none" />
      <path d="M36 55 Q40 52 44 50" stroke={leafStroke} strokeWidth="0.6" fill="none" />
    </svg>
  )
}
