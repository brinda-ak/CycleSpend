import { useState, useEffect } from 'react'
import { Frown, Meh, Smile, Heart, BatteryLow, Moon, Zap, Flame } from 'lucide-react'
import { logSymptom, getSymptom } from '../lib/symptoms'
import { getCurrentUser } from '../lib/auth'

const MOOD_OPTIONS = [
  { value: 1, icon: Frown, label: 'Low' },
  { value: 2, icon: Meh, label: 'Okay' },
  { value: 3, icon: Smile, label: 'Good' },
  { value: 4, icon: Heart, label: 'Great' },
]
const ENERGY_OPTIONS = [
  { value: 1, icon: BatteryLow, label: 'Low' },
  { value: 2, icon: Moon, label: 'Tired' },
  { value: 3, icon: Zap, label: 'Okay' },
  { value: 4, icon: Flame, label: 'High' },
]
function IconRow({ options, value, onChange }) {
  return (
    <div className="flex gap-2">
      {options.map(({ value: v, icon: Icon, label }) => (
        <button
          key={v}
          type="button"
          onClick={() => onChange(v)}
          title={label}
          className={`w-11 h-11 flex items-center justify-center rounded-full transition-all duration-200 touch-manipulation ${
            value === v ? 'scale-110 bg-tan text-burgundy' : 'opacity-40 hover:opacity-70 text-espresso'
          }`}
        >
          <Icon size={22} strokeWidth={2} />
        </button>
      ))}
    </div>
  )
}

export default function SymptomCheckIn({ profile, onComplete }) {
  const [mood, setMood] = useState(null)
  const [energy, setEnergy] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [done, setDone] = useState(false)

  const uid = getCurrentUser()?.uid
  const today = new Date().toISOString().slice(0, 10)

  useEffect(() => {
    if (!uid) return
    getSymptom(uid, today).then((data) => {
      if (data) {
        setMood(data.mood)
        setEnergy(data.energy)
        setDone(true)
      }
      setLoading(false)
    })
  }, [uid])

  const handleSave = async () => {
    if (!uid || mood == null || energy == null) return
    setSaving(true)
    try {
      await logSymptom(uid, today, { mood, energy }, profile.lastPeriodStart, profile.cycleLength || 28)
      setDone(true)
      onComplete?.()
    } finally {
      setSaving(false)
    }
  }

  const canSave = mood != null && energy != null

  if (loading) return null
  if (done) {
    return (
      <div className="rounded-2xl p-5 bg-tan/60 border-l-4 border-mauve shadow-card">
        <p className="text-espresso font-medium text-sm font-sans">Today&apos;s check-in complete</p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl p-5 shadow-card bg-tan border-l-4 border-mauve">
      <h3 className="font-display font-bold text-burgundy mb-4">How are you feeling today?</h3>
      <div className="space-y-5">
        <div>
          <span className="text-xs text-espresso/80 block mb-2 font-sans">Mood</span>
          <IconRow options={MOOD_OPTIONS} value={mood} onChange={setMood} />
        </div>
        <div>
          <span className="text-xs text-espresso/80 block mb-2 font-sans">Energy</span>
          <IconRow options={ENERGY_OPTIONS} value={energy} onChange={setEnergy} />
        </div>
      </div>
      <button
        onClick={handleSave}
        disabled={!canSave || saving}
        className="mt-5 w-full py-3 rounded-xl bg-cranberry text-white font-semibold disabled:opacity-50 font-sans"
      >
        {saving ? 'Saving…' : 'Save'}
      </button>
    </div>
  )
}
