/**
 * Badge flower wrapper — renders the appropriate botanical SVG.
 * Locked: opacity 0.35, single stroke color.
 * Unlocked: opacity 1, burgundy blooms + fern stems/leaves.
 */
import { BADGE_FLOWERS, BURGUNDY, FERN } from './badges'

export default function BadgeFlower({ flower, locked = false, className = '' }) {
  const Component = BADGE_FLOWERS[flower] || BADGE_FLOWERS.daisy
  const stroke = BURGUNDY
  const leafStroke = locked ? BURGUNDY : FERN
  const opacity = locked ? 0.35 : 1

  return (
    <div className={className} style={{ opacity }}>
      <Component stroke={stroke} leafStroke={leafStroke} strokeWidth={1.5} />
    </div>
  )
}
