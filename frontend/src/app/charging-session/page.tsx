'use client'

import { useState, useEffect } from 'react'
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

export default function ChargingSessionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [chargePercentage, setChargePercentage] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [energyConsumed, setEnergyConsumed] = useState(0)
  const [totalCost, setTotalCost] = useState(0)
  const [isCharging, setIsCharging] = useState(true)

  // Get data from URL params
  const stationData = searchParams.get('station')
  const initialReading = parseFloat(searchParams.get('initialReading') || '0')
  const station: ChargingStation | null = stationData ? JSON.parse(stationData) : null

  // Simulate charging progress
  useEffect(() => {
    if (!isCharging) return

    const interval = setInterval(() => {
      setChargePercentage(prev => {
        if (prev >= 100) {
          setIsCharging(false)
          return 100
        }
        return prev + 1
      })

      setTimeElapsed(prev => prev + 1)

      // Simulate energy consumption (roughly 0.5 kWh per minute for demo)
      setEnergyConsumed(prev => prev + 0.5)

      // Calculate cost
      if (station) {
        const pricePerKwh = parseFloat(station.pricePerKwh.replace(/[^\d.]/g, ''))
        setTotalCost(prev => prev + (0.5 * pricePerKwh))
      }
    }, 2000) // Update every 2 seconds for demo purposes

    return () => clearInterval(interval)
  }, [isCharging, station])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleStopCharging = () => {
    setIsCharging(false)
    alert(`Charging stopped!\nEnergy consumed: ${energyConsumed.toFixed(2)} kWh\nTotal cost: LKR ${totalCost.toFixed(2)}`)
    router.push('/explore')
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
          <h1 className="text-white text-xl font-semibold">Charging Session</h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Station Info */}
        <div className="bg-foreground rounded-2xl p-6">
          <h2 className="text-white text-lg font-semibold mb-2">{station.name}</h2>
          <p className="text-white/70 text-sm">{station.location}</p>
        </div>

        {/* Battery Animation */}
        <div className="bg-foreground rounded-2xl p-6">
          <div className="flex flex-col items-center space-y-6">
            {/* Battery Icon */}
            <div className="relative">
              <div className="w-32 h-20 bg-white/10 rounded-lg border-2 border-white/20 flex items-center justify-center relative overflow-hidden">
                {/* Battery terminals */}
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-white/20 rounded-t"></div>

                {/* Battery fill */}
                <div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-400 to-green-300 transition-all duration-1000 ease-out rounded-b-md"
                  style={{ height: `${chargePercentage}%` }}
                ></div>

                {/* Lightning bolt animation */}
                {isCharging && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      className="animate-pulse"
                    >
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                    </svg>
                  </div>
                )}

                {/* Percentage text */}
                <div className="relative z-10 text-white font-bold text-xl">
                  {chargePercentage}%
                </div>
              </div>
            </div>

            {/* Charging Status */}
            <div className="text-center">
              <p className={`text-lg font-semibold ${isCharging ? 'text-green-400' : 'text-yellow-400'}`}>
                {isCharging ? 'Charging...' : 'Charging Complete'}
              </p>
              {isCharging && (
                <p className="text-white/60 text-sm mt-1">Estimated time remaining: {Math.max(0, Math.ceil((100 - chargePercentage) * 2))} min</p>
              )}
            </div>
          </div>
        </div>

        {/* Charging Details */}
        <div className="bg-foreground rounded-2xl p-6">
          <h3 className="text-white text-lg font-semibold mb-4">Charging Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-white/10">
              <span className="text-white/70">Time Elapsed</span>
              <span className="text-white font-mono">{formatTime(timeElapsed)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/10">
              <span className="text-white/70">Energy Consumed</span>
              <span className="text-white">{energyConsumed.toFixed(2)} kWh</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/10">
              <span className="text-white/70">Current Rate</span>
              <span className="text-white">{station.chargerSpeed}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-white/70">Total Cost</span>
              <span className="text-accent font-semibold">LKR {totalCost.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Stop Charging Button */}
        <button
          onClick={handleStopCharging}
          className="w-full bg-red-500 text-white py-4 rounded-2xl font-semibold text-base hover:bg-red-600 transition-colors"
        >
          Stop Charging
        </button>

        {/* Safety Notice */}
        <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-yellow-400 mt-0.5">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4"/>
              <path d="M12 8h.01"/>
            </svg>
            <div>
              <p className="text-yellow-400 text-sm font-medium">Charging in Progress</p>
              <p className="text-yellow-200 text-sm mt-1">
                Do not disconnect your vehicle while charging is in progress. Monitor your charging session regularly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}