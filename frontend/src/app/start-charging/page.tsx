'use client'

import { useState } from 'react'
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

export default function StartChargingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [meterReading, setMeterReading] = useState('')
  const [isStarting, setIsStarting] = useState(false)

  // Get station data from URL params (we'll pass it as JSON string)
  const stationData = searchParams.get('station')
  const station: ChargingStation | null = stationData ? JSON.parse(stationData) : null

  const handleStartCharging = async () => {
    if (!meterReading.trim()) {
      alert('Please enter the meter reading')
      return
    }

    setIsStarting(true)

    // Simulate API call
    setTimeout(() => {
      alert(`Charging started! Initial meter reading: ${meterReading} kWh`)
      setIsStarting(false)
      // Here you would typically redirect to a charging session page
      router.back()
    }, 2000)
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
      <div className="bg-foreground p-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
          <h1 className="text-white text-xl font-semibold">Start Charging</h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Station Info */}
        <div className="bg-foreground rounded-2xl p-6">
          <h2 className="text-white text-lg font-semibold mb-4">{station.name}</h2>
          <p className="text-white/70 text-sm mb-4">{station.location}</p>

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
              <span className="text-white/70">Connector Type</span>
              <span className="text-white">{station.connectorType}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/10">
              <span className="text-white/70">Charger Speed</span>
              <span className="text-white">{station.chargerSpeed}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/10">
              <span className="text-white/70">Price per kWh</span>
              <span className="text-white">{station.pricePerKwh}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-white/70">BYOC Support</span>
              <span className="text-white">{station.byocSupport ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </div>

        {/* Meter Reading Input */}
        <div className="bg-foreground rounded-2xl p-6">
          <h3 className="text-white text-lg font-semibold mb-4">Meter Reading</h3>
          <p className="text-white/70 text-sm mb-4">
            Please enter the current meter reading before starting the charge
          </p>

          <div className="space-y-4">
            <div>
              <label className="text-white/70 text-sm block mb-2">
                Initial Reading (kWh)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={meterReading}
                onChange={(e) => setMeterReading(e.target.value)}
                placeholder="0.00"
                className="w-full bg-white/10 text-white rounded-lg px-4 py-3 outline-none text-base placeholder-white/50"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white'
                }}
              />
            </div>

            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-yellow-400 mt-0.5">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="m15 9-6 6"/>
                  <path d="m9 9 6 6"/>
                </svg>
                <div>
                  <p className="text-yellow-400 text-sm font-medium">Important</p>
                  <p className="text-yellow-200 text-sm mt-1">
                    Make sure to record the exact meter reading before connecting your vehicle. This will be used to calculate your charging cost.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Start Charging Button */}
        <button
          onClick={handleStartCharging}
          disabled={isStarting || !meterReading.trim()}
          className="w-full bg-accent text-white py-4 rounded-2xl font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent/90 transition-colors"
        >
          {isStarting ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Starting Charge...
            </div>
          ) : (
            'Start Charging'
          )}
        </button>

        {/* Safety Notice */}
        <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-400 mt-0.5">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
              <path d="M12 9v4"/>
              <path d="M12 17h.01"/>
            </svg>
            <div>
              <p className="text-red-400 text-sm font-medium">Safety First</p>
              <p className="text-red-200 text-sm mt-1">
                Ensure your vehicle is properly connected and all safety measures are in place before starting the charge.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}