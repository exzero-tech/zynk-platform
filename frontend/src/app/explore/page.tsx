'use client'

import dynamic from 'next/dynamic'

// Dynamically import the map component to avoid SSR issues
const ExploreMap = dynamic(() => import('@/components/ExploreMap'), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-full flex items-center justify-center bg-background">
      <div className="text-white">Loading map...</div>
    </div>
  )
})

export default function ExplorePage() {
  return (
    <div className="h-screen w-full">
      <ExploreMap />
    </div>
  )
}