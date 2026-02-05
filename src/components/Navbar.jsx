import { NavLink } from "react-router-dom";

export default function Navbar(){
    return(
        <div className="flex flex-row p-2 gap-2 place-content-evenly  w-full bg-gray-900  ">
            <NavLink className="border-green-400 border-2 p-1.5 rounded-3xl pl-3 pr-3
            text-blue-600 hover:bg-gray-800 hover:text-red-500 duration-300 ease-in-out hover:-translate-0.5" 
            to="/">
            Home

            </NavLink>
            <NavLink className="border-green-400 border-2 p-1.5 rounded-3xl pl-3 pr-3
           text-blue-600 hover:bg-gray-800 hover:text-red-500 duration-300 ease-in-out hover:-translate-0.5" 
            to="/pastes">
            Pastes
            </NavLink>
        </div>
    )
}