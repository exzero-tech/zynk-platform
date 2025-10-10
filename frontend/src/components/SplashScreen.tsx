'use client'

import Image from 'next/image'

export default function SplashScreen() {

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/splash.png"
          alt="Splash Background"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Logo */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="animate-pulse">
          <Image
            src="/logo.png"
            alt="Zynk Logo"
            width={200}
            height={200}
            className="drop-shadow-2xl"
            priority
          />
        </div>
        
        {/* Loading indicator */}
        <div className="mt-8 flex space-x-2">
          <div className="h-2 w-2 rounded-full bg-white animate-bounce"></div>
          <div className="h-2 w-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="h-2 w-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  )
}