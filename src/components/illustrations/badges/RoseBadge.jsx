/** BADGE 8: Full Bloom Cushion — ROSE. Side view, overlapping C-curve petals, calyx, thorns, compound serrated leaves. */
export default function RoseBadge({ stroke = '#5B1A2E', leafStroke = '#6B7F5E', strokeWidth = 1.5 }) {
  return (
    <svg width="70" height="100" viewBox="0 0 70 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer petal - large C-curve left */}
      <path d="M25 35 Q15 28 12 35 Q10 42 15 48 Q22 52 28 48 Q32 44 30 38 Q28 34 25 35" stroke={stroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Second petal - right */}
      <path d="M30 38 Q38 32 45 35 Q48 40 46 46 Q42 50 35 48 Q30 46 28 42 Q29 40 30 38" stroke={stroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Third petal - center */}
      <path d="M28 42 Q32 38 36 40 Q40 42 38 46 Q35 48 32 46 Q30 44 28 42" stroke={stroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Inner spiral */}
      <path d="M32 44 Q34 42 36 44 Q38 46 36 48 Q34 46 32 44" stroke={stroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M34 46 Q35 45 36 46 Q37 47 36 48 Q35 47 34 46" stroke={stroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Calyx - sepals */}
      <path d="M28 50 Q26 54 28 56 Q30 54 28 50" stroke={leafStroke} strokeWidth="0.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 52 Q30 56 32 58 Q34 56 32 52" stroke={leafStroke} strokeWidth="0.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M36 50 Q38 54 36 56 Q34 54 36 50" stroke={leafStroke} strokeWidth="0.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 50 Q32 54 30 56 Q28 54 30 50" stroke={leafStroke} strokeWidth="0.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Stem with thorns */}
      <path d="M35 58 L35 75 L36 92 L35 98" stroke={leafStroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M35 65 L33 67" stroke={leafStroke} strokeWidth="0.8" strokeLinecap="round" />
      <path d="M35 78 L37 80" stroke={leafStroke} strokeWidth="0.8" strokeLinecap="round" />
      {/* Compound leaf - 3 leaflets with serrations */}
      <path d="M35 72 Q28 68 24 64 Q22 62 24 60 Q26 62 30 65 Q35 68 35 72" stroke={leafStroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M35 72 Q35 66 38 62 Q39 60 40 62 Q39 66 37 70 Q35 72 35 72" stroke={leafStroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M35 72 Q42 68 46 64 Q48 62 46 60 Q44 62 40 65 Q35 68 35 72" stroke={leafStroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
