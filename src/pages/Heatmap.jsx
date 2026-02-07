import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { getTransactionsFromFirestore } from '../lib/nessieSync'
import { getCurrentUser } from '../lib/auth'
import { spendToColor } from '../utils/colorUtils'
import { getCycleDayAndPhase, getPhaseColor, getPhaseLabel, PHASES } from '../utils/cycleUtils'

function DayDetailModal({ date, spend, transactions, phaseInfo, onClose }) {
  if (!date) return null
  const phaseLabel = phaseInfo ? getPhaseLabel(phaseInfo.phase) : ''
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      <div className="bg-espresso/50 absolute inset-0 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-[430px] min-h-[65vh] max-h-[90vh] bg-tan rounded-t-[28px] shadow-2xl overflow-hidden animate-slide-up"
        style={{ borderTop: `4px solid ${phaseInfo ? getPhaseColor(phaseInfo.phase) : '#7A4B5E'}`, boxShadow: '0 -4px 30px rgba(44,26,31,0.2)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 flex justify-between items-center border-b border-dark-tan/30">
          <h3 className="font-display font-bold text-burgundy">
            {new Date(date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-dark-tan/30 transition-colors">
            <X size={22} className="text-espresso" />
          </button>
        </div>
        <div className="p-5 overflow-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-display font-bold text-2xl text-burgundy">${spend.toFixed(2)}</span>
            {phaseInfo && (
              <span className="px-3 py-1 rounded-full text-white text-sm font-sans" style={{ backgroundColor: getPhaseColor(phaseInfo.phase) }}>
                {phaseLabel} · Day {phaseInfo.day}
              </span>
            )}
          </div>
          {transactions?.length > 0 ? (
            <ul className="space-y-3 max-h-48 overflow-y-auto">
              {transactions.map((t) => (
                <li key={t.id} className="flex justify-between py-2 border-b border-dark-tan/30 last:border-0 font-sans text-sm">
                  <span className="text-espresso">{t.description || t.category}</span>
                  <span className="font-semibold text-burgundy">${t.amount?.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-espresso/70 text-sm font-sans">No transactions this day</p>
          )}
        </div>
      </div>
    </div>
  )
}


export default function Heatmap({ profile }) {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDay, setSelectedDay] = useState(null)
  const [monthOffset, setMonthOffset] = useState(0)

  const uid = getCurrentUser()?.uid
  const lastPeriod = profile?.lastPeriodStart || ''
  const cycleLength = profile?.cycleLength || 28
  const today = new Date().toISOString().slice(0, 10)

  useEffect(() => {
    if (!uid) return
    getTransactionsFromFirestore(uid).then((txns) => {
      setTransactions(txns)
      setLoading(false)
    })
  }, [uid])

  const now = new Date()
  const viewDate = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1)
  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const byDate = {}
  transactions.forEach((t) => {
    const d = t.date?.slice(0, 10)
    if (d) byDate[d] = (byDate[d] || 0) + (t.amount || 0)
  })

  const amounts = Object.values(byDate).filter(Boolean)
  const minSpend = amounts.length ? Math.min(...amounts, 0) : 0
  const maxSpend = amounts.length ? Math.max(...amounts, 1) : 1

  const days = []
  for (let i = 0; i < firstDay; i++) days.push(null)
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(`${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`)
  }

  const selectedSpend = selectedDay ? byDate[selectedDay] || 0 : 0
  const selectedTxns = selectedDay ? transactions.filter((t) => t.date?.slice(0, 10) === selectedDay) : []
  const selectedPhase = selectedDay && lastPeriod ? getCycleDayAndPhase(lastPeriod, selectedDay, cycleLength) : null

  const phaseColors = [
    { phase: PHASES.MENSTRUAL, color: '#5B1A2E' },
    { phase: PHASES.FOLLICULAR, color: '#7A4B5E' },
    { phase: PHASES.OVULATORY, color: '#8B2942' },
    { phase: PHASES.LUTEAL, color: '#B56B4A' },
  ]

  // Group days into weeks for phase band tinting
  const weeks = []
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }

  return (
    <div className="max-w-[430px] mx-auto">
      {/* Hero */}
      <div className="bg-dark-tan px-5 pt-6 pb-8 rounded-b-2xl shadow-card">
        <h1 className="font-display font-bold text-2xl text-burgundy">Cycle-Spend Heatmap</h1>
        <p className="font-sans text-espresso/80 text-sm mt-1">See how your spending maps to your cycle</p>
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => setMonthOffset((m) => m - 1)}
            className="p-2 rounded-full bg-tan/80 text-burgundy hover:bg-tan transition-all hover:scale-105 active:scale-95"
          >
            <ChevronLeft size={24} />
          </button>
          <span className="font-display font-semibold text-burgundy">
            {viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </span>
          <button
            onClick={() => setMonthOffset((m) => m + 1)}
            className="p-2 rounded-full bg-tan/80 text-burgundy hover:bg-tan transition-all hover:scale-105 active:scale-95"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="px-5 py-6 bg-warm-bg">
        {loading ? (
          <div className="text-espresso/70 font-sans">Loading…</div>
        ) : (
          <div className="rounded-2xl p-5 bg-tan/60 shadow-card border border-dark-tan/30">
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => (
                <div key={d} className="text-center text-xs text-dusty-rose font-sans font-semibold py-1">{d}</div>
              ))}
              {days.map((dateStr, i) => {
                if (!dateStr) return <div key={`e-${i}`} />
                const spend = byDate[dateStr] || 0
                const color = spendToColor(spend, minSpend, maxSpend)
                const isToday = dateStr === today
                const phaseInfoForDay = lastPeriod ? getCycleDayAndPhase(lastPeriod, dateStr, cycleLength) : null
                const phaseColor = phaseInfoForDay ? getPhaseColor(phaseInfoForDay.phase) : 'transparent'
                return (
                  <button
                    key={dateStr}
                    onClick={() => setSelectedDay(dateStr)}
                    className={`aspect-square min-h-[44px] rounded-xl flex flex-col items-center justify-center text-xs font-sans font-medium transition-colors duration-150 touch-manipulation active:opacity-90 ${isToday ? 'ring-2 ring-cranberry ring-inset' : ''}`}
                    style={{
                      backgroundColor: color,
                      color: spend > (minSpend + maxSpend) / 2 ? '#F0E6DD' : '#2C1A1F',
                      boxShadow: isToday ? 'none' : '0 1px 3px rgba(44,26,31,0.06)',
                      border: `2px solid ${phaseColor}`,
                    }}
                  >
                    <span>{new Date(dateStr).getDate()}</span>
                    {spend > 0 && <span className="text-[10px] opacity-80">${Math.round(spend)}</span>}
                  </button>
                )
              })}
            </div>

            {/* Legend */}
            <div className="mt-5 pt-4 border-t border-dark-tan/40 space-y-3">
              <div className="flex items-center justify-between gap-2">
                {phaseColors.map(({ phase, color }) => (
                  <span key={phase} className="flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-md shadow-sm" style={{ backgroundColor: color }} />
                    <span className="text-[11px] text-espresso/80 font-sans">{getPhaseLabel(phase)}</span>
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-espresso/70 font-sans">Low</span>
                <div className="flex-1 h-3 rounded-full overflow-hidden flex shadow-inner">
                  <div className="flex-1 bg-[#F0E6DD]" />
                  <div className="flex-1 bg-[#C4A088]" />
                  <div className="flex-1 bg-[#8B2942]" />
                </div>
                <span className="text-xs text-espresso/70 font-sans">High</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {selectedDay && (
        <DayDetailModal
          date={selectedDay}
          spend={selectedSpend}
          transactions={selectedTxns}
          phaseInfo={selectedPhase}
          onClose={() => setSelectedDay(null)}
        />
      )}
    </div>
  )
}
