'use client'

import { useEffect, useState } from 'react'
import Profile from '@/components/Profile'
import NotificationButton from '@/components/NotificationButton'
import AddButton from '@/components/AddButton'
import CarCard from '@/components/CarCard'
import BatteryCard from '@/components/BatteryCard'
import WeatherCard from '@/components/WeatherCard'
import MapCard from '@/components/MapCard'
import Last30DaysStats from '@/components/Last30DaysStats'
import SplashScreen from '@/components/SplashScreen'

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    // Show splash screen for 3 seconds while home screen loads
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (showSplash) {
    return <SplashScreen />
  }

  return (
    <div className="p-4 pb-28">
      <div className="flex justify-between items-start mb-4">
        <Profile />
        <div className="flex gap-2">
          <AddButton />
          <NotificationButton />
        </div>
      </div>
      <CarCard />
      <div className="flex gap-4 mt-4">
        <div className="flex-1">
          <BatteryCard />
        </div>
        <div className="flex-1">
          <WeatherCard />
        </div>
      </div>
      <div className="mt-4">
        <MapCard />
      </div>
      <Last30DaysStats />
    </div>
  );
}
