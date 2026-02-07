import { Link } from 'react-router-dom'
import { Gift, ChevronLeft } from 'lucide-react'
import LeafIcon from '../components/LeafIcon'
import { PROMOTIONS } from '../data/promotions'

export default function Rewards({ profile }) {
  const points = profile?.points ?? 0

  return (
    <div className="max-w-[430px] mx-auto">
      {/* Hero */}
      <div className="bg-tan px-5 pt-6 pb-8 rounded-b-2xl flex items-center justify-between">
        <Link to="/" className="p-2 -ml-2 rounded-full hover:bg-dark-tan/30 transition-colors" aria-label="Back">
          <ChevronLeft size={24} className="text-burgundy" />
        </Link>
        <div>
          <h1 className="font-display font-bold text-2xl text-burgundy">Rewards</h1>
          <p className="font-sans text-espresso/80 text-sm mt-1">Redeem points for coupons & promotions</p>
        </div>
        <div className="w-10" />
      </div>

      <div className="px-5 py-6 bg-warm-bg space-y-6">
        {/* Points balance */}
        <div className="rounded-2xl p-5 bg-tan shadow-card border-l-4 border-rewards-green flex items-center gap-4">
          <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: '#6B7F5E22' }}>
            <LeafIcon size={28} className="text-rewards-green" />
          </div>
          <div>
            <p className="font-sans text-espresso/70 text-sm">Your balance</p>
            <p className="font-display font-bold text-2xl text-burgundy">{points} points</p>
            <p className="font-sans text-xs text-espresso/60">Earn more by completing challenges</p>
          </div>
        </div>

        {/* Promotions grid */}
        <div>
          <h2 className="font-display font-bold text-burgundy mb-3">Coupons & promotions</h2>
          <div className="space-y-3">
            {PROMOTIONS.map((promo) => {
              const canAfford = points >= promo.cost
              return (
                <div
                  key={promo.id}
                  className={`rounded-2xl p-4 shadow-card border-l-4 transition-opacity ${
                    canAfford ? 'bg-tan border-rewards-green' : 'bg-tan/60 border-dark-tan/50 opacity-75'
                  }`}
                >
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-semibold text-burgundy">{promo.partner}</p>
                      <p className="font-sans text-sm text-espresso">{promo.discount}</p>
                      <p className="font-mono text-xs text-espresso/80 mt-1 tracking-wider">{promo.code}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <LeafIcon size={16} className="text-rewards-green" />
                      <span className="font-sans font-semibold text-espresso text-sm">{promo.cost} pts</span>
                    </div>
                  </div>
                  <button
                    disabled={!canAfford}
                    className={`mt-3 w-full py-2 rounded-xl font-sans font-semibold text-sm transition-all ${
                      canAfford
                        ? 'bg-rewards-green text-white hover:opacity-90 active:scale-[0.98]'
                        : 'bg-dark-tan/30 text-espresso/50 cursor-not-allowed'
                    }`}
                  >
                    {canAfford ? 'Redeem' : `Need ${promo.cost - points} more pts`}
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        <p className="font-sans text-xs text-espresso/60 text-center">
          Complete challenges on the Cycle Cushion page to earn more points.
        </p>
      </div>
    </div>
  )
}
