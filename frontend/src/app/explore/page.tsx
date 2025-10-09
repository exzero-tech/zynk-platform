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
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    status: 'all', // 'all', 'available', 'in-use', 'offline', 'maintenance'
    connectorType: 'all', // 'all', 'type1', 'type2', 'ccs2', 'chademo', 'byoc'
    chargingSpeed: 'all', // 'all', 'slow', 'fast', 'rapid', 'ultra-fast'
    pricePerKwh: 'all' // 'all', 'budget', 'standard', 'premium'
  })

  const handleSearch = () => {
    if (searchTerm.trim()) {
      console.log('Searching for:', searchTerm)
    }
  }

  const updateFilter = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
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
        <button 
          onClick={() => setShowFilters(true)}
          className="h-14 w-14 bg-foreground hover:bg-foreground/80 rounded-full shadow-lg flex items-center justify-center"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46 22,3"/>
          </svg>
        </button>
      </div>

      {/* Full Screen Filter Modal */}
      {showFilters && (
        <div className="fixed inset-0 z-[300] bg-foreground">
          <div className="h-full p-6 flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-white text-xl font-semibold">Filter Stations</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Filter Options */}
            <div className="flex-1 space-y-6">
              {/* Availability Status Filter */}
              <div>
                <label className="text-white/70 text-sm block mb-3">Availability Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => updateFilter('status', e.target.value)}
                  className="w-full bg-white/10 text-white rounded-lg px-4 py-3 outline-none text-base"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white'
                  }}
                >
                  <option value="all" style={{ backgroundColor: '#242424', color: 'white' }}>All Statuses</option>
                  <option value="available" style={{ backgroundColor: '#242424', color: 'white' }}>Available</option>
                  <option value="in-use" style={{ backgroundColor: '#242424', color: 'white' }}>In Use</option>
                  <option value="offline" style={{ backgroundColor: '#242424', color: 'white' }}>Offline</option>
                  <option value="maintenance" style={{ backgroundColor: '#242424', color: 'white' }}>Under Maintenance</option>
                </select>
              </div>

              {/* Connector Type Filter */}
              <div>
                <label className="text-white/70 text-sm block mb-3">Connector Type</label>
                <select
                  value={filters.connectorType}
                  onChange={(e) => updateFilter('connectorType', e.target.value)}
                  className="w-full bg-white/10 text-white rounded-lg px-4 py-3 outline-none text-base"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white'
                  }}
                >
                  <option value="all" style={{ backgroundColor: '#242424', color: 'white' }}>All Connectors</option>
                  <option value="type1" style={{ backgroundColor: '#242424', color: 'white' }}>Type 1</option>
                  <option value="type2" style={{ backgroundColor: '#242424', color: 'white' }}>Type 2</option>
                  <option value="ccs2" style={{ backgroundColor: '#242424', color: 'white' }}>CCS 2</option>
                  <option value="chademo" style={{ backgroundColor: '#242424', color: 'white' }}>CHAdeMO</option>
                  <option value="byoc" style={{ backgroundColor: '#242424', color: 'white' }}>BYOC - Bring Your Own Charger</option>
                </select>
              </div>

              {/* Charging Speed Filter */}
              <div>
                <label className="text-white/70 text-sm block mb-3">Charging Speed</label>
                <select
                  value={filters.chargingSpeed}
                  onChange={(e) => updateFilter('chargingSpeed', e.target.value)}
                  className="w-full bg-white/10 text-white rounded-lg px-4 py-3 outline-none text-base"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white'
                  }}
                >
                  <option value="all" style={{ backgroundColor: '#242424', color: 'white' }}>All Speeds</option>
                  <option value="slow" style={{ backgroundColor: '#242424', color: 'white' }}>Slow (≤10 kW)</option>
                  <option value="fast" style={{ backgroundColor: '#242424', color: 'white' }}>Fast (10-50 kW)</option>
                  <option value="rapid" style={{ backgroundColor: '#242424', color: 'white' }}>Rapid (50-150 kW)</option>
                  <option value="ultra-fast" style={{ backgroundColor: '#242424', color: 'white' }}>Ultra-fast (150+ kW)</option>
                </select>
              </div>

              {/* Price per kWh Filter */}
              <div>
                <label className="text-white/70 text-sm block mb-3">Price per kWh</label>
                <select
                  value={filters.pricePerKwh}
                  onChange={(e) => updateFilter('pricePerKwh', e.target.value)}
                  className="w-full bg-white/10 text-white rounded-lg px-4 py-3 outline-none text-base"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white'
                  }}
                >
                  <option value="all" style={{ backgroundColor: '#242424', color: 'white' }}>All Prices</option>
                  <option value="budget" style={{ backgroundColor: '#242424', color: 'white' }}>Budget (&lt; LKR 45)</option>
                  <option value="standard" style={{ backgroundColor: '#242424', color: 'white' }}>Standard (LKR 45-50)</option>
                  <option value="premium" style={{ backgroundColor: '#242424', color: 'white' }}>Premium (&gt; LKR 50)</option>
                </select>
              </div>

            </div>

            {/* Apply Button */}
            <button
              onClick={() => setShowFilters(false)}
              className="w-full bg-accent text-white py-4 rounded-3xl font-semibold hover:bg-accent/90 text-base mt-8"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
      <ExploreMap searchTerm={searchTerm} filters={filters} />
    </div>
  )
}