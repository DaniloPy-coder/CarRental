import { useEffect, useState, useCallback } from 'react'
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
      return data // Retorna para uso no useEffect
    } catch (error) {
      setUser(null)
      setIsOwner(false)
      return null
    }
  }

  const fetchCars = async () => {
    try {
      const { data } = await api.get('/cars')
      if (data.success && Array.isArray(data.cars)) {
        setCars(data.cars)
      }
    } catch (error) {
      console.error('Erro ao buscar carros:', error.message)
    }
  }

  const fetchDashboardData = async () => {
    try {
      setLoadingDashboard(true)
      const { data } = await api.get('/dashboard')

      if (data.success) {
        const payload = data.dashboard || data.data || data;
        
        const { success, ...cleanData } = payload;
        
        setDashboardData(cleanData)
      }
    } catch (error) {
      console.error("Erro na API Dashboard:", error.response?.data)
      toast.error(error?.response?.data?.message || 'Erro ao carregar dashboard')
    } finally {
      setLoadingDashboard(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    setIsOwner(false)
    api.defaults.headers.common.Authorization = ''
    toast.success('Logout realizado com sucesso')
    navigate('/')
  }

  useEffect(() => {
    const loadData = async () => {
      const savedToken = localStorage.getItem('token')

      if (savedToken) {
        setToken(savedToken)
        api.defaults.headers.common.Authorization = `Bearer ${savedToken}`

        const userData = await fetchUser()
        
        if (userData && userData.role === 'owner') {
          await fetchDashboardData()
        } else {
          setLoadingDashboard(false)
        }
      } else {
        setLoadingDashboard(false)
      }

      fetchCars()
    }

    loadData()
  }, [])

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