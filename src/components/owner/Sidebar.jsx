import React, { useState } from 'react'
import { assets, dummyUserData, ownerMenuLinks } from '../../assets/assets'
import { NavLink, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const user = dummyUserData
  const location = useLocation()
  const [image, setImage] = useState('')

  const updateImage = async () => {
    user.image = URL.createObjectURL(image)
    setImage('')
  }

  return (
    <div className="relative min-h-screen w-full max-w-[50px] flex-col items-center border-r border-borderColor pt-8 text-sm md:flex md:max-w-60">
      <div className="group relative">
        <label htmlFor="image">
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : user?.image ||
                  'https://images.unsplash.com/photo-1633332755192-727a05c4013d?=80&w=300'
            }
            alt="user image"
            className="mx-auto h-9 w-9 rounded-full md:h-14 md:w-14"
          />
          <input
            type="file"
            id="image"
            accept="image/"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />

          <div className="absolute bottom-0 left-0 right-0 top-0 hidden cursor-pointer items-center justify-center rounded-full bg-black/10 group-hover:flex">
            <img src={assets.edit_icon} alt="edit icon" />
          </div>
        </label>
      </div>
      {image && (
        <button className="absolute right-0 top-0 flex cursor-pointer gap-1 bg-primary/10 p-2 text-primary">
          Salvar
          <img src={assets.check_icon} alt="check icon" width={13} />
        </button>
      )}
      <p className="mt-2 text-base max-md:hidden">{user?.name}</p>

      <div className="w-full">
        {ownerMenuLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={`relative flex w-full items-center gap-2 py-3 pl-4 first:mt-6 ${link.path === location.pathname ? 'bg-primary/10 text-primary' : 'text-gray-600'}`}
          >
            <img
              src={
                link.path === location.pathname ? link.coloredIcon : link.icon
              }
              alt="car icon"
            />
            <span className="max-md:hidden">{link.name}</span>
            <div
              className={`${link.path === location.pathname && 'bg-primary'} absolute right-0 h-8 w-1.5 rounded-l`}
            ></div>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
