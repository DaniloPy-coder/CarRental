import { useContext, useState } from 'react'
import { assets, ownerMenuLinks } from '../../assets/assets'
import { NavLink, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import { AppContext } from '../../context/AppContext'
import { api } from '../../services/api'

const Sidebar = () => {
  const { user, fetchUser } = useContext(AppContext)
  const location = useLocation()
  const [image, setImage] = useState('')

  const updateImage = async () => {
    try {
      const formData = new FormData()
      formData.append('image', image)

      const { data } = await api.put('/users/update-image', formData)

      fetchUser()
      toast.success(data.message || 'Imagem atualizada')
      setImage('')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="relative min-h-screen w-full max-w-[50px] flex-col items-center border-r border-borderColor pt-8 text-sm md:flex md:max-w-60">
      <div className="group relative">
        <label htmlFor="image">
          <img
            src={
              user?.avatar ||
              'https://dummyimage.com/150x150/cccccc/ffffff&text=User'
            }
            alt="user"
            className="mx-auto h-9 w-9 rounded-full object-cover md:h-14 md:w-14"
          />

          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
          <div className="absolute bottom-0 left-0 right-0 top-0 hidden cursor-pointer items-center justify-center rounded-full bg-black/10 group-hover:flex">
            <img src={assets.edit_icon} alt="edit" />
          </div>
        </label>
      </div>

      {image && (
        <button
          type="button"
          onClick={updateImage}
          className="absolute right-0 top-0 flex cursor-pointer gap-1 bg-primary/10 p-2 text-primary"
        >
          Salvar
          <img src={assets.check_icon} alt="check" width={13} />
        </button>
      )}

      <p className="mt-2 text-base max-md:hidden">{user?.name}</p>

      <div className="w-full">
        {ownerMenuLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={`relative flex w-full items-center gap-2 py-3 pl-4 first:mt-6 ${
              link.path === location.pathname
                ? 'bg-primary/10 text-primary'
                : 'text-gray-600'
            }`}
          >
            <img
              src={
                link.path === location.pathname ? link.coloredIcon : link.icon
              }
              alt="icon"
            />
            <span className="max-md:hidden">{link.name}</span>
            {link.path === location.pathname && (
              <div className="absolute right-0 h-8 w-1.5 rounded-l bg-primary"></div>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
