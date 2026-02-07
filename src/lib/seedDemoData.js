/**
 * Seed the current user's Firestore with demo data for testing.
 */

import { collection, doc, writeBatch } from 'firebase/firestore'
import { db } from '../config/firebase'
import { updateUserProfile } from './auth'
import { getCycleDayAndPhase } from '../utils/cycleUtils'
import { DEFAULT_PHASE_ALLOCATIONS } from '../utils/cycleUtils'

function getLastPeriodStart() {
  const d = new Date()
  d.setDate(d.getDate() - 14)
  return d.toISOString().slice(0, 10)
}

const DEMO_TRANSACTIONS = [
  { description: 'Starbucks', amount: 5.75, category: 'coffee' },
  { description: 'DoorDash', amount: 18.50, category: 'food_delivery' },
  { description: 'Amazon', amount: 24.99, category: 'online_shopping' },
  { description: 'Kroger', amount: 42.30, category: 'groceries' },
  { description: 'Target', amount: 31.20, category: 'online_shopping' },
  { description: 'Uber Eats', amount: 22.00, category: 'food_delivery' },
  { description: 'Chipotle', amount: 12.50, category: 'dining_out' },
  { description: 'CVS', amount: 14.99, category: 'self_care' },
  { description: 'Lyft', amount: 9.25, category: 'transport' },
  { description: 'Coffee shop', amount: 4.50, category: 'coffee' },
]

const DEMO_CHALLENGES = [
  { description: 'Skip the $6 coffee today — bank it for your luteal cushion', savedAmount: 6 },
  { description: 'Cook tonight instead of DoorDash — save $14 for your luteal cushion', savedAmount: 14 },
  { description: 'Walk to class instead of scooter — save $3', savedAmount: 3 },
  { description: 'Brew coffee at home instead of café — save $5', savedAmount: 5 },
  { description: 'Skip the $7 boba run — save for luteal', savedAmount: 7 },
]

/**
 * Seed demo data for the given user. Call when user is logged in.
 * Uses batch writes for reliability.
 * @param {string} uid
 * @returns {Promise<void>}
 */
export async function seedDemoData(uid) {
  if (!uid) throw new Error('Must be logged in to load demo data')
  const lastPeriodStart = getLastPeriodStart()
  const cycleLength = 28

  // 1. Profile first (updateUserProfile uses setDoc)
  await updateUserProfile(uid, {
    name: 'Demo User',
    lastPeriodStart,
    cycleLength,
    monthlyBudget: 600,
    phaseAllocations: { ...DEFAULT_PHASE_ALLOCATIONS },
    points: 95,
    petals: 95,
    badges: ['seedling', 'first-petal', 'first-bloom'],
  })

  // 2. Batch: transactions + challenges + symptoms
  const batch = writeBatch(db)
  const txRef = collection(db, 'users', uid, 'transactions')

  // Transactions: include today + this week + last 3 weeks so dashboard shows data
  for (let i = 0; i < 25; i++) {
    const d = new Date()
    if (i < 3) d.setDate(d.getDate() - i) // today, yesterday, 2 days ago
    else if (i < 7) d.setDate(d.getDate() - i) // this week
    else d.setDate(d.getDate() - 7 - Math.floor(Math.random() * 21))
    const dateStr = d.toISOString().slice(0, 10)
    const { day, phase } = getCycleDayAndPhase(lastPeriodStart, dateStr, cycleLength)
    const t = DEMO_TRANSACTIONS[i % DEMO_TRANSACTIONS.length]
    const txn = {
      id: `demo-txn-${i}`,
      amount: Math.round((t.amount * (0.9 + Math.random() * 0.3)) * 100) / 100,
      category: t.category,
      date: dateStr,
      description: t.description,
      cycleDay: day,
      phase,
      source: 'demo',
    }
    batch.set(doc(txRef, txn.id), txn)
  }

  // Challenges
  const cycleId = lastPeriodStart
  const challengeRef = doc(db, 'users', uid, 'challenges', cycleId)
  const entries = DEMO_CHALLENGES.map((c, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (5 - i))
    return { ...c, date: d.toISOString().slice(0, 10), completed: true }
  })
  batch.set(challengeRef, { entries, totalSaved: 47, target: 50, cycleStart: cycleId })

  // Symptoms (today + last 3 days)
  const symptomsRef = collection(db, 'users', uid, 'symptoms')
  for (let i = 0; i < 4; i++) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().slice(0, 10)
    const { day, phase } = getCycleDayAndPhase(lastPeriodStart, dateStr, cycleLength)
    batch.set(doc(symptomsRef, dateStr), {
      mood: 2 + (i % 2),
      energy: 2 + (i % 2),
      cycleDay: day,
      phase,
      timestamp: new Date().toISOString(),
    })
  }

  await batch.commit()
}
