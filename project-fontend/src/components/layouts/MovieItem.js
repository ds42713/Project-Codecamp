import React, { useEffect, useState, useRef, useContext } from 'react'
import defaultImg from '../../assets/images/profileImg.png';
import { AuthContext } from '../../contexts/AuthContext';
import MoviePost from './MoviePost';


export default function MovieItem({ movie }) {
    const { user } = useContext(AuthContext)
    const [producer, setProducer] = useState("no producer")
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        if (movie.Producer) {
            setProducer(movie.Producer)
        }
    }, [])


    return (

        <>
            <div className="w-72 md:w-80 lg:w-64   bg-white shadow rounded border border-transparent hover:border-blue-500 cursor-pointer m-4 " onClick={() => setShowModal(true)} >

                <img src={movie.movieImgPoster ?? defaultImg} className="h-96 w-72 md:w-80 lg:w-64 bg-contain " />

                <div className="p-2 text-right">
                    <h1 className="text-gray-600  font-semibold ">{movie.movieName}</h1>

                </div>
            </div>

            {showModal ? (  <MoviePost setShowModal={setShowModal} movie={movie} /> ) : null}


        </>
    )

}
