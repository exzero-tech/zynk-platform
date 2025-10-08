export default function BatteryCard() {
  const charge = 65; // 65% charge

  return (
    <div className="bg-foreground rounded-2xl p-4 flex flex-col items-center justify-center">
      <div className="relative">
        {/* Battery Icon */}
        <svg width="157" height="78" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Battery body */}
          <rect x="5" y="10" width="60" height="20" rx="3" ry="3" fill="none" stroke="white" strokeWidth="1"/>
          {/* Battery terminal */}
          <rect x="65" y="15" width="4" height="10" rx="2" ry="2" fill="white"/>
          {/* Charge fill */}
          <rect x="7" y="12" width={`${(charge / 100) * 56}`} height="16" rx="2" ry="2" fill="#00BC74"/>
          {/* Percentage text */}
          <text x="35" y="20" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="12" fontWeight="bold">{charge}%</text>
        </svg>
      </div>
    </div>
  )
}