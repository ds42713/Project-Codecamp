import React, { useContext, useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import axios from '../../config/axios';

function Header() {

  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const { logout, user } = useContext(AuthContext);

  let admin = []
  if(user.role == 'ADMIN') {
    admin = <Link to="/admin/movie" className="mr-6 hover:text-white"><div> Add movie </div></Link>
  }

  return (
    <header class="text-white body-font bg-black">
      <div class="container mx-auto flex flex-wrap p-5 md:flex-row">
        <a class="flex title-font font-medium text-white mb-4 md:mb-0 pr-4" href="/">
          <span class="ml-3 text-3xl">Movie</span>
        </a>
        <button
          className="text-white cursor-pointer text-xl leading-none py-1 border border-solid border-transparent rounded bg-transparent block md:hidden outline-none focus:outline-none ml-auto pb-3"
          type="button"
          onClick={() => setNavbarOpen(!navbarOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-menu"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <div
          className={
            "md:flex flex-grow items-center" +
            (navbarOpen ? " flex" : " hidden")
          }
          id="example-navbar-danger"
        >
          <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center font-semibold pl-7">
            <Link to="/" className="mr-6 hover:text-white">
                  <div> Home </div>
            </Link>
            <Link to="/mylist" className="mr-6 hover:text-white">
                  <div> My List </div>
            </Link>
            {admin}
          </nav>
          
          <button class="px-4 py-2 mt-2 text-sm font-semibold text-white bg-[#e80003] transition duration-500 ease-in-out transform bg-transparent rounded-lg dark:text-gray-300 md:mt-0 md:ml-4 hover:text-[#e80003]  hover:bg-gray-100 hover:border-[#e80003] " onClick={()=> logout()} >
           Log Out
          </button>
        </div>
      </div>
    </header>
  )
}


export default Header;
