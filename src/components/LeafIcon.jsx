/** Small leaf icon for points display — use text-rewards-green for color */
export default function LeafIcon({ size = 18, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22c-4-2-8-6-8-12 0-3 2-6 6-6 2 0 4 1 6 3 2-2 4-3 6-3 4 0 6 3 6 6 0 6-4 10-8 12" />
    </svg>
  )
}
