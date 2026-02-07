import { getCurrentPhase } from '../utils/cycleUtils'

export default function Home({ profile }) {
  const phaseInfo = profile?.lastPeriodStart
    ? getCurrentPhase(profile.lastPeriodStart, profile.cycleLength || 28)
    : null

  return (
    <div className="p-4 space-y-4">
      <section className="bg-tan rounded-card p-4 shadow-card border-l-4 border-mauve">
        <h2 className="font-display font-semibold text-burgundy text-lg">
          Hey{profile?.name ? ` ${profile.name.split(' ')[0]}` : ''}!
        </h2>
        {phaseInfo && (
          <p className="text-espresso mt-1 text-sm">
            You&apos;re in your <strong>{phaseInfo.phaseLabel}</strong> phase (day {phaseInfo.day}).
            {profile?.monthlyBudget != null && (
              <> Your monthly budget is ${profile.monthlyBudget}.</>
            )}
          </p>
        )}
      </section>
      <section className="bg-warm-bg rounded-card p-4 shadow-card">
        <p className="text-espresso/80 text-sm">
          Dashboard widgets (today&apos;s budget, cycle cushion, symptom check-in, mini heatmap) will go here once features are built.
        </p>
      </section>
    </div>
  )
}
