'use client'

import { useState, useRef } from 'react'

interface ChargingStation {
  name: string
  location: string
  status: string
  pricePerKwh: string
  host: string
  chargerType: string
  chargerSpeed: string
  byocSupport: boolean
  distance: string
}

interface ChargingStationBottomSheetProps {
  station: ChargingStation
  onClose: () => void
}

export default function ChargingStationBottomSheet({ station, onClose }: ChargingStationBottomSheetProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startY, setStartY] = useState(0)
  const sheetRef = useRef<HTMLDivElement>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'text-green-400'
      case 'In Use': return 'text-yellow-400'
      default: return 'text-gray-400'
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartY(e.touches[0].clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    // Removed preventDefault to avoid passive event listener error
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return

    const endY = e.changedTouches[0].clientY
    const deltaY = startY - endY

    // If dragged up by more than 50px and not expanded, expand
    if (deltaY > 50 && !isExpanded) {
      setIsExpanded(true)
    }
    // If dragged down by more than 50px and expanded, collapse
    else if (deltaY < -50 && isExpanded) {
      setIsExpanded(false)
    }

    setIsDragging(false)
  }

  return (
    <div
      ref={sheetRef}
      className={`fixed left-0 right-0 z-[200] bg-foreground rounded-3xl shadow-2xl transition-all duration-300 ease-out overflow-hidden ${
        isExpanded
          ? 'top-0 bottom-24'
          : 'bottom-28 h-80'
      }`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="h-full p-6 flex flex-col">
        {/* Handle */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-1.5 bg-white/30 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-white mb-1">{station.name}</h2>
            <p className="text-white/70 text-sm">{station.location}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center ml-4"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2 mb-4">
          <div className={`w-2 h-2 rounded-full ${station.status === 'Available' ? 'bg-green-400' : 'bg-yellow-400'}`} />
          <span className={`text-sm font-medium ${getStatusColor(station.status)}`}>
            {station.status}
          </span>
          <span className="text-white/50 text-sm">• {station.distance}</span>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/5 rounded-lg p-3">
            <p className="text-white/60 text-xs mb-1">Price per kWh</p>
            <p className="text-white font-semibold">{station.pricePerKwh}</p>
          </div>
          <div className="bg-white/5 rounded-lg p-3">
            <p className="text-white/60 text-xs mb-1">Charger Speed</p>
            <p className="text-white font-semibold">{station.chargerSpeed}</p>
          </div>
        </div>

        {/* Expand/Collapse Hint */}
        <div className="flex items-center justify-center gap-2 text-white/70 text-sm mb-6">
          <span>{isExpanded ? 'Swipe down to collapse' : 'Swipe up for more details'}</span>
          {!isExpanded && (
            <button
              onClick={() => setIsExpanded(true)}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6,9 12,15 18,9"/>
              </svg>
            </button>
          )}
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="flex-1 space-y-4 overflow-y-auto">
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-white/70">Host</span>
                <span className="text-white">{station.host}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-white/70">Charger Type</span>
                <span className="text-white">{station.chargerType}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-white/70">BYOC Support</span>
                <span className="text-white">{station.byocSupport ? 'Yes' : 'No'}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <button className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors">
                Start Charging
              </button>
              <button className="w-full bg-white/10 text-white py-3 rounded-lg hover:bg-white/20 transition-colors">
                Add to Favorites
              </button>
              <button className="w-full bg-white/10 text-white py-3 rounded-lg hover:bg-white/20 transition-colors">
                Get Directions
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}