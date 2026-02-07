/** BADGE 10: Tendril — Curling spiral vine. 3-4 loops, tiny paired leaves at junctions, smooth bezier curves. */
export default function TendrilBadge({ stroke = '#5B1A2E', leafStroke = '#6B7F5E', strokeWidth = 1.5 }) {
  return (
    <svg width="70" height="100" viewBox="0 0 70 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Main stem curving up into spiral */}
      <path d="M35 98 Q34 85 36 70 Q38 55 40 45" stroke={leafStroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Spiral - 4 loops */}
      <path d="M40 45 Q48 42 55 48 Q58 55 52 62 Q45 65 38 60 Q35 55 38 50 Q42 48 48 52 Q52 56 50 60 Q46 62 42 58 Q40 54 44 50 Q48 48 50 52 Q49 56 46 58 Q43 55 45 50 Q47 46 50 48" stroke={leafStroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Tiny leaves at junctions */}
      <path d="M48 52 Q46 50 47 48 Q49 50 48 52" stroke={leafStroke} strokeWidth="0.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M48 52 Q50 50 51 48 Q49 50 48 52" stroke={leafStroke} strokeWidth="0.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M50 60 Q48 58 49 56 Q51 58 50 60" stroke={leafStroke} strokeWidth="0.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M50 60 Q52 58 53 56 Q51 58 50 60" stroke={leafStroke} strokeWidth="0.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M42 58 Q40 56 41 54 Q43 56 42 58" stroke={leafStroke} strokeWidth="0.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M42 58 Q44 56 45 54 Q43 56 42 58" stroke={leafStroke} strokeWidth="0.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Branch tendril with small curl */}
      <path d="M55 48 Q58 46 60 50 Q59 54 56 55 Q54 53 55 50" stroke={leafStroke} strokeWidth="0.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
