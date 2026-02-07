/** BADGE 12: Luteal Legend — CONEFLOWER. Dome center with crosshatch, 10-12 petals drooping DOWN, furry stem, lance leaves. */
export default function ConeflowerBadge({ stroke = '#5B1A2E', leafStroke = '#6B7F5E', strokeWidth = 1.5 }) {
  return (
    <svg width="70" height="100" viewBox="0 0 70 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Central cone - dome with crosshatch */}
      <path d="M35 25 Q25 25 22 32 Q20 38 25 42 Q35 45 45 42 Q50 38 48 32 Q45 25 35 25" stroke={stroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25 35 Q30 32 35 33 Q40 32 45 35" stroke={stroke} strokeWidth="0.6" fill="none" strokeLinecap="round" />
      <path d="M28 38 Q32 36 35 37 Q38 36 42 38" stroke={stroke} strokeWidth="0.6" fill="none" strokeLinecap="round" />
      <path d="M30 40 Q35 38 40 40" stroke={stroke} strokeWidth="0.6" fill="none" strokeLinecap="round" />
      <path d="M28 32 L42 40" stroke={stroke} strokeWidth="0.4" strokeLinecap="round" />
      <path d="M30 36 L40 34" stroke={stroke} strokeWidth="0.4" strokeLinecap="round" />
      <path d="M32 40 L38 32" stroke={stroke} strokeWidth="0.4" strokeLinecap="round" />
      {/* Petals drooping DOWN from cone base */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
        const a = (i / 12) * Math.PI * 2
        const x1 = 35 + Math.cos(a) * 14
        const y1 = 40 + Math.sin(a) * 8
        const x2 = 35 + Math.cos(a) * 20 + Math.cos(a + 0.5) * 8
        const y2 = 52 + Math.sin(a) * 5 + 15
        const x3 = 35 + Math.cos(a + 0.12) * 14
        const y3 = 40 + Math.sin(a + 0.12) * 8
        return (
          <path key={i} d={`M${x1} ${y1} Q${35 + Math.cos(a) * 18} ${48 + Math.sin(a) * 6} ${x2} ${y2} Q${35 + Math.cos(a + 0.12) * 18} ${50 + Math.sin(a + 0.12) * 6} ${x3} ${y3}`} stroke={stroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        )
      })}
      {/* Stem - with tiny hairs */}
      <path d="M35 48 L35 98" stroke={leafStroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M35 55 L33 56" stroke={leafStroke} strokeWidth="0.4" strokeLinecap="round" />
      <path d="M35 65 L37 66" stroke={leafStroke} strokeWidth="0.4" strokeLinecap="round" />
      <path d="M35 75 L33 76" stroke={leafStroke} strokeWidth="0.4" strokeLinecap="round" />
      <path d="M35 85 L37 86" stroke={leafStroke} strokeWidth="0.4" strokeLinecap="round" />
      <path d="M35 92 L33 93" stroke={leafStroke} strokeWidth="0.4" strokeLinecap="round" />
      {/* Lance-shaped leaves */}
      <path d="M35 65 Q28 60 22 58 Q20 56 22 54 Q26 56 32 60 Q35 63 35 65" stroke={leafStroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 62 Q28 60 26 58" stroke={leafStroke} strokeWidth="0.6" fill="none" strokeLinecap="round" />
      <path d="M35 80 Q42 76 48 74 Q50 72 48 70 Q44 72 38 76 Q35 79 35 80" stroke={leafStroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M38 77 Q42 75 44 73" stroke={leafStroke} strokeWidth="0.6" fill="none" strokeLinecap="round" />
    </svg>
  )
}
