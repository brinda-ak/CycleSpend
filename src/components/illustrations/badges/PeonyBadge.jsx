/** BADGE 3: Perennial — PEONY. Side view, 3 rings of layered cupping petals, ruffled edges, compound 3-lobe leaves. */
export default function PeonyBadge({ stroke = '#5B1A2E', leafStroke = '#6B7F5E', strokeWidth = 1.5 }) {
  return (
    <svg width="70" height="100" viewBox="0 0 70 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer ring - large cupping petals */}
      <path d="M20 45 Q15 35 18 25 Q22 18 28 20 Q35 22 42 20 Q48 18 52 25 Q55 35 50 45 Q48 48 42 50 Q35 52 28 50 Q22 48 20 45" stroke={stroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 42 Q18 32 22 24 Q26 20 35 22 Q44 20 48 24 Q52 32 48 42 Q46 46 40 48 Q35 50 30 48 Q24 46 22 42" stroke={stroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25 40 Q22 30 28 22 Q32 18 35 20 Q38 18 42 22 Q48 30 45 40 Q43 44 38 46 Q35 48 32 46 Q27 44 25 40" stroke={stroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M28 38 Q26 28 32 24 Q36 22 38 24 Q40 22 44 24 Q50 28 48 38 Q46 42 40 44 Q35 46 30 44 Q28 42 28 38" stroke={stroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Middle ring - ruffled tops */}
      <path d="M30 36 Q28 28 32 24 Q35 22 38 24 Q40 22 42 24 Q44 22 46 24 Q50 28 48 36 Q46 38 42 40 Q38 42 35 40 Q32 38 30 36" stroke={stroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 34 Q30 26 34 22 Q36 20 38 22 Q40 20 42 22 Q44 20 46 22 Q50 26 48 34 Q46 36 42 38 Q38 40 35 38 Q33 36 32 34" stroke={stroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M34 32 Q33 24 36 20 Q38 18 40 20 Q42 18 44 20 Q46 18 48 20 Q51 24 49 32 Q47 34 44 36 Q40 38 35 36 Q34 34 34 32" stroke={stroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Inner ring - tight, curling */}
      <path d="M35 30 Q34 24 36 22 Q38 20 40 22 Q42 20 44 22 Q46 20 48 22 Q50 24 49 30 Q47 32 44 34 Q40 36 35 34 Q33 32 35 30" stroke={stroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M36 28 Q35 24 37 22 Q39 20 41 22 Q43 20 45 22 Q47 20 49 22 Q50 24 49 28 Q48 30 46 32 Q42 34 35 32 Q34 30 36 28" stroke={stroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Stamens */}
      <line x1="38" y1="26" x2="38" y2="22" stroke={stroke} strokeWidth="0.6" strokeLinecap="round" />
      <line x1="40" y1="27" x2="40" y2="23" stroke={stroke} strokeWidth="0.6" strokeLinecap="round" />
      <line x1="42" y1="26" x2="42" y2="22" stroke={stroke} strokeWidth="0.6" strokeLinecap="round" />
      <circle cx="38" cy="21" r="0.8" stroke={stroke} strokeWidth="0.5" fill="none" />
      <circle cx="40" cy="22" r="0.8" stroke={stroke} strokeWidth="0.5" fill="none" />
      <circle cx="42" cy="21" r="0.8" stroke={stroke} strokeWidth="0.5" fill="none" />
      {/* Stem */}
      <path d="M35 52 Q34 65 35 80 Q36 95 35 98" stroke={leafStroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Compound leaf - 3 lobes */}
      <path d="M35 70 Q25 65 18 58 Q15 55 18 52 Q22 55 28 60 Q35 65 35 70" stroke={leafStroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M35 70 Q35 62 38 55 Q40 52 42 55 Q40 60 38 65 Q35 70 35 70" stroke={leafStroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M35 70 Q45 65 52 58 Q55 55 52 52 Q48 55 42 60 Q35 65 35 70" stroke={leafStroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
