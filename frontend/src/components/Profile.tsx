import Image from "next/image"

export default function Profile() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-[52px] h-[52px] rounded-full overflow-hidden">
        <Image
          src="/harith-danushka-profile-pic.webp"
          alt="Haritha Danushka"
          width={48}
          height={48}
          className="w-full h-full object-cover rounded-full scale-110"
        />
      </div>
      <div>
        <div className="text-white font-semibold">Haritha Danushka</div>
        <div className="text-white text-xs flex items-center gap-1">
          Good morning
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
        </div>
      </div>
    </div>
  )
}