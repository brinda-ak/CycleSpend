import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../config/firebase'

export const PETAL_REWARDS = {
  challenge_completed: 10,
  symptom_logged: 3,
}

/**
 * Add petals to user profile.
 */
export async function addPetals(uid, amount, reason = 'challenge_completed') {
  const ref = doc(db, 'users', uid)
  const snap = await getDoc(ref)
  const data = snap.exists() ? snap.data() : {}
  const current = data.petals ?? 0
  const history = data.petalHistory ?? []
  const date = new Date().toISOString().slice(0, 10)
  history.push({ amount, reason, date })
  await setDoc(ref, {
    ...data,
    petals: current + amount,
    petalHistory: history.slice(-50),
    updatedAt: new Date().toISOString(),
  }, { merge: true })
}
