import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCurrentPhase, getPhaseColor, getPhaseDayCounts, getDaysLeftInPhase, PHASES } from '../utils/cycleUtils'
import { getTransactionsFromFirestore } from '../lib/nessieSync'
import { syncNessieToFirestore } from '../lib/nessieSync'
import { getOrCreateChallenges } from '../lib/challenges'
import { getCurrentUser } from '../lib/auth'
import { spendToColor } from '../utils/colorUtils'
import SymptomCheckIn from '../components/SymptomCheckIn'
import OrganicLines from '../components/illustrations/OrganicLines'
import JarIcon from '../components/illustrations/JarIcon'
import { CHALLENGE_TEMPLATES } from '../data/challengeTemplates'
import { completeChallenge } from '../lib/challenges'

function ProgressRing({ progress, color, size = 56 }) {
  const stroke = 6
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (progress / 100) * circ
  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#C4A088" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-500"
      />
    </svg>
  )
}

export default function Home({ profile }) {
  const [todaySpend, setTodaySpend] = useState(0)
  const [cushionSaved, setCushionSaved] = useState(0)
  const [cushionTarget, setCushionTarget] = useState(50)
  const [weekSpends, setWeekSpends] = useState([])
  const [todayChallenge, setTodayChallenge] = useState(null)

  const phaseInfo = profile?.lastPeriodStart
    ? getCurrentPhase(profile.lastPeriodStart, profile.cycleLength || 28)
    : null
  const today = new Date().toISOString().slice(0, 10)
  const monthlyBudget = profile?.monthlyBudget || 0
  const phaseBudget = monthlyBudget * (profile?.phaseAllocations?.[phaseInfo?.phase] ?? 0.25)
  const remaining = Math.max(0, phaseBudget - todaySpend)
  const budgetPct = phaseBudget > 0 ? Math.min(100, (todaySpend / phaseBudget) * 100) : 0
  const isHighWillpower = phaseInfo && [PHASES.FOLLICULAR, PHASES.OVULATORY].includes(phaseInfo.phase)

  useEffect(() => {
    const uid = getCurrentUser()?.uid
    if (!uid) return
    getTransactionsFromFirestore(uid).then((txns) => {
      const todayTotal = txns.filter((t) => t.date === today).reduce((sum, t) => sum + (t.amount || 0), 0)
      setTodaySpend(todayTotal)
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      const start = new Date()
      start.setDate(start.getDate() - start.getDay())
      const week = days.map((_, i) => {
        const d = new Date(start)
        d.setDate(d.getDate() + i)
        const ds = d.toISOString().slice(0, 10)
        const amt = txns.filter((t) => t.date === ds).reduce((s, t) => s + (t.amount || 0), 0)
        return { day: days[i], amount: amt, date: ds }
      })
      setWeekSpends(week)
    })
  }, [today])

  useEffect(() => {
    const uid = getCurrentUser()?.uid
    if (!uid || !profile?.lastPeriodStart) return
    getOrCreateChallenges(uid, profile.lastPeriodStart).then((d) => {
      setCushionSaved(d.totalSaved || 0)
      setCushionTarget(d.target || 50)
    })
  }, [profile?.lastPeriodStart])

  useEffect(() => {
    const uid = getCurrentUser()?.uid
    if (!uid || !profile?.nessieAccountId || !profile?.lastPeriodStart) return
    syncNessieToFirestore(uid, profile.nessieAccountId, profile.lastPeriodStart, profile.cycleLength || 28).catch(() => {})
  }, [profile?.nessieAccountId, profile?.lastPeriodStart])

  useEffect(() => {
    if (isHighWillpower) {
      const idx = Math.floor(Math.random() * CHALLENGE_TEMPLATES.length)
      setTodayChallenge(CHALLENGE_TEMPLATES[idx])
    }
  }, [isHighWillpower])

  const handleCompleteChallenge = async () => {
    if (!uid || !todayChallenge || !profile?.lastPeriodStart) return
    await completeChallenge(uid, profile.lastPeriodStart, { description: todayChallenge.description, savedAmount: todayChallenge.amount })
    const updated = await getOrCreateChallenges(uid, profile.lastPeriodStart)
    setCushionSaved(updated.totalSaved || 0)
    setTodayChallenge(null)
  }

  const phaseColor = phaseInfo ? getPhaseColor(phaseInfo.phase) : '#7A4B5E'
  const daysLeft = phaseInfo ? getDaysLeftInPhase(phaseInfo.day, phaseInfo.phase, profile.cycleLength || 28) : 0
  const maxWeek = Math.max(1, ...weekSpends.map((w) => w.amount))

  return (
    <div className="px-5 py-4 space-y-4 max-w-[430px] mx-auto">
      {/* Greeting card */}
      <section className="rounded-2xl p-5 shadow-card bg-tan border-l-4 border-mauve flex gap-4">
        <div className="flex-1">
          <h2 className="font-display font-bold text-xl text-burgundy">
            Hey{profile?.name ? ` ${profile.name.split(' ')[0]}` : ''}!
          </h2>
          {phaseInfo && (
            <p className="text-espresso mt-2 font-sans text-sm">
              You&apos;re in your <strong>{phaseInfo.phaseLabel}</strong> phase. Your budget has <strong>${remaining.toFixed(0)}</strong> left for <strong>{Math.max(0, daysLeft)}</strong> more days.
            </p>
          )}
        </div>
        <OrganicLines className="w-14 h-14 flex-shrink-0" />
      </section>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-2xl p-4 bg-tan shadow-card flex flex-col items-center">
          <ProgressRing progress={100 - budgetPct} color={phaseColor} size={56} />
          <span className="font-display font-bold text-burgundy mt-2">${remaining.toFixed(0)}</span>
          <span className="text-xs text-espresso/80 font-sans">Budget Left</span>
          {phaseInfo && <span className="text-xs text-espresso/70 font-sans capitalize">{phaseInfo.phase}</span>}
        </div>
        <div className="rounded-2xl p-4 bg-tan shadow-card flex flex-col items-center">
          <JarIcon fillPct={(cushionSaved / cushionTarget) * 100} className="w-12 h-14" />
          <span className="font-display font-bold text-burgundy mt-1">${cushionSaved}</span>
          <span className="text-xs text-espresso/80 font-sans">of ${cushionTarget}</span>
          <span className="text-xs text-espresso/70 font-sans">Cycle Cushion</span>
        </div>
        <div className="rounded-2xl p-4 bg-tan shadow-card flex flex-col items-center">
          <span className="font-display font-bold text-2xl" style={{ color: phaseColor }}>{phaseInfo?.day || '—'}</span>
          <span className="text-xs text-espresso/80 font-sans mt-1">Day</span>
          {phaseInfo && <span className="text-xs text-espresso/70 font-sans capitalize">{phaseInfo.phase}</span>}
        </div>
      </div>

      {/* Symptom check-in */}
      <SymptomCheckIn profile={profile} />

      {/* Active challenge */}
      {isHighWillpower && todayChallenge && (
        <section className="rounded-2xl p-5 shadow-card bg-tan border-l-4 border-cranberry">
          <p className="font-sans text-espresso text-sm mb-4">{todayChallenge.description}</p>
          <div className="flex gap-2">
            <button onClick={handleCompleteChallenge} className="flex-1 py-3 rounded-xl bg-cranberry text-white font-semibold font-sans">
              Done! (+${todayChallenge.amount})
            </button>
            <button onClick={() => setTodayChallenge(null)} className="px-4 py-3 rounded-xl border-2 border-cranberry text-cranberry font-semibold font-sans">
              Skip
            </button>
          </div>
        </section>
      )}

      {/* Mini heatmap */}
      <section className="rounded-2xl p-5 bg-warm-bg shadow-card">
        <div className="flex justify-between items-center mb-3">
          <span className="font-display font-bold text-burgundy">This week</span>
          <Link to="/heatmap" className="text-dusty-rose text-sm font-sans hover:underline">
            See full heatmap →
          </Link>
        </div>
        <div className="flex gap-1">
          {weekSpends.map((w) => (
            <div
              key={w.day}
              className="flex-1 flex flex-col items-center gap-1"
            >
              <div
                className="w-full aspect-square max-w-[44px] rounded-lg"
                style={{ backgroundColor: spendToColor(w.amount, 0, maxWeek) }}
              />
              <span className="text-[10px] text-espresso/70 font-sans">{w.day.slice(0, 1)}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
