/** Simple outlined padlock icon, 10px. For locked badge state. */
export default function LockIcon({ size = 10, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="2" y="4" width="6" height="4" rx="0.5" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M3 4 V2.5 Q3 1.5 5 1.5 Q7 1.5 7 2.5 V4" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
