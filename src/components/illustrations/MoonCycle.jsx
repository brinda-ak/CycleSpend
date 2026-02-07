/** Hand-drawn style moon cycle illustration */
export default function MoonCycle({ className = 'w-16 h-16' }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" stroke="#2C1A1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="40" cy="40" r="28" opacity="0.3" />
      <path d="M40 12 v56 M40 12 a 28 28 0 0 1 0 56 M40 12 a 28 28 0 0 0 0 56" opacity="0.6" />
      <ellipse cx="32" cy="40" rx="8" ry="14" transform="rotate(-20 32 40)" opacity="0.8" />
      <path d="M52 25 Q58 35 52 45 M28 25 Q22 35 28 45" />
    </svg>
  )
}
