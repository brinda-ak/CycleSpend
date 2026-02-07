/** Botanical outline decorations for the app background */
export default function BackgroundDecor() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 max-w-[430px] left-1/2 -translate-x-1/2">
      {/* Top-left leaf cluster */}
      <svg className="absolute top-4 left-4 w-28 h-28 text-espresso/[0.12]" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
        <path d="M10 60 Q30 20 50 40 Q40 55 20 70 Z" />
        <path d="M25 55 Q35 35 55 45" />
        <path d="M15 45 Q25 30 40 35" />
      </svg>

      {/* Top-right vine */}
      <svg className="absolute top-24 right-2 w-24 h-36 text-espresso/[0.12]" viewBox="0 0 60 100" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round">
        <path d="M50 0 Q30 30 40 50 Q20 70 35 90" />
        <ellipse cx="35" cy="25" rx="6" ry="10" transform="rotate(-20 35 25)" />
        <ellipse cx="25" cy="55" rx="5" ry="8" transform="rotate(15 25 55)" />
        <ellipse cx="40" cy="75" rx="4" ry="7" transform="rotate(-10 40 75)" />
      </svg>

      {/* Bottom-left stem with leaf */}
      <svg className="absolute bottom-36 left-2 w-20 h-32 text-espresso/[0.12]" viewBox="0 0 50 90" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round">
        <path d="M25 90 Q20 50 30 20" />
        <path d="M30 20 Q45 15 40 35 Q35 50 25 45" />
        <path d="M20 60 Q5 55 15 75 Q25 70 25 55" />
      </svg>

      {/* Bottom-right botanical */}
      <svg className="absolute bottom-28 right-2 w-28 h-28 text-espresso/[0.12]" viewBox="0 0 90 80" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round">
        <path d="M10 70 Q25 40 45 50 Q65 60 80 30" />
        <path d="M45 50 Q50 25 70 20" />
        <path d="M45 50 Q40 30 25 35" />
        <circle cx="70" cy="22" r="4" />
        <circle cx="28" cy="38" r="3" />
      </svg>

      {/* Mid-left small leaf */}
      <svg className="absolute top-1/2 -translate-y-1/2 left-2 w-14 h-20 text-espresso/[0.1]" viewBox="0 0 40 60" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
        <path d="M20 55 Q15 25 25 5 Q35 20 30 45 Z" />
      </svg>
    </div>
  )
}
