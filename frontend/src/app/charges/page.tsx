'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

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

export default function ChargesPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active')

  // Mock data - replace with actual data from your backend
  const mockSessions: ChargingSession[] = [
    {
      id: '1',
      stationName: 'EV Charging Hub - Colombo',
      location: 'Liberty Plaza, Colombo 03',
      date: '2025-10-10',
      time: '14:30',
      duration: '45 min',
      energyConsumed: 25.5,
      totalCost: 850.00,
      status: 'active',
      paymentStatus: 'pending'
    },
    {
      id: '2',
      stationName: 'Quick Charge Station',
      location: 'Kandy Road, Colombo 07',
      date: '2025-10-09',
      time: '09:15',
      duration: '1h 20min',
      energyConsumed: 42.3,
      totalCost: 1410.00,
      status: 'completed',
      paymentStatus: 'paid'
    },
    {
      id: '3',
      stationName: 'Green Energy Point',
      location: 'Galle Road, Colombo 06',
      date: '2025-10-08',
      time: '16:45',
      duration: '55 min',
      energyConsumed: 31.8,
      totalCost: 1060.00,
      status: 'completed',
      paymentStatus: 'paid'
    },
    {
      id: '4',
      stationName: 'Fast Charge Center',
      location: 'High Level Road, Nugegoda',
      date: '2025-10-07',
      time: '11:30',
      duration: '30 min',
      energyConsumed: 18.2,
      totalCost: 606.00,
      status: 'cancelled',
      paymentStatus: 'failed'
    }
  ]

  const activeSessions = mockSessions.filter(session => session.status === 'active')
  const historySessions = mockSessions.filter(session => session.status !== 'active')

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

  const handleSessionClick = (session: ChargingSession) => {
    const sessionData = encodeURIComponent(JSON.stringify(session))
    router.push(`/charge-details?session=${sessionData}`)
  }

  const SessionCard = ({ session }: { session: ChargingSession }) => (
    <div
      onClick={() => handleSessionClick(session)}
      className="bg-foreground rounded-2xl p-4 mb-4 cursor-pointer hover:bg-white/5 transition-colors"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-white font-semibold text-base mb-1">{session.stationName}</h3>
          <p className="text-white/60 text-sm">{session.location}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBg(session.status)} ${getStatusColor(session.status)}`}>
          {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
        </div>
      </div>

      <div className="flex justify-between items-center mb-3">
        <div className="text-sm text-white/70">
          {session.date} • {session.time}
        </div>
        <div className="text-sm text-white/70">
          {session.duration}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="text-sm">
            <span className="text-white/60">Energy: </span>
            <span className="text-white">{session.energyConsumed} kWh</span>
          </div>
          <div className="text-sm">
            <span className="text-white/60">Cost: </span>
            <span className="text-accent font-semibold">LKR {session.totalCost.toFixed(2)}</span>
          </div>
        </div>
        <div className={`text-xs ${getPaymentStatusColor(session.paymentStatus)}`}>
          {session.paymentStatus.charAt(0).toUpperCase() + session.paymentStatus.slice(1)}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <div className="bg-black p-6">
        <h1 className="text-white text-2xl font-semibold">My Charges</h1>
        <p className="text-white/60 text-sm mt-1">Track your charging sessions</p>
      </div>

      {/* Tab Navigation */}
      <div className="px-6 py-4">
        <div className="flex bg-white/5 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'active'
                ? 'bg-accent text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Active ({activeSessions.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'history'
                ? 'bg-accent text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            History ({historySessions.length})
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6">
        {activeTab === 'active' ? (
          <div>
            {activeSessions.length > 0 ? (
              activeSessions.map(session => (
                <SessionCard key={session.id} session={session} />
              ))
            ) : (
              <div className="text-center py-12">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/30 mx-auto mb-4">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
                <h3 className="text-white/70 text-lg font-medium mb-2">No Active Sessions</h3>
                <p className="text-white/50 text-sm">You don't have any active charging sessions</p>
              </div>
            )}
          </div>
        ) : (
          <div>
            {historySessions.length > 0 ? (
              historySessions.map(session => (
                <SessionCard key={session.id} session={session} />
              ))
            ) : (
              <div className="text-center py-12">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/30 mx-auto mb-4">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="8 12h8"/>
                </svg>
                <h3 className="text-white/70 text-lg font-medium mb-2">No Charging History</h3>
                <p className="text-white/50 text-sm">Your charging history will appear here</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}