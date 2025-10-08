import Profile from '../components/Profile'
import NotificationButton from '../components/NotificationButton'
import AddButton from '../components/AddButton'
import CarCard from '../components/CarCard'

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
      {/* Your content here */}
    </div>
  );
}
