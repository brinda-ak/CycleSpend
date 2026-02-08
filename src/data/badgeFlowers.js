/**
 * Badge-to-flower mapping. Replace placeholder images in public/assets/flowers/
 * with hand-picked illustrations from Freepik, Flaticon, Canva, etc.
 */
const BADGE_FLOWERS = {
  'first-bloom':       { src: '/assets/flowers/daisy.png',        name: 'First Bloom',       category: 'cycle',     height: 90  },
  'rooted':            { src: '/assets/flowers/sunflower.png',    name: 'Rooted',            category: 'cycle',     height: 110 },
  'perennial':         { src: '/assets/flowers/peony.png',        name: 'Perennial',         category: 'cycle',     height: 100 },
  'seedling':          { src: '/assets/flowers/sprout.png',       name: 'Seedling',          category: 'challenge', height: 60  },
  'bouquet':           { src: '/assets/flowers/bouquet.png',      name: 'Bouquet',           category: 'challenge', height: 100 },
  'meadow':            { src: '/assets/flowers/meadow.png',       name: 'Meadow',            category: 'challenge', height: 80  },
  'first-petal':       { src: '/assets/flowers/petal.png',        name: 'First Petal',       category: 'savings',   height: 50  },
  'full-bloom-cushion': { src: '/assets/flowers/rose.png',       name: 'Full Bloom Cushion', category: 'savings',  height: 100 },
  'overflowing':       { src: '/assets/flowers/vase.png',         name: 'Overflowing',       category: 'savings',   height: 110 },
  'tendril':           { src: '/assets/flowers/tendril.png',      name: 'Tendril',           category: 'streak',    height: 70  },
  'ivy':               { src: '/assets/flowers/ivy.png',          name: 'Ivy',               category: 'streak',    height: 80  },
  'luteal-legend':     { src: '/assets/flowers/coneflower.png',   name: 'Luteal Legend',     category: 'streak',    height: 100 },
  'wildflower':        { src: '/assets/flowers/wildgarden.png',   name: 'Wildflower',        category: 'streak',    height: 120 },
}

export const GARDEN_LAYOUT = [
  // Front row (lower, full size)
  { id: 'first-bloom',   row: 'front', xPercent: 5  },
  { id: 'seedling',      row: 'front', xPercent: 22 },
  { id: 'meadow',        row: 'front', xPercent: 38 },
  { id: 'first-petal',   row: 'front', xPercent: 55 },
  { id: 'tendril',       row: 'front', xPercent: 72 },
  { id: 'ivy',           row: 'front', xPercent: 88 },
  // Back row (higher, slightly smaller, in gaps)
  { id: 'rooted',        row: 'back',  xPercent: 13 },
  { id: 'perennial',     row: 'back',  xPercent: 28 },
  { id: 'bouquet',       row: 'back',  xPercent: 44 },
  { id: 'full-bloom-cushion', row: 'back', xPercent: 60 },
  { id: 'overflowing',   row: 'back',  xPercent: 75 },
  { id: 'luteal-legend', row: 'back',  xPercent: 87 },
  { id: 'wildflower',    row: 'back',  xPercent: 97 },
]

export const BADGE_CATEGORIES_LEGEND = [
  { name: 'Cycle', badges: ['first-bloom', 'rooted', 'perennial'], color: '#5B1A2E' },
  { name: 'Challenge', badges: ['seedling', 'bouquet', 'meadow'], color: '#8B2942' },
  { name: 'Savings', badges: ['first-petal', 'full-bloom-cushion', 'overflowing'], color: '#6B7F5E' },
  { name: 'Streak & Special', badges: ['tendril', 'ivy', 'luteal-legend', 'wildflower'], color: '#B56B4A' },
]

export const BADGE_DESCRIPTIONS = {
  'first-bloom':       { desc: 'Complete your first full cycle on CycleSpend', rarity: 'common', progress: { current: 0, total: 1 } },
  'rooted':            { desc: 'Complete 3 cycles', rarity: 'common', progress: { current: 0, total: 3 } },
  'perennial':         { desc: 'Complete 6 cycles', rarity: 'uncommon', progress: { current: 0, total: 6 } },
  'seedling':          { desc: 'Complete your first challenge', rarity: 'common', progress: { current: 0, total: 1 } },
  'bouquet':           { desc: 'Complete 5 challenges', rarity: 'uncommon', progress: { current: 0, total: 5 } },
  'meadow':            { desc: 'Complete 10 challenges', rarity: 'rare', progress: { current: 0, total: 10 } },
  'first-petal':       { desc: 'Save your first $10 in Cycle Cushion', rarity: 'common', progress: { current: 0, total: 10 } },
  'full-bloom-cushion': { desc: 'Hit your cushion target in a cycle', rarity: 'uncommon', progress: { current: 0, total: 1 } },
  'overflowing':       { desc: 'Exceed cushion target by 50%', rarity: 'rare', progress: { current: 0, total: 1 } },
  'tendril':           { desc: '3-day symptom streak', rarity: 'common', progress: { current: 0, total: 3 } },
  'ivy':               { desc: '7-day symptom streak', rarity: 'uncommon', progress: { current: 0, total: 7 } },
  'luteal-legend':     { desc: 'Stay within budget during luteal phase', rarity: 'rare', progress: { current: 0, total: 1 } },
  'wildflower':        { desc: 'Complete all categories in one cycle', rarity: 'legendary', progress: { current: 0, total: 1 } },
}

export default BADGE_FLOWERS
