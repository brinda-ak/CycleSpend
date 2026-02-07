/**
 * Badge definitions for the Garden. Each badge has a unique flower species.
 */
export const BADGE_CATEGORIES = [
  { id: 'cycle', label: 'Cycle Milestones' },
  { id: 'challenge', label: 'Challenge Milestones' },
  { id: 'savings', label: 'Savings Milestones' },
  { id: 'streak', label: 'Streak & Special' },
]

export const BADGES = [
  { id: 'first-bloom', name: 'First Bloom', category: 'cycle', img: '/assets/botanical-flowers-1.png', imgPos: '75% 50%' },
  { id: 'rooted', name: 'Rooted', category: 'cycle', img: '/assets/botanical-flowers-2.png', imgPos: '12% 12%' },
  { id: 'perennial', name: 'Perennial', category: 'cycle', img: '/assets/botanical-flowers-2.png', imgPos: '38% 12%' },
  { id: 'seedling', name: 'Seedling', category: 'challenge', img: '/assets/botanical-flowers-1.png', imgPos: '12% 0%' },
  { id: 'bouquet', name: 'Bouquet', category: 'challenge', img: '/assets/botanical-flowers-2.png', imgPos: '62% 12%' },
  { id: 'meadow', name: 'Meadow', category: 'challenge', img: '/assets/botanical-flowers-2.png', imgPos: '88% 12%' },
  { id: 'first-petal', name: 'First Petal', category: 'savings', img: '/assets/botanical-flowers-1.png', imgPos: '38% 50%' },
  { id: 'full-bloom-cushion', name: 'Full Bloom Cushion', category: 'savings', img: '/assets/botanical-flowers-1.png', imgPos: '12% 50%' },
  { id: 'overflowing', name: 'Overflowing', category: 'savings', img: '/assets/botanical-flowers-1.png', imgPos: '50% 50%' },
  { id: 'tendril', name: 'Tendril', category: 'streak', img: '/assets/botanical-leaves.png', imgPos: '50% 50%' },
  { id: 'ivy', name: 'Ivy', category: 'streak', img: '/assets/botanical-leaves.png', imgPos: '25% 25%' },
  { id: 'luteal-legend', name: 'Luteal Legend', category: 'streak', img: '/assets/botanical-flowers-2.png', imgPos: '12% 38%' },
  { id: 'wildflower', name: 'Wildflower', category: 'streak', img: '/assets/botanical-flowers-2.png', imgPos: '50% 50%' },
]
