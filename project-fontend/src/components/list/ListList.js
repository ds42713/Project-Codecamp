import React,{useEffect} from 'react'
import MovieItem from '../layouts/MovieItem'

function ListList({ list }) {
    useEffect(()=> {
        console.log(list)
    }, [])

    return (
        <div className='mx-auto p-4 max-h-full bg-violet-600 flex flex-wrap'>
            {list.map(list => (
                <MovieItem key={list.id} movie={list.Movie}  />
            ))}
        </div>
    )
}

export default ListList