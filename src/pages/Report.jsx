import { useState } from 'react'
import { BarChart2 } from 'lucide-react'
import { getPhaseColor, PHASES } from '../utils/cycleUtils'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts'
import { generateCycleSummary } from '../lib/gemini'

const phaseOrder = [PHASES.MENSTRUAL, PHASES.FOLLICULAR, PHASES.OVULATORY, PHASES.LUTEAL]

export default function Report({ profile }) {
  const [aiSummary, setAiSummary] = useState(null)
  const [loading, setLoading] = useState(false)

  const phaseSpends = { menstrual: 85, follicular: 92, ovulatory: 45, luteal: 178 }
  const categoryBreakdowns = { food_delivery: 120, coffee: 45, online_shopping: 95, groceries: 80, dining_out: 65 }
  const cushionStats = { saved: 47, overspend: 45, net: 2 }
  const cycleDates = 'Dec 10 – Jan 6'

  const chartData = phaseOrder.map((p) => ({ phase: p.charAt(0).toUpperCase() + p.slice(1), spend: phaseSpends[p] || 0, fill: getPhaseColor(p) }))
  const categoryData = Object.entries(categoryBreakdowns)
    .map(([name, value]) => ({ name: name.replace('_', ' '), value }))
    .sort((a, b) => b.value - a.value)

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const summary = await generateCycleSummary({ phaseSpends, categoryBreakdowns, cushionStats })
      setAiSummary(summary)
    } catch (e) {
      setAiSummary('Could not generate AI summary. ' + (e.message || ''))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-[430px] mx-auto">
      {/* Hero - burgundy */}
      <div className="bg-burgundy px-5 pt-6 pb-8 rounded-b-2xl text-tan">
        <h1 className="font-display font-bold text-2xl">Cycle Report</h1>
        <p className="font-sans text-tan/90 text-sm mt-1">Cycle {cycleDates}</p>
        <span className="inline-block mt-2 px-3 py-1 rounded-full bg-tan/20 text-tan text-xs font-sans">Cycle 1</span>
      </div>

      <div className="px-5 py-6 bg-warm-bg space-y-6">
        {/* Phase spending breakdown */}
        <div className="space-y-3">
          <h2 className="font-display font-bold text-burgundy">Phase spending</h2>
          {phaseOrder.map((phase) => (
            <div key={phase} className="rounded-2xl p-4 bg-tan shadow-card flex items-center gap-3">
              <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: getPhaseColor(phase) }} />
              <div className="flex-1">
                <span className="font-display font-semibold text-burgundy capitalize">{phase}</span>
                <p className="font-sans text-espresso text-sm">${phaseSpends[phase] || 0} spent</p>
              </div>
              <span className="font-sans text-sm text-cranberry">↓ 12% vs last</span>
            </div>
          ))}
        </div>

        {/* Category chart */}
        <div className="rounded-2xl p-5 bg-tan shadow-card">
          <h2 className="font-display font-bold text-burgundy mb-4">Categories</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical" margin={{ left: 0, right: 20 }}>
                <XAxis type="number" tick={{ fontSize: 12 }} stroke="#9E6B73" />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={90} stroke="#9E6B73" />
                <Bar dataKey="value" fill="#8B2942" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cushion performance */}
        <div className="rounded-2xl p-5 bg-tan shadow-card border-l-4 border-cranberry">
          <h2 className="font-display font-bold text-burgundy mb-2">Cycle Cushion performance</h2>
          <p className="font-sans text-espresso text-sm">Saved $47 → Covered 100% of luteal overspend</p>
        </div>

        {/* AI Summary */}
        <div className="rounded-2xl p-5 shadow-card bg-cranberry text-tan">
          <h2 className="font-display font-bold text-lg flex items-center gap-2">
            <BarChart2 size={22} /> AI Summary
          </h2>
          {aiSummary ? (
            <p className="font-sans text-sm mt-3 leading-relaxed opacity-95">{aiSummary}</p>
          ) : (
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="mt-4 w-full py-3 rounded-xl bg-tan text-cranberry font-sans font-semibold disabled:opacity-60"
            >
              {loading ? 'Generating…' : 'Generate AI summary'}
            </button>
          )}
        </div>

        {/* Next cycle forecast */}
        <div className="rounded-2xl p-5 bg-tan shadow-card">
          <h2 className="font-display font-bold text-burgundy mb-2">Next cycle</h2>
          <p className="font-sans text-espresso text-sm mb-4">Suggested cushion target: $50</p>
          <button className="w-full py-3 rounded-xl bg-cranberry text-white font-sans font-semibold">
            Start next cycle →
          </button>
        </div>
      </div>
    </div>
  )
}
