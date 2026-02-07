import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import { getCycleDayAndPhase } from '../utils/cycleUtils'

/**
 * Log daily symptom check-in (mood 1-4, energy 1-4, craving 1-4).
 * @param {string} uid
 * @param {string} date - YYYY-MM-DD
 * @param {{ mood: number, energy: number, craving: number }} data
 * @param {string} lastPeriodStart
 * @param {number} cycleLength
 */
export async function logSymptom(uid, date, data, lastPeriodStart, cycleLength) {
  const { day, phase } = getCycleDayAndPhase(lastPeriodStart, date, cycleLength)
  const ref = doc(db, 'users', uid, 'symptoms', date)
  await setDoc(ref, {
    ...data,
    cycleDay: day,
    phase,
    timestamp: new Date().toISOString(),
  })
}

/**
 * Get symptom log for a date.
 */
export async function getSymptom(uid, date) {
  const ref = doc(db, 'users', uid, 'symptoms', date)
  const snap = await getDoc(ref)
  return snap.exists() ? snap.data() : null
}
