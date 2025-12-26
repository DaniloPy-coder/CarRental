import { useContext, useState } from 'react'
import { assets, cityList } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState('')

  const { pickupDate, setPickupDate, returnDate, setReturnDate, navigate } =
    useContext(AppContext)

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(
      '/cars?pickupLocation=' +
        pickupLocation +
        '&pickupDate=' +
        pickupDate +
        '&returnDate=' +
        returnDate,
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-14 bg-light text-center md:pt-24">
      <h1 className="text-4xl font-semibold md:text-5xl">
        Carros de luxo para alugar
      </h1>

      <form
        onSubmit={handleSearch}
        className="flex w-full max-w-[320px] flex-col items-start justify-between rounded-lg bg-white p-6 shadow-[0px_8px_20px_rgba(0,0,0,0.1)] md:max-w-[800px] md:flex-row md:items-center md:gap-8 md:rounded-full"
      >
        {/* Campos de seleção e datas */}
        <div className="flex flex-col items-start gap-8 md:ml-8 md:flex-row md:items-end md:gap-10">
          {/* Local de retirada */}
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="pickup-location" className="font-medium">
              Local de retirada
            </label>
            <select
              id="pickup-location"
              required
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="rounded-md border border-borderColor px-3 py-2 text-gray-600 outline-none focus:border-primary"
            >
              <option value="">Selecione o local</option>
              {cityList.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Data de retirada */}
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="pickup-date" className="font-medium">
              Data de retirada
            </label>
            <input
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              type="date"
              id="pickup-date"
              min={new Date().toISOString().split('T')[0]}
              className="rounded-md border border-borderColor px-3 py-2 text-sm text-gray-600 outline-none focus:border-primary"
              required
            />
          </div>

          {/* Data de retorno */}
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="return-date" className="font-medium">
              Data de retorno
            </label>
            <input
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              type="date"
              id="return-date"
              className="rounded-md border border-borderColor px-3 py-2 text-sm text-gray-600 outline-none focus:border-primary"
              required
            />
          </div>
        </div>

        {/* Botão de busca */}
        <button
          type="submit"
          aria-label="Buscar carros disponíveis"
          className="flex cursor-pointer items-center justify-center gap-1 rounded-full bg-primary px-9 py-3 text-lg font-medium text-white hover:bg-primary-dull max-sm:mt-4"
        >
          <img
            src={assets.search_icon}
            alt="Buscar"
            className="h-5 w-5 brightness-200"
          />
          Buscar
        </button>
      </form>

      {/* Imagem principal */}
      <img src={assets.main_car} alt="Carro principal" className="max-h-52" />
    </div>
  )
}

export default Hero
