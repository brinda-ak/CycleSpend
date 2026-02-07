/**
 * Badge flower components — botanical line art style.
 * Each flower: 70×100px (wild-garden 90×110), stroke 1.5, burgundy/fern.
 */
import DaisyBadge from './DaisyBadge'
import SunflowerBadge from './SunflowerBadge'
import PeonyBadge from './PeonyBadge'
import SnowdropBadge from './SnowdropBadge'
import BouquetBadge from './BouquetBadge'
import MeadowBadge from './MeadowBadge'
import SinglePetalBadge from './SinglePetalBadge'
import RoseBadge from './RoseBadge'
import OverflowingBadge from './OverflowingBadge'
import TendrilBadge from './TendrilBadge'
import IvyBadge from './IvyBadge'
import ConeflowerBadge from './ConeflowerBadge'
import WildflowerBadge from './WildflowerBadge'

const BURGUNDY = '#5B1A2E'
const FERN = '#6B7F5E'

export const BADGE_FLOWERS = {
  daisy: DaisyBadge,
  sunflower: SunflowerBadge,
  peony: PeonyBadge,
  sprout: SnowdropBadge,
  mixed: BouquetBadge,
  field: MeadowBadge,
  'single-petal': SinglePetalBadge,
  rose: RoseBadge,
  vase: OverflowingBadge,
  tendril: TendrilBadge,
  ivy: IvyBadge,
  coneflower: ConeflowerBadge,
  'wild-garden': WildflowerBadge,
}

export { BURGUNDY, FERN }
