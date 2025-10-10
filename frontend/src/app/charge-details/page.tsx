'use client'

import { useRouter, useSearchParams } from 'next/navigation'

interface ChargingSession {
  id: string
  stationName: string
  location: string
  date: string
  time: string
  duration: string
  energyConsumed: number
  totalCost: number
  status: 'completed' | 'active' | 'cancelled'
  paymentStatus: 'paid' | 'pending' | 'failed'
}

export default function ChargeDetailsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get session data from URL params
  const sessionData = searchParams.get('session')
  const session: ChargingSession | null = sessionData ? JSON.parse(sessionData) : null

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400'
      case 'completed': return 'text-blue-400'
      case 'cancelled': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-400/20'
      case 'completed': return 'bg-blue-400/20'
      case 'cancelled': return 'bg-red-400/20'
      default: return 'bg-gray-400/20'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'text-green-400'
      case 'pending': return 'text-yellow-400'
      case 'failed': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const handleRetryPayment = () => {
    // Navigate to checkout for retry payment
    alert('Redirecting to payment...')
  }

  const handleDownloadReceipt = () => {
    // Mock download receipt functionality
    alert('Receipt downloaded!')
  }

  if (!session) {
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
          <h1 className="text-white text-xl font-semibold">Charge Details</h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Status Card */}
        <div className="bg-foreground rounded-2xl p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-white text-xl font-semibold mb-1">{session.stationName}</h2>
              <p className="text-white/70">{session.location}</p>
            </div>
            <div className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusBg(session.status)} ${getStatusColor(session.status)}`}>
              {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <p className="text-white/60 text-sm">Energy Used</p>
              <p className="text-white text-2xl font-bold">{session.energyConsumed}</p>
              <p className="text-white/60 text-xs">kWh</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <p className="text-white/60 text-sm">Total Cost</p>
              <p className="text-accent text-2xl font-bold">LKR {session.totalCost.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Session Details */}
        <div className="bg-foreground rounded-2xl p-6">
          <h3 className="text-white text-lg font-semibold mb-4">Session Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-white/10">
              <span className="text-white/70">Session ID</span>
              <span className="text-white font-mono">#{session.id}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/10">
              <span className="text-white/70">Date</span>
              <span className="text-white">{session.date}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/10">
              <span className="text-white/70">Start Time</span>
              <span className="text-white">{session.time}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/10">
              <span className="text-white/70">Duration</span>
              <span className="text-white">{session.duration}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/10">
              <span className="text-white/70">Energy Consumed</span>
              <span className="text-white">{session.energyConsumed} kWh</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-white/70">Payment Status</span>
              <span className={`font-medium ${getPaymentStatusColor(session.paymentStatus)}`}>
                {session.paymentStatus.charAt(0).toUpperCase() + session.paymentStatus.slice(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="bg-foreground rounded-2xl p-6">
          <h3 className="text-white text-lg font-semibold mb-4">Cost Breakdown</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-white/10">
              <span className="text-white/70">Energy Cost ({session.energyConsumed} kWh × LKR 33.33)</span>
              <span className="text-white">LKR {(session.energyConsumed * 33.33).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/10">
              <span className="text-white/70">Service Fee</span>
              <span className="text-white">LKR 50.00</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/10">
              <span className="text-white/70">Tax (5%)</span>
              <span className="text-white">LKR {((session.energyConsumed * 33.33 + 50) * 0.05).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center py-2 pt-4 border-t border-white/20">
              <span className="text-white font-semibold">Total Amount</span>
              <span className="text-accent font-bold text-lg">LKR {session.totalCost.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {session.paymentStatus === 'failed' && (
            <button
              onClick={handleRetryPayment}
              className="w-full bg-accent text-white py-4 rounded-2xl font-semibold hover:bg-accent/90 transition-colors"
            >
              Retry Payment
            </button>
          )}
          
          {session.paymentStatus === 'paid' && (
            <button
              onClick={handleDownloadReceipt}
              className="w-full bg-white/10 text-white py-4 rounded-2xl font-semibold hover:bg-white/20 transition-colors"
            >
              Download Receipt
            </button>
          )}

          <button
            onClick={() => router.push('/charges')}
            className="w-full bg-white/10 text-white py-3 rounded-lg hover:bg-white/20 transition-colors"
          >
            Back to Charges
          </button>
        </div>

      </div>
    </div>
  )
}