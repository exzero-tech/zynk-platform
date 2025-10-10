import { MapContainer, TileLayer, Marker, CircleMarker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useState, useMemo } from 'react'
import ChargingStationBottomSheet from './ChargingStationBottomSheet'

interface ExploreMapProps {
  searchTerm?: string
  filters?: {
    status: string
    connectorType: string
    chargingSpeed: string
    pricePerKwh: string
  }
}

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

export default function ExploreMap({ searchTerm = '', filters }: ExploreMapProps) {
  const [selectedStation, setSelectedStation] = useState<any>(null)

  // University of Kelaniya coordinates (current location)
  const currentLocation: [number, number] = [6.9739, 79.9167]

  // Extended dummy EV charging stations data for explore page
  const allChargingStations = [
    { 
      position: [6.9650, 79.9280] as [number, number], 
      name: 'Kelaniya Central Hub', 
      status: 'Available', 
      distance: '2.8 km', 
      connectorType: 'ccs2',
      location: 'Kelaniya, Sri Lanka',
      pricePerKwh: 'LKR 45',
      host: 'CEB',
      chargerType: 'DC Fast Charger',
      chargerSpeed: '150 kW',
      chargingSpeed: 'ultra-fast',
      priceCategory: 'standard',
      byocSupport: true,
      amenities: {
        restaurants: true,
        malls: true,
        movieTheaters: false,
        parks: true,
        washrooms: true,
        cafes: true,
        supermarkets: true,
        parking: true,
        wifi: true
      }
    },
    { 
      position: [6.9550, 79.8950] as [number, number], 
      name: 'Highway Charge Point', 
      status: 'Available', 
      distance: '3.2 km', 
      connectorType: 'ccs2',
      location: 'Colombo-Kandy Highway, Sri Lanka',
      pricePerKwh: 'LKR 50',
      host: 'Lanka Electricity',
      chargerType: 'DC Fast Charger',
      chargerSpeed: '100 kW',
      chargingSpeed: 'rapid',
      priceCategory: 'standard',
      byocSupport: false,
      amenities: {
        restaurants: true,
        malls: false,
        movieTheaters: false,
        parks: false,
        washrooms: true,
        cafes: false,
        supermarkets: false,
        parking: true,
        wifi: false
      }
    },
    { 
      position: [7.0100, 79.9280] as [number, number], 
      name: 'EcoStation Kelaniya', 
      status: 'In Use', 
      distance: '4.1 km', 
      connectorType: 'type2',
      location: 'Dalugama, Sri Lanka',
      pricePerKwh: 'LKR 42',
      host: 'GreenCharge Lanka',
      chargerType: 'AC Fast Charger',
      chargerSpeed: '22 kW',
      chargingSpeed: 'fast',
      priceCategory: 'budget',
      byocSupport: true,
      amenities: {
        restaurants: false,
        malls: false,
        movieTheaters: false,
        parks: true,
        washrooms: true,
        cafes: true,
        supermarkets: false,
        parking: true,
        wifi: true
      }
    },
    { 
      position: [6.9350, 79.9450] as [number, number], 
      name: 'GreenPower Station', 
      status: 'Available', 
      distance: '4.5 km', 
      connectorType: 'ccs2',
      location: 'Kadawatha, Sri Lanka',
      pricePerKwh: 'LKR 48',
      host: 'Sustainable Energy',
      chargerType: 'DC Fast Charger',
      chargerSpeed: '125 kW',
      chargingSpeed: 'rapid',
      priceCategory: 'standard',
      byocSupport: true,
      amenities: {
        restaurants: true,
        malls: true,
        movieTheaters: true,
        parks: false,
        washrooms: true,
        cafes: true,
        supermarkets: true,
        parking: true,
        wifi: true
      }
    },
    { 
      position: [7.0150, 79.9050] as [number, number], 
      name: 'FastCharge Kelaniya', 
      status: 'Offline', 
      distance: '4.8 km', 
      connectorType: 'ccs2',
      location: 'Kelaniya North, Sri Lanka',
      pricePerKwh: 'LKR 52',
      host: 'FastCharge Networks',
      chargerType: 'DC Ultra Fast Charger',
      chargerSpeed: '200 kW',
      chargingSpeed: 'ultra-fast',
      priceCategory: 'premium',
      byocSupport: false,
      amenities: {
        restaurants: false,
        malls: false,
        movieTheaters: false,
        parks: false,
        washrooms: true,
        cafes: false,
        supermarkets: false,
        parking: true,
        wifi: false
      }
    },
    { 
      position: [6.9300, 79.9150] as [number, number], 
      name: 'ElectroHub', 
      status: 'In Use', 
      distance: '5.2 km', 
      connectorType: 'chademo',
      location: 'Kiribathgoda, Sri Lanka',
      pricePerKwh: 'LKR 46',
      host: 'Electro Lanka',
      chargerType: 'CHAdeMO Fast Charger',
      chargerSpeed: '90 kW',
      chargingSpeed: 'rapid',
      priceCategory: 'standard',
      byocSupport: true,
      amenities: {
        restaurants: true,
        malls: false,
        movieTheaters: false,
        parks: true,
        washrooms: true,
        cafes: true,
        supermarkets: true,
        parking: true,
        wifi: true
      }
    },
    { 
      position: [6.9800, 79.8750] as [number, number], 
      name: 'PowerPoint Station', 
      status: 'Under Maintenance', 
      distance: '4.2 km', 
      connectorType: 'type1',
      location: 'Wattala, Sri Lanka',
      pricePerKwh: 'LKR 44',
      host: 'PowerPoint EV',
      chargerType: 'AC Standard Charger',
      chargerSpeed: '7 kW',
      chargingSpeed: 'slow',
      priceCategory: 'budget',
      byocSupport: true,
      amenities: {
        restaurants: false,
        malls: false,
        movieTheaters: false,
        parks: false,
        washrooms: true,
        cafes: false,
        supermarkets: false,
        parking: true,
        wifi: false
      }
    },
    { 
      position: [6.9820, 79.9300] as [number, number], 
      name: 'Volt Station', 
      status: 'Available', 
      distance: '4.2 km', 
      connectorType: 'byoc',
      location: 'Peliyagoda, Sri Lanka',
      pricePerKwh: 'LKR 49',
      host: 'Volt Lanka',
      chargerType: 'BYOC Portable Charger',
      chargerSpeed: '11 kW',
      chargingSpeed: 'fast',
      priceCategory: 'standard',
      byocSupport: false,
      amenities: {
        restaurants: true,
        malls: true,
        movieTheaters: false,
        parks: false,
        washrooms: true,
        cafes: true,
        supermarkets: true,
        parking: true,
        wifi: true
      }
    },
    { 
      position: [6.9650, 79.9050] as [number, number], 
      name: 'Kelaniya Temple Station', 
      status: 'Available', 
      distance: '1.8 km', 
      connectorType: 'type2',
      location: 'Kelaniya Temple, Sri Lanka',
      pricePerKwh: 'LKR 43',
      host: 'Temple EV Network',
      chargerType: 'AC Fast Charger',
      chargerSpeed: '25 kW',
      chargingSpeed: 'fast',
      priceCategory: 'budget',
      byocSupport: true,
      amenities: {
        restaurants: true,
        malls: false,
        movieTheaters: false,
        parks: true,
        washrooms: true,
        cafes: true,
        supermarkets: false,
        parking: true,
        wifi: false
      }
    },
    { 
      position: [6.9850, 79.9320] as [number, number], 
      name: 'University Charge Hub', 
      status: 'Available', 
      distance: '2.5 km', 
      connectorType: 'ccs2',
      location: 'University of Kelaniya, Sri Lanka',
      pricePerKwh: 'LKR 40',
      host: 'University Facilities',
      chargerType: 'DC Fast Charger',
      chargerSpeed: '50 kW',
      chargingSpeed: 'rapid',
      priceCategory: 'budget',
      byocSupport: true,
      amenities: {
        restaurants: true,
        malls: false,
        movieTheaters: false,
        parks: true,
        washrooms: true,
        cafes: true,
        supermarkets: true,
        parking: true,
        wifi: true
      }
    },
    { 
      position: [6.9500, 79.9450] as [number, number], 
      name: 'Kadawatha Junction', 
      status: 'In Use', 
      distance: '3.8 km', 
      connectorType: 'chademo',
      location: 'Kadawatha Junction, Sri Lanka',
      pricePerKwh: 'LKR 47',
      host: 'Junction Networks',
      chargerType: 'CHAdeMO Fast Charger',
      chargerSpeed: '80 kW',
      chargingSpeed: 'rapid',
      priceCategory: 'standard',
      byocSupport: false,
      amenities: {
        restaurants: true,
        malls: true,
        movieTheaters: true,
        parks: false,
        washrooms: true,
        cafes: true,
        supermarkets: true,
        parking: true,
        wifi: true
      }
    },
    { 
      position: [7.0050, 79.9050] as [number, number], 
      name: 'Ragama Express Point', 
      status: 'Available', 
      distance: '4.2 km', 
      connectorType: 'ccs2',
      location: 'Ragama, Sri Lanka',
      pricePerKwh: 'LKR 51',
      host: 'Express Charge Lanka',
      chargerType: 'DC Ultra Fast Charger',
      chargerSpeed: '175 kW',
      chargingSpeed: 'ultra-fast',
      priceCategory: 'premium',
      byocSupport: true,
      amenities: {
        restaurants: true,
        malls: false,
        movieTheaters: false,
        parks: false,
        washrooms: true,
        cafes: true,
        supermarkets: false,
        parking: true,
        wifi: true
      }
    },
    { 
      position: [6.9400, 79.8950] as [number, number], 
      name: 'Kiribathgoda Plaza', 
      status: 'Available', 
      distance: '3.2 km', 
      connectorType: 'type2',
      location: 'Kiribathgoda Plaza, Sri Lanka',
      pricePerKwh: 'LKR 45',
      host: 'Plaza Charging',
      chargerType: 'AC Fast Charger',
      chargerSpeed: '22 kW',
      chargingSpeed: 'fast',
      priceCategory: 'standard',
      byocSupport: true,
      amenities: {
        restaurants: true,
        malls: true,
        movieTheaters: true,
        parks: false,
        washrooms: true,
        cafes: true,
        supermarkets: true,
        parking: true,
        wifi: true
      }
    },
    { 
      position: [6.9600, 79.8800] as [number, number], 
      name: 'Wattala Highway Stop', 
      status: 'Available', 
      distance: '3.5 km', 
      connectorType: 'ccs2',
      location: 'Wattala Highway, Sri Lanka',
      pricePerKwh: 'LKR 48',
      host: 'Highway Charging',
      chargerType: 'DC Fast Charger',
      chargerSpeed: '120 kW',
      chargingSpeed: 'rapid',
      priceCategory: 'standard',
      byocSupport: false,
      amenities: {
        restaurants: true,
        malls: false,
        movieTheaters: false,
        parks: false,
        washrooms: true,
        cafes: true,
        supermarkets: false,
        parking: true,
        wifi: false
      }
    },
    { 
      position: [6.9950, 79.9550] as [number, number], 
      name: 'Yakkala Green Station', 
      status: 'Available', 
      distance: '5.2 km', 
      connectorType: 'byoc',
      location: 'Yakkala, Sri Lanka',
      pricePerKwh: 'LKR 42',
      host: 'Green Energy Co',
      chargerType: 'BYOC Portable Charger',
      chargerSpeed: '15 kW',
      chargingSpeed: 'fast',
      priceCategory: 'budget',
      byocSupport: true,
      amenities: {
        restaurants: false,
        malls: false,
        movieTheaters: false,
        parks: true,
        washrooms: true,
        cafes: false,
        supermarkets: false,
        parking: true,
        wifi: false
      }
    },
    { 
      position: [6.9250, 79.9600] as [number, number], 
      name: 'Gampaha Road Station', 
      status: 'Under Maintenance', 
      distance: '5.8 km', 
      connectorType: 'type1',
      location: 'Gampaha Road, Sri Lanka',
      pricePerKwh: 'LKR 44',
      host: 'Road Networks',
      chargerType: 'AC Standard Charger',
      chargerSpeed: '7 kW',
      chargingSpeed: 'slow',
      priceCategory: 'budget',
      byocSupport: true,
      amenities: {
        restaurants: false,
        malls: false,
        movieTheaters: false,
        parks: false,
        washrooms: true,
        cafes: false,
        supermarkets: false,
        parking: true,
        wifi: false
      }
    },
    { 
      position: [7.0200, 79.9400] as [number, number], 
      name: 'Nittambuwa Express', 
      status: 'Available', 
      distance: '6.5 km', 
      connectorType: 'ccs2',
      location: 'Nittambuwa, Sri Lanka',
      pricePerKwh: 'LKR 53',
      host: 'Express Lanka',
      chargerType: 'DC Ultra Fast Charger',
      chargerSpeed: '180 kW',
      chargingSpeed: 'ultra-fast',
      priceCategory: 'premium',
      byocSupport: false,
      amenities: {
        restaurants: true,
        malls: true,
        movieTheaters: false,
        parks: false,
        washrooms: true,
        cafes: true,
        supermarkets: true,
        parking: true,
        wifi: true
      }
    },
    { 
      position: [6.9150, 79.9350] as [number, number], 
      name: 'Mahara Junction Point', 
      status: 'In Use', 
      distance: '5.5 km', 
      connectorType: 'chademo',
      location: 'Mahara, Sri Lanka',
      pricePerKwh: 'LKR 46',
      host: 'Junction Power',
      chargerType: 'CHAdeMO Fast Charger',
      chargerSpeed: '75 kW',
      chargingSpeed: 'rapid',
      priceCategory: 'standard',
      byocSupport: true,
      amenities: {
        restaurants: true,
        malls: false,
        movieTheaters: false,
        parks: true,
        washrooms: true,
        cafes: true,
        supermarkets: false,
        parking: true,
        wifi: false
      }
    },
    { 
      position: [6.9750, 79.8650] as [number, number], 
      name: 'Negombo Road Hub', 
      status: 'Available', 
      distance: '4.8 km', 
      connectorType: 'type2',
      location: 'Negombo Road, Sri Lanka',
      pricePerKwh: 'LKR 41',
      host: 'Road Hub Networks',
      chargerType: 'AC Fast Charger',
      chargerSpeed: '18 kW',
      chargingSpeed: 'fast',
      priceCategory: 'budget',
      byocSupport: true,
      amenities: {
        restaurants: false,
        malls: false,
        movieTheaters: false,
        parks: false,
        washrooms: true,
        cafes: true,
        supermarkets: false,
        parking: true,
        wifi: true
      }
    }
  ]

  // Filter stations based on search term and filters
  const chargingStations = useMemo(() => {
    let filtered = allChargingStations

    // Apply search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(station => 
        station.name.toLowerCase().includes(term) ||
        station.location.toLowerCase().includes(term) ||
        station.host.toLowerCase().includes(term)
      )
    }

    // Apply status filter
    if (filters?.status && filters.status !== 'all') {
      filtered = filtered.filter(station => {
        if (filters.status === 'available') return station.status === 'Available'
        if (filters.status === 'in-use') return station.status === 'In Use'
        if (filters.status === 'offline') return station.status === 'Offline'
        if (filters.status === 'maintenance') return station.status === 'Under Maintenance'
        return true
      })
    }

    // Apply connector type filter
    if (filters?.connectorType && filters.connectorType !== 'all') {
      filtered = filtered.filter(station => station.connectorType === filters.connectorType)
    }

    // Apply charging speed filter
    if (filters?.chargingSpeed && filters.chargingSpeed !== 'all') {
      filtered = filtered.filter(station => station.chargingSpeed === filters.chargingSpeed)
    }

    // Apply price per kWh filter
    if (filters?.pricePerKwh && filters.pricePerKwh !== 'all') {
      filtered = filtered.filter(station => station.priceCategory === filters.pricePerKwh)
    }

    return filtered
  }, [searchTerm, filters])

  return (
    <>
      <div className="h-full w-full z-0 relative">
        <MapContainer
          center={currentLocation}
          zoom={13}
          style={{ height: '100vh', width: '100%' }}
          zoomControl={false}
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