/**
 * Flora-style garden scene — 13 flowers in two staggered rows.
 * All flowers shown in ONE scene; locked ones appear as faint ghosts.
 */
import BADGE_FLOWERS, { GARDEN_LAYOUT } from '../../data/badgeFlowers'

export default function GardenScene({ unlockedBadges = [], onBadgeClick }) {
  return (
    <div
      className="garden-container relative w-full rounded-2xl overflow-hidden"
      style={{ height: '340px' }}
    >
      {/* Sky/background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #F0E6DD 0%, #E8DDD3 60%, #D4B5A0 100%)',
        }}
      />

      {/* Fence/border along the soil line */}
      <div
        className="absolute left-0 right-0 h-[6px]"
        style={{ bottom: '75px', background: '#A8896C', borderRadius: '2px' }}
      />

      {/* Ground/soil area — bottom 80px */}
      <div className="absolute bottom-0 left-0 right-0" style={{ height: '80px' }}>
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #B8976E 0%, #8B7355 50%, #6B5940 100%)',
          }}
        />
        {/* Soil texture — scattered dots */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-espresso"
              style={{
                width: (2 + (i % 3)) + 'px',
                height: (2 + (i % 3)) + 'px',
                left: (i * 13 + 5) % 100 + '%',
                top: (i * 17 + 3) % 100 + '%',
              }}
            />
          ))}
        </div>
        {/* Grass strip — top of soil, full width, repeating */}
        <div
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            bottom: '55px',
            height: '40px',
            backgroundImage: 'url(/assets/flowers/grass-strip.png)',
            backgroundRepeat: 'repeat-x',
            backgroundSize: 'auto 100%',
            backgroundPosition: 'bottom center',
          }}
        />
      </div>

      {/* Grass along upper bed (between rows) — strip at flower level */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          bottom: '85px',
          height: '35px',
          backgroundImage: 'url(/assets/flowers/grass-strip.png)',
          backgroundRepeat: 'repeat-x',
          backgroundSize: 'auto 100%',
          backgroundPosition: 'bottom center',
          opacity: 0.95,
        }}
      />

      {/* Flowers — two rows */}
      {GARDEN_LAYOUT.map(({ id, row, xPercent }) => {
        const badge = BADGE_FLOWERS[id]
        if (!badge) return null
        const isUnlocked = unlockedBadges.includes(id)
        const isBack = row === 'back'

        return (
          <div
            key={id}
            role="button"
            tabIndex={0}
            onClick={() => onBadgeClick?.(id)}
            onKeyDown={(e) => e.key === 'Enter' && onBadgeClick?.(id)}
            className="absolute flex flex-col items-center cursor-pointer select-none"
            style={{
              bottom: isBack ? '90px' : '55px',
              left: xPercent + '%',
              transform: `translateX(-50%) ${isBack ? 'scale(0.8)' : 'scale(1)'}`,
            }}
          >
            <div
              className={`relative transition-all duration-500 flex flex-col items-center ${
                isUnlocked ? 'flower-grow' : ''
              }`}
            >
              <img
                src={badge.src}
                alt={badge.name}
                className="block"
                style={{
                  height: badge.height + 'px',
                  width: 'auto',
                  filter: isUnlocked ? 'none' : 'opacity(0.9)',
                  objectFit: 'contain',
                }}
              />
              {/* Soil mound for locked flowers */}
              {!isUnlocked && (
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2"
                  style={{
                    width: '20px',
                    height: '8px',
                    background: '#8B7355',
                    borderRadius: '50% 50% 0 0',
                  }}
                />
              )}
            </div>
          </div>
        )
      })}

      <style>{`
        @keyframes flowerGrow {
          0% { transform: scaleY(0) translateY(20px); opacity: 0; }
          60% { transform: scaleY(1.1) translateY(-5px); opacity: 1; }
          80% { transform: scaleY(0.95) translateY(2px); opacity: 1; }
          100% { transform: scaleY(1) translateY(0); opacity: 1; }
        }
        .flower-grow {
          animation: flowerGrow 1s ease-out forwards;
          transform-origin: bottom center;
        }
      `}</style>
    </div>
  )
}
