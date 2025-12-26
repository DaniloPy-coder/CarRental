import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import CarCard from './CarCard'
import Title from './Title'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const FeaturedSection = () => {
  const navigate = useNavigate()
  const { cars } = useContext(AppContext)

  return (
    <section
      aria-label="Veículos em destaque"
      className="flex flex-col items-center px-6 py-24 md:px-16 lg:px-24 xl:px-32"
    >
      <div>
        <Title
          title="Veículos em destaque"
          subtitle="Explore nossa seleção de veículos premium disponíveis para sua próxima aventura."
        />
      </div>

      <div className="mt-16 grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-3">
        {cars.slice(0, 6).map((car) => (
          <div key={car.id}>
            <CarCard car={car} />
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          navigate('/cars')
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
        className="mt-16 flex cursor-pointer items-center justify-center gap-2 rounded-md border border-borderColor px-6 py-2 hover:bg-gray-50"
      >
        Explorar todos os carros
        <img src={assets.arrow_icon} alt="arrow icon" />
      </button>
    </section>
  )
}

export default FeaturedSection
