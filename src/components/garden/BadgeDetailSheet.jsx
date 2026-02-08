/**
 * Bottom sheet modal showing badge detail — flower, name, rarity, description, progress.
 */
import BADGE_FLOWERS, { BADGE_DESCRIPTIONS } from '../../data/badgeFlowers'

const RARITY_STYLES = {
  common: { bg: 'bg-dusty-rose/30', text: 'text-espresso' },
  uncommon: { bg: 'bg-mauve/30', text: 'text-espresso' },
  rare: { bg: 'bg-cranberry/30', text: 'text-white' },
  legendary: { bg: 'bg-fern/30', text: 'text-espresso' },
}

export default function BadgeDetailSheet({ badgeId, unlocked, earnedAt, onClose }) {
  if (!badgeId) return null
  const badge = BADGE_FLOWERS[badgeId]
  const info = BADGE_DESCRIPTIONS[badgeId]
  if (!badge || !info) return null

  const rarityStyle = RARITY_STYLES[info.rarity] || RARITY_STYLES.common

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center"
      onClick={onClose}
      aria-hidden
    >
      <div className="absolute inset-0 bg-espresso/50 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-[430px] bg-tan rounded-t-[28px] shadow-2xl overflow-hidden animate-slide-up"
        style={{ boxShadow: '0 -4px 30px rgba(44,26,31,0.2)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div
            className="w-10 h-1 rounded-full"
            style={{ background: '#C4A088' }}
          />
        </div>

        <div className="px-5 pb-8">
          {/* Flower image */}
          <div className="flex justify-center mb-3">
            <img
              src={badge.src}
              alt={badge.name}
              className="block"
              style={{
                height: '150px',
                width: 'auto',
                filter: unlocked ? 'none' : 'grayscale(100%) brightness(1.5) opacity(0.2)',
                objectFit: 'contain',
              }}
            />
          </div>

          {/* Badge name */}
          <h2 className="font-display font-bold text-xl text-burgundy text-center mb-1">
            {badge.name}
          </h2>

          {/* Rarity pill */}
          <div className="flex justify-center mb-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-sans font-semibold capitalize ${rarityStyle.bg} ${rarityStyle.text}`}
            >
              {info.rarity}
            </span>
          </div>

          {/* Description */}
          <p className="font-sans text-sm text-espresso mb-4 text-center">
            {info.desc}
          </p>

          {/* Progress bar (if locked) */}
          {!unlocked && info.progress && (
            <div className="mb-4">
              <div className="flex justify-between text-xs font-sans text-espresso/80 mb-1">
                <span>Progress</span>
                <span>
                  {info.progress.current} of {info.progress.total}
                </span>
              </div>
              <div
                className="h-[6px] rounded-full overflow-hidden"
                style={{ background: '#C4A08844' }}
              >
                <div
                  className="h-full rounded-full bg-cranberry transition-all"
                  style={{
                    width: `${Math.min(
                      100,
                      (info.progress.current / info.progress.total) * 100
                    )}%`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Earned info (if unlocked) */}
          {unlocked && earnedAt && (
            <p className="font-sans text-sm text-fern font-semibold text-center">
              Earned on {new Date(earnedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          )}

          <button
            onClick={onClose}
            className="mt-4 w-full py-3 rounded-xl bg-burgundy text-tan font-sans font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
