import Image from 'next/image'

export default function WeatherCard() {
  return (
    <div className="bg-foreground rounded-2xl p-0 flex flex-col items-center justify-center h-24">
      <Image src="/sunny.png" alt="Sunny" width={60} height={60} />
      <div className="text-white text-sm mt-1">Sunny</div>
      <div className="text-foreground text-xs">Colombo, Sri Lanka</div>
    </div>
  )
}