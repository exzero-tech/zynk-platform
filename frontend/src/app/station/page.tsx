'use client'

import { useRouter, useSearchParams } from 'next/navigation'

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
  connectorType: string
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

export default function StationDetailsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get station data from URL params
  const stationData = searchParams.get('station')
  const station: ChargingStation | null = stationData ? JSON.parse(stationData) : null

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'text-green-400'
      case 'In Use': return 'text-yellow-400'
      default: return 'text-gray-400'
    }
  }

  const handleStartCharging = () => {
    const stationData = encodeURIComponent(JSON.stringify(station))
    router.push(`/start-charging?station=${stationData}`)
  }

  if (!station) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <div className="bg-black p-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
          <h1 className="text-white text-xl font-semibold">Station Details</h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Station Header */}
        <div className="bg-foreground rounded-2xl p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h2 className="text-white text-2xl font-semibold mb-1">{station.name}</h2>
              <p className="text-white/70 text-base">{station.location}</p>
            </div>
          </div>

          {/* Status and Distance */}
          <div className="flex items-center gap-2 mb-6">
            <div className={`w-3 h-3 rounded-full ${station.status === 'Available' ? 'bg-green-400' : 'bg-yellow-400'}`} />
            <span className={`text-lg font-medium ${getStatusColor(station.status)}`}>
              {station.status}
            </span>
            <span className="text-white/50 text-base">• {station.distance}</span>
          </div>

          {/* Key Charging Info */}
          <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl mb-6">
            <div className="text-center">
              <p className="text-white/60 text-sm">Price per kWh</p>
              <p className="text-white font-bold text-lg">{station.pricePerKwh}</p>
            </div>
            <div className="w-px h-10 bg-white/20"></div>
            <div className="text-center">
              <p className="text-white/60 text-sm">Charging Speed</p>
              <p className="text-white font-bold text-lg">{station.chargerSpeed}</p>
            </div>
          </div>
        </div>

        {/* Station Details */}
        <div className="bg-foreground rounded-2xl p-6">
          <h3 className="text-white text-xl font-semibold mb-4">Station Information</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-white/10">
              <span className="text-white/70">Host</span>
              <span className="text-white">{station.host}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-white/10">
              <span className="text-white/70">Charger Type</span>
              <span className="text-white">{station.chargerType}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-white/10">
              <span className="text-white/70">Connector Type</span>
              <span className="text-white">{station.connectorType}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-white/10">
              <span className="text-white/70">Charger Speed</span>
              <span className="text-white">{station.chargerSpeed}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-white/10">
              <span className="text-white/70">Price per kWh</span>
              <span className="text-white">{station.pricePerKwh}</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-white/70">BYOC Support</span>
              <span className="text-white">{station.byocSupport ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="bg-foreground rounded-2xl p-6">
          <h3 className="text-white text-xl font-semibold mb-4">Nearby Amenities</h3>

          {/* Amenities Preview */}
          <div className="mb-6">
            <p className="text-white/60 text-sm mb-3">Available Amenities</p>
            <div className="flex flex-wrap gap-3">
              {station.amenities.restaurants && (
                <span className="bg-white/10 text-white text-sm px-4 py-2 rounded-full">🍽️ Restaurants</span>
              )}
              {station.amenities.malls && (
                <span className="bg-white/10 text-white text-sm px-4 py-2 rounded-full">🛍️ Malls</span>
              )}
              {station.amenities.movieTheaters && (
                <span className="bg-white/10 text-white text-sm px-4 py-2 rounded-full">🎬 Movie Theaters</span>
              )}
              {station.amenities.parks && (
                <span className="bg-white/10 text-white text-sm px-4 py-2 rounded-full">🌳 Parks</span>
              )}
              {station.amenities.washrooms && (
                <span className="bg-white/10 text-white text-sm px-4 py-2 rounded-full">🚻 Washrooms</span>
              )}
              {station.amenities.cafes && (
                <span className="bg-white/10 text-white text-sm px-4 py-2 rounded-full">☕ Cafes</span>
              )}
              {station.amenities.supermarkets && (
                <span className="bg-white/10 text-white text-sm px-4 py-2 rounded-full">🛒 Supermarkets</span>
              )}
              {station.amenities.parking && (
                <span className="bg-white/10 text-white text-sm px-4 py-2 rounded-full">🅿️ Parking</span>
              )}
              {station.amenities.wifi && (
                <span className="bg-white/10 text-white text-sm px-4 py-2 rounded-full">📶 WiFi</span>
              )}
            </div>
          </div>

          {/* Detailed Amenities */}
          <div className="space-y-3">
            <h4 className="text-white font-medium mb-3">Amenities Details</h4>
            <div className="grid grid-cols-1 gap-3">
              {[
                { key: 'restaurants', emoji: '🍽️', label: 'Restaurants', available: station.amenities.restaurants },
                { key: 'malls', emoji: '🛍️', label: 'Shopping Malls', available: station.amenities.malls },
                { key: 'movieTheaters', emoji: '🎬', label: 'Movie Theaters', available: station.amenities.movieTheaters },
                { key: 'parks', emoji: '🌳', label: 'Parks & Recreation', available: station.amenities.parks },
                { key: 'washrooms', emoji: '🚻', label: 'Washrooms', available: station.amenities.washrooms },
                { key: 'cafes', emoji: '☕', label: 'Cafes & Coffee Shops', available: station.amenities.cafes },
                { key: 'supermarkets', emoji: '🛒', label: 'Supermarkets', available: station.amenities.supermarkets },
                { key: 'parking', emoji: '🅿️', label: 'Parking Facilities', available: station.amenities.parking },
                { key: 'wifi', emoji: '📶', label: 'WiFi Access', available: station.amenities.wifi }
              ].filter(amenity => amenity.available).map((amenity, index, array) => (
                <div key={amenity.key} className={`flex items-center justify-between py-3 ${index < array.length - 1 ? 'border-b border-white/10' : ''}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{amenity.emoji}</span>
                    <span className="text-white">{amenity.label}</span>
                  </div>
                  <span className="text-sm text-green-400">Available</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Start Charging Button */}
        <button
          onClick={handleStartCharging}
          className="w-full bg-accent text-white py-4 rounded-2xl font-semibold text-lg hover:bg-accent/90 transition-colors"
        >
          Start Charging
        </button>

        {/* Additional Actions */}
        <div className="space-y-3">
          <button className="w-full bg-white/10 text-white py-3 rounded-lg hover:bg-white/20 transition-colors">
            Add to Favorites
          </button>
          <button className="w-full bg-white/10 text-white py-3 rounded-lg hover:bg-white/20 transition-colors">
            Get Directions
          </button>
        </div>
      </div>
    </div>
  )
}