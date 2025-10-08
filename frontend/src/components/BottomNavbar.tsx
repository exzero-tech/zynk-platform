'use client'

import { usePathname } from 'next/navigation'

export default function BottomNavbar() {
  const pathname = usePathname()

  const getActiveTab = () => {
    if (pathname === '/') return 'home'
    if (pathname === '/explore') return 'explore'
    if (pathname === '/saved') return 'saved'
    if (pathname === '/profile') return 'profile'
    return 'home' // default
  }

  const activeTab = getActiveTab()

  const buttonClass = (tab: string) =>
    `flex flex-col items-center px-4 py-2 rounded-full transition-all duration-200 ${
      activeTab === tab ? 'bg-[#333333] text-accent' : 'text-white hover:opacity-75'
    }`

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-foreground rounded-full mx-4 mb-4 p-2 flex justify-around items-center">
      <button className={buttonClass('home')}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9,22 9,12 15,12 15,22"/>
        </svg>
        <span className="text-xs mt-1">Home</span>
      </button>
      <button className={buttonClass('explore')}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="1,6 1,22 8,18 16,22 23,18 23,2 16,6 8,2 1,6"/>
          <line x1="8" y1="2" x2="8" y2="18"/>
          <line x1="16" y1="6" x2="16" y2="22"/>
        </svg>
        <span className="text-xs mt-1">Explore</span>
      </button>
      <button className={buttonClass('saved')}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
        <span className="text-xs mt-1">Saved</span>
      </button>
      <button className={buttonClass('profile')}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        <span className="text-xs mt-1">Profile</span>
      </button>
    </nav>
  )
}