import React from "react";

import UserDropdown from "components/Dropdowns/UserDropdown.js";
import { useAuth } from "context/AuthProvider";

export default function Navbar({ title }) {

  const { logout } = useAuth();

  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <h3
            className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
          >
            {!title ? 'Home' : `Negocio: ${title}`}
          </h3>
          {/* User */}
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <UserDropdown logout={logout} />
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
