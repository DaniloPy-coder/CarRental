import { useEffect, useState } from 'react'
import { assets, dummyDashboardData } from '../../assets/assets'
import Title from '../../components/owner/Title'

const Dashboard = () => {
  const currency = import.meta.env.VITE_CURRENCY

  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  })

  const dashboardCards = [
    {
      title: 'Total de carros',
      value: data.totalCars,
      icon: assets.carIconColored,
    },
    {
      title: 'Total de reservas',
      value: data.totalBookings,
      icon: assets.listIconColored,
    },
    {
      title: 'Pendente',
      value: data.pendingBookings,
      icon: assets.cautionIconColored,
    },
    {
      title: 'Confirmado',
      value: data.completedBookings,
      icon: assets.listIconColored,
    },
  ]

  useEffect(() => {
    setData(dummyDashboardData)
  }, [])

  return (
    <div className="flex-1 px-4 pt-10 md:px-10">
      <Title
        title="Painel de administração"
        subtitle="Monitore o desempenho geral da plataforma, incluindo total de carros, reservas, receita e atividades recentes"
      />

      <div className="my-8 grid max-w-3xl gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {dashboardCards.map((card, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-2 rounded-md border border-borderColor p-4"
          >
            <div>
              <h1 className="text-xs text-gray-500">{card.title}</h1>
              <p className="text-lg font-semibold">{card.value}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <img src={card.icon} alt="card icon" className="h-4 w-4" />
            </div>
          </div>
        ))}
      </div>

      <div className="mb-8 flex w-full flex-wrap items-start gap-6">
        {/* Reserva recente */}
        <div className="w-full max-w-lg rounded-md border border-borderColor p-4 md:p-6">
          <h1 className="text-lg font-medium">Reserva recente</h1>
          <p className="text-gray-500">Últimas reservas de clientes</p>
          {data.recentBookings.map((booking, index) => (
            <div key={index} className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="hidden h-12 w-12 items-center justify-center rounded-full bg-primary/10 md:flex">
                  <img
                    src={assets.listIconColored}
                    alt="icon"
                    className="h-5 w-5"
                  />
                </div>
                <div>
                  <p>
                    {booking.car.brand} {booking.car.model}
                  </p>
                  <p className="text-sm text-gray-500">
                    {booking.createdAt.split('T')[0]}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 font-medium">
                <p className="text-sm text-gray-500">
                  {currency}
                  {booking.price}
                </p>
                <p className="rounded-full border border-borderColor px-3 py-0.5 text-sm">
                  {booking.status}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Receita mensal */}
        <div className="mb-6 w-full rounded-md border border-borderColor p-4 md:max-w-xs md:p-6">
          <h1 className="text-lg font-medium">Receita mensal</h1>
          <p className="text-gray-500">Receita do mês atual</p>
          <p className="mt-6 text-3xl font-semibold text-primary">
            {currency}
            {data.monthlyRevenue}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
