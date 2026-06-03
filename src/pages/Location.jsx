import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import GoldDivider from '../components/GoldDivider'

// Don Gal Hotel, Luanda — confirma as coordenadas exatas antes de publicar
const HOTEL_COORDS = { lat: -8.8383, lng: 13.2344 }
const HOTEL_NAME = 'Don Gal Hotel'
const HOTEL_ADDRESS = 'Rua Marechal Brós Tito, Luanda, Angola'
const GOOGLE_MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${HOTEL_COORDS.lat},${HOTEL_COORDS.lng}`

const mapContainerStyle = { width: '100%', height: '100%' }

const mapOptions = {
  styles: [
    { elementType: 'geometry', stylers: [{ color: '#0d1628' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#0d1628' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#c9a84c' }] },
    {
      featureType: 'administrative',
      elementType: 'geometry',
      stylers: [{ color: '#1a2a4a' }],
    },
    {
      featureType: 'administrative.country',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#f5e6c8' }],
    },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#e8c87a' }],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#c9a84c' }],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{ color: '#0d1e14' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#1a2a4a' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#080e1c' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{ color: '#243870' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#1a2a4a' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#f5e6c8' }],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{ color: '#121e35' }],
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#c9a84c' }],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#04101e' }],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#1a3060' }],
    },
  ],
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: true,
  zoom: 15,
  center: HOTEL_COORDS,
}

function MapFallback() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-navy-800/60 border border-gold-500/20 rounded-2xl gap-4 p-8 text-center">
      <div className="text-4xl">📍</div>
      <p className="font-serif text-gold-300 text-lg">{HOTEL_NAME}</p>
      <p className="font-sans text-gold-500/70 text-sm">{HOTEL_ADDRESS}</p>
      <a
        href={GOOGLE_MAPS_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 px-6 py-2 border border-gold-500/50 text-gold-400 font-sans text-xs tracking-[0.2em] uppercase hover:bg-gold-500/10 transition-all"
      >
        Abrir no Google Maps
      </a>
      <p className="font-sans text-gold-500/40 text-xs mt-2">
        Configure VITE_GOOGLE_MAPS_API_KEY no ficheiro .env para ver o mapa
      </p>
    </div>
  )
}

function Map() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  const [map, setMap] = useState(null)

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey || '',
    id: 'noivado-map',
  })

  const onLoad = useCallback((m) => setMap(m), [])
  const onUnmount = useCallback(() => setMap(null), [])

  if (!apiKey || apiKey === 'YOUR_GOOGLE_MAPS_API_KEY_HERE') return <MapFallback />
  if (loadError) return <MapFallback />
  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-navy-800/60 rounded-2xl">
        <div className="font-sans text-gold-500/60 text-sm tracking-wider">A carregar mapa…</div>
      </div>
    )
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      options={mapOptions}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker
        position={HOTEL_COORDS}
        title={HOTEL_NAME}
        icon={{
          path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
          fillColor: '#c9a84c',
          fillOpacity: 1,
          strokeColor: '#f5e6c8',
          strokeWeight: 1.5,
          scale: 2,
          anchor: { x: 12, y: 22 },
        }}
      />
    </GoogleMap>
  )
}

const infoItems = [
  { icon: '🏨', label: 'Local', value: HOTEL_NAME },
  { icon: '📍', label: 'Endereço', value: HOTEL_ADDRESS },
  { icon: '📅', label: 'Data', value: '06 de Junho de 2026' },
  { icon: '🕕', label: 'Hora', value: '18:30' },
]

const directions = [
  {
    icon: '🚗',
    title: 'De Carro',
    text: 'Dirija-se ao centro de Luanda e siga as indicações para o Don Gal Hotel. Estacionamento disponível nas imediações.',
  },
  {
    icon: '🚕',
    title: 'De Táxi / Candongueiro',
    text: 'Indique "Don Gal Hotel" ao motorista. O hotel fica numa zona de fácil acesso no centro da cidade.',
  },
  {
    icon: '📞',
    title: 'Precisa de Ajuda?',
    text: 'Entre em contacto com a organização para obter indicações personalizadas para a sua localização.',
  },
]

export default function Location() {
  return (
    <main className="relative min-h-screen pt-20 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 to-navy-900 -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 pt-6"
        >
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold-500/60 mb-4">
            Onde nos encontrar
          </p>
          <h2 className="font-script text-5xl sm:text-6xl text-gold-shimmer mb-4">
            Localização
          </h2>
          <GoldDivider className="mt-2" />
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="w-full h-72 sm:h-96 rounded-2xl overflow-hidden border border-gold-500/20 mb-8"
        >
          <Map />
        </motion.div>

        {/* Info cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6"
        >
          {infoItems.map(({ icon, label, value }) => (
            <div key={label} className="glass-card p-4 text-center">
              <div className="text-xl mb-2">{icon}</div>
              <div className="font-sans text-[9px] tracking-[0.2em] uppercase text-gold-500 mb-1">
                {label}
              </div>
              <div className="font-serif text-xs text-gold-200 leading-snug">{value}</div>
            </div>
          ))}
        </motion.div>

        {/* Open in Maps button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="flex justify-center mb-14"
        >
          <a
            href={GOOGLE_MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3 border border-gold-500/50 text-gold-400 font-sans text-xs tracking-[0.2em] uppercase hover:bg-gold-500/10 hover:border-gold-400 transition-all duration-300"
          >
            <span>📍</span>
            Abrir no Google Maps
          </a>
        </motion.div>

        {/* How to get there */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold-500/60 mb-3">
              Indicações
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl text-gold-300">Como Chegar</h3>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {directions.map(({ icon, title, text }) => (
              <div key={title} className="glass-card p-5">
                <div className="text-2xl mb-3">{icon}</div>
                <h4 className="font-sans text-xs tracking-[0.15em] uppercase text-gold-500 mb-2">
                  {title}
                </h4>
                <p className="font-serif text-sm text-gold-300/70 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          {/* Coordinates */}
          <div className="mt-6 text-center">
            <p className="font-sans text-xs text-gold-500/40 tracking-wider">
              GPS: {HOTEL_COORDS.lat}, {HOTEL_COORDS.lng}
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
