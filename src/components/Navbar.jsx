import { Link, useLocation, useNavigate } from 'react-router-dom'
import { assets, menuLinks } from '../assets/assets'
import { useState, useContext } from 'react'
import toast from 'react-hot-toast'
import { api } from '../services/api'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const { user, logout, isOwner, setShowLogin, setIsOwner } =
    useContext(AppContext)

  const changeRole = async () => {
    try {
      const { data } = await api.patch('/users/change-role')
      if (data.success) {
        setIsOwner(true)
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div
      className={`relative flex items-center justify-between border-b border-borderColor px-6 py-4 text-gray-600 transition-all md:px-16 lg:px-24 xl:px-32 ${
        location.pathname === '/' ? 'bg-white' : 'bg-light'
      }`}
    >
      <Link to="/">
        <img src={assets.logo} alt="logo" className="h-8" />
      </Link>

      <div
        className={`right-0 z-50 flex flex-col items-start gap-4 border-borderColor transition-all duration-300 max-sm:fixed max-sm:top-16 max-sm:h-screen max-sm:w-full max-sm:border-t max-sm:p-4 sm:flex-row sm:items-center sm:gap-8 ${
          location.pathname === '/' ? 'bg-white' : 'bg-light'
        } ${open ? 'max-sm:translate-x-0' : 'max-sm:translate-x-full'}`}
      >
        {menuLinks.map((link, index) => (
          <Link key={index} to={link.path} onClick={() => setOpen(false)}>
            {link.name}
          </Link>
        ))}

        <div className="hidden w-56 items-center gap-2 rounded-full border border-borderColor px-3 text-sm lg:flex">
          <input
            type="text"
            className="w-full bg-transparent py-1.5 placeholder-gray-500 outline-none"
            placeholder="Buscar"
          />
          <img src={assets.search_icon} alt="ícone de pesquisa" />
        </div>

        <div className="flex items-start gap-6 max-sm:flex-col sm:items-center">
          {user && isOwner && (
            <button
              onClick={() => {
                if (isOwner) {
                  navigate('/owner')
                } else {
                  changeRole()
                }
              }}
              className="cursor-pointer"
            >
              {isOwner ? 'Dashboard' : 'Listar carros'}
            </button>
          )}

          {(!user || !isOwner) && (
            <button
              onClick={() => {
                if (!user) {
                  setShowLogin(true)
                } else {
                  changeRole()
                }
              }}
              className="cursor-pointer"
            >
              Listar carros
            </button>
          )}

          <button
            onClick={() => {
              user ? logout() : setShowLogin(true)
            }}
            className="cursor-pointer rounded-lg bg-primary px-8 py-2 text-white transition-all hover:bg-primary-dull"
          >
            {user ? 'Logout' : 'Login'}
          </button>
        </div>
      </div>

      <button
        className="cursor-pointer sm:hidden"
        aria-label="Menu"
        onClick={() => setOpen(!open)}
      >
        <img
          src={open ? assets.close_icon : assets.menu_icon}
          alt="ícone do menu"
        />
      </button>
    </div>
  )
}

export default Navbar
