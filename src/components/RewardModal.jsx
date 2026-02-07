import { Gift } from 'lucide-react'
import PetalLeafIcon from './icons/PetalLeafIcon'

const PROMO_CODES = [
  { code: 'CYCLESAVE15', discount: '15% off', partner: 'Thinx' },
  { code: 'SAVE20', discount: '$20 off', partner: 'Cora' },
  { code: 'WELLNESS10', discount: '10% off', partner: 'Ritual' },
  { code: 'SELFcare25', discount: '25% off', partner: 'Care/Of' },
]

function randomPromo() {
  return PROMO_CODES[Math.floor(Math.random() * PROMO_CODES.length)]
}

export default function RewardModal({ onClose, type = 'challenge', pointsEarned = 0 }) {
  const promo = randomPromo()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-espresso/50 absolute inset-0 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-sm bg-tan rounded-2xl shadow-2xl overflow-hidden border-2 border-cranberry/30 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-cranberry/20 flex items-center justify-center mx-auto mb-4">
            <Gift size={32} className="text-cranberry" />
          </div>
          <h3 className="font-display font-bold text-xl text-burgundy mb-2">
            {type === 'target' ? "You hit your goal!" : "Nice work!"}
          </h3>
          <p className="font-sans text-espresso/80 text-sm mb-2">
            {type === 'target'
              ? "Your Cycle Cushion is full. Enjoy this reward!"
              : "Here's a little thank-you for completing today's challenge."}
          </p>
          {pointsEarned > 0 && (
            <p className="font-sans text-espresso/90 text-sm font-semibold mb-4 flex items-center justify-center gap-1">
              <PetalLeafIcon size={14} className="text-fern" />
              +{pointsEarned} petals earned
            </p>
          )}
          <div className="rounded-xl bg-warm-bg border-2 border-dashed border-mauve/50 p-4 mb-4">
            <p className="font-sans text-xs text-espresso/70 mb-1">Your reward</p>
            <p className="font-display font-bold text-burgundy text-lg tracking-wider">{promo.code}</p>
            <p className="font-sans text-sm text-espresso mt-1">{promo.discount} at {promo.partner}</p>
          </div>
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-cranberry text-white font-sans font-semibold"
          >
            Claim & continue
          </button>
        </div>
      </div>
    </div>
  )
}
