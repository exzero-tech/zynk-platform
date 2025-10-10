'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

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
  amenities: {
    restaurants: boolean
    malls: boolean
    movieTheaters: boolean
    parks: boolean
    washrooms: boolean
    cafes: boolean
    supermarkets: boolean
    parking: boolean
    wifi: boolean
  }
}

interface ChargingStationBottomSheetProps {
  station: ChargingStation
  onClose: () => void
}

export default function ChargingStationBottomSheet({ station, onClose }: ChargingStationBottomSheetProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [startY, setStartY] = useState(0)
  const sheetRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

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

  const handleStartCharging = () => {
    const stationData = encodeURIComponent(JSON.stringify(station))
    router.push(`/start-charging?station=${stationData}`)
  }

  const handleGetDirections = () => {
    // Open Google Maps with the station location
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(station.location)}`
    window.open(mapsUrl, '_blank')
  }

  const handleViewDetails = () => {
    const stationData = encodeURIComponent(JSON.stringify(station))
    router.push(`/station?station=${stationData}`)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return

    const endY = e.changedTouches[0].clientY
    const deltaY = startY - endY

    // If dragged up by more than 50px, navigate to full details page
    if (deltaY > 50) {
      handleViewDetails()
    }

    setIsDragging(false)
  }

  return (
    <div
      ref={sheetRef}
      className="fixed left-0 right-0 z-[200] bg-foreground rounded-3xl shadow-2xl transition-all duration-300 ease-out bottom-28 h-80 overflow-hidden"
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

        {/* Key Charging Info */}
        <div className="flex justify-between items-center mb-6 p-3 bg-white/5 rounded-lg">
          <div className="text-center">
            <p className="text-white/60 text-xs">Price per kWh</p>
            <p className="text-white font-semibold">{station.pricePerKwh}</p>
          </div>
          <div className="w-px h-8 bg-white/20"></div>
          <div className="text-center">
            <p className="text-white/60 text-xs">Charging Speed</p>
            <p className="text-white font-semibold">{station.chargerSpeed}</p>
          </div>
        </div>

        {/* Amenities Preview */}
        <div className="mb-6">
          <p className="text-white/60 text-xs mb-3">Amenities</p>
          <div className="flex flex-wrap gap-2">
            {station.amenities.restaurants && (
              <span className="bg-white/10 text-white text-xs px-3 py-1 rounded-full">🍽️ Restaurants</span>
            )}
            {station.amenities.malls && (
              <span className="bg-white/10 text-white text-xs px-3 py-1 rounded-full">🛍️ Malls</span>
            )}
            {station.amenities.movieTheaters && (
              <span className="bg-white/10 text-white text-xs px-3 py-1 rounded-full">🎬 Movie Theaters</span>
            )}
            {station.amenities.parks && (
              <span className="bg-white/10 text-white text-xs px-3 py-1 rounded-full">🌳 Parks</span>
            )}
            {station.amenities.washrooms && (
              <span className="bg-white/10 text-white text-xs px-3 py-1 rounded-full">🚻 Washrooms</span>
            )}
            {station.amenities.cafes && (
              <span className="bg-white/10 text-white text-xs px-3 py-1 rounded-full">☕ Cafes</span>
            )}
            {station.amenities.supermarkets && (
              <span className="bg-white/10 text-white text-xs px-3 py-1 rounded-full">🛒 Supermarkets</span>
            )}
            {station.amenities.parking && (
              <span className="bg-white/10 text-white text-xs px-3 py-1 rounded-full">🅿️ Parking</span>
            )}
            {station.amenities.wifi && (
              <span className="bg-white/10 text-white text-xs px-3 py-1 rounded-full">📶 WiFi</span>
            )}
          </div>
        </div>

        {/* Expand/Collapse Hint */}
        <div className="flex items-center justify-center gap-2 text-white/70 text-sm mb-6">
          <span>Swipe up for full details</span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleStartCharging}
            className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
          >
            Start Charging
          </button>
          <button
            onClick={handleGetDirections}
            className="w-full bg-white/10 text-white py-3 rounded-lg hover:bg-white/20 transition-colors"
          >
            Get Directions
          </button>
        </div>
      </div>
    </div>
  )
}