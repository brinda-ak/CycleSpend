export default function Budget({ profile }) {
  return (
    <div className="p-4">
      <h1 className="text-burgundy font-display font-bold text-xl mb-4">Phase Budget Allocator</h1>
      <p className="text-espresso/80 text-sm">
        Phase budget cards and allocation sliders will go here. Uses profile.phaseAllocations and profile.monthlyBudget.
      </p>
    </div>
  )
}
