import { assets } from '../assets/assets'
import Title from './Title'

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Ema Rodrigues',
      address: 'São Paulo, Brasil',
      image: assets.testimonial_image_1,
      review:
        'Serviço excepcional e atenção aos detalhes. Tudo foi tratado com profissionalismo e eficiência, do início ao fim. Altamente recomendado!',
    },
    {
      name: 'Eva Oliveira',
      address: 'Parana, Brasil',
      image: assets.testimonial_image_2,
      review:
        'O aluguel de carros tornou minha viagem muito mais fácil. O carro foi entregue na minha porta e o atendimento ao cliente foi fantástico!',
    },
    {
      name: 'Joana Silva',
      address: 'Bahia, Brasil',
      image: assets.testimonial_image_1,
      review:
        'Recomendo muito a Car Rental! A frota deles é incrível, e sempre sinto que estou fazendo o melhor negócio com um serviço excelente.',
    },
  ]

  return (
    <div className="px-6 py-28 md:px-16 lg:px-24 xl:px-44">
      <Title
        title="O que nossos clientes dizem"
        subtitle="Descubra por que viajantes exigentes escolhem a StayVenture para suas acomodações de luxo ao redor do mundo."
      />

      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="max-w-xs rounded-xl bg-white p-6 shadow-lg transition-all duration-500 hover:-translate-y-1"
          >
            <div className="flex items-center gap-3">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="h-12 w-12 rounded-full"
              />
              <div>
                <p className="text-xl">{testimonial.name}</p>
                <p className="text-gray-500">{testimonial.location}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <img src={assets.star_icon} alt="star" key={index} />
                ))}
            </div>
            <p className="max-w-90 mt-4 font-light text-gray-500">
              {testimonial.review}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Testimonials
