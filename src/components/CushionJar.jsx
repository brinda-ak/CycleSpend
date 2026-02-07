import { useState, useEffect } from 'react'

function Bubble({ delay, left }) {
  return (
    <div
      className="absolute w-3 h-3 rounded-full bg-cranberry/60 animate-bubble-rise"
      style={{
        left: `${left}%`,
        bottom: '20%',
        animationDelay: `${delay}ms`,
        animationDuration: '1.2s',
      }}
    />
  )
}

export default function CushionJar({ saved, target, justCompleted = false }) {
  const [prevSaved, setPrevSaved] = useState(saved)
  const [showBubbles, setShowBubbles] = useState(false)
  const [celebrating, setCelebrating] = useState(false)

  const pct = target > 0 ? Math.min(100, (saved / target) * 100) : 0

  useEffect(() => {
    if (justCompleted && saved > prevSaved) {
      setShowBubbles(true)
      if (pct >= 100) setCelebrating(true)
      const t = setTimeout(() => {
        setShowBubbles(false)
        setCelebrating(false)
      }, 1500)
      setPrevSaved(saved)
      return () => clearTimeout(t)
    }
    setPrevSaved(saved)
  }, [saved, justCompleted, prevSaved, pct])

  return (
    <div className={`relative w-44 h-52 mx-auto transition-transform duration-300 ${celebrating ? 'animate-jar-fill-pop' : ''}`}>
      {/* Bubbles */}
      {showBubbles && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ left: '15%', right: '15%' }}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Bubble key={i} delay={i * 150} left={15 + i * 14} />
          ))}
        </div>
      )}

      <svg viewBox="0 0 120 140" className="w-full h-full drop-shadow-lg">
        <defs>
          <linearGradient id="jarFillGrad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#D4B5A0" />
            <stop offset={pct / 100} stopColor="#8B2942" />
            <stop offset={pct / 100} stopColor="#D4B5A0" />
            <stop offset="1" stopColor="#D4B5A0" />
          </linearGradient>
          <filter id="jarGlow">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M20 20 L100 20 L90 120 Q60 135 30 120 L20 20"
          fill="none"
          stroke="#7A4B5E"
          strokeWidth="3"
          filter="url(#jarGlow)"
        />
        <rect
          x="25"
          y={120 - (pct / 100) * 95}
          width="70"
          height={(pct / 100) * 95}
          rx="4"
          fill="url(#jarFillGrad)"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 text-center pointer-events-none">
        <span className="font-display font-bold text-burgundy text-2xl drop-shadow-sm">${saved}</span>
        <span className="font-sans text-espresso/80 text-sm">of ${target} goal</span>
        <span className="font-sans text-espresso/70 text-xs mt-1">{saved} pts earned</span>
      </div>
    </div>
  )
}
