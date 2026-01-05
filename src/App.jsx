import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from './context/AppContext'
import Home from './pages/Home'
import CarDetails from './pages/CarDetails'
import Cars from './pages/Cars'
import MyBookings from './pages/MyBookings'
import Footer from './components/Footer'
import Layout from './pages/owner/Layout'
import AddCar from './pages/owner/AddCar'
import Dashboard from './pages/owner/Dashboard'
import ManageBookings from './pages/owner/ManageBookings'
import ManageCars from './pages/owner/ManageCars'
import { Toaster } from 'react-hot-toast'
import Login from './components/Login'

const App = () => {
  const { showLogin } = useContext(AppContext)
  const isOwnerPath = useLocation().pathname.startsWith('/owner')

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerStyle={{
          zIndex: 999999,
        }}
      />
      {showLogin && <Login />}
      {!isOwnerPath && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/app/cars" element={<Cars />} />
        <Route path="/app/cars/:id" element={<CarDetails />} />

        <Route path="/app/my-bookings" element={<MyBookings />} />

        <Route path="/owner" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-car" element={<AddCar />} />
          <Route path="manage-cars" element={<ManageCars />} />
          <Route path="manage-bookings" element={<ManageBookings />} />
        </Route>
      </Routes>

      {!isOwnerPath && <Footer />}
    </>
  )
}

export default App
