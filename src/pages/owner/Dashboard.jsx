import { useContext } from 'react'
import { assets } from '../../assets/assets'
import Title from '../../components/owner/Title'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {
  const { dashboardData, loadingDashboard } = useContext(AppContext)
  const data = dashboardData || {}

  const dashboardCards = [
    {
      title: 'Total de carros',
      value: data?.totalCars ?? 0,
      icon: assets.carIconColored,
    },
    {
      title: 'Total de reservas',
      value: data.totalBookings ?? 0,
      icon: assets.listIconColored,
    },
    {
      title: 'Pendente',
      value: data.pendingBookings ?? 0,
      icon: assets.cautionIconColored,
    },
    {
      title: 'Confirmado',
      value: data.completedBookings ?? 0,
      icon: assets.listIconColored,
    },
  ]

  if (loadingDashboard) {
  return (
    <div className="flex h-[80vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4 rounded-lg border border-borderColor bg-white p-8 shadow-md">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>

        <h2 className="text-lg font-semibold text-gray-700">
          Carregando dashboard
        </h2>

        <p className="text-sm text-gray-500">
          Buscando informações...
        </p>
      </div>
    </div>
  )
}

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
        <div className="w-full max-w-lg rounded-md border border-borderColor p-4 md:p-6">
          <h1 className="text-lg font-medium">Reserva recente</h1>
          <p className="text-gray-500">Últimas reservas de clientes</p>

          {(Array.isArray(data.recentBookings) ? data.recentBookings : []).map((booking, index) => (
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
                    
                  </p>
                  <p className="text-sm text-gray-500">
                    {booking.createdAt?.split('T')[0] ?? 'Sem data'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 font-medium">
                <p className="text-sm text-gray-500">{booking.price ?? 0}</p>
                <p className="rounded-full border border-borderColor px-3 py-0.5 text-sm">
                  {booking.status}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-6 w-full rounded-md border border-borderColor p-4 md:max-w-xs md:p-6">
          <h1 className="text-lg font-medium">Receita mensal</h1>
          <p className="text-gray-500">Receita do mês atual</p>
          <p className="mt-6 text-3xl font-semibold text-primary">
            {data?.monthlyRevenue ?? 0}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
