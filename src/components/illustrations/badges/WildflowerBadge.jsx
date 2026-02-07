/** BADGE 13: Wildflower — Full lush garden. 90x110px. Peony, rose, daisy, cosmos, lavender, forget-me-nots, leaves, vine. */
export default function WildflowerBadge({ stroke = '#5B1A2E', leafStroke = '#6B7F5E', strokeWidth = 1.5 }) {
  return (
    <svg width="90" height="110" viewBox="0 0 90 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Peony - center-back, largest */}
      <path d="M45 25 Q35 22 28 30 Q24 38 30 48 Q38 54 45 52 Q52 54 58 48 Q64 38 60 30 Q55 22 45 25" stroke={stroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M38 40 Q32 36 30 42 Q32 46 38 48 Q44 46 46 42 Q44 36 38 40" stroke={stroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M52 40 Q58 36 60 42 Q58 46 52 48 Q46 46 44 42 Q46 36 52 40" stroke={stroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Rose - center-front */}
      <path d="M42 45 Q35 42 32 48 Q30 54 36 58 Q42 60 46 56 Q48 50 42 45" stroke={stroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M46 48 Q52 44 54 50 Q52 55 46 58 Q42 56 40 52 Q42 48 46 48" stroke={stroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M40 52 Q38 48 42 46 Q46 48 44 52 Q42 54 40 52" stroke={stroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Daisy - left */}
      <path d="M18 55 L18 75" stroke={leafStroke} strokeWidth="0.8" fill="none" strokeLinecap="round" />
      <circle cx="18" cy="52" r="5" stroke={stroke} strokeWidth={strokeWidth} fill="none" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const a = (i / 8) * Math.PI * 2
        const x1 = 18 + Math.cos(a) * 5
        const y1 = 52 + Math.sin(a) * 5
        const x2 = 18 + Math.cos(a) * 12
        const y2 = 52 + Math.sin(a) * 12
        const x3 = 18 + Math.cos(a + 0.15) * 5
        const y3 = 52 + Math.sin(a + 0.15) * 5
        return <path key={i} d={`M${x1} ${y1} Q${18 + Math.cos(a) * 9} ${52 + Math.sin(a) * 9} ${x2} ${y2} Q${18 + Math.cos(a + 0.15) * 9} ${52 + Math.sin(a + 0.15) * 9} ${x3} ${y3}`} stroke={stroke} strokeWidth="0.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      })}
      {/* Cosmos - right */}
      <path d="M72 50 L72 70" stroke={leafStroke} strokeWidth="0.8" fill="none" strokeLinecap="round" />
      <circle cx="72" cy="47" r="4" stroke={stroke} strokeWidth="0.8" fill="none" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const a = (i / 8) * Math.PI * 2 + 0.2
        const x1 = 72 + Math.cos(a) * 4
        const y1 = 47 + Math.sin(a) * 4
        const x2 = 72 + Math.cos(a) * 11
        const y2 = 47 + Math.sin(a) * 11
        const x3 = 72 + Math.cos(a + 0.12) * 4
        const y3 = 47 + Math.sin(a + 0.12) * 4
        return <path key={i} d={`M${x1} ${y1} Q${72 + Math.cos(a) * 8} ${47 + Math.sin(a) * 8} ${x2} ${y2} Q${72 + Math.cos(a + 0.12) * 8} ${47 + Math.sin(a + 0.12) * 8} ${x3} ${y3}`} stroke={stroke} strokeWidth="0.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      })}
      {/* Lavender - far right */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <g key={i}>
          <ellipse cx="82" cy={35 + i * 3} rx="1.5" ry="1" stroke={stroke} strokeWidth="0.6" fill="none" />
          <ellipse cx="84" cy={35 + i * 3} rx="1.5" ry="1" stroke={stroke} strokeWidth="0.6" fill="none" />
        </g>
      ))}
      <path d="M83 65 L83 95" stroke={leafStroke} strokeWidth="0.8" fill="none" strokeLinecap="round" />
      {/* Forget-me-nots - tiny 5-petal */}
      <path d="M30 85 L30 95" stroke={leafStroke} strokeWidth="0.6" fill="none" strokeLinecap="round" />
      <circle cx="30" cy="82" r="2" stroke={stroke} strokeWidth="0.6" fill="none" />
      {[0, 1, 2, 3, 4].map((i) => {
        const a = (i / 5) * Math.PI * 2
        const x1 = 30 + Math.cos(a) * 2
        const y1 = 82 + Math.sin(a) * 2
        const x2 = 30 + Math.cos(a) * 5
        const y2 = 82 + Math.sin(a) * 5
        const x3 = 30 + Math.cos(a + 0.2) * 2
        const y3 = 82 + Math.sin(a + 0.2) * 2
        return <path key={i} d={`M${x1} ${y1} Q${30 + Math.cos(a) * 4} ${82 + Math.sin(a) * 4} ${x2} ${y2} Q${30 + Math.cos(a + 0.2) * 4} ${82 + Math.sin(a + 0.2) * 4} ${x3} ${y3}`} stroke={stroke} strokeWidth="0.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      })}
      {/* Berry cluster */}
      <circle cx="55" cy="90" r="2" stroke={stroke} strokeWidth="0.6" fill="none" />
      <circle cx="58" cy="88" r="2" stroke={stroke} strokeWidth="0.6" fill="none" />
      <circle cx="57" cy="92" r="2" stroke={stroke} strokeWidth="0.6" fill="none" />
      <path d="M50 95 L60 92" stroke={leafStroke} strokeWidth="0.6" fill="none" strokeLinecap="round" />
      {/* Mixed leaves */}
      <path d="M45 60 Q38 55 35 60 Q38 65 45 62 Q52 65 55 60 Q52 55 45 60" stroke={leafStroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25 70 Q20 65 22 72 Q24 78 28 75 Q25 70 25 70" stroke={leafStroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M65 75 Q70 70 72 76 Q70 82 66 80 Q65 75 65 75" stroke={leafStroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Trailing vine */}
      <path d="M15 95 Q10 88 12 82 Q14 78 18 80 Q20 85 18 90 Q16 95 15 95" stroke={leafStroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
