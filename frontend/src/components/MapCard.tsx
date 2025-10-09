'use client'

import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

const blueIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

const greyIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

export default function MapCard() {
  // University of Kelaniya coordinates
  const universityPosition: [number, number] = [6.9739, 79.9167]

  // Dummy EV charging stations near University of Kelaniya
  const chargingStations = [
    { position: [6.9800, 79.9200] as [number, number], name: 'Kelaniya Central Hub', status: 'Available', distance: '1.2 km' },
    { position: [6.9700, 79.9100] as [number, number], name: 'Highway Charge Point', status: 'Available', distance: '1.8 km' },
    { position: [6.9850, 79.9250] as [number, number], name: 'EcoStation Kelaniya', status: 'In Use', distance: '2.5 km' }
  ]

  return (
    <div className="bg-foreground rounded-2xl p-0 overflow-hidden h-48">
      <MapContainer
        center={universityPosition}
        zoom={14}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {/* University location indicator */}
        <CircleMarker
          center={universityPosition}
          radius={24}
          pathOptions={{
            color: '#00BC74',
            fillColor: '#00BC74',
            fillOpacity: 0.2,
            weight: 0
          }}
        />
        <CircleMarker
          center={universityPosition}
          radius={6}
          pathOptions={{
            color: '#00BC74',
            fillColor: '#00BC74',
            fillOpacity: 0.8,
            weight: 0
          }}
        />
        {/* Charging stations */}
        {chargingStations.map((station, index) => (
          <Marker key={index} position={station.position} icon={greyIcon}>
            <Popup>
              <div>
                <strong>{station.name}</strong><br />
                Status: {station.status}<br />
                Distance: {station.distance}<br />
                ⚡ Fast Charging Available
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}