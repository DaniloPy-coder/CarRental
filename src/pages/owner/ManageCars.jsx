import { useEffect, useState } from 'react'
import { assets, dummyCarData } from '../../assets/assets'
import Title from '../../components/owner/Title'

const ManageCars = () => {
  const currency = import.meta.env.VITE_CURRENCY
  const [cars, setCars] = useState([])

  const fetchOwnerCars = async () => {
    setCars(dummyCarData)
  }

  useEffect(() => {
    fetchOwnerCars()
  }, [])

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
                <td className="p-3">
                  {currency}
                  {car.pricePerDay}/dia
                </td>

                <td className="p-3 max-md:hidden">
                  <span
                    className={`rounded-full px-3 py-1 text-xs ${car.isAvaliable ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'}`}
                  >
                    {car.isAvaliable ? 'Disponível' : 'Indisponível'}
                  </span>
                </td>

                <td className="flex items-center p-3">
                  <img
                    src={
                      car.isAvaliable ? assets.eye_close_icon : assets.eye_icon
                    }
                    alt="image"
                    className="cursor-pointer"
                  />
                  <img
                    src={assets.delete_icon}
                    alt="delete icon"
                    className="cursor-pointer"
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
