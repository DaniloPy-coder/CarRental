import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const CarCard = ({ car }) => {
  const currency = import.meta.env.VITE_CURRENCY
  const navigate = useNavigate()

  return (
    <div
      onClick={() => {
        navigate(`/car-details/${car.id}`)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }}
      className="group cursor-pointer overflow-hidden rounded-xl shadow-lg transition-all duration-500 hover:-translate-y-1"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={car.image}
          alt="Car image"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {car.isAvaliable && (
          <p className="absolute left-4 top-4 rounded-full bg-primary/90 px-2.5 py-1 text-xs text-white">
            Disponivel agora
          </p>
        )}

        <div className="absolute bottom-4 right-4 rounded-lg bg-black/80 px-3 py-2 text-white backdrop-blur-sm">
          <span className="font-semibold">
            {currency}
            {car.pricePerDay}
          </span>
          <span className="text-sm text-white/80"> / dia</span>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="mb-2 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-medium">
              {car.brand} {car.model}
            </h3>
            <p className="text-muted-foreground text-sm">
              {car.category} • {car.year}
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-y-2 text-gray-600">
          <div className="text-muted-foreground flex items-center text-sm">
            <img src={assets.users_icon} alt="user icon" className="mr-2 h-4" />
            <span>{car.seatingcapacity} Lugares</span>
          </div>
          <div className="text-muted-foreground flex items-center text-sm">
            <img src={assets.fuel_icon} alt="fuel icon" className="mr-2 h-4" />
            <span>{car.fuelType}</span>
          </div>
          <div className="text-muted-foreground flex items-center text-sm">
            <img src={assets.car_icon} alt="car icon" className="mr-2 h-4" />
            <span>{car.transmission}</span>
          </div>
          <div className="text-muted-foreground flex items-center text-sm">
            <img
              src={assets.location_icon}
              alt="location icon"
              className="mr-2 h-4"
            />
            <span>{car.location}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarCard
