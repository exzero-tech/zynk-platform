import Image from 'next/image'

export default function WeatherCard() {
  return (
    <div className="bg-foreground rounded-2xl p-0 flex flex-row items-center h-24">
      <div className="ml-2 mb-2">
        <Image src="/sunny.png" alt="Sunny" width={80} height={80} />
      </div>
      <div className="text-left ml-1 flex-1">
        <div className="text-white text-3xl font-bold">28°C</div>
        <div className="text-text-secondary text-base">Colombo</div>
      </div>
    </div>
  )
}