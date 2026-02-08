import { useState } from 'react'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import { BADGE_CATEGORIES_LEGEND } from '../data/badgeFlowers'
import PetalLeafIcon from '../components/icons/PetalLeafIcon'
import GardenScene from '../components/garden/GardenScene'
import BadgeDetailSheet from '../components/garden/BadgeDetailSheet'

const ALL_BADGE_IDS = [
  'first-bloom', 'rooted', 'perennial', 'seedling', 'bouquet', 'meadow',
  'first-petal', 'full-bloom-cushion', 'overflowing',
  'tendril', 'ivy', 'luteal-legend', 'wildflower',
]

export default function Garden({ profile, onClose }) {
  const [selectedBadgeId, setSelectedBadgeId] = useState(null)

  const petals = profile?.petals ?? 0
  const unlockedIds = profile?.badges ?? []
  const badgeEarnedDates = profile?.badgeHistory?.reduce((acc, h) => {
    acc[h.badgeId] = h.earnedAt
    return acc
  }, {}) ?? {}

  const unlockedCount = unlockedIds.length

  return (
    <div className="fixed inset-0 z-50 max-w-[430px] mx-auto bg-warm-bg overflow-auto">
      <header className="sticky top-0 z-10 bg-warm-bg/95 backdrop-blur px-5 py-4 flex items-center justify-between border-b border-dark-tan/20">
        <h1 className="font-display font-bold text-xl text-burgundy">Your Garden</h1>
        <div className="flex items-center gap-2">
          <span className="font-sans text-sm text-dusty-rose">
            {unlockedCount} of {ALL_BADGE_IDS.length} planted
          </span>
          {onClose ? (
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-dark-tan/30 transition-colors ml-auto"
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
        </div>
      </header>

      <div className="px-5 py-4 pb-32">
        <p className="font-sans text-sm text-espresso/80 mb-1">
          Grow your collection with every milestone
        </p>
        <p className="font-sans text-xs text-dusty-rose mb-4">
          Tap any flower to see details
        </p>

        {/* Garden scene — single flora-style view */}
        <GardenScene
          unlockedBadges={unlockedIds}
          onBadgeClick={setSelectedBadgeId}
        />

        {/* Category legend */}
        <div className="mt-6 space-y-3">
          {BADGE_CATEGORIES_LEGEND.map((category) => (
            <div key={category.name} className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: category.color }}
              />
              <span className="text-xs font-sans text-espresso font-semibold w-24 flex-shrink-0">
                {category.name}
              </span>
              <div className="flex gap-1.5 flex-wrap">
                {category.badges.map((id) => {
                  const isUnlocked = unlockedIds.includes(id)
                  return (
                    <button
                      key={id}
                      onClick={() => setSelectedBadgeId(id)}
                      className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${
                        isUnlocked
                          ? 'border-fern bg-fern/20'
                          : 'border-dark-tan bg-warm-bg'
                      }`}
                      aria-label={`${id} - ${isUnlocked ? 'unlocked' : 'locked'}`}
                    >
                      {isUnlocked && (
                        <svg width="12" height="10" viewBox="0 0 10 8" fill="none" className="flex-shrink-0">
                          <path d="M1 4L3.5 6.5L9 1" stroke="#6B7F5E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Your Petals */}
        <div className="rounded-2xl p-4 bg-[#FAF7F5] border border-tan/80 mt-6 mb-4">
          <div className="flex items-center gap-3">
            <PetalLeafIcon size={24} className="text-fern shrink-0" />
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-bold text-2xl text-espresso">{petals}</span>
              <span className="font-sans text-sm text-dusty-rose">petals</span>
            </div>
          </div>
          <p className="font-sans text-xs text-dusty-rose italic mt-2">
            Earn petals by completing challenges and logging symptoms
          </p>
        </div>
      </div>

      {/* Badge detail bottom sheet */}
      {selectedBadgeId && (
        <BadgeDetailSheet
          badgeId={selectedBadgeId}
          unlocked={unlockedIds.includes(selectedBadgeId)}
          earnedAt={badgeEarnedDates?.[selectedBadgeId]}
          onClose={() => setSelectedBadgeId(null)}
        />
      )}
    </div>
  )
}
