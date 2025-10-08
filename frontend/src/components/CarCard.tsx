import Image from "next/image"

export default function CarCard() {
  return (
        <div className="bg-foreground rounded-2xl p-0 flex items-start justify-between mt-1 overflow-hidden">
      <div className="flex-1">
        <h2 className="text-white text-lg font-semibold mt-2 ml-4">BYD Seal</h2>
      </div>
      <div className="flex-shrink-0">
        <Image
          src="/byd-seal.png"
          alt="BYD Seal"
          width={426}
          height={283}
          className="object-cover"
        />
      </div>
    </div>
  )
}