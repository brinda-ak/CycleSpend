/** 4-segment circle for budget allocation */
export default function BudgetCircle({ className = 'w-20 h-20' }) {
  return (
    <svg viewBox="0 0 80 80" className={className}>
      <circle cx="40" cy="40" r="35" fill="none" stroke="#C4A088" strokeWidth="4" />
      <path d="M40 40 L40 5 A 35 35 0 0 1 67 28 Z" fill="#5B1A2E" opacity="0.9" />
      <path d="M40 40 L67 28 A 35 35 0 0 1 67 52 Z" fill="#7A4B5E" opacity="0.9" />
      <path d="M40 40 L67 52 A 35 35 0 0 1 40 75 Z" fill="#8B2942" opacity="0.9" />
      <path d="M40 40 L40 75 A 35 35 0 0 1 13 52 Z" fill="#B56B4A" opacity="0.9" />
    </svg>
  )
}
