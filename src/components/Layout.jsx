import { Outlet, Link, useLocation } from 'react-router-dom'
import { getCurrentPhase, getPhaseColor } from '../utils/cycleUtils'
import { Home, Calendar, Wallet, Target, BarChart2 } from 'lucide-react'
import ProfileMenu from './ProfileMenu'
import BotanicalBackground from './BotanicalBackground'
import LeafIcon from './LeafIcon'

const navItems = [
  { path: '/', label: 'Home', Icon: Home },
  { path: '/heatmap', label: 'Heatmap', Icon: Calendar },
  { path: '/budget', label: 'Budget', Icon: Wallet },
  { path: '/challenges', label: 'Challenges', Icon: Target },
  { path: '/report', label: 'Report', Icon: BarChart2 },
]

export default function Layout({ profile }) {
  const location = useLocation()
  const phaseInfo = profile?.lastPeriodStart
    ? getCurrentPhase(profile.lastPeriodStart, profile.cycleLength || 28)
    : null

  return (
    <div className="min-h-screen min-h-[100dvh] bg-warm-bg flex flex-col max-w-[430px] mx-auto relative overflow-hidden">
      <BotanicalBackground />
      <header className="relative z-20 bg-burgundy text-tan px-5 py-3 flex items-center justify-between gap-2 shadow-card pt-[max(0.75rem,env(safe-area-inset-top))]">
        <span className="font-display font-bold text-lg">CycleSpend</span>
        <div className="flex items-center gap-2">
          <Link
            to="/rewards"
            className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-burgundy/80 transition-colors"
            title="Your points & rewards"
          >
            <LeafIcon size={18} className="text-rewards-green" />
            <span className="text-sm font-sans font-semibold text-tan">{(profile?.points ?? 0)}</span>
          </Link>
          {phaseInfo && (
            <span
              className="text-xs px-3 py-1 rounded-full font-medium text-white shrink-0"
              style={{ backgroundColor: getPhaseColor(phaseInfo.phase) }}
            >
              {phaseInfo.phaseLabel} · Day {phaseInfo.day}
            </span>
          )}
          <ProfileMenu profile={profile} />
        </div>
      </header>

      <main className="relative z-10 flex-1 overflow-auto pb-28">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-burgundy border-t border-burgundy/80 flex justify-around py-2 pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] pb-[max(0.5rem,env(safe-area-inset-bottom))] z-50">
        {navItems.map(({ path, label, Icon }) => {
          const isActive = path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center justify-center gap-0.5 py-3 px-3 min-h-[56px] rounded-lg transition-all duration-200 touch-manipulation active:scale-95 ${
                isActive ? 'text-tan' : 'text-dusty-rose/60 hover:text-tan active:text-tan/80'
              }`}
            >
              <Icon size={24} strokeWidth={2} aria-hidden />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
