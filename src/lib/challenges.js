import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import { updateUserProfile } from './auth'

/**
 * Get or create challenge data for a cycle.
 * @param {string} uid
 * @param {string} cycleId - e.g. cycle start date YYYY-MM-DD
 * @param {number} target - cushion target amount
 */
export async function getOrCreateChallenges(uid, cycleId, target = 50) {
  const ref = doc(db, 'users', uid, 'challenges', cycleId)
  let snap = await getDoc(ref)
  if (!snap.exists()) {
    await setDoc(ref, { entries: [], totalSaved: 0, target, cycleStart: cycleId })
    snap = await getDoc(ref)
  }
  return snap.data()
}

/**
 * Complete a challenge and add to cushion + points.
 */
export async function completeChallenge(uid, cycleId, entry) {
  const ref = doc(db, 'users', uid, 'challenges', cycleId)
  const snap = await getDoc(ref)
  const data = snap.exists() ? snap.data() : { entries: [], totalSaved: 0, target: 50 }
  const entries = [...(data.entries || []), { ...entry, date: new Date().toISOString().slice(0, 10), completed: true }]
  const totalSaved = (data.totalSaved || 0) + (entry.savedAmount || 0)
  await setDoc(ref, { ...data, entries, totalSaved, cycleStart: cycleId })

  // Add points (1 point per $1 saved) to user profile
  const userRef = doc(db, 'users', uid)
  const userSnap = await getDoc(userRef)
  const userData = userSnap.exists() ? userSnap.data() : {}
  const pointsToAdd = Math.round(entry.savedAmount || 0)
  const newPoints = (userData.points ?? 0) + pointsToAdd
  await updateUserProfile(uid, { points: newPoints })

  return { entries, totalSaved, pointsEarned: pointsToAdd }
}
