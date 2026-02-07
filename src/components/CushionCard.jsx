/**
 * Cycle Cushion card — budget buffer display (replaces jar).
 * Shows saved amount, progress bar, and recent challenge entries.
 */
export default function CushionCard({
  saved,
  target,
  entries = [],
  justCompleted = false,
}) {
  const pct = target > 0 ? Math.min(100, Math.round((saved / target) * 100)) : 0
  const recentEntries = [...(entries || [])].reverse().slice(0, 5)
  const hasMore = (entries?.length ?? 0) > 5

  return (
    <div className="rounded-2xl p-5 bg-tan shadow-card w-full">
      <h3 className="font-display font-bold text-lg text-burgundy mb-4">Cycle Cushion</h3>

      <div className="flex items-baseline gap-2 mb-1">
        <span className="font-display font-bold text-4xl text-fern">${saved}</span>
        <span className="font-sans text-sm text-dusty-rose">of ${target} target</span>
      </div>

      <div className="mb-4">
        <div className="flex justify-end mb-1">
          <span className="font-sans text-sm text-fern">{pct}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-dark-tan overflow-hidden">
          <div
            className="h-full rounded-full bg-fern transition-all duration-700 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {recentEntries.length > 0 && (
        <div className="rounded-xl border border-dark-tan/30 overflow-hidden mb-4">
          {recentEntries.map((e, i) => (
            <div
              key={i}
              className="flex justify-between items-center py-2.5 px-3 border-b border-dark-tan/30 last:border-0 font-sans text-sm"
            >
              <span className="font-bold text-fern shrink-0">+ ${e.savedAmount}</span>
              <span className="text-espresso text-right flex-1 ml-2 truncate">{e.description}</span>
            </div>
          ))}
          {hasMore && (
            <a
              href="#challenge-history"
              className="block py-2 px-3 text-center text-sm text-dusty-rose hover:underline"
            >
              See all →
            </a>
          )}
        </div>
      )}

      <p className="font-sans text-xs text-dusty-rose italic">
        This isn&apos;t a bank account — it&apos;s your budget buffer. Money you didn&apos;t spend now becomes extra room during luteal.
      </p>

      {justCompleted && (
        <p className="font-sans text-sm font-semibold text-fern mt-2 animate-pulse">
          Challenge completed!
        </p>
      )}
    </div>
  )
}
