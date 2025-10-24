import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets, dummyCarData } from '../assets/assets'
import Loader from '../components/Loader'

const CarDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const currency = import.meta.env.VITE_CURRENCY

  const handleSubmit = async (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    setCar(dummyCarData.find((car) => car._id === id))
  }, [id])

  return car ? (
    <div className="mt-16 px-6 md:px-16 lg:px-24 xl:px-32">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex cursor-pointer items-center gap-2 text-gray-500"
      >
        <img
          src={assets.arrow_icon}
          alt="arrow icon"
          className="rotate-180 opacity-65"
        />
        Voltar para todos os carros
      </button>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
        {/* Esquerda: Imagem do carro e detalhes */}
        <div className="lg:col-span-2">
          <img
            src={car.image}
            alt="car image"
            className="mb-6 h-auto w-full rounded-xl object-cover shadow-md md:max-h-full"
          />
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">
                {car.brand} {car.model}
              </h1>
              <p>
                {car.category} • {car.year}
              </p>
            </div>
            <hr className="my-6 border-borderColor" />

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                {
                  icon: assets.users_icon,
                  text: `${car.seating_capacity} Lugares`,
                },
                {
                  icon: assets.fuel_icon,
                  text: car.fuel_type,
                },
                {
                  icon: assets.car_icon,
                  text: car.transmission,
                },
                {
                  icon: assets.location_icon,
                  text: car.location,
                },
              ].map(({ icon, text }) => (
                <div
                  key={text}
                  className="flex flex-col items-center rounded-lg bg-light p-4"
                >
                  <img src={icon} alt="icon" className="mb-2 h-5" />
                  {text}
                </div>
              ))}
            </div>

            {/* Descrição do carro */}
            <div>
              <h1 className="mb-3 text-xl font-medium">Descrição</h1>
              <p className="text-gray-500">{car.description}</p>
            </div>

            {/* Características */}
            <div>
              <h1 className="mb-3 text-xl font-medium">Características</h1>
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {['Camera 360°', 'Bluetooth', 'GPS', 'Assentos aquecidos'].map(
                  (item) => (
                    <li key={item} className="flex items-center text-gray-500">
                      <img
                        src={assets.check_icon}
                        alt="check icon"
                        className="mr-2 h-4"
                      />
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Direita: Formulario de reserva */}
        <form
          onSubmit={handleSubmit}
          className="top-18 sticky h-max space-y-6 rounded-xl p-6 text-gray-500 shadow-lg"
        >
          <p className="flex items-center justify-between text-2xl font-semibold text-gray-800">
            {currency}
            {car.pricePerDay}
          </p>
          <span className="text-base font-normal text-gray-400"> por dia</span>

          <hr className="my-6 border-borderColor" />

          <div className="flex flex-col gap-2">
            <label htmlFor="pickup-date">Data de retirada</label>
            <input
              type="date"
              className="rounded-lg border border-borderColor px-3 py-2"
              required
              id="pickup-date"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="return-date">Data de retorno</label>
            <input
              type="date"
              className="rounded-lg border border-borderColor px-3 py-2"
              required
              id="return-date"
            />
          </div>

          <button className="w-full cursor-pointer rounded-xl bg-primary py-3 font-medium text-white transition-all hover:bg-primary-dull">
            Reserve agora
          </button>

          <p className="text-center text-sm">
            Não é necessário cartão de crédito para reservar
          </p>
        </form>
      </div>
    </div>
  ) : (
    <Loader />
  )
}

export default CarDetails
