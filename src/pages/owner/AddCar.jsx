import { useContext, useState, useEffect } from 'react'
import Title from '../../components/owner/Title'
import { assets } from '../../assets/assets'
import toast from 'react-hot-toast'
import { api } from '../../services/api'
import { AppContext } from '../../context/AppContext'
import { useParams, useLocation, useNavigate } from 'react-router-dom'

const AddCar = () => {
  const { fetchDashboardData } = useContext(AppContext)
  const { id } = useParams()
  const { state } = useLocation()
  const navigate = useNavigate()

  const [image, setImage] = useState(null)
  const [car, setCar] = useState({
    brand: '',
    model: '',
    year: '',
    pricePerDay: '',
    category: '',
    transmission: '',
    seatingCapacity: '',
    fuelType: '',
    location: '',
    description: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (id && state?.car) {
      const c = state.car
      setCar({
        brand: c.brand || '',
        model: c.model || '',
        year: c.year || '',
        pricePerDay: c.pricePerDay || '',
        category: c.category || '',
        transmission: c.transmission || '',
        seatingCapacity: c.seating_capacity || c.seatingCapacity || '',
        fuelType: c.fuel_type || c.fuelType || '',
        location: c.location || '',
        description: c.description || '',
      })
    }
  }, [id, state])

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (isLoading) return null

    setIsLoading(true)
    try {
      const formData = new FormData()
      
      if (image) {
        formData.append('file', image)
      } else if (!id) {
        toast.error("Por favor, carregue uma imagem.")
        setIsLoading(false)
        return
      }

      formData.append('brand', car.brand)
      formData.append('model', car.model)
      formData.append('year', car.year)
      formData.append('price_per_day', car.pricePerDay)
      formData.append('category', car.category)
      formData.append('transmission', car.transmission)
      formData.append('fuel_type', car.fuelType)
      formData.append('seating_capacity', car.seatingCapacity)
      formData.append('location', car.location)
      formData.append('description', car.description)

      const response = id 
        ? await api.put(`/cars/${id}`, formData) 
        : await api.post('/cars', formData)

      if (response.data) {
        toast.success(id ? "Carro atualizado com sucesso!" : "Carro adicionado com sucesso!")
        
        if (!id) {
          setImage(null)
          setCar({
            brand: '', model: '', year: '', pricePerDay: '',
            category: '', transmission: '', fuelType: '',
            seatingCapacity: '', location: '', description: '',
          })
        }

        fetchDashboardData()
        if(id) navigate('/owner/manage-cars')
      }
    } catch (error) {
      const msg = error.response?.data?.error || error.message
      toast.error(msg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex-1 px-4 py-10 md:px-10">
      <Title
        title={id ? "Editar informações do carro" : "Adicionar carro novo"}
        subtitle={id ? "Modifique os detalhes do veículo selecionado abaixo." : "Preencha os detalhes para listar um novo carro para reserva."}
      />

      <form onSubmit={onSubmitHandler} className="mt-6 flex max-w-xl flex-col gap-5 text-sm text-gray-500">
        <div className="flex w-full items-center gap-2">
          <label htmlFor="car-image">
            <img
              src={image ? URL.createObjectURL(image) : (id && state?.car?.image ? state.car.image : assets.upload_icon)}
              alt="car image"
              className="h-14 w-14 object-cover cursor-pointer rounded"
            />
            <input
              type="file"
              id="car-image"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <p className="text-sm text-gray-500">
            {id ? "Clique para alterar a foto (opcional)" : "Carregue uma foto do seu carro"}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex w-full flex-col">
            <label>Marca</label>
            <input
              type="text"
              placeholder="e.g. BMW, Mercedes..."
              required
              className="mt-1 rounded-md border border-borderColor px-3 py-2 outline-none"
              value={car.brand}
              onChange={(e) => setCar({ ...car, brand: e.target.value })}
            />
          </div>
          <div className="flex w-full flex-col">
            <label>Modelo</label>
            <input
              type="text"
              placeholder="e.g. X5, E-Class..."
              required
              className="mt-1 rounded-md border border-borderColor px-3 py-2 outline-none"
              value={car.model}
              onChange={(e) => setCar({ ...car, model: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex w-full flex-col">
            <label>Ano</label>
            <input
              type="number"
              placeholder="2025"
              required
              className="mt-1 rounded-md border border-borderColor px-3 py-2 outline-none"
              value={car.year}
              onChange={(e) => setCar({ ...car, year: e.target.value })}
            />
          </div>
          <div className="flex w-full flex-col">
            <label>Preço por dia </label>
            <input
              type="number"
              placeholder="100"
              required
              className="mt-1 rounded-md border border-borderColor px-3 py-2 outline-none"
              value={car.pricePerDay}
              onChange={(e) => setCar({ ...car, pricePerDay: e.target.value })}
            />
          </div>
          <div className="flex w-full flex-col">
            <label>Categoria</label>
            <select
              required
              onChange={(e) => setCar({ ...car, category: e.target.value })}
              value={car.category}
              className="mt-1 rounded-md border border-borderColor px-3 py-2 outline-none"
            >
              <option value="">Selecione</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Van">Van</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex w-full flex-col">
            <label>Câmbio</label>
            <select
              required
              onChange={(e) => setCar({ ...car, transmission: e.target.value })}
              value={car.transmission}
              className="mt-1 rounded-md border border-borderColor px-3 py-2 outline-none"
            >
              <option value="">Selecione</option>
              <option value="Automático">Automático</option>
              <option value="Manual">Manual</option>
              <option value="Semi-automático">Semi-automático</option>
            </select>
          </div>
          <div className="flex w-full flex-col">
            <label>Tipo de combustível</label>
            <select
              required
              onChange={(e) => setCar({ ...car, fuelType: e.target.value })}
              value={car.fuelType}
              className="mt-1 rounded-md border border-borderColor px-3 py-2 outline-none"
            >
              <option value="">Selecione</option>
              <option value="Gasolina">Gasolina</option>
              <option value="Diesel">Diesel</option>
              <option value="Elétrico">Elétrico</option>
              <option value="Híbrido">Híbrido</option>
            </select>
          </div>
          <div className="flex w-full flex-col">
            <label>Capacidade</label>
            <input
              type="number"
              placeholder="4"
              required
              className="mt-1 rounded-md border border-borderColor px-3 py-2 outline-none"
              value={car.seatingCapacity}
              onChange={(e) => setCar({ ...car, seatingCapacity: e.target.value })}
            />
          </div>
        </div>

        <div className="flex w-full flex-col">
          <label>Localização (Estado)</label>
          <select
            required
            onChange={(e) => setCar({ ...car, location: e.target.value })}
            value={car.location}
            className="mt-1 rounded-md border border-borderColor px-3 py-2 outline-none"
          >
            <option value="">Selecione o estado</option>
            <option value="São Paulo">São Paulo</option>
            <option value="Rio de Janeiro">Rio de Janeiro</option>
            <option value="Minas Gerais">Minas Gerais</option>
            {/* ... outras opções */}
          </select>
        </div>

        <div className="flex w-full flex-col">
          <label>Descrição</label>
          <textarea
            rows={4}
            className="mt-1 rounded-md border border-borderColor px-3 py-2 outline-none"
            placeholder="Detalhes sobre o veículo..."
            required
            value={car.description}
            onChange={(e) => setCar({ ...car, description: e.target.value })}
          />
        </div>

        <button 
          disabled={isLoading}
          className="mt-4 flex w-max cursor-pointer items-center gap-2 rounded-md bg-primary px-10 py-2.5 font-medium text-white disabled:bg-gray-400"
        >
          {isLoading ? 'Processando...' : (id ? 'Atualizar Carro' : 'Adicionar Carro')}
        </button>
      </form>
    </div>
  )
}

export default AddCar