'use client'

import dynamic from 'next/dynamic'

// Dynamically import the map component to avoid SSR issues
const DynamicMap = dynamic(() => import('./DynamicMap'), {
  ssr: false,
  loading: () => (
    <div className="bg-foreground rounded-2xl p-0 overflow-hidden h-48 relative flex items-center justify-center">
      <div className="text-white">Loading map...</div>
    </div>
  )
})

export default function MapCard() {
  return (
    <div className="bg-foreground rounded-2xl p-0 overflow-hidden h-48 relative">
      <DynamicMap />
    </div>
  )
}