import {
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db, googleProvider } from '../config/firebase'
import { DEFAULT_PHASE_ALLOCATIONS } from '../utils/cycleUtils'

/**
 * Sign in with Google. Creates or updates user profile in Firestore.
 */
export async function signInWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider)
  const user = result.user
  const userRef = doc(db, 'users', user.uid)
  const snap = await getDoc(userRef)
  if (!snap.exists()) {
    await setDoc(userRef, getDefaultUserProfile(user.displayName || '', user.email || ''))
  }
  return user
}

/**
 * Default user profile for new signups (onboarding can overwrite).
 */
function getDefaultUserProfile(name, email) {
  const cycleLength = 28
  const lastPeriodStart = getDefaultLastPeriodStart()
  return {
    name: name || '',
    email: email || '',
    cycleLength,
    lastPeriodStart,
    monthlyBudget: null,
    phaseAllocations: { ...DEFAULT_PHASE_ALLOCATIONS },
    points: 0,
    nessieCustomerId: null,
    nessieAccountId: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

/** Default last period start: ~14 days ago so demo shows mid-cycle. */
function getDefaultLastPeriodStart() {
  const d = new Date()
  d.setDate(d.getDate() - 14)
  return d.toISOString().slice(0, 10)
}

/**
 * Sign out.
 */
export async function signOut() {
  await firebaseSignOut(auth)
}

/**
 * Subscribe to auth state changes.
 * @param {(user) => void} callback - Called with Firebase user or null
 * @returns {() => void} Unsubscribe
 */
export function onAuth(callback) {
  return onAuthStateChanged(auth, callback)
}

/**
 * Get current Firebase user.
 */
export function getCurrentUser() {
  return auth.currentUser
}

/**
 * Get user profile from Firestore.
 * @param {string} uid
 * @returns {Promise<import('../types').UserProfile | null>}
 */
export async function getUserProfile(uid) {
  const ref = doc(db, 'users', uid)
  const snap = await getDoc(ref)
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

/**
 * Update user profile (onboarding or settings).
 * @param {string} uid
 * @param {Partial<import('../types').UserProfile>} data
 */
export async function updateUserProfile(uid, data) {
  const ref = doc(db, 'users', uid)
  await setDoc(ref, { ...data, updatedAt: new Date().toISOString() }, { merge: true })
}
