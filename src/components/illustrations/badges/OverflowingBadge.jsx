/** BADGE 9: Overflowing — Vase with flowers spilling over. Abundance: daisy, pompom, bell flowers, trailing vine. */
export default function OverflowingBadge({ stroke = '#5B1A2E', leafStroke = '#6B7F5E', strokeWidth = 1.5 }) {
  return (
    <svg width="70" height="100" viewBox="0 0 70 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Vase */}
      <path d="M22 98 Q20 85 22 75 Q24 68 28 65 Q35 62 42 65 Q46 68 48 75 Q50 85 48 98 Z" stroke={stroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25 95 Q23 78 26 70 Q35 65 44 70 Q47 78 45 95" stroke={stroke} strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.6" />
      {/* Daisy leaning left */}
      <path d="M28 65 Q18 55 15 50 Q14 48 16 46 Q18 48 20 50 Q22 52 28 58" stroke={leafStroke} strokeWidth="0.8" fill="none" strokeLinecap="round" />
      <circle cx="15" cy="45" r="4" stroke={stroke} strokeWidth={strokeWidth} fill="none" />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const a = (i / 6) * Math.PI * 2 + 0.3
        const x1 = 15 + Math.cos(a) * 4
        const y1 = 45 + Math.sin(a) * 4
        const x2 = 15 + Math.cos(a) * 10
        const y2 = 45 + Math.sin(a) * 10
        const x3 = 15 + Math.cos(a + 0.15) * 4
        const y3 = 45 + Math.sin(a + 0.15) * 4
        return <path key={i} d={`M${x1} ${y1} Q${15 + Math.cos(a) * 7} ${45 + Math.sin(a) * 7} ${x2} ${y2} Q${15 + Math.cos(a + 0.15) * 7} ${45 + Math.sin(a + 0.15) * 7} ${x3} ${y3}`} stroke={stroke} strokeWidth="0.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      })}
      {/* Pompom/dahlia - upright */}
      <path d="M35 65 L35 38" stroke={leafStroke} strokeWidth="0.8" fill="none" strokeLinecap="round" />
      <circle cx="35" cy="35" r="6" stroke={stroke} strokeWidth={strokeWidth} fill="none" />
      {[...Array(12)].map((_, i) => {
        const a = (i / 12) * Math.PI * 2
        const x1 = 35 + Math.cos(a) * 6
        const y1 = 35 + Math.sin(a) * 6
        const x2 = 35 + Math.cos(a) * 10
        const y2 = 35 + Math.sin(a) * 10
        return <path key={i} d={`M${x1} ${y1} Q${35 + Math.cos(a) * 8} ${35 + Math.sin(a) * 8} ${x2} ${y2}`} stroke={stroke} strokeWidth="0.8" fill="none" strokeLinecap="round" />
      })}
      {/* Bell flowers drooping right */}
      <path d="M42 65 Q50 58 52 48 Q53 45 51 43" stroke={leafStroke} strokeWidth="0.8" fill="none" strokeLinecap="round" />
      <path d="M51 42 Q47 45 47 50 Q48 54 51 56 Q54 54 55 50 Q55 45 51 42" stroke={stroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M48 65 Q54 60 56 52 Q57 50 55 48" stroke={leafStroke} strokeWidth="0.8" fill="none" strokeLinecap="round" />
      <path d="M55 47 Q51 50 51 54 Q52 57 55 59 Q58 57 59 54 Q59 50 55 47" stroke={stroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Trailing vine with leaves */}
      <path d="M30 70 Q28 78 30 88 Q32 95 30 98" stroke={leafStroke} strokeWidth="0.8" fill="none" strokeLinecap="round" />
      <path d="M30 78 Q26 80 24 78" stroke={leafStroke} strokeWidth="0.6" fill="none" strokeLinecap="round" />
      <path d="M30 88 Q26 90 24 88" stroke={leafStroke} strokeWidth="0.6" fill="none" strokeLinecap="round" />
      {/* Loose leaves */}
      <path d="M35 60 Q32 58 30 60" stroke={leafStroke} strokeWidth="0.8" fill="none" strokeLinecap="round" />
      <path d="M38 62 Q42 60 44 62" stroke={leafStroke} strokeWidth="0.8" fill="none" strokeLinecap="round" />
    </svg>
  )
}
