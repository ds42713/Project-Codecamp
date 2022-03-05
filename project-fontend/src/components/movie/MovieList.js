import React, { useRef,useState } from 'react'
import MovieItem from '../layouts/MovieItem'

function MovieList({movie , setVisible}) {
  return (
    <div className='mx-auto p-4 max-h-full bg-violet-600 flex flex-wrap'>
        {movie.map(movie=>(
            <MovieItem key={movie.id} movie={movie} setVisible={setVisible} />
        ))}
    </div>
  )
}

export default MovieList