import { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import Loader from '../components/Loader'
import { api } from '../services/api'
import toast from 'react-hot-toast'

const MyBookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const currency = import.meta.env.VITE_CURRENCY

  const fetchMyBookings = async () => {
    try {
      const token = localStorage.getItem('token')
      const { data } = await api.get('/bookings/user', {
        headers: { Authorization: `Bearer ${token}` },
      })

      setBookings(data.bookings || [])
    } catch (err) {
      console.error(err)
      toast.error('Faça login para acessar suas reservas.')
      setBookings([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMyBookings()
  }, [])

  if (loading) return <Loader />
  if (bookings.length === 0)
    return (
      <p className="mt-10 text-center text-gray-500">
        Você ainda não tem reservas.
      </p>
    )

  return (
    <div className="mt-16 max-w-7xl px-6 text-sm md:px-16 lg:px-24 xl:px-32 2xl:px-48">
      <Title
        title="Minhas reservas"
        subtitle="Visualize e gerencie todas as suas reservas de carros"
        align="left"
      />
      <div>
        {bookings.map((booking, index) => {
          const car = booking.car || {}
          return (
            <div
              key={booking.id || index}
              className="mt-5 grid grid-cols-1 gap-6 rounded-lg border border-borderColor p-6 first:mt-12 md:grid-cols-4"
            >
              <div className="md:col-span-1">
                <div className="mb-3 overflow-hidden rounded-md">
                  <img
                    src={car.image || assets.placeholder_car}
                    alt="car"
                    className="aspect-video h-auto w-full object-cover"
                  />
                </div>
                <p className="mt-2 text-lg font-medium">
                  {car.brand || 'Carro'} {car.model || ''}
                </p>
                <p className="text-gray-500">
                  {car.year || '----'} • {car.category || '----'} •{' '}
                  {car.location || '----'}
                </p>
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center gap-2">
                  <p className="rounded bg-light px-3 py-1.5">
                    Reserva #{index + 1}
                  </p>
                  <p
                    className={`rounded-full px-3 py-1 text-xs ${
                      booking.status?.toLowerCase() === 'confirmado'
                        ? 'bg-green-400/15 text-green-600'
                        : 'bg-red-400/15 text-red-600'
                    }`}
                  >
                    {booking.status || 'Pendente'}
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
                      {booking.pickupDate?.split('T')[0] || '----'} Para{' '}
                      {booking.returnDate?.split('T')[0] || '----'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between gap-6 text-right text-sm text-gray-500 md:col-span-1">
                <p>Preço Total</p>
                <h1 className="text-2xl font-semibold text-primary">
                  {currency}
                  {booking.price || '0'}
                </h1>
                <p>Reservado em {booking.createdAt?.split('T')[0] || '----'}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyBookings
