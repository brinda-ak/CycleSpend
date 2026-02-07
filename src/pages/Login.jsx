import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithGoogle, signInWithEmail, signUpWithEmail, signInAsDemoUser, DEMO_EMAIL, DEMO_PASSWORD } from '../lib/auth'
import { seedDemoData } from '../lib/seedDemoData'

export default function Login() {
  const [mode, setMode] = useState('signin') // 'signin' | 'signup'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleEmailSubmit(e) {
    e.preventDefault()
    setError(null)
    if (!email.trim() || !password) {
      setError('Please enter email and password')
      return
    }
    if (mode === 'signup' && password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    setLoading(true)
    try {
      if (mode === 'signup') {
        await signUpWithEmail(email.trim(), password)
      } else {
        await signInWithEmail(email.trim(), password)
      }
      navigate('/', { replace: true })
    } catch (err) {
      const msg = err.code === 'auth/user-not-found'
        ? 'No account with this email. Try signing up.'
        : err.code === 'auth/email-already-in-use'
          ? 'An account with this email already exists. Try signing in.'
          : err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password'
            ? 'Invalid email or password.'
            : err.message || 'Something went wrong'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  async function handleDemoSignIn() {
    setError(null)
    setLoading(true)
    try {
      await signInAsDemoUser(seedDemoData)
      await new Promise((r) => setTimeout(r, 800))
      navigate('/', { replace: true })
      window.location.reload()
    } catch (err) {
      const msg = err.code === 'auth/invalid-credential'
        ? 'Demo account exists but password is wrong. Delete demo@example.com in Firebase Console → Authentication → Users, then try again.'
        : err.message || 'Demo sign-in failed'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogleSignIn() {
    setError(null)
    setLoading(true)
    try {
      await signInWithGoogle()
      navigate('/', { replace: true })
    } catch (err) {
      setError(err.message || 'Sign in failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden py-12">
      <div className="relative z-10 max-w-sm w-full">
        <h1 className="text-burgundy font-display font-bold text-2xl text-center mb-2">
          CycleSpend
        </h1>
        <p className="text-espresso/80 text-center text-sm mb-6 font-sans">
          Budget with your cycle, not against it.
        </p>

        <form onSubmit={handleEmailSubmit} className="space-y-4 mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="w-full px-4 py-3 rounded-xl bg-tan border-2 border-mauve/50 text-espresso placeholder-espresso/50 font-sans"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
            className="w-full px-4 py-3 rounded-xl bg-tan border-2 border-mauve/50 text-espresso placeholder-espresso/50 font-sans"
          />
          {error && (
            <div className="p-3 rounded-lg bg-terracotta/20 text-espresso text-sm font-sans">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-cranberry text-white font-sans font-semibold hover:bg-cranberry/90 disabled:opacity-60 transition"
          >
            {loading ? 'Please wait…' : mode === 'signup' ? 'Create account' : 'Sign in'}
          </button>
        </form>

        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-dark-tan/40" />
          <span className="text-xs text-espresso/60 font-sans">or</span>
          <div className="flex-1 h-px bg-dark-tan/40" />
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full py-3 px-4 rounded-xl border-2 border-mauve text-mauve font-sans font-semibold hover:bg-mauve/10 disabled:opacity-60 transition"
        >
          Continue with Google
        </button>

        <div className="mt-6 pt-4 border-t border-dark-tan/40">
          <button
            type="button"
            onClick={handleDemoSignIn}
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl bg-rewards-green/15 text-rewards-green font-sans font-semibold hover:bg-rewards-green/25 disabled:opacity-60 transition"
          >
            Use demo account
          </button>
          <p className="text-xs text-espresso/60 text-center mt-2 font-sans">
            {DEMO_EMAIL} / {DEMO_PASSWORD}
          </p>
        </div>

        <button
          type="button"
          onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(null); }}
          className="w-full mt-4 text-sm text-mauve hover:text-burgundy font-sans"
        >
          {mode === 'signin' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
        </button>
      </div>
    </div>
  )
}
