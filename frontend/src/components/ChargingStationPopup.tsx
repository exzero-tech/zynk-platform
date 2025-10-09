interface ChargingStationPopupProps {
  name: string
  status: string
  distance: string
  chargerType: string
}

export default function ChargingStationPopup({
  name,
  status,
  distance,
  chargerType
}: ChargingStationPopupProps) {
  return (
    <div className="bg-foreground/95 backdrop-blur-sm rounded-2xl p-5 min-w-[240px] shadow-2xl shadow-black/50">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-white font-bold text-xl leading-tight">{name}</h3>
        <div className={`w-3 h-3 rounded-full mt-1 ${
          status === 'Available' ? 'bg-[#00BC74]' :
          status === 'In Use' ? 'bg-yellow-400' : 'bg-gray-400'
        }`} />
      </div>

      {/* Status Badge */}
      <div className="mb-3">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
          status === 'Available'
            ? 'bg-[#00BC74]/20 text-[#00BC74] border border-[#00BC74]/30'
            : 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30'
        }`}>
          {status}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-text-secondary text-sm">Distance</span>
          <span className="text-white font-medium">{distance}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-text-secondary text-sm">Charger</span>
          <span className="bg-[#00BC74] text-white px-3 py-1 rounded-full text-xs font-bold">
            {chargerType}
          </span>
        </div>
      </div>
    </div>
  )
}