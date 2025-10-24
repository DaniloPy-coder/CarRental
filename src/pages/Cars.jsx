import Title from '../components/Title'
import { assets, dummyCarData } from '../assets/assets'
import { useState } from 'react'
import CarCard from '../components/CarCard'

const Cars = () => {
  const [input, setInput] = useState('')

  const filteredCars = dummyCarData.filter((car) =>
    `${car.brand} ${car.model}`.toLowerCase().includes(input.toLowerCase()),
  )

  return (
    <div>
      <div className="flex flex-col items-center bg-light py-20 max-md:px-4">
        <Title
          title="Carros disponíveis"
          subtitle="Navegue pela nossa seleção de veículos premium disponíveis para sua próxima aventura"
        />

        <div className="mt-6 flex h-12 w-full max-w-2xl items-center rounded-full bg-white px-4 shadow">
          <img
            className="w-4.5 h-4.5 mr-2"
            src={assets.search_icon}
            alt="search icon"
          />
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Pesquise por marca, modelo ou recursos"
            className="h-full w-full text-gray-500 outline-none"
          />
          <img
            className="w-4.5 h-4.5 ml-2 cursor-pointer"
            src={assets.filter_icon}
            alt="filter icon"
          />
        </div>
      </div>

      <div className="mt-10 px-6 md:px-16 lg:px-24 xl:px-32">
        <p className="mx-auto max-w-7xl text-gray-500 xl:px-20">
          Mostrando <strong>{filteredCars.length}</strong> Carros
        </p>

        <div className="mx-auto mt-4 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:px-20">
          {filteredCars.map((car, index) => (
            <div key={index}>
              <CarCard car={car} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Cars
