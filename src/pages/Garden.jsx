import { useState } from 'react'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import { BADGES, BADGE_CATEGORIES } from '../data/badges'
import PetalLeafIcon from '../components/icons/PetalLeafIcon'
import LockIcon from '../components/icons/LockIcon'

function Shelf({ category, badgesInCategory, unlockedIds, badgeEarnedDates }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex-1 h-px bg-dark-tan/40" />
        <span className="font-display font-bold text-sm text-burgundy">{category.label}</span>
        <div className="flex-1 h-px bg-dark-tan/40" />
      </div>
      {/* Wooden shelf */}
      <div
        className="relative rounded-lg overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #C9A86C 0%, #A8896C 50%, #8B7355 100%)',
          boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.2), 0 4px 8px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.08)',
        }}
      >
        {/* Shelf surface */}
        <div className="px-4 pt-4 pb-8 min-h-[140px] flex flex-wrap justify-around items-end gap-2 relative">
          {badgesInCategory.map((badge) => {
            const unlocked = unlockedIds.includes(badge.id)
            const earnedAt = badgeEarnedDates?.[badge.id]
            const flowerW = 64
            const flowerH = 80
            return (
              <div
                key={badge.id}
                className="flex flex-col items-center relative z-10"
                style={{
                  animation: unlocked ? 'growUp 1s ease-out forwards' : 'none',
                  minWidth: flowerW,
                }}
              >
                <div
                  className="flex items-end justify-center overflow-hidden rounded-lg"
                  style={{ width: flowerW, height: flowerH, background: 'transparent' }}
                >
                  {unlocked ? (
                    <img
                      src={badge.img}
                      alt={badge.name}
                      className="w-full h-full object-cover object-center"
                      style={{ objectPosition: badge.imgPos || 'center' }}
                    />
                  ) : (
                    <div className="relative w-full h-full">
                      <img
                        src={badge.img}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover object-center opacity-35"
                        style={{ objectPosition: badge.imgPos || 'center' }}
                      />
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#8B7355]/60" />
                    </div>
                  )}
                </div>
                <span
                  className={`font-display font-bold text-sm text-center mt-2 block ${
                    unlocked ? 'text-burgundy' : 'text-dusty-rose/50'
                  }`}
                >
                  {badge.name}
                </span>
                {unlocked && earnedAt && (
                  <span className="text-[10px] text-dusty-rose font-sans">{earnedAt}</span>
                )}
                {!unlocked && (
                  <div className="flex items-center justify-center gap-0.5 mt-0.5 text-dusty-rose">
                    <LockIcon size={8} className="text-dusty-rose" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
        {/* Shelf front lip - wood edge */}
        <div
          className="absolute bottom-0 left-0 right-0 h-3"
          style={{
            background: 'linear-gradient(180deg, #8B7355 0%, #6B5344 100%)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        />
      </div>
    </div>
  )
}

export default function Garden({ profile, onClose }) {
  const [isOpen] = useState(true)
  const petals = profile?.petals ?? 0
  const unlockedIds = profile?.badges ?? []
  const badgeEarnedDates = profile?.badgeHistory?.reduce((acc, h) => {
    acc[h.badgeId] = h.earnedAt
    return acc
  }, {}) ?? {}

  const badgesByCategory = BADGE_CATEGORIES.map((cat) => ({
    ...cat,
    badges: BADGES.filter((b) => b.category === cat.id),
  }))
  const unlockedCount = unlockedIds.length

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 max-w-[430px] mx-auto bg-warm-bg overflow-auto">
      <header className="sticky top-0 z-10 bg-warm-bg/95 backdrop-blur px-5 py-4 flex items-center justify-between border-b border-dark-tan/20">
        <h1 className="font-display font-bold text-xl text-burgundy">Your Garden</h1>
        {onClose ? (
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-dark-tan/30 transition-colors"
            aria-label="Close"
          >
            <X size={24} className="text-burgundy" />
          </button>
        ) : (
          <Link
            to="/"
            className="p-2 rounded-full hover:bg-dark-tan/30 transition-colors"
            aria-label="Back"
          >
            <X size={24} className="text-burgundy" />
          </Link>
        )}
      </header>

      <div className="px-5 py-4">
        <p className="font-sans text-sm text-espresso/80 mb-4">
          Grow your collection with every milestone
        </p>
        <p className="font-sans text-sm text-dusty-rose mb-6">
          {unlockedCount} of {BADGES.length} blooms planted
        </p>

        {badgesByCategory.map((cat) => (
          <Shelf
            key={cat.id}
            category={cat}
            badgesInCategory={cat.badges}
            unlockedIds={unlockedIds}
            badgeEarnedDates={badgeEarnedDates}
          />
        ))}

        {/* Your Petals */}
        <div className="rounded-2xl p-4 bg-tan mt-6">
          <div className="flex items-center gap-3">
            <PetalLeafIcon size={24} className="text-fern shrink-0" />
            <div>
              <span className="font-display font-bold text-2xl text-fern">{petals}</span>
              <span className="font-sans text-sm text-dusty-rose ml-1">petals</span>
            </div>
          </div>
          <p className="font-sans text-xs text-dusty-rose italic mt-2">
            Earn petals by completing challenges and logging symptoms
          </p>
        </div>
      </div>

      <style>{`
        @keyframes growUp {
          0% { transform: scaleY(0); transform-origin: bottom center; }
          100% { transform: scaleY(1); transform-origin: bottom center; }
        }
      `}</style>
    </div>
  )
}
