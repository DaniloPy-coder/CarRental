import React, { useEffect, useState } from 'react'
import { assets, dummyMyBookingsData } from '../assets/assets'
import Title from '../components/Title'

const MyBookings = () => {
  const [bookings, setBookings] = useState([])
  const currency = import.meta.env.VITE_CURRENCY
  const fetchMyBookings = async () => {
    setBookings(dummyMyBookingsData)
  }

  useEffect(() => {
    fetchMyBookings()
  }, [])

  return (
    <div className="mt-16 max-w-7xl px-6 text-sm md:px-16 lg:px-24 xl:px-32 2xl:px-48">
      <Title
        title="Minhas reservas"
        subtitle="Visualize e gerencie todas as suas reservas de carros"
        align="left"
      />

      <div>
        {bookings.map((booking, index) => (
          <div
            key={booking._id}
            className="mt-5 grid grid-cols-1 gap-6 rounded-lg border border-borderColor p-6 first:mt-12 md:grid-cols-4"
          >
            {/* Imagem do carro + info */}
            <div className="md:col-span-1">
              <div className="mb-3 overflow-hidden rounded-md">
                <img
                  src={booking.car.image}
                  alt="car image"
                  className="aspect-video h-auto w-full object-cover"
                />
              </div>
              <p className="mt-2 text-lg font-medium">
                {booking.car.brand} {booking.car.model}
              </p>
              <p className="text-gray-500">
                {booking.car.year} • {booking.car.category} •{' '}
                {booking.car.location}
              </p>
            </div>

            {/* Informações da reserva */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2">
                <p className="rounded bg-light px-3 py-1.5">
                  Reserva #{index + 1}
                </p>
                <p
                  className={`rounded-full px-3 py-1 text-xs ${
                    booking.status.trim().toLowerCase() === 'confirmado'
                      ? 'bg-green-400/15 text-green-600'
                      : 'bg-red-400/15 text-red-600'
                  }`}
                >
                  {booking.status.charAt(0).toUpperCase() +
                    booking.status.slice(1)}
                </p>
              </div>

              <div className="mt-3 flex items-start gap-2">
                <img
                  src={assets.calendar_icon_colored}
                  alt="calendar icon"
                  className="mt-1 h-4 w-4"
                />
                <div>
                  <p className="text-gray-500">Período de aluguel</p>
                  <p>
                    {booking.pickupDate.split('T')[0]} Para{' '}
                    {booking.returnDate.split('T')[0]}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-start gap-2">
                <img
                  src={assets.location_icon_colored}
                  alt="calendar icon"
                  className="mt-1 h-4 w-4"
                />
                <div>
                  <p className="text-gray-500">Local de retirada</p>
                  <p>{booking.car.location}</p>
                </div>
              </div>
            </div>

            {/* PREÇO */}
            <div className="flex flex-col justify-between gap-6 md:col-span-1">
              <div className="text-right text-sm text-gray-500">
                <p>Preço Total</p>
                <h1 className="text-2xl font-semibold text-primary">
                  {currency}
                  {booking.price}
                </h1>
                <p>Reservado em {booking.createdAt.split('T')[0]}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyBookings
