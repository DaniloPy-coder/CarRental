import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className="mt-60 px-6 pt-8 text-sm text-gray-500 md:px-16 lg:px-24 xl:px-32">
      <div className="flex flex-wrap items-start justify-between gap-8 border-b border-borderColor pb-6">
        <div>
          <img src={assets.logo} alt="logo" className="h-8 md:h-9" />
          <p className="text-sm">
            Serviço de aluguel de carros premium com uma ampla seleção de
            veículos de luxo e do dia a dia para todas as suas necessidades de
            direção
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a href="#">
              <img
                src={assets.facebook_logo}
                alt="facebook logo"
                className="h-5 w-5"
              />
            </a>
            <a href="#">
              <img
                src={assets.instagram_logo}
                alt="instagram logo"
                className="h-5 w-5"
              />
            </a>
            <a href="#">
              <img
                src={assets.twitter_logo}
                alt="twitter logo"
                className="h-5 w-5"
              />
            </a>
            <a href="#">
              <img
                src={assets.gmail_logo}
                alt="gmail logo"
                className="h-5 w-5"
              />
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-base font-medium uppercase text-gray-800">
            Links rápidos
          </h2>
          <ul className="mt-3 flex flex-col gap-1.5">
            <li>
              <a href="#">Inicio</a>
            </li>
            <li>
              <a href="#">Procurar carros</a>
            </li>
            <li>
              <a href="#">Liste seus carros</a>
            </li>
            <li>
              <a href="#">Sobre nós</a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-base font-medium uppercase text-gray-800">
            Recursos
          </h2>
          <ul className="mt-3 flex flex-col gap-1.5">
            <li>
              <a href="#">Central de ajuda</a>
            </li>
            <li>
              <a href="#">Termos de servico</a>
            </li>
            <li>
              <a href="#">Politicas de privacidade</a>
            </li>
            <li>
              <a href="#">Seguro</a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-base font-medium uppercase text-gray-800">
            Contato
          </h2>
          <ul className="mt-3 flex flex-col gap-1.5">
            <li>
              <a href="#">1234 Car Rental</a>
            </li>
            <li>
              <a href="#">São Paulo, Brasil</a>
            </li>
            <li>
              <a href="#">+55 1199999-9999</a>
            </li>
            <li>
              <a href="#">CarRental@example.com</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-2 py-5 md:flex-row">
        <p className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()}{' '}
          <a
            href="https://prebuiltui.com"
            className="text-primary hover:underline"
          >
            CarRental
          </a>
          . Todos os direitos reservados.
        </p>

        <ul className="flex items-center gap-4 text-sm text-gray-500">
          <li>
            <a href="#" className="hover:text-primary">
              Privacidade
            </a>
          </li>
          <li>|</li>
          <li>
            <a href="#" className="hover:text-primary">
              Termos
            </a>
          </li>
          <li>|</li>
          <li>
            <a href="#" className="hover:text-primary">
              Cookies
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Footer
