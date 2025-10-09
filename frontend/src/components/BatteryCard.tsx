export default function BatteryCard() {
  const charge = 65; // 65% charge

  return (
    <div className="bg-foreground rounded-2xl p-0 flex flex-col items-center justify-center h-24">
      <div className="relative">
        {/* Battery Icon */}
        <svg width="170" height="100" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg" >
          {/* Range text */}
          <text x="8" y="9" textAnchor="start" fill="white" fontSize="7">Left 120 KM</text>
          {/* Battery body */}
          <rect x="8" y="13" width="60" height="20" rx="3" ry="3" fill="none" stroke="#00BC74" strokeWidth="1"/>
          {/* Battery terminal */}
          <rect x="68" y="18" width="4" height="10" rx="2" ry="2" fill="#00BC74"/>
          {/* Charge fill */}
          <rect x="10" y="15" width={`${(charge / 100) * 56}`} height="16" rx="2" ry="2" fill="#00BC74"/>
          {/* Percentage text */}
          <text x="35" y="23" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="10" fontWeight="bold">{charge}%</text>
        </svg>
      </div>
    </div>
  )
}