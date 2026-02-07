import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, updateUserProfile } from '../lib/auth'
import { getCurrentPhase, getPhaseColor } from '../utils/cycleUtils'
import MoonCycle from '../components/illustrations/MoonCycle'
import BotanicalBackground from '../components/BotanicalBackground'

const DEFAULT_CYCLE_LENGTH = 28

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [lastPeriodStart, setLastPeriodStart] = useState(() => {
    const d = new Date()
    d.setDate(d.getDate() - 14)
    return d.toISOString().slice(0, 10)
  })
  const [cycleLength, setCycleLength] = useState(DEFAULT_CYCLE_LENGTH)
  const [monthlyBudget, setMonthlyBudget] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const phaseInfo = lastPeriodStart ? getCurrentPhase(lastPeriodStart, cycleLength) : null

  async function handleFinish() {
    setError(null)
    const budget = parseFloat(monthlyBudget, 10)
    if (isNaN(budget) || budget < 0) {
      setError('Please enter a valid monthly budget (0 or more).')
      return
    }
    const user = getCurrentUser()
    if (!user) {
      navigate('/login', { replace: true })
      return
    }
    setLoading(true)
    try {
      await updateUserProfile(user.uid, {
        name: name.trim() || user.displayName || '',
        lastPeriodStart: lastPeriodStart || undefined,
        cycleLength: cycleLength || DEFAULT_CYCLE_LENGTH,
        monthlyBudget: budget,
      })
      onComplete?.()
      navigate('/', { replace: true })
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen max-w-[430px] mx-auto overflow-hidden">
      <BotanicalBackground />
      {/* Step 1 */}
      {step === 1 && (
        <div>
          <div className="bg-tan px-5 pt-8 pb-12 rounded-b-2xl">
            <div className="flex justify-between items-start">
              <h1 className="font-display font-bold text-2xl text-burgundy">
                Let&apos;s get to know your cycle
              </h1>
              <MoonCycle className="w-16 h-16 flex-shrink-0" />
            </div>
          </div>
          <div className="px-5 py-8 bg-warm-bg space-y-6">
            <label className="block">
              <span className="text-espresso font-medium text-sm block mb-2">When did your last period start?</span>
              <input
                type="date"
                value={lastPeriodStart}
                onChange={(e) => setLastPeriodStart(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-tan border-2 border-mauve/50 text-espresso"
              />
            </label>
            <label className="block">
              <span className="text-espresso font-medium text-sm block mb-2">How long is your cycle usually?</span>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setCycleLength((c) => Math.max(21, c - 1))}
                  className="w-12 h-12 rounded-full bg-cranberry text-tan font-bold text-xl flex items-center justify-center"
                >
                  −
                </button>
                <span className="text-2xl font-display font-bold text-burgundy w-12 text-center">{cycleLength}</span>
                <button
                  type="button"
                  onClick={() => setCycleLength((c) => Math.min(45, c + 1))}
                  className="w-12 h-12 rounded-full bg-cranberry text-tan font-bold text-xl flex items-center justify-center"
                >
                  +
                </button>
              </div>
              <p className="text-espresso/70 text-sm mt-2 font-sans">
                Don&apos;t worry if you&apos;re not sure — 28 days is the average and you can always adjust later.
              </p>
            </label>
            <button
              onClick={() => setStep(2)}
              className="w-full py-3 px-4 rounded-xl bg-cranberry text-white font-semibold"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div>
          <div className="bg-tan px-5 pt-8 pb-12 rounded-b-2xl">
            <h1 className="font-display font-bold text-2xl text-burgundy">
              Set your monthly budget
            </h1>
          </div>
          <div className="px-5 py-8 bg-warm-bg space-y-6">
            <label className="block">
              <span className="text-espresso font-medium text-sm block mb-2 text-center">How much do you spend each month?</span>
              <input
                type="number"
                min={0}
                step={10}
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(e.target.value)}
                placeholder="500"
                className="w-full px-4 py-4 rounded-xl bg-tan border-2 border-mauve/50 text-espresso text-2xl font-display font-bold text-center"
              />
              <p className="text-espresso/70 text-sm mt-2 text-center font-sans">
                Include food, shopping, entertainment — everything discretionary.
              </p>
            </label>
            <button
              onClick={() => setStep(3)}
              className="w-full py-3 px-4 rounded-xl bg-cranberry text-white font-semibold"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div>
          <div className="bg-tan px-5 pt-8 pb-12 rounded-b-2xl">
            <h1 className="font-display font-bold text-2xl text-burgundy">
              You&apos;re all set
            </h1>
          </div>
          <div className="px-5 py-8 bg-warm-bg space-y-6">
            <h2 className="font-display font-bold text-xl text-burgundy text-center">Welcome to CycleSpend</h2>
            {phaseInfo && (
              <div className="flex flex-col items-center gap-2">
                <span
                  className="inline-block px-4 py-2 rounded-full text-white font-medium text-lg"
                  style={{ backgroundColor: getPhaseColor(phaseInfo.phase) }}
                >
                  {phaseInfo.phaseLabel}
                </span>
                <p className="text-espresso font-sans">Day {phaseInfo.day} of your cycle</p>
              </div>
            )}
            {error && (
              <div className="p-3 rounded-xl bg-terracotta/20 text-espresso text-sm">{error}</div>
            )}
            <button
              onClick={handleFinish}
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-cranberry text-white font-semibold disabled:opacity-60"
            >
              {loading ? 'Saving…' : "Let's go →"}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
