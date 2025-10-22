import { assets } from '../assets/assets'

const Banner = () => {
  return (
    <div className="mx-3 flex max-w-6xl flex-col items-center justify-between overflow-hidden rounded-xl bg-gradient-to-r from-[#0558fe] to-[#a9cfff] px-8 pt-10 md:mx-auto md:flex-row md:items-start md:pl-14">
      <div className="max-w-[520px] text-white">
        <h2 className="text-3xl font-medium">Você tem um carro de luxo?</h2>
        <p className="mt-2">
          Rentabilize seu veículo sem esforço, anunciando-o no Aluguel de
          Carros.
        </p>
        <p className="mt-1">
          Nós cuidamos do seguro, verificação do motorista e pagamentos seguros
          — para que você possa ganhar renda passiva, sem estresse.
        </p>

        <button className="mt-4 cursor-pointer rounded-lg bg-white px-6 py-2 text-sm text-primary transition-all hover:bg-slate-100">
          Liste seu carro
        </button>
      </div>

      <img
        src={assets.banner_car_image}
        alt="banner img"
        className="mt-10 max-h-[180px] md:mt-0"
      />
    </div>
  )
}

export default Banner
