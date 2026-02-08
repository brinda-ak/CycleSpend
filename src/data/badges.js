/**
 * Badge definitions for the Garden. Each badge has a unique flower species.
 */
export const BADGE_CATEGORIES = [
  { id: 'cycle', label: 'Cycle Milestones' },
  { id: 'challenge', label: 'Challenge Milestones' },
  { id: 'savings', label: 'Savings Milestones' },
  { id: 'streak', label: 'Streak & Special' },
]

// User's reference flower images: badge-flowers-8 (8 flowers, 2 rows) and badge-flowers-21 (21-flower grid)
export const BADGES = [
  { id: 'first-bloom', name: 'First Bloom', category: 'cycle', img: '/assets/badge-flowers-8.png' },
  { id: 'rooted', name: 'Rooted', category: 'cycle', img: '/assets/badge-flowers-21.png' },
  { id: 'perennial', name: 'Perennial', category: 'cycle', img: '/assets/badge-flowers-8.png' },
  { id: 'seedling', name: 'Seedling', category: 'challenge', img: '/assets/badge-flowers-8.png' },
  { id: 'bouquet', name: 'Bouquet', category: 'challenge', img: '/assets/badge-flowers-21.png' },
  { id: 'meadow', name: 'Meadow', category: 'challenge', img: '/assets/badge-flowers-21.png' },
  { id: 'first-petal', name: 'First Petal', category: 'savings', img: '/assets/badge-flowers-8.png' },
  { id: 'full-bloom-cushion', name: 'Full Bloom Cushion', category: 'savings', img: '/assets/badge-flowers-21.png' },
  { id: 'overflowing', name: 'Overflowing', category: 'savings', img: '/assets/badge-flowers-21.png' },
  { id: 'tendril', name: 'Tendril', category: 'streak', img: '/assets/botanical-leaves.png' },
  { id: 'ivy', name: 'Ivy', category: 'streak', img: '/assets/botanical-leaves.png' },
  { id: 'luteal-legend', name: 'Luteal Legend', category: 'streak', img: '/assets/badge-flowers-21.png' },
  { id: 'wildflower', name: 'Wildflower', category: 'streak', img: '/assets/badge-flowers-21.png' },
]
