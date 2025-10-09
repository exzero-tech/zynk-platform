import { MapContainer, TileLayer, Marker, CircleMarker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useState } from 'react'
import ChargingStationBottomSheet from './ChargingStationBottomSheet'

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

const greyIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

export default function ExploreMap() {
  const [selectedStation, setSelectedStation] = useState<any>(null)

  // University of Kelaniya coordinates (current location)
  const currentLocation: [number, number] = [6.9739, 79.9167]

  // Extended dummy EV charging stations data for explore page
  const chargingStations = [
    { 
      position: [6.9800, 79.9200] as [number, number], 
      name: 'Kelaniya Central Hub', 
      status: 'Available', 
      distance: '1.2 km', 
      chargerType: 'CCS2',
      location: 'Kelaniya, Sri Lanka',
      pricePerKwh: 'LKR 45',
      host: 'CEB',
      chargerSpeed: '150 kW',
      byocSupport: true
    },
    { 
      position: [6.9700, 79.9100] as [number, number], 
      name: 'Highway Charge Point', 
      status: 'Available', 
      distance: '1.8 km', 
      chargerType: 'CCS2',
      location: 'Colombo-Kandy Highway, Sri Lanka',
      pricePerKwh: 'LKR 50',
      host: 'Lanka Electricity',
      chargerSpeed: '100 kW',
      byocSupport: false
    },
    { 
      position: [6.9850, 79.9250] as [number, number], 
      name: 'EcoStation Kelaniya', 
      status: 'In Use', 
      distance: '2.5 km', 
      chargerType: 'CCS2',
      location: 'Dalugama, Sri Lanka',
      pricePerKwh: 'LKR 42',
      host: 'GreenCharge Lanka',
      chargerSpeed: '75 kW',
      byocSupport: true
    },
    { 
      position: [6.9650, 79.9300] as [number, number], 
      name: 'GreenPower Station', 
      status: 'Available', 
      distance: '2.8 km', 
      chargerType: 'CCS2',
      location: 'Kadawatha, Sri Lanka',
      pricePerKwh: 'LKR 48',
      host: 'Sustainable Energy',
      chargerSpeed: '125 kW',
      byocSupport: true
    },
    { 
      position: [6.9900, 79.9150] as [number, number], 
      name: 'FastCharge Kelaniya', 
      status: 'Available', 
      distance: '3.1 km', 
      chargerType: 'CCS2',
      location: 'Kelaniya North, Sri Lanka',
      pricePerKwh: 'LKR 52',
      host: 'FastCharge Networks',
      chargerSpeed: '200 kW',
      byocSupport: false
    },
    { 
      position: [6.9600, 79.9200] as [number, number], 
      name: 'ElectroHub', 
      status: 'In Use', 
      distance: '3.5 km', 
      chargerType: 'CCS2',
      location: 'Kiribathgoda, Sri Lanka',
      pricePerKwh: 'LKR 46',
      host: 'Electro Lanka',
      chargerSpeed: '90 kW',
      byocSupport: true
    },
    { 
      position: [6.9750, 79.9050] as [number, number], 
      name: 'PowerPoint Station', 
      status: 'Available', 
      distance: '3.8 km', 
      chargerType: 'CCS2',
      location: 'Wattala, Sri Lanka',
      pricePerKwh: 'LKR 44',
      host: 'PowerPoint EV',
      chargerSpeed: '110 kW',
      byocSupport: true
    },
    { 
      position: [6.9820, 79.9300] as [number, number], 
      name: 'Volt Station', 
      status: 'Available', 
      distance: '4.2 km', 
      chargerType: 'CCS2',
      location: 'Peliyagoda, Sri Lanka',
      pricePerKwh: 'LKR 49',
      host: 'Volt Lanka',
      chargerSpeed: '180 kW',
      byocSupport: false
    }
  ]

  return (
    <>
      <div className="h-full w-full z-0 relative">
        <MapContainer
          center={currentLocation}
          zoom={13}
          style={{ height: '100vh', width: '100%' }}
          zoomControl={true}
          attributionControl={false}
          fadeAnimation={false}
          preferCanvas={true}
        >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        
        {/* Current location indicator */}
        <CircleMarker
          center={currentLocation}
          radius={24}
          pathOptions={{
            color: '#00BC74',
            fillColor: '#00BC74',
            fillOpacity: 0.2,
            weight: 0
          }}
        />
        <CircleMarker
          center={currentLocation}
          radius={9}
          pathOptions={{
            color: '#00BC74',
            fillColor: '#00BC74',
            fillOpacity: 0.8,
            weight: 0
          }}
        />
        
        {/* Charging stations */}
        {chargingStations.map((station, index) => (
          <Marker 
            key={index} 
            position={station.position} 
            icon={greyIcon}
            eventHandlers={{
              click: () => setSelectedStation(station)
            }}
          />
        ))}
      </MapContainer>
      </div>
      {selectedStation && (
        <ChargingStationBottomSheet 
          station={selectedStation} 
          onClose={() => setSelectedStation(null)} 
        />
      )}
    </>
  )
}