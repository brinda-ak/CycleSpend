/** BADGE 11: Ivy — Trailing vine, 8-10 ivy leaves (5-pointed), smaller toward tip, veins, aerial roots. */
export default function IvyBadge({ stroke = '#5B1A2E', leafStroke = '#6B7F5E', strokeWidth = 1.5 }) {
  return (
    <svg width="70" height="100" viewBox="0 0 70 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Main vine - diagonal S-curves */}
      <path d="M12 5 Q25 25 18 45 Q12 65 22 85 Q28 95 35 98" stroke={leafStroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Ivy leaves - 5-pointed, alternating, decreasing size */}
      <path d="M12 5 Q5 8 8 15 Q10 18 14 16 Q16 12 12 5" stroke={leafStroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 5 Q16 10 18 12 Q20 10 20 6 Q18 4 12 5" stroke={leafStroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 5 Q10 14 12 16 Q14 14 14 10 Q12 8 12 5" stroke={leafStroke} strokeWidth="0.8" fill="none" strokeLinecap="round" />
      <path d="M22 35 Q14 32 16 40 Q18 44 22 42 Q24 38 22 35" stroke={leafStroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 35 Q26 32 28 36 Q28 40 24 42 Q22 40 22 35" stroke={leafStroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 35 Q20 38 22 40 Q24 38 22 35" stroke={leafStroke} strokeWidth="0.8" fill="none" strokeLinecap="round" />
      <path d="M18 55 Q10 52 12 60 Q14 64 18 62 Q20 58 18 55" stroke={leafStroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 55 Q22 52 24 56 Q24 60 20 62 Q18 60 18 55" stroke={leafStroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 75 Q16 72 18 80 Q20 84 24 82 Q26 78 22 75" stroke={leafStroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 75 Q26 72 28 76 Q28 80 24 82 Q22 80 22 75" stroke={leafStroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M28 90 Q24 88 26 94 Q28 96 30 94 Q30 90 28 90" stroke={leafStroke} strokeWidth={strokeWidth - 0.2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M28 90 Q32 88 34 92 Q34 95 31 95 Q29 93 28 90" stroke={leafStroke} strokeWidth={strokeWidth - 0.2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Aerial roots */}
      <path d="M22 35 Q20 42 18 45" stroke={leafStroke} strokeWidth="0.6" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M18 55 Q16 62 14 65" stroke={leafStroke} strokeWidth="0.6" fill="none" strokeLinecap="round" opacity="0.7" />
    </svg>
  )
}
