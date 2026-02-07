/**
 * Sync Nessie transactions into Firestore with cycle metadata (cycleDay, phase).
 * Run on login and on manual refresh.
 */

import { collection, doc, getDocs, setDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import { getCycleDayAndPhase } from '../utils/cycleUtils'
import * as nessie from './nessie'

const CATEGORY_MAP = {
  food: 'food_delivery',
  coffee: 'coffee',
  groceries: 'groceries',
  shopping: 'online_shopping',
  selfcare: 'self_care',
  transport: 'transport',
  dining: 'dining_out',
}

/**
 * Normalize Nessie purchase into our transaction shape and add cycle fields.
 * @param {object} purchase - Nessie purchase object
 * @param {string} lastPeriodStart - YYYY-MM-DD
 * @param {number} cycleLength
 * @returns {import('../types').Transaction}
 */
function enrichTransaction(purchase, lastPeriodStart, cycleLength) {
  const dateStr = purchase.purchase_date?.slice(0, 10) || new Date().toISOString().slice(0, 10)
  const { day, phase } = getCycleDayAndPhase(lastPeriodStart, dateStr, cycleLength)
  const amount = Math.abs(Number(purchase.amount) || 0)
  const category = inferCategory(purchase.description) || 'other'
  return {
    id: purchase._id,
    amount,
    category,
    date: dateStr,
    source: 'nessie',
    description: purchase.description || '',
    cycleDay: day,
    phase,
  }
}

function inferCategory(description) {
  if (!description) return null
  const d = description.toLowerCase()
  if (d.includes('doordash') || d.includes('uber eats') || d.includes('grubhub')) return 'food_delivery'
  if (d.includes('starbucks') || d.includes('coffee')) return 'coffee'
  if (d.includes('amazon') || d.includes('target') || d.includes('shop')) return 'online_shopping'
  if (d.includes('grocer') || d.includes('kroger') || d.includes('walmart')) return 'groceries'
  if (d.includes('nail') || d.includes('spa') || d.includes('self')) return 'self_care'
  if (d.includes('uber') || d.includes('lyft') || d.includes('gas')) return 'transport'
  if (d.includes('restaurant') || d.includes('dining') || d.includes('chipotle')) return 'dining_out'
  return null
}

/**
 * Fetch purchases from Nessie and merge into Firestore (users/{uid}/transactions).
 * Skips if user has no nessieAccountId. Enriches each txn with cycleDay and phase.
 * @param {string} uid - Firebase UID
 * @param {string} nessieAccountId
 * @param {string} lastPeriodStart - YYYY-MM-DD
 * @param {number} cycleLength
 */
export async function syncNessieToFirestore(uid, nessieAccountId, lastPeriodStart, cycleLength) {
  if (!nessieAccountId) return { count: 0 }
  const purchases = await nessie.getPurchases(nessieAccountId)
  const txRef = collection(db, 'users', uid, 'transactions')
  let count = 0
  for (const p of purchases) {
    const txn = enrichTransaction(p, lastPeriodStart, cycleLength)
    const id = txn.id || `nessie-${p._id || count}`
    await setDoc(doc(txRef, id), { ...txn, id })
    count++
  }
  return { count }
}

/**
 * Get all transactions from Firestore for a user (for UI/aggregation).
 * @param {string} uid
 * @returns {Promise<import('../types').Transaction[]>}
 */
export async function getTransactionsFromFirestore(uid) {
  const txRef = collection(db, 'users', uid, 'transactions')
  const snap = await getDocs(txRef)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}
