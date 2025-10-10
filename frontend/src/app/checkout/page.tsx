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

interface CheckoutData {
  station: ChargingStation
  energyConsumed: number
  totalCost: number
  initialReading: number
  endReading: number
}

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  // Get checkout data from URL params
  const checkoutDataString = searchParams.get('data')
  const checkoutData: CheckoutData | null = checkoutDataString ? JSON.parse(checkoutDataString) : null

  const handlePayment = async () => {
    if (!selectedPaymentMethod) {
      alert('Please select a payment method')
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      // Navigate to home page after successful payment
      router.push('/')
    }, 2000)
  }

  if (!checkoutData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  const { station, energyConsumed, totalCost, initialReading, endReading } = checkoutData

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
          <h1 className="text-white text-xl font-semibold">Checkout</h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Charging Summary */}
        <div className="bg-foreground rounded-2xl p-6">
          <h2 className="text-white text-lg font-semibold mb-4">Charging Summary</h2>

          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-white/10">
              <span className="text-white/70">Station</span>
              <span className="text-white">{station.name}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/10">
              <span className="text-white/70">Location</span>
              <span className="text-white">{station.location}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/10">
              <span className="text-white/70">Initial Reading</span>
              <span className="text-white">{initialReading.toFixed(2)} kWh</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/10">
              <span className="text-white/70">End Reading</span>
              <span className="text-white">{endReading.toFixed(2)} kWh</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/10">
              <span className="text-white/70">Energy Consumed</span>
              <span className="text-white">{energyConsumed.toFixed(2)} kWh</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/10">
              <span className="text-white/70">Rate per kWh</span>
              <span className="text-white">{station.pricePerKwh}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-white/70">Total Amount</span>
              <span className="text-accent font-bold text-lg">LKR {totalCost.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-foreground rounded-2xl p-6">
          <h3 className="text-white text-lg font-semibold mb-4">Payment Method</h3>

          <div className="space-y-3">
            {/* Credit/Debit Card */}
            <div
              onClick={() => setSelectedPaymentMethod('card')}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                selectedPaymentMethod === 'card'
                  ? 'border-accent bg-accent/10'
                  : 'border-white/20 bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  selectedPaymentMethod === 'card' ? 'border-accent bg-accent' : 'border-white/50'
                }`}>
                  {selectedPaymentMethod === 'card' && (
                    <div className="w-full h-full rounded-full bg-white scale-50"></div>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                    <rect width="20" height="14" x="2" y="5" rx="2"/>
                    <line x1="2" x2="22" y1="10" y2="10"/>
                  </svg>
                  <div>
                    <p className="text-white font-medium">Credit/Debit Card</p>
                    <p className="text-white/60 text-sm">Visa, MasterCard, Amex</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Digital Wallet */}
            <div
              onClick={() => setSelectedPaymentMethod('wallet')}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                selectedPaymentMethod === 'wallet'
                  ? 'border-accent bg-accent/10'
                  : 'border-white/20 bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  selectedPaymentMethod === 'wallet' ? 'border-accent bg-accent' : 'border-white/50'
                }`}>
                  {selectedPaymentMethod === 'wallet' && (
                    <div className="w-full h-full rounded-full bg-white scale-50"></div>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                    <path d="M21 12V7H3v5m18 0v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5m18 0V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v7"/>
                  </svg>
                  <div>
                    <p className="text-white font-medium">Digital Wallet</p>
                    <p className="text-white/60 text-sm">PayPal, Apple Pay, Google Pay</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bank Transfer */}
            <div
              onClick={() => setSelectedPaymentMethod('bank')}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                selectedPaymentMethod === 'bank'
                  ? 'border-accent bg-accent/10'
                  : 'border-white/20 bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  selectedPaymentMethod === 'bank' ? 'border-accent bg-accent' : 'border-white/50'
                }`}>
                  {selectedPaymentMethod === 'bank' && (
                    <div className="w-full h-full rounded-full bg-white scale-50"></div>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                    <rect width="20" height="14" x="2" y="3" rx="2"/>
                    <line x1="8" x2="16" y1="21" y2="21"/>
                    <line x1="12" x2="12" y1="17" y2="21"/>
                  </svg>
                  <div>
                    <p className="text-white font-medium">Bank Transfer</p>
                    <p className="text-white/60 text-sm">Direct bank transfer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pay Now Button */}
        <button
          onClick={handlePayment}
          disabled={!selectedPaymentMethod || isProcessing}
          className="w-full bg-accent text-white py-4 rounded-2xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Processing...
            </>
          ) : (
            `Pay LKR ${totalCost.toFixed(2)}`
          )}
        </button>

        {/* Terms */}
        <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-yellow-400 mt-0.5">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4"/>
              <path d="M12 8h.01"/>
            </svg>
            <div>
              <p className="text-yellow-400 text-sm font-medium">Payment Terms</p>
              <p className="text-yellow-200 text-sm mt-1">
                By proceeding with payment, you agree to our terms of service and payment policies. All transactions are secure and encrypted.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}