import Profile from '../components/Profile'
import NotificationButton from '../components/NotificationButton'
import AddButton from '../components/AddButton'
import CarCard from '../components/CarCard'
import BatteryCard from '../components/BatteryCard'
import WeatherCard from '../components/WeatherCard'

export default function Home() {
  return (
    <div className="p-4">
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
    </div>
  );
}
