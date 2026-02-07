import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, updateUserProfile } from '../lib/auth'

const DEFAULT_CYCLE_LENGTH = 28

export default function Onboarding({ onComplete }) {
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

  async function handleSubmit(e) {
    e.preventDefault()
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
    <div className="min-h-screen bg-warm-bg px-6 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-burgundy font-display font-bold text-xl mb-1">Set up your profile</h1>
        <p className="text-espresso/80 text-sm mb-6">
          We use this to map your spending to your cycle and allocate your budget.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-espresso font-medium text-sm">Name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="mt-1 w-full px-4 py-2 rounded-card bg-tan/60 border border-dark-tan/40 text-espresso placeholder-espresso/50"
            />
          </label>
          <label className="block">
            <span className="text-espresso font-medium text-sm">Last period start date</span>
            <input
              type="date"
              value={lastPeriodStart}
              onChange={(e) => setLastPeriodStart(e.target.value)}
              className="mt-1 w-full px-4 py-2 rounded-card bg-tan/60 border border-dark-tan/40 text-espresso"
            />
          </label>
          <label className="block">
            <span className="text-espresso font-medium text-sm">Average cycle length (days)</span>
            <input
              type="number"
              min={21}
              max={45}
              value={cycleLength}
              onChange={(e) => setCycleLength(Number(e.target.value) || DEFAULT_CYCLE_LENGTH)}
              className="mt-1 w-full px-4 py-2 rounded-card bg-tan/60 border border-dark-tan/40 text-espresso"
            />
          </label>
          <label className="block">
            <span className="text-espresso font-medium text-sm">Monthly discretionary budget ($)</span>
            <input
              type="number"
              min={0}
              step={10}
              value={monthlyBudget}
              onChange={(e) => setMonthlyBudget(e.target.value)}
              placeholder="e.g. 500"
              className="mt-1 w-full px-4 py-2 rounded-card bg-tan/60 border border-dark-tan/40 text-espresso placeholder-espresso/50"
              required
            />
          </label>
          {error && (
            <div className="p-3 rounded-lg bg-terracotta/20 text-espresso text-sm">{error}</div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-card bg-cranberry text-tan font-semibold hover:bg-cranberry/90 disabled:opacity-60 transition"
          >
            {loading ? 'Saving…' : 'Finish setup'}
          </button>
        </form>
      </div>
    </div>
  )
}
