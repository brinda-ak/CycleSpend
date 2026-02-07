import { useState, useEffect } from 'react'
import { logSymptom, getSymptom } from '../lib/symptoms'
import { getCurrentUser } from '../lib/auth'

const MOOD_OPTIONS = [
  { value: 1, emoji: '😔' },
  { value: 2, emoji: '😐' },
  { value: 3, emoji: '😊' },
  { value: 4, emoji: '🤩' },
]
const ENERGY_OPTIONS = [
  { value: 1, emoji: '🪫' },
  { value: 2, emoji: '💤' },
  { value: 3, emoji: '⚡' },
  { value: 4, emoji: '🔥' },
]
const CRAVING_OPTIONS = [
  { value: 1, emoji: '🌱' },
  { value: 2, emoji: '🍽️' },
  { value: 3, emoji: '🍕' },
  { value: 4, emoji: '🤤' },
]

function EmojiRow({ options, value, onChange }) {
  return (
    <div className="flex gap-2">
      {options.map(({ value: v, emoji }) => (
        <button
          key={v}
          type="button"
          onClick={() => onChange(v)}
          className={`w-11 h-11 flex items-center justify-center text-2xl rounded-full transition-all duration-200 touch-manipulation ${
            value === v ? 'scale-110 bg-tan' : 'opacity-40 hover:opacity-70'
          }`}
        >
          {emoji}
        </button>
      ))}
    </div>
  )
}

export default function SymptomCheckIn({ profile, onComplete }) {
  const [mood, setMood] = useState(null)
  const [energy, setEnergy] = useState(null)
  const [craving, setCraving] = useState(null)
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
        setCraving(data.craving)
        setDone(true)
      }
      setLoading(false)
    })
  }, [uid])

  const handleSave = async () => {
    if (!uid || mood == null || energy == null || craving == null) return
    setSaving(true)
    try {
      await logSymptom(uid, today, { mood, energy, craving }, profile.lastPeriodStart, profile.cycleLength || 28)
      setDone(true)
      onComplete?.()
    } finally {
      setSaving(false)
    }
  }

  const canSave = mood != null && energy != null && craving != null

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
          <EmojiRow options={MOOD_OPTIONS} value={mood} onChange={setMood} />
        </div>
        <div>
          <span className="text-xs text-espresso/80 block mb-2 font-sans">Energy</span>
          <EmojiRow options={ENERGY_OPTIONS} value={energy} onChange={setEnergy} />
        </div>
        <div>
          <span className="text-xs text-espresso/80 block mb-2 font-sans">Cravings</span>
          <EmojiRow options={CRAVING_OPTIONS} value={craving} onChange={setCraving} />
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
