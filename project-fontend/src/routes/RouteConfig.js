import { Navigate, Route, Routes } from 'react-router-dom';
import React, { useContext } from 'react'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home';
import List from '../pages/List'
import Detail from '../pages/Detail';
import { AuthContext } from '../contexts/AuthContext'
import MainLayout from '../components/layouts/MainLayout';
import CreateMovie from '../pages/CreateMovie';


export default function RouteConfig() {

  const { user } = useContext(AuthContext);

  return (
    <Routes>
      { user ? (			
			<Route path='/' element={<MainLayout/>} >
				<Route path='' element={<Home/>} />
				<Route path='mylist' element={<List/>} />
				<Route path='movie/:movieId' element={<Detail/>} />
				<Route path='mylist/movie/:movieId' element={<Detail/>} />
				<Route path='admin/movie' element={<CreateMovie/>} />
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
