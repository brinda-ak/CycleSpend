import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { onAuth, getCurrentUser, getUserProfile } from './lib/auth'
import FloralBackground from './components/FloralBackground'
import Layout from './components/Layout'
import Login from './pages/Login'
import Onboarding from './pages/Onboarding'
import Home from './pages/Home'
import Heatmap from './pages/Heatmap'
import Budget from './pages/Budget'
import Challenges from './pages/Challenges'
import Report from './pages/Report'
import Garden from './pages/Garden'

function RequireAuth({ children, profile, loading }) {
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-espresso font-sans">Loading…</div>
      </div>
    )
  }
  if (!getCurrentUser()) return <Navigate to="/login" replace />
  if (profile && profile.monthlyBudget == null) {
    return <Navigate to="/onboarding" replace />
  }
  return children
}

export default function App() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuth(async (firebaseUser) => {
      setUser(firebaseUser)
      if (firebaseUser) {
        const p = await getUserProfile(firebaseUser.uid)
        setProfile(p)
      } else {
        setProfile(null)
      }
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const refreshProfile = async () => {
    if (user) {
      const p = await getUserProfile(user.uid)
      setProfile(p)
    }
  }

  return (
    <>
      <FloralBackground />
      <div className="relative z-10 max-w-[430px] mx-auto">
        <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/onboarding"
        element={
          getCurrentUser() ? (
            <Onboarding onComplete={refreshProfile} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/"
        element={
          <RequireAuth profile={profile} loading={loading}>
            <Layout profile={profile} onProfileRefresh={refreshProfile} />
          </RequireAuth>
        }
      >
        <Route index element={<Home profile={profile} />} />
        <Route path="heatmap" element={<Heatmap profile={profile} />} />
        <Route path="budget" element={<Budget profile={profile} />} />
        <Route path="challenges" element={<Challenges profile={profile} onProfileRefresh={refreshProfile} />} />
        <Route path="report" element={<Report profile={profile} onProfileRefresh={refreshProfile} />} />
        <Route path="rewards" element={<Garden profile={profile} />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  )
}
