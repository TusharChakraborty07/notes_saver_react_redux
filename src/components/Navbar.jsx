import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="flex gap-3 justify-center bg-gray-100 p-2 shadow-lg  w-full">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-5 py-2 rounded-full transition ${
              isActive
                ? "bg-black text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/pastes"
          className={({ isActive }) =>
            `px-5 py-2 rounded-full transition ${
              isActive
                ? "bg-black text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`
          }
        >
          Pastes
        </NavLink>
      </div>
    </>
  );
};

export default Navbar;
