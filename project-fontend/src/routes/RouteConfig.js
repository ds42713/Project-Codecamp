import { Navigate, Route, Routes } from 'react-router-dom';
import React, { useContext } from 'react'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home';
import List from '../pages/List'
import { AuthContext } from '../contexts/AuthContext'
import MainLayout from '../components/layouts/MainLayout';


export default function RouteConfig() {

  const { user } = useContext(AuthContext);

  return (
    <Routes>
      { user ? (			
			<Route path='/' element={<MainLayout/>} >
				<Route path='' element={<Home/>} />
				<Route path='mylist' element={<List/>} />
			</Route>
		) : (
			<Route path='/'>
				<Route path='' element={<Login/>} />
				<Route path='register' element={<Register/>} />
				<Route path="*" element={<Navigate to="/" />} />
			</Route>
		)}
    </Routes>
  )
}
