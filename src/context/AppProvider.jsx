import { useEffect, useState } from 'react'
import { AppContext } from './AppContext'
import toast from 'react-hot-toast'
import { api } from '../services/api'
import { useNavigate } from 'react-router-dom'

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [isOwner, setIsOwner] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [pickupDate, setPickupDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [cars, setCars] = useState([])
  const [loadingDashboard, setLoadingDashboard] = useState(true)

  const navigate = useNavigate()

  const [dashboardData, setDashboardData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  })

  const fetchUser = async () => {
    try {
      const { data } = await api.get('/me')
      setUser(data)
      setIsOwner(data.role === 'owner')
    } catch (error) {
      setUser(null)
      setIsOwner(false)
    }
  }

  const fetchCars = async () => {
    try {
      const { data } = await api.get('/cars')

      if (data.success && Array.isArray(data.cars)) {
        setCars(data.cars)
      } else {
        console.error('Resposta inesperada da API:', data)
        setCars([])
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const fetchDashboardData = async () => {
  try {
    const { data } = await api.get('/dashboard')

    if (data.success) {
      setDashboardData(data.data)
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.message || 'Erro ao carregar dashboard',
    )
  } finally {
    setLoadingDashboard(false)
  }
}

  useEffect(() => {
  const loadData = async () => {
    const savedToken = localStorage.getItem('token')

    if (savedToken) {
    setToken(savedToken)
    api.defaults.headers.common.Authorization = `Bearer ${savedToken}`

    await fetchUser()
    await fetchDashboardData()
  } else {
    setLoadingDashboard(false) 
  }

    fetchCars()
  }

  loadData()
}, [])

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    setIsOwner(false)
    api.defaults.headers.common.Authorization = ''
    toast.success('Logout realizado com sucesso')
  }

  return (
    <AppContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        isOwner,
        setIsOwner,
        showLogin,
        setShowLogin,
        pickupDate,
        setPickupDate,
        returnDate,
        setReturnDate,
        cars,
        fetchCars,
        fetchUser,
        dashboardData,
        fetchDashboardData,
        loadingDashboard,
        logout,
        navigate,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
