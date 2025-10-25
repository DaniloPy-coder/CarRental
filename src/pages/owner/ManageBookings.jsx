import { useEffect, useState } from 'react'
import { dummyMyBookingsData } from '../../assets/assets'
import Title from '../../components/owner/Title'

const ManageBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY
  const [bookings, setBookings] = useState([])

  const fetchOwnerBookings = async () => {
    setBookings(dummyMyBookingsData)
  }

  useEffect(() => {
    fetchOwnerBookings()
  }, [])

  return (
    <div className="w-full px-4 pt-10 md:px-10">
      <Title
        title="Gerenciar reservas"
        subtitle="Acompanhe todas as reservas dos clientes, aprove ou cancele solicitações e gerencie os status das reservas"
      />

      <div className="mt-6 w-full max-w-3xl overflow-hidden rounded-md border border-borderColor">
        <table className="w-full border-collapse text-left text-sm text-gray-600">
          <thead className="text-gray-500">
            <tr>
              <th className="p-3 font-medium">Carro</th>
              <th className="p-3 font-medium max-md:hidden">Período</th>
              <th className="p-3 font-medium">Total</th>
              <th className="p-3 font-medium max-md:hidden">Payment</th>
              <th className="p-3 font-medium">Ações</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr
                key={index}
                className="border-t border-borderColor text-gray-500"
              >
                <td className="flex items-center gap-3 p-3">
                  <img
                    src={booking.car.image}
                    alt="car image"
                    className="aspect-square h-12 w-12 rounded-md object-cover"
                  />
                  <p className="font-medium max-md:hidden">
                    {booking.car.brand} {booking.car.model}
                  </p>

                  <td className="p-3 max-md:hidden">
                    {booking.pickupDate.split('T')[0]} para{' '}
                    {booking.returnDate.split('T')[0]}
                  </td>

                  <td className="p-3">
                    {currency}
                    {booking.price}
                  </td>

                  <td className="p-3 max-md:hidden">
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs">
                      offline
                    </span>
                  </td>

                  <td className="p-3">
                    {booking.status === 'pendente' ? (
                      <select
                        value={booking.status}
                        className="mt-1 rounded-md border border-borderColor px-2 py-1.5 text-gray-500 outline-none"
                      >
                        <option value="pendente">Pendente</option>
                        <option value="cancelado">Cancelado</option>
                        <option value="confirmado">Confirmado</option>
                      </select>
                    ) : (
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${booking.status === 'confirmado' ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'}`}
                      >
                        {booking.status}
                      </span>
                    )}
                  </td>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageBookings
