import { Outlet } from 'react-router-dom'
import { Link, useLocation } from 'react-router-dom'
import { getCurrentPhase } from '../utils/cycleUtils'
import { getPhaseColor } from '../utils/cycleUtils'

const navItems = [
  { path: '/', label: 'Home', icon: '🏠' },
  { path: '/heatmap', label: 'Heatmap', icon: '📅' },
  { path: '/budget', label: 'Budget', icon: '💰' },
  { path: '/challenges', label: 'Challenges', icon: '🎯' },
  { path: '/report', label: 'Report', icon: '📊' },
]

export default function Layout({ profile }) {
  const location = useLocation()
  const phaseInfo = profile?.lastPeriodStart
    ? getCurrentPhase(profile.lastPeriodStart, profile.cycleLength || 28)
    : null

  return (
    <div className="min-h-screen bg-warm-bg flex flex-col">
      <header className="bg-burgundy text-tan px-4 py-3 flex items-center justify-between shadow-card">
        <span className="font-display font-semibold text-lg">CycleSpend</span>
        {phaseInfo && (
          <span
            className="text-xs px-2 py-1 rounded-full font-medium text-white"
            style={{ backgroundColor: getPhaseColor(phaseInfo.phase) }}
          >
            {phaseInfo.phaseLabel} · Day {phaseInfo.day}
          </span>
        )}
      </header>

      <main className="flex-1 overflow-auto pb-20">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-burgundy border-t border-burgundy/80 flex justify-around py-2 safe-area-pb">
        {navItems.map(({ path, label, icon }) => {
          const isActive = path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg transition-colors ${
                isActive ? 'bg-cranberry text-tan' : 'text-dusty-rose/60 hover:text-tan'
              }`}
            >
              <span className="text-lg">{icon}</span>
              <span className="text-xs font-medium">{label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
