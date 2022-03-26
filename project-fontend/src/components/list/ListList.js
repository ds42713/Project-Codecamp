import React from 'react'
import MovieItem from '../layouts/MovieItem'

function ListList({ list }) {

    return (
        <div className='mx-auto p-4 max-h-full flex flex-wrap'>
            {list.map(list => (
                <MovieItem key={list.id} movie={list.Movie}  />
            ))}
        </div>
    )
}

export default ListList