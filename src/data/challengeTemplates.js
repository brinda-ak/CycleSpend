/**
 * Challenge templates for Cycle Savings. Each has description, estimated savings, category.
 */

/** Get the same challenge for today across Dashboard and Challenges page (deterministic by day-of-year). */
export function getTodayChallenge() {
  const start = new Date(new Date().getFullYear(), 0, 0)
  const dayOfYear = Math.floor((Date.now() - start.getTime()) / 86400000)
  return CHALLENGE_TEMPLATES[dayOfYear % CHALLENGE_TEMPLATES.length]
}

/**
 * Pick a challenge tailored to the user's spending. Uses their top categories and merchants.
 * For demo: Starbucks, DoorDash, etc. will surface matching challenges.
 * @param {Array<{ category?: string, description?: string, amount?: number }>} transactions
 * @returns {{ id: string, description: string, amount: number, category: string }}
 */
export function getPersonalizedChallenge(transactions = []) {
  const byCategory = {}
  const byMerchant = {}
  transactions.forEach((t) => {
    const c = t.category || 'other'
    byCategory[c] = (byCategory[c] || 0) + (t.amount || 0)
    const desc = (t.description || '').toLowerCase()
    if (desc) byMerchant[desc] = (byMerchant[desc] || 0) + (t.amount || 0)
  })

  // Sort categories by spend descending
  const topCategories = Object.entries(byCategory).sort((a, b) => b[1] - a[1]).map(([c]) => c)
  const topMerchants = Object.entries(byMerchant).sort((a, b) => b[1] - a[1]).map(([m]) => m)

  // Map merchants to specific challenges
  const merchantMatch = []
  topMerchants.forEach((m) => {
    if (m.includes('starbucks') || m.includes('coffee')) merchantMatch.push({ category: 'coffee', amount: 6 })
    else if (m.includes('doordash') || m.includes('uber eats') || m.includes('grubhub')) merchantMatch.push({ category: 'food_delivery', amount: 14 })
    else if (m.includes('amazon') || m.includes('target')) merchantMatch.push({ category: 'online_shopping', amount: 15 })
    else if (m.includes('uber') || m.includes('lyft')) merchantMatch.push({ category: 'transport', amount: 8 })
    else if (m.includes('chipotle') || m.includes('boba') || m.includes('smoothie')) merchantMatch.push({ category: 'dining_out', amount: 9 })
    else if (m.includes('kroger') || m.includes('grocer')) merchantMatch.push({ category: 'groceries', amount: 15 })
  })

  // Prefer templates that match user's top categories or merchants
  const candidates = [...CHALLENGE_TEMPLATES]
  const match = candidates.find((c) => {
    if (merchantMatch.length && merchantMatch[0].category === c.category) return true
    if (topCategories.includes(c.category)) return true
    return false
  })
  if (match) return match

  // Fallback: pick by top category
  const fallback = candidates.find((c) => topCategories.includes(c.category)) || candidates[0]
  return fallback
}

export const CHALLENGE_TEMPLATES = [
  { id: '1', description: 'Skip the $6 coffee today — bank it for your luteal cushion', amount: 6, category: 'coffee' },
  { id: '2', description: 'Cook tonight instead of DoorDash — save $14 for your luteal cushion', amount: 14, category: 'food_delivery' },
  { id: '3', description: 'Use a meal swipe at dining hall instead of dining dollars — save $8', amount: 8, category: 'dining_out' },
  { id: '4', description: 'Walk to class instead of scooter — save $3', amount: 3, category: 'transport' },
  { id: '5', description: 'Skip the vending machine snack — save $4', amount: 4, category: 'groceries' },
  { id: '6', description: 'Brew coffee at home instead of café — save $5', amount: 5, category: 'coffee' },
  { id: '7', description: 'Meal prep instead of ordering lunch — save $12', amount: 12, category: 'food_delivery' },
  { id: '8', description: 'Skip one impulse online purchase today — save $15', amount: 15, category: 'online_shopping' },
  { id: '9', description: 'Carpool instead of solo ride — save $5', amount: 5, category: 'transport' },
  { id: '10', description: 'Skip the $10 lunch delivery — pack instead', amount: 10, category: 'food_delivery' },
  { id: '11', description: 'Use campus shuttle instead of rideshare — save $8', amount: 8, category: 'transport' },
  { id: '12', description: 'Skip the $7 boba run — save for luteal', amount: 7, category: 'dining_out' },
  { id: '13', description: 'No new non-essential purchase today — save $20', amount: 20, category: 'online_shopping' },
  { id: '14', description: 'Make dinner from pantry instead of grocery run — save $15', amount: 15, category: 'groceries' },
  { id: '15', description: 'Skip the $9 smoothie — save for luteal cushion', amount: 9, category: 'dining_out' },
]
