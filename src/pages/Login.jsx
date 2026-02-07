import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithGoogle } from '../lib/auth'

export default function Login() {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleGoogleSignIn() {
    setError(null)
    setLoading(true)
    try {
      await signInWithGoogle()
      navigate('/onboarding', { replace: true })
    } catch (err) {
      setError(err.message || 'Sign in failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-warm-bg flex flex-col items-center justify-center px-6">
      <div className="max-w-sm w-full">
        <h1 className="text-burgundy font-display font-bold text-2xl text-center mb-2">
          CycleSpend
        </h1>
        <p className="text-espresso/80 text-center text-sm mb-8">
          Budget with your cycle, not against it.
        </p>
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-terracotta/20 text-espresso text-sm">
            {error}
          </div>
        )}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full py-3 px-4 rounded-card bg-cranberry text-tan font-semibold hover:bg-cranberry/90 disabled:opacity-60 transition"
        >
          {loading ? 'Signing in…' : 'Continue with Google'}
        </button>
      </div>
    </div>
  )
}
