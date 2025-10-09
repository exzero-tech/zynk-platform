export default function Last30DaysStats() {
  return (
    <div className="bg-foreground rounded-2xl p-4 mt-4">
      <h3 className="text-white text-lg mb-4">In the last 30 days</h3>

      <div className="flex gap-4">
        {/* Total Charges */}
        <div className="flex-1 bg-black/20 rounded-xl p-4">
          <div className="text-text-secondary text-sm mb-1">Total charges</div>
          <div className="text-white font-bold text-xl">30kW</div>
        </div>

        {/* Total Spending */}
        <div className="flex-1 bg-black/20 rounded-xl p-4">
          <div className="text-text-secondary text-sm mb-1">Total spending</div>
          <div className="text-white font-bold text-xl">LKR18,558.43</div>
        </div>
      </div>
    </div>
  )
}