import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from '../config/axios'

function Detail() {

    let { movieId } = useParams()
    const [movie, setMovie] = useState([])
    
    const fetchMovie = async ()=> {
        try{
            const res = await axios.get(`/movies/${movieId}`)
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
    <div>
        Detail {movieId} {movie.movieName}
    </div>
  )
}

export default Detail