import { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import Loader from '../components/Loader'
import { api } from '../services/api'
import toast from 'react-hot-toast'
import { AppContext } from '../context/AppContext'

const CarDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, setShowLogin } = useContext(AppContext)

  const [car, setCar] = useState(null)
  const [pickupDate, setPickupDate] = useState('')
  const [returnDate, setReturnDate] = useState('')

  const currency = import.meta.env.VITE_CURRENCY

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setShowLogin(true)
        return
      }

      const { data } = await api.post(
        '/bookings',
        { carId: id, pickupDate, returnDate },
        { headers: { Authorization: `Bearer ${token}` } },
      )

      toast.success('Reserva realizada com sucesso!')
      navigate('/my-bookings')
    } catch (err) {
      console.log(err.response?.data)
      toast.error(err.response?.data?.error || 'Erro ao criar reserva')
    }
  }

  useEffect(() => {
    async function loadCar() {
      try {
        const response = await api.get(`/cars/${id}`)
        setCar(response.data.car)
      } catch (err) {
        console.log(err)
        navigate('/cars')
      }
    }
    loadCar()
  }, [id])

  return car ? (
    <div className="mt-16 px-6 md:px-16 lg:px-24 xl:px-32">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex cursor-pointer items-center gap-2 text-gray-500"
      >
        <img src={assets.arrow_icon} className="rotate-180 opacity-65" />
        Voltar para todos os carros
      </button>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
        {/* LADO ESQUERDO */}
        <div className="lg:col-span-2">
          <img
            src={car.image}
            alt="car"
            className="mb-6 h-auto w-full rounded-xl object-cover shadow-md"
          />
          <h1 className="text-3xl font-bold">
            {car.brand} {car.model}
          </h1>
          <p>
            {car.category} • {car.year}
          </p>

          <hr className="my-6 border-borderColor" />

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              {
                id: 'seats',
                icon: assets.users_icon,
                text: `${car.seatingCapacity || 0} Lugares`,
              },
              {
                id: 'fuel',
                icon: assets.fuel_icon,
                text: car.fuelType || 'N/A',
              },
              {
                id: 'gear',
                icon: assets.car_icon,
                text: car.transmission || 'N/A',
              },
              {
                id: 'loc',
                icon: assets.location_icon,
                text: car.location || 'N/A',
              },
            ].map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center rounded-lg bg-light p-4"
              >
                <img src={item.icon} className="mb-2 h-5" />
                {item.text}
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h1 className="text-xl font-medium">Descrição</h1>
            <p className="text-gray-500">{car.description}</p>
          </div>
        </div>

        {/* FORMULÁRIO */}
        <div className="sticky top-20 flex h-max flex-col space-y-4 rounded-xl p-6 text-gray-500 shadow-lg">
          {/* Preço */}
          <div className="flex flex-col gap-1">
            <p className="flex items-center justify-between text-2xl font-semibold text-gray-800">
              {currency}
              {car.pricePerDay}
            </p>
            <span className="text-base text-gray-400">por dia</span>
          </div>

          <hr className="my-4 border-borderColor" />

          {/* Data de retirada */}
          <div className="flex flex-col gap-2">
            <label htmlFor="pickup-date" className="font-medium">
              Data de retirada
            </label>
            <input
              type="date"
              id="pickup-date"
              min={new Date().toISOString().split('T')[0]}
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="rounded-lg border border-borderColor px-3 py-2"
              required
              disabled={!user}
            />
          </div>

          {/* Data de retorno */}
          <div className="flex flex-col gap-2">
            <label htmlFor="return-date" className="font-medium">
              Data de retorno
            </label>
            <input
              type="date"
              id="return-date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="rounded-lg border border-borderColor px-3 py-2"
              required
              disabled={!user}
            />
          </div>

          {/* Botão */}
          <button
            onClick={handleSubmit}
            className={`mt-2 w-full rounded-xl ${
              user
                ? 'bg-primary hover:bg-primary-dull'
                : 'bg-gray-400 hover:bg-gray-500'
            } py-3 font-medium text-white`}
          >
            {user ? 'Reservar agora' : 'Faça login para reservar'}
          </button>

          <p className="mt-2 text-center text-sm">
            Não é necessário cartão de crédito para reservar
          </p>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  )
}

export default CarDetails
