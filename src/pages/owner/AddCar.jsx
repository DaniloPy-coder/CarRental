import { useState } from 'react'
import Title from '../../components/owner/Title'
import { assets } from '../../assets/assets'

const AddCar = () => {
  const currency = import.meta.env.VITE_CURRENCY

  const [image, setImage] = useState(null)
  const [car, setCar] = useState({
    brand: '',
    model: '',
    year: 0,
    pricePerDay: 0,
    category: '',
    transmission: '',
    seating_capacity: 0,
    fuel_type: '',
    description: '',
  })

  const onSubmitHandler = async (e) => {
    e.preventDefault()
  }

  return (
    <div className="flex-1 px-4 py-10 md:px-10">
      <Title
        title="Adicionar carro novo"
        subtitle="Preencha os detalhes para listar um novo carro para reserva, incluindo preço, disponibilidade e especificações do carro."
      />

      <form
        onSubmit={onSubmitHandler}
        className="mt-6 flex max-w-xl flex-col gap-5 text-sm text-gray-500"
      >
        {/* Imagem do carro */}
        <div className="flex w-full items-center gap-2">
          <label htmlFor="car-image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              alt="car image"
              className="h-14 cursor-pointer rounded"
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
            Carregue uma foto do seu carro
          </p>
        </div>

        {/* Marca e modelo do carro */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex w-full flex-col">
            <label>Marca</label>
            <input
              type="text"
              placeholder="e.g. BMW, Mercedes, Audi..."
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
              placeholder="e.g. X5, E-Class, M4..."
              required
              className="mt-1 rounded-md border border-borderColor px-3 py-2 outline-none"
              value={car.model}
              onChange={(e) => setCar({ ...car, model: e.target.value })}
            />
          </div>
        </div>

        {/* Ano, preço e categoria do carro */}
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
            <label>Preço por dia ({currency})</label>
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
              onChange={(e) => setCar({ ...car, category: e.target.value })}
              value={car.category}
              className="mt-1 rounded-md border border-borderColor px-3 py-2 outline-none"
            >
              <option value="">Selecione a categoria</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Van">Van</option>
            </select>
          </div>
        </div>

        {/* Transmissão, capacidade de assentos e tipo de combustível */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex w-full flex-col">
            <label>Câmbio</label>
            <select
              onChange={(e) => setCar({ ...car, transmission: e.target.value })}
              value={car.transmission}
              className="mt-1 rounded-md border border-borderColor px-3 py-2 outline-none"
            >
              <option value="">Selecione o câmbio</option>
              <option value="Automático">Automático</option>
              <option value="Manual">Manual</option>
              <option value="Semi-automático">Semi-automático</option>
            </select>
          </div>
          <div className="flex w-full flex-col">
            <label>Tipo de combustível</label>
            <select
              onChange={(e) => setCar({ ...car, fuel_type: e.target.value })}
              value={car.fuel_type}
              className="mt-1 rounded-md border border-borderColor px-3 py-2 outline-none"
            >
              <option value="">Tipo de combustível</option>
              <option value="Gas">Gas</option>
              <option value="Diesel">Diesel</option>
              <option value="Gasolina">Gasolina</option>
              <option value="Elétrico">Elétrico</option>
              <option value="Híbrido">Híbrido</option>
            </select>
          </div>
          <div className="flex w-full flex-col">
            <label>Capacidade de assentos</label>
            <input
              type="number"
              placeholder="4"
              required
              className="mt-1 rounded-md border border-borderColor px-3 py-2 outline-none"
              value={car.seating_capacity}
              onChange={(e) =>
                setCar({ ...car, seating_capacity: e.target.value })
              }
            />
          </div>
        </div>

        {/* Localização do carro */}
        <div className="flex w-full flex-col">
          <div className="flex w-full flex-col">
            <label>Localização</label>
            <select
              onChange={(e) => setCar({ ...car, location: e.target.value })}
              value={car.fuel_type}
              className="mt-1 rounded-md border border-borderColor px-3 py-2 outline-none"
            >
              <option value="">Selecione o estado</option>
              <option value="Acre">Acre</option>
              <option value="Alagoas">Alagoas</option>
              <option value="Amapá">Amapá</option>
              <option value="Amazonas">Amazonas</option>
              <option value="Bahia">Bahia</option>
              <option value="Ceará">Ceará</option>
              <option value="Distrito Federal">Distrito Federal</option>
              <option value="Espírito Santo">Espírito Santo</option>
              <option value="Goiás">Goiás</option>
              <option value="Maranhão">Maranhão</option>
              <option value="Mato Grosso">Mato Grosso</option>
              <option value="Mato Grosso do Sul">Mato Grosso do Sul</option>
              <option value="Minas Gerais">Minas Gerais</option>
              <option value="Pará">Pará</option>
              <option value="Paraíba">Paraíba</option>
              <option value="Paraná">Paraná</option>
              <option value="Pernambuco">Pernambuco</option>
              <option value="Piauí">Piauí</option>
              <option value="Rio de Janeiro">Rio de Janeiro</option>
              <option value="Rio Grande do Norte">Rio Grande do Norte</option>
              <option value="Rio Grande do Sul">Rio Grande do Sul</option>
              <option value="Rondônia">Rondônia</option>
              <option value="Roraima">Roraima</option>
              <option value="Santa Catarina">Santa Catarina</option>
              <option value="São Paulo">São Paulo</option>
              <option value="Sergipe">Sergipe</option>
              <option value="Tocantins">Tocantins</option>
            </select>
          </div>
        </div>

        {/* Descrição do carro */}
        <div className="flex w-full flex-col">
          <label>Descrição</label>
          <textarea
            rows={5}
            className="mt-1 rounded-md border border-borderColor px-3 py-2 outline-none"
            placeholder="por exemplo Um SUV luxuoso com um interior espaçoso e um motor potente."
            required
            value={car.description}
            onChange={(e) => setCar({ ...car, description: e.target.value })}
          ></textarea>
        </div>

        <button className="mt-4 flex w-max cursor-pointer items-center gap-2 rounded-md bg-primary px-4 py-2.5 font-medium text-white">
          <img src={assets.tick_icon} alt="tick icon" />
        </button>
      </form>
    </div>
  )
}

export default AddCar
