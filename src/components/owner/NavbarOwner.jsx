import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { useContext } from 'react'

const NavbarOwner = () => {
  const { user } = useContext(AppContext)

  return (
    <div className="relative flex items-center justify-between border-b border-borderColor px-6 py-4 text-gray-500 transition-all md:px-10">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="h-7" />
      </Link>
      <p>Bem-vindo(a), {user?.name || 'Owner'}</p>
    </div>
  )
}

export default NavbarOwner
