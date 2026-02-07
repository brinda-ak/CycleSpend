import { useState, useEffect } from 'react'
import { PHASES, getCurrentPhase, getPhaseColor, getPhaseDayCounts, getPhaseDayRange, getDaysLeftInPhase, DEFAULT_PHASE_ALLOCATIONS } from '../utils/cycleUtils'
import { updateUserProfile } from '../lib/auth'
import { getCurrentUser } from '../lib/auth'
import { getTransactionsFromFirestore } from '../lib/nessieSync'
import BudgetCircle from '../components/illustrations/BudgetCircle'

function ProgressRing({ progress, color, size = 64 }) {
  const stroke = 6
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (progress / 100) * circ
  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#C4A088" strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-500" />
    </svg>
  )
}

export default function Budget({ profile }) {
  const [allocations, setAllocations] = useState(profile?.phaseAllocations || { ...DEFAULT_PHASE_ALLOCATIONS })
  const [phaseSpent, setPhaseSpent] = useState({})
  const [saving, setSaving] = useState(false)
  const [showSliders, setShowSliders] = useState(false)

  const totalBudget = profile?.monthlyBudget || 0
  const cycleLength = profile?.cycleLength || 28
  const phaseInfo = profile?.lastPeriodStart ? getCurrentPhase(profile.lastPeriodStart, cycleLength) : null
  const dayCounts = getPhaseDayCounts(cycleLength)

  useEffect(() => {
    setAllocations(profile?.phaseAllocations || { ...DEFAULT_PHASE_ALLOCATIONS })
  }, [profile?.phaseAllocations])

  useEffect(() => {
    if (!getCurrentUser()?.uid || !profile?.lastPeriodStart) return
    getTransactionsFromFirestore(getCurrentUser().uid).then((txns) => {
      const byPhase = { menstrual: 0, follicular: 0, ovulatory: 0, luteal: 0 }
      txns.forEach((t) => {
        if (t.phase && t.amount) byPhase[t.phase] = (byPhase[t.phase] || 0) + t.amount
      })
      setPhaseSpent(byPhase)
    })
  }, [profile?.lastPeriodStart])

  const handleSliderChange = (phase, value) => {
    const v = Math.max(0, Math.min(1, parseFloat(value)))
    const next = { ...allocations, [phase]: v }
    const sum = Object.values(next).reduce((a, b) => a + b, 0)
    if (sum > 1.01) return
    setAllocations(next)
  }

  const saveAllocations = async () => {
    setSaving(true)
    try {
      await updateUserProfile(getCurrentUser().uid, { phaseAllocations: allocations })
      setShowSliders(false)
    } finally {
      setSaving(false)
    }
  }

  const resetToDefaults = () => setAllocations({ ...DEFAULT_PHASE_ALLOCATIONS })

  const baseOrder = [PHASES.MENSTRUAL, PHASES.FOLLICULAR, PHASES.OVULATORY, PHASES.LUTEAL]
  const currentPhase = phaseInfo?.phase
  // Move current phase to top
  const phaseOrder = currentPhase
    ? [currentPhase, ...baseOrder.filter((p) => p !== currentPhase)]
    : baseOrder
  const totalPct = Math.round(Object.values(allocations).reduce((a, b) => a + b, 0) * 100)

  return (
    <div className="max-w-[430px] mx-auto">
      {/* Hero */}
      <div className="bg-tan px-5 pt-6 pb-8 rounded-b-2xl flex gap-4 items-center">
        <div>
          <h1 className="font-display font-bold text-2xl text-burgundy">Phase Budget</h1>
          <p className="font-sans text-espresso/80 text-sm mt-1">Your budget, shaped to your cycle</p>
        </div>
        <BudgetCircle className="w-20 h-20 flex-shrink-0" />
      </div>

      <div className="px-5 py-6 space-y-4">
        {/* Stacked bar */}
        <div className="rounded-2xl p-5 bg-tan shadow-card">
          <div className="flex h-4 rounded-full overflow-hidden mb-3">
            {phaseOrder.map((phase) => (
              <div key={phase} className="h-full" style={{ width: `${(allocations[phase] ?? 0.25) * 100}%`, backgroundColor: getPhaseColor(phase) }} />
            ))}
          </div>
          <div className="flex justify-between text-xs text-espresso/80 font-sans mb-2">
            {phaseOrder.map((phase) => (
              <span key={phase}>{Math.round((allocations[phase] ?? 0.25) * 100)}%</span>
            ))}
          </div>
          <button onClick={() => setShowSliders(!showSliders)} className="text-dusty-rose text-sm font-sans hover:underline">
            Adjust your split
          </button>
        </div>

        {/* Sliders (expandable) */}
        {showSliders && (
          <div className="rounded-2xl p-5 bg-tan shadow-card space-y-4">
            {phaseOrder.map((phase) => (
              <div key={phase}>
                <label className="text-sm font-sans text-espresso flex justify-between mb-1">
                  <span className="capitalize">{phase}</span>
                  <span>{Math.round((allocations[phase] ?? 0.25) * 100)}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={allocations[phase] ?? 0.25}
                  onChange={(e) => handleSliderChange(phase, e.target.value)}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{ accentColor: getPhaseColor(phase) }}
                />
              </div>
            ))}
            <p className="text-xs text-espresso/70 font-sans">Total: {totalPct}%</p>
            <div className="flex gap-2">
              <button onClick={resetToDefaults} className="flex-1 py-2 rounded-xl border-2 border-cranberry text-cranberry font-sans font-semibold">
                Reset to defaults
              </button>
              <button onClick={saveAllocations} disabled={saving} className="flex-1 py-2 rounded-xl bg-cranberry text-white font-sans font-semibold disabled:opacity-60">
                {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        )}

        {/* Phase cards */}
        {phaseOrder.map((phase) => {
          const alloc = allocations[phase] ?? 0.25
          const allocated = totalBudget * alloc
          const spent = phaseSpent[phase] || 0
          const remaining = Math.max(0, allocated - spent)
          const pct = allocated > 0 ? Math.min(100, (spent / allocated) * 100) : 0
          const label = phase.charAt(0).toUpperCase() + phase.slice(1)
          const color = getPhaseColor(phase)
          const days = dayCounts[phase] || 7
          const daysLeft = phaseInfo && phase === currentPhase ? getDaysLeftInPhase(phaseInfo.day, phase, cycleLength) : days
          const isCurrent = phase === currentPhase

          return (
            <div
              key={phase}
              className={`rounded-2xl p-5 shadow-card border-l-4 transition-all ${
                isCurrent
                  ? 'bg-tan ring-2 ring-cranberry shadow-lg scale-[1.02]'
                  : 'bg-tan/80'
              }`}
              style={{ borderColor: color, borderLeftWidth: isCurrent ? 6 : 4 }}
            >
              <div className="flex justify-between items-center mb-3">
                <div>
                  <span className={`font-display font-bold ${isCurrent ? 'text-xl' : ''}`} style={{ color: isCurrent ? color : '#5B1A2E' }}>{label}</span>
                  <span className="text-xs text-espresso/70 font-sans ml-2">Days {getPhaseDayRange(phase, cycleLength).start}–{getPhaseDayRange(phase, cycleLength).end}</span>
                </div>
                {isCurrent && <span className="px-3 py-1 rounded-full text-white text-sm font-sans font-semibold shadow-sm" style={{ backgroundColor: color }}>Current phase</span>}
              </div>
              <div className="flex items-center gap-4 mb-3">
                <ProgressRing progress={pct} color={color} size={56} />
                <div className="flex-1">
                  <p className="font-sans text-espresso text-sm">${spent.toFixed(0)} of ${allocated.toFixed(0)}</p>
                  <p className="font-sans text-espresso/70 text-xs">{daysLeft} days left</p>
                </div>
              </div>
              <div className="h-2 rounded-full bg-dark-tan/50 overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: color }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
