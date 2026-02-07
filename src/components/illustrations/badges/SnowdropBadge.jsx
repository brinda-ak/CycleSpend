/** BADGE 4: Seedling — SNOWDROP. Tiny drooping bell, 3 overlapping teardrop petals, thin curved stem, narrow grass leaves. */
export default function SnowdropBadge({ stroke = '#5B1A2E', leafStroke = '#6B7F5E', strokeWidth = 1.5 }) {
  return (
    <svg width="70" height="100" viewBox="0 0 70 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Calyx - tiny pointed leaves cupping base */}
      <path d="M32 22 Q30 18 32 16 Q34 18 32 22" stroke={leafStroke} strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M38 22 Q40 18 38 16 Q36 18 38 22" stroke={leafStroke} strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Bell - 3 overlapping teardrops pointing down */}
      <path d="M35 22 Q28 28 28 38 Q29 42 35 40 Q41 42 42 38 Q42 28 35 22" stroke={stroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M35 22 Q40 26 42 34 Q43 38 40 40 Q37 38 38 34 Q38 26 35 22" stroke={stroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M35 22 Q30 26 32 34 Q33 38 30 40 Q27 38 28 34 Q28 26 35 22" stroke={stroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Stem - thin, upside-down J */}
      <path d="M35 22 Q38 30 36 50 Q34 70 35 90 Q36 98 35 100" stroke={leafStroke} strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Grass-like leaves */}
      <path d="M30 100 Q28 60 30 40 Q32 25 34 30" stroke={leafStroke} strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M40 100 Q42 60 40 40 Q38 25 36 30" stroke={leafStroke} strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
