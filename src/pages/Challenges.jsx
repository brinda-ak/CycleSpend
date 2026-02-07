import { useState, useEffect } from 'react'
import { Check } from 'lucide-react'
import { getCurrentPhase, PHASES } from '../utils/cycleUtils'
import { getOrCreateChallenges, completeChallenge } from '../lib/challenges'
import { getCurrentUser } from '../lib/auth'
import { getTodayChallenge } from '../data/challengeTemplates'
import CushionCard from '../components/CushionCard'
import RewardModal from '../components/RewardModal'

export default function Challenges({ profile, onProfileRefresh }) {
  const [challengeData, setChallengeData] = useState(null)
  const [todayChallenge, setTodayChallenge] = useState(null)
  const [loading, setLoading] = useState(true)
  const [justCompleted, setJustCompleted] = useState(false)
  const [showReward, setShowReward] = useState(false)
  const [rewardType, setRewardType] = useState('challenge')
  const [lastCompletedAmount, setLastCompletedAmount] = useState(0)
  const [lastPointsEarned, setLastPointsEarned] = useState(0)

  const uid = getCurrentUser()?.uid
  const phaseInfo = profile?.lastPeriodStart ? getCurrentPhase(profile.lastPeriodStart, profile?.cycleLength || 28) : null
  const isHighWillpower = phaseInfo && [PHASES.FOLLICULAR, PHASES.OVULATORY].includes(phaseInfo.phase)

  useEffect(() => {
    if (!uid || !profile?.lastPeriodStart) {
      setLoading(false)
      return
    }
    getOrCreateChallenges(uid, profile.lastPeriodStart, 50).then((data) => {
      setChallengeData(data)
      const today = new Date().toISOString().slice(0, 10)
      const doneToday = data.entries?.some((e) => e.date === today)
      if (!doneToday && isHighWillpower) {
        setTodayChallenge(getTodayChallenge())
      }
      setLoading(false)
    })
  }, [uid, profile?.lastPeriodStart, isHighWillpower])

  const handleComplete = async () => {
    if (!uid || !todayChallenge || !profile?.lastPeriodStart) return
    const amount = todayChallenge.amount
    setLastCompletedAmount(amount)
    setJustCompleted(true)
    const result = await completeChallenge(uid, profile.lastPeriodStart, { description: todayChallenge.description, savedAmount: amount })
    setLastPointsEarned(result.pointsEarned ?? amount)
    onProfileRefresh?.()
    const updated = await getOrCreateChallenges(uid, profile.lastPeriodStart)
    setChallengeData(updated)
    setTodayChallenge(null)

    const hitTarget = (updated.totalSaved || 0) >= (updated.target || 50)
    setRewardType(hitTarget ? 'target' : 'challenge')
    setShowReward(true)
    setTimeout(() => setJustCompleted(false), 2500)
  }

  const totalSaved = challengeData?.totalSaved || 0
  const target = challengeData?.target || 50
  const hitTarget = totalSaved >= target

  return (
    <div className="max-w-[430px] mx-auto">
      {/* Hero */}
      <div className="bg-tan px-5 pt-6 pb-8 rounded-b-2xl">
        <h1 className="font-display font-bold text-2xl text-burgundy">Cycle Cushion</h1>
        <p className="font-sans text-espresso/80 text-sm mt-1">Save during strong phases, spend freely during luteal</p>
      </div>

      <div className="px-5 py-6 space-y-6">
        {/* Cycle Cushion card */}
        {loading ? (
          <div className="rounded-2xl p-6 bg-tan shadow-card text-center text-espresso/70 font-sans">Loading…</div>
        ) : (
          <CushionCard
            saved={totalSaved}
            target={target}
            entries={challengeData?.entries ?? []}
            justCompleted={justCompleted}
          />
        )}
        {justCompleted && lastCompletedAmount > 0 && (
          <p className="text-cranberry font-sans text-sm font-semibold animate-pulse -mt-2">
            +${lastCompletedAmount} saved · +{lastPointsEarned} points earned!
          </p>
        )}

        {!isHighWillpower ? (
          <div className="rounded-2xl p-5 bg-dark-tan/30 text-espresso/80 font-sans text-sm">
            Challenges appear during your <strong>Follicular</strong> and <strong>Ovulatory</strong> phases. You&apos;re in <strong>{phaseInfo?.phaseLabel}</strong> now.
          </div>
        ) : todayChallenge ? (
          <div className="rounded-2xl p-5 shadow-card bg-tan border-l-4 border-cranberry">
            <h3 className="font-display font-bold text-burgundy mb-3">Today&apos;s challenge</h3>
            <p className="font-sans text-espresso mb-4">{todayChallenge.description}</p>
            <div className="flex gap-2">
              <button onClick={handleComplete} className="flex-1 py-3 rounded-xl bg-cranberry text-white font-sans font-semibold flex items-center justify-center gap-2 hover:bg-cranberry/90 active:scale-98 transition-all">
                <Check size={20} /> Done! (+${todayChallenge.amount})
              </button>
              <button onClick={() => setTodayChallenge(null)} className="px-4 py-3 rounded-xl border-2 border-cranberry text-cranberry font-sans font-semibold">
                Skip
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl p-5 bg-tan/60 text-espresso/80 font-sans text-sm">
            You completed today&apos;s challenge. Check back tomorrow.
          </div>
        )}

        {/* Challenge history */}
        {challengeData?.entries?.length > 0 && (
          <div id="challenge-history" className="rounded-2xl p-5 shadow-card bg-warm-bg">
            <h3 className="font-display font-bold text-burgundy mb-3">Challenge history</h3>
            <ul className="space-y-3">
              {challengeData.entries.slice(-8).reverse().map((e, i) => (
                <li key={i} className="flex justify-between items-center py-2 border-b border-dark-tan/30 last:border-0 font-sans text-sm">
                  <span className="text-espresso">{e.description}</span>
                  <span className="font-semibold text-cranberry flex items-center gap-1">
                    <Check size={16} /> +${e.savedAmount}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Cycle complete / Cushion full - with reward */}
        {hitTarget && (
          <div className="rounded-2xl p-6 bg-burgundy text-tan">
            <h3 className="font-display font-bold text-lg mb-2">Cycle Cushion full!</h3>
            <p className="font-sans text-sm opacity-90 mb-4">Your cushion covered your luteal overspend. You earned petals — grow your Garden!</p>
            <button
              onClick={() => { setRewardType('target'); setShowReward(true); }}
              className="w-full py-3 rounded-xl bg-tan text-burgundy font-sans font-semibold"
            >
              Claim your reward
            </button>
          </div>
        )}
      </div>

      {showReward && (
        <RewardModal
          onClose={() => { setShowReward(false); setJustCompleted(false); }}
          type={rewardType}
          pointsEarned={rewardType === 'target' ? 15 : 10}
        />
      )}
    </div>
  )
}
