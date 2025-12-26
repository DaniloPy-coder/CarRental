import Title from '../components/Title'
import { assets } from '../assets/assets'
import { useEffect, useState } from 'react'
import CarCard from '../components/CarCard'
import { useSearchParams } from 'react-router-dom'
import { api } from '../services/api'
import toast from 'react-hot-toast'

const Cars = () => {
  const [searchParams] = useSearchParams()

  const pickupLocation =
    searchParams.get('pickupLocation') || searchParams.get('location')
  const pickupDate = searchParams.get('pickupDate')
  const returnDate = searchParams.get('returnDate')

  const [input, setInput] = useState('')
  const [carsList, setCarsList] = useState([])
  const [filteredCars, setFilteredCars] = useState([])

  const isSearchData = pickupLocation && pickupDate && returnDate

  const searchCarsAvailability = async () => {
    try {
      const params = {}
      if (pickupLocation) params.location = pickupLocation

      const { data } = await api.get('/cars/public/availability', { params })

      if (data.success) {
        const cars = data.availableCars || data.cars || []
        setCarsList(cars)
        setFilteredCars(cars)
      } else {
        setCarsList([])
        setFilteredCars([])
      }
    } catch (error) {
      console.error(error)
      toast.error('Erro ao buscar carros disponíveis')
      setCarsList([])
      setFilteredCars([])
    }
  }

  const getAllCars = async () => {
    try {
      const { data } = await api.get('/cars/public')

      if (data.success && Array.isArray(data.cars)) {
        setCarsList(data.cars)
        setFilteredCars(data.cars)
      } else {
        setCarsList([])
        setFilteredCars([])
      }
    } catch (error) {
      console.log(error)
      toast.error('Erro ao buscar carros')
      setCarsList([])
      setFilteredCars([])
    }
  }

  useEffect(() => {
    if (isSearchData) {
      searchCarsAvailability()
    } else {
      getAllCars()
    }
  }, [pickupLocation, pickupDate, returnDate])

  useEffect(() => {
    const term = input.toLowerCase()
    const filtered = carsList.filter(
      (car) =>
        car.brand?.toLowerCase().includes(term) ||
        car.model?.toLowerCase().includes(term) ||
        car.category?.toLowerCase().includes(term) ||
        car.transmission?.toLowerCase().includes(term),
    )
    setFilteredCars(filtered)
  }, [input, carsList])

  return (
    <div>
      <div className="flex flex-col items-center bg-light py-20 max-md:px-4">
        <Title
          title="Carros disponíveis"
          subtitle="Navegue pela nossa seleção de veículos disponíveis"
        />

        <div className="mt-6 flex h-12 w-full max-w-2xl items-center rounded-full bg-white px-4 shadow">
          <img
            src={assets.search_icon}
            alt="search"
            className="w-4.5 h-4.5 mr-2"
          />

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Pesquise por marca, modelo, categoria ou transmissão"
            className="h-full w-full text-gray-500 outline-none"
          />

          <img
            src={assets.filter_icon}
            alt="filter"
            className="w-4.5 h-4.5 ml-2"
          />
        </div>
      </div>

      <div className="mt-10 px-6 md:px-16 lg:px-24 xl:px-32">
        <p className="mx-auto max-w-7xl text-gray-500 xl:px-20">
          Mostrando <strong>{filteredCars.length}</strong> carros
        </p>

        <div className="mx-auto mt-4 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:px-20">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Cars
