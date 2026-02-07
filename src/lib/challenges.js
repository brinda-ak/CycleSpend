import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import { getUserProfile, updateUserProfile } from './auth'
import { addPetals, PETAL_REWARDS } from './petals'

/**
 * Get or create challenge data for a cycle.
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
 * Complete a challenge and add to cushion + points + petals.
 */
export async function completeChallenge(uid, cycleId, entry) {
  const ref = doc(db, 'users', uid, 'challenges', cycleId)
  const snap = await getDoc(ref)
  const data = snap.exists() ? snap.data() : { entries: [], totalSaved: 0, target: 50 }
  const date = new Date().toISOString().slice(0, 10)
  const newEntry = { ...entry, date, completed: true }
  const entries = [...(data.entries || []), newEntry]
  const totalSaved = (data.totalSaved || 0) + (entry.savedAmount || 0)
  await setDoc(ref, { ...data, entries, totalSaved, cycleStart: cycleId })

  const pointsEarned = entry.savedAmount || 0
  const profile = await getUserProfile(uid)
  const currentPoints = profile?.points ?? 0
  await updateUserProfile(uid, { points: currentPoints + pointsEarned })
  await addPetals(uid, PETAL_REWARDS.challenge_completed, 'challenge_completed')

  return { entries, totalSaved, pointsEarned }
}
