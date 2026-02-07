/** Organic flowing lines - decorative */
export default function OrganicLines({ className = 'w-12 h-12' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="#2C1A1F" strokeWidth="1.2" strokeLinecap="round" opacity="0.6">
      <path d="M8 24 Q20 8 32 24 T48 24" />
      <path d="M8 32 Q16 20 24 32 T40 32" />
      <path d="M12 16 Q24 28 36 16" />
    </svg>
  )
}
