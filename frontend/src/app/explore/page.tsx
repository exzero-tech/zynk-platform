'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'

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
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = () => {
    if (searchTerm.trim()) {
      console.log('Searching for:', searchTerm)
    }
  }

  return (
    <div className="h-screen w-full relative">
      {/* Search Bar */}
      <div className="absolute top-6 left-4 right-20 z-[100]">
        <div className="bg-foreground rounded-full shadow-lg flex items-center px-1">
          <input
            type="text"
            placeholder="Search charging stations"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent outline-none text-white placeholder-white/60 text-base px-4 py-4"
          />
          <button 
            onClick={handleSearch}
            className="w-12 h-12 bg-accent hover:bg-accent/90 rounded-full flex items-center justify-center flex-shrink-0"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Filter Button */}
      <div className="absolute top-6 right-1 z-[100] mr-2">
        <button className="h-14 w-14 bg-foreground hover:bg-foreground/80 rounded-full shadow-lg flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46 22,3"/>
          </svg>
        </button>
      </div>
      <ExploreMap searchTerm={searchTerm} />
    </div>
  )
}