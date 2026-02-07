/**
 * Botanical line-art PNG backgrounds — seamlessly blended, scaled to non-widgeted spaces.
 */
import { useLocation } from 'react-router-dom'

const IMAGES = {
  bouquet: '/assets/botanical-bouquet.png',
  leaves: '/assets/botanical-leaves.png',
  blooms: '/assets/botanical-blooms.png',
}

// position → { inset, size, mask, objectPosition } — big corner images, radial fade (no straight cut-offs)
const POSITIONS = {
  'top-left': {
    inset: { top: '-2%', left: '-2%' },
    size: { w: 'clamp(260px, 90vw, 400px)', h: 'clamp(280px, 65vh, 450px)' },
    mask: 'radial-gradient(ellipse 85% 85% at 0% 0%, black 0%, rgba(0,0,0,0.7) 25%, rgba(0,0,0,0.3) 50%, transparent 80%)',
    objectPosition: 'left top',
  },
  'top-right': {
    inset: { top: '-2%', right: '-2%' },
    size: { w: 'clamp(260px, 90vw, 400px)', h: 'clamp(280px, 65vh, 450px)' },
    mask: 'radial-gradient(ellipse 85% 85% at 100% 0%, black 0%, rgba(0,0,0,0.7) 25%, rgba(0,0,0,0.3) 50%, transparent 80%)',
    objectPosition: 'right top',
  },
  'bottom-left': {
    inset: { bottom: '5.5rem', left: '-2%' },
    size: { w: 'clamp(240px, 85vw, 380px)', h: 'clamp(260px, 60vh, 420px)' },
    mask: 'radial-gradient(ellipse 85% 85% at 0% 100%, black 0%, rgba(0,0,0,0.7) 25%, rgba(0,0,0,0.3) 50%, transparent 80%)',
    objectPosition: 'left bottom',
  },
  'bottom-right': {
    inset: { bottom: '5.5rem', right: '-2%' },
    size: { w: 'clamp(240px, 85vw, 380px)', h: 'clamp(260px, 60vh, 420px)' },
    mask: 'radial-gradient(ellipse 85% 85% at 100% 100%, black 0%, rgba(0,0,0,0.7) 25%, rgba(0,0,0,0.3) 50%, transparent 80%)',
    objectPosition: 'right bottom',
  },
}

// Page pathname → array of { image, position, opacity }
const PAGE_COMBOS = {
  '/': [
    { image: 'leaves', position: 'top-left', opacity: 0.4 },
    { image: 'blooms', position: 'bottom-right', opacity: 0.38 },
  ],
  '/heatmap': [
    { image: 'bouquet', position: 'top-right', opacity: 0.39 },
    { image: 'leaves', position: 'bottom-left', opacity: 0.37 },
  ],
  '/budget': [
    { image: 'blooms', position: 'top-right', opacity: 0.38 },
    { image: 'bouquet', position: 'bottom-left', opacity: 0.39 },
  ],
  '/challenges': [
    { image: 'leaves', position: 'top-left', opacity: 0.39 },
    { image: 'blooms', position: 'bottom-right', opacity: 0.38 },
  ],
  '/report': [
    { image: 'bouquet', position: 'top-right', opacity: 0.4 },
    { image: 'leaves', position: 'bottom-left', opacity: 0.37 },
  ],
  '/onboarding': [
    { image: 'blooms', position: 'top-right', opacity: 0.38 },
    { image: 'leaves', position: 'bottom-left', opacity: 0.36 },
  ],
  '/login': [
    { image: 'leaves', position: 'top-left', opacity: 0.38 },
    { image: 'blooms', position: 'bottom-right', opacity: 0.37 },
  ],
  '/rewards': [
    { image: 'blooms', position: 'top-right', opacity: 0.37 },
    { image: 'leaves', position: 'bottom-left', opacity: 0.36 },
  ],
}

export default function BotanicalBackground() {
  const { pathname } = useLocation()
  const basePath = pathname === '/' ? '/' : pathname.split('/').slice(0, 2).join('/') || pathname
  const combo = PAGE_COMBOS[basePath] || PAGE_COMBOS['/']

  return (
    <div
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-warm-bg"
      style={{ isolation: 'isolate' }}
    >
      {combo.map((item, i) => {
        const pos = POSITIONS[item.position]
        return (
          <div
            key={i}
            className="absolute bg-warm-bg"
            style={{
              ...pos.inset,
              width: pos.size.w,
              height: pos.size.h,
              isolation: 'isolate',
              WebkitMaskImage: pos.mask,
              maskImage: pos.mask,
              WebkitMaskSize: '100% 100%',
              maskSize: '100% 100%',
            }}
          >
            <img
              src={IMAGES[item.image]}
              alt=""
              aria-hidden
              className="w-full h-full object-contain mix-blend-multiply"
              style={{
                opacity: item.opacity,
                objectPosition: pos.objectPosition,
              }}
            />
          </div>
        )
      })}
    </div>
  )
}
