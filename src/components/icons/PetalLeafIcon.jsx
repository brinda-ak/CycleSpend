/** Single leaf icon — two curved lines meeting at a point, 12px tall. For petals display. */
export default function PetalLeafIcon({ size = 12, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M6 11 C4 8 2 5 3 3 C4 1 6 2 6 4"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 11 C8 8 10 5 9 3 C8 1 6 2 6 4"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
