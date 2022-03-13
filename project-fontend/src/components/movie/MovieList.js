import React, { useRef,useState } from 'react'
import MovieItem from '../layouts/MovieItem'

function MovieList({movie }) {
  return (
    <div className='mx-auto p-4 max-h-full bg-violet-600 flex flex-wrap'>
        {movie.map(movie=>(
            <MovieItem key={movie.id} movie={movie}  />
        ))}
    </div>
  )
}

export default MovieList