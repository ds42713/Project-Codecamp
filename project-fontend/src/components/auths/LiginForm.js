import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

function LiginForm() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmitLogin = e => {
    e.preventDefault();
	login(username,password)
  };

  return (
    <div className="h-screen md:flex">

      <div
        className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-black to-black i justify-around items-center hidden">
        <div>
          <h1 className="text-white font-bold text-4xl font-sans">จำเก่ง</h1>
          <p className="text-white mt-1">The most movie in the world!!!</p>

        </div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8 border-[#ff0000]"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8 border-[#ff0000]"></div>
        <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8 border-[#ff0000]"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8 border-[#ff0000]"></div>
      </div>

      <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
        <form className="bg-white" onSubmit={handleSubmitLogin} >
          <h1 className="text-gray-800 font-bold text-2xl mb-1">Login!</h1>
          <p className="text-sm font-normal text-gray-600 mb-7">Welcome</p>



          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
            <input className="pl-2 outline-none border-none" type="text"  id="username" placeholder="username" value={username} onChange={e=> setUsername(e.target.value)} />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
              fill="currentColor">
              <path fill-rule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clip-rule="evenodd" />
            </svg>
            <input className="pl-2 outline-none border-none" type="password"  id="password" placeholder="password" value={password} onChange={e=> setPassword(e.target.value)} />
          </div>

          <button type="submit" className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Login</button>
          <button className="text-sm ml-2 hover:text-blue-500 cursor-pointer" onClick={() => navigate('/register')}>Create Account ?</button>
        </form>
      </div>
    </div>
  )
}

export default LiginForm