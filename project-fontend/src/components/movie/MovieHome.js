import React, { useEffect, useState } from 'react'
import axios from '../../config/axios'
import MovieList from './MovieList';
import MoviePost from '../layouts/MoviePost';

import { Modal, Button } from 'antd';

function MovieHome() {
    const [movie, setMovie] = useState([])
    
    const fetchMovie = async ()=> {
        try{
            const res = await axios.get('/movies')
            console.log(res.data.movie)
            setMovie(res.data.movie)
        }catch(err){
            console.log(err)
        }
    }

    

    useEffect(()=>{
        fetchMovie()
    }, [])
    
    return (
        <>
        <MovieList movie={movie}   />
        </>
    )
}

export default MovieHome