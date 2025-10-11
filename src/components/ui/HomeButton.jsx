import React from 'react'
import { NavLink } from "react-router-dom";


const HomeButton = () => {
  return (
    <div>
          {/* Logo */}
        <NavLink to="/">
          <div className="flex items-center gap-2 left-4">
            {/* <h1 className="text-xl font-bold text-white">JustHome</h1> */}
            <img src="/img/logo_justhome.png" alt="JustHome Logo" className="h-10 w-auto" />
          </div>
        </NavLink>
        </div>
  )
}

export default HomeButton