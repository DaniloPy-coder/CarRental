import { useContext, useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import Title from '../../components/owner/Title'
import { api } from '../../services/api'
import toast from 'react-hot-toast'
import { AppContext } from '../../context/AppContext'

const ManageCars = () => {
  const { isOwner } = useContext(AppContext)
  const [cars, setCars] = useState([])

  const fetchOwnerCars = async () => {
    try {
      const { data } = await api.get('/owner/cars')
      if (data.success) {
        setCars(data.cars)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const toggleAvailability = async (carId) => {
    try {
      const { data } = await api.patch(`/cars/${carId}/toggleAvailability`)
      if (data.success) {
        toast.success(data.message)
        fetchOwnerCars()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const deleteCar = async (carId) => {
    try {
      const confirmDelete = window.confirm(
        'Tem certeza que deseja excluir este carro?',
      )
      if (!confirmDelete) return

      const { data } = await api.delete(`/cars/${carId}`)
      if (data.success) {
        toast.success(data.message)
        fetchOwnerCars()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (isOwner) fetchOwnerCars()
  }, [isOwner])

  return (
    <div className="w-full px-4 pt-10 md:px-10">
      <Title
        title="Gerenciar carros"
        subtitle="Veja todos os carros listados, atualize seus detalhes ou remova-os da plataforma de reservas"
      />

      <div className="mt-6 w-full max-w-3xl overflow-hidden rounded-md border border-borderColor">
        <table className="w-full border-collapse text-left text-sm text-gray-600">
          <thead className="text-gray-500">
            <tr>
              <th className="p-3 font-medium">Carro</th>
              <th className="p-3 font-medium max-md:hidden">Categoria</th>
              <th className="p-3 font-medium">Preço</th>
              <th className="p-3 font-medium max-md:hidden">Status</th>
              <th className="p-3 font-medium">Ações</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => (
              <tr key={index} className="border-t border-borderColor">
                <td className="flex items-center gap-3 p-3">
                  <img
                    src={car.image}
                    alt="car image"
                    className="aspect-square h-12 w-12 rounded-md object-cover"
                  />
                  <div className="max-md:hidden">
                    <p className="font-medium">
                      {car.brand} {car.model}
                    </p>
                    <p className="text-xs text-gray-500">
                      {car.seating_capacity} • {car.transmission}
                    </p>
                  </div>
                </td>

                <td className="p-3 max-md:hidden">{car.category}</td>
                <td className="p-3">{car.pricePerDay}/dia</td>

                <td className="p-3 max-md:hidden">
                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      car.isAvailable
                        ? 'bg-green-100 text-green-500'
                        : 'bg-red-100 text-red-500'
                    }`}
                  >
                    {car.isAvailable ? 'Disponível' : 'Indisponível'}
                  </span>
                </td>

                <td className="flex items-center gap-2 p-3">
                  <img
                    src={
                      car.isAvailable ? assets.eye_close_icon : assets.eye_icon
                    }
                    alt="toggle availability"
                    className="cursor-pointer"
                    onClick={() => toggleAvailability(car.id)}
                  />
                  <img
                    src={assets.delete_icon}
                    alt="delete icon"
                    className="cursor-pointer"
                    onClick={() => deleteCar(car.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageCars
