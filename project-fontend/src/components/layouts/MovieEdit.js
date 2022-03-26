import React, { useState, useEffect } from 'react'
import axios from '../../config/axios'
import AddActor from '../createMovie/AddActor'
import AddProducer from '../createMovie/AddProducer'

function MovieEdit({ setIsEdit, fetchMovie, movie, producerName }) {

  const [showModalProducer, setShowModalProducer] = useState(false)

  const [movieName, setMoviename] = useState(movie.movieName)//
  const [details, setDetails] = useState(movie.details)//
  const [rating, setRating] = useState(movie.rating) //
  const [type, setType] = useState(movie.type)//
  const [season, setSeason] = useState(movie.season) //
  const [movieImg, setMovieImg] = useState(movie.movieImg) //
  const [movieImgPoster, setMovieImgPoster] = useState(movie.movieImgPoster) //
  const [producer, setProducer] = useState(producerName.producerName)

  const [allProducer, setAllProducer] = useState([])

  let ratingOption = []
  for (let i = 10; i >= 0; i--) {
    ratingOption.push(<option value={i} > {i} </option>)
  }

  const fetchData = async () => {
    try {
      const ferchProducer = await axios.get('/producers')  
      setAllProducer(ferchProducer.data)
    } catch (err) {
      console.log(err)
    }
  }

  const updateMovie = async (e) => {
    try {
      await axios.patch(`/movies/${movie.id}`, { movieName, details, rating, type, season, movieImg, movieImgPoster, producer })
    } catch (err) {
      console.log(err)
    } finally {
      setIsEdit(false)
    }
  }
  const handleSubmitForm = async e => {
    e.preventDefault();
    updateMovie()
  }

  useEffect(() => {
    fetchData()
  }, [showModalProducer])

  return (

    <div>
      <div class="  fixed w-full inset-0 z-50 overflow-y-scroll">
        <div class="bg-gradient-to-b h-96"></div>
        <div class="max-w-5xl my-2 mx-auto px-6 sm:px-6 lg:px-8 mb-12">
          <div class="bg-gray-900 w-full shadow rounded p-8 sm:p-12 -mt-80  ">
            <p class="text-3xl font-bold leading-7 text-center text-white">Edit Movie</p>

            <form onSubmit={handleSubmitForm}>

              <div class="md:flex items-center mt-12">
                <div class="w-full md:w-1/2 flex flex-col">
                  <label class="font-semibold leading-none text-gray-300">Movie Name</label>
                  <input type="text" class="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded"
                    value={movieName}
                    onChange={e => setMoviename(e.target.value)} />
                </div>
                <div class="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
                  <label class="font-semibold leading-none text-gray-300">rating </label>
                  <select className='leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded' onChange={e => setRating(e.target.value)} >
                    {ratingOption}
                  </select>
                </div>
              </div>

              <div class="md:flex items-center mt-12">
                <div class="w-full md:w-1/2 flex flex-col">
                  <label class="font-semibold leading-none text-gray-300">season (0 = movie)</label>
                  <input type="text" class="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded"
                    value={season}
                    onChange={e => setSeason(e.target.value)} />
                </div>

                <div class="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
                  <label class="font-semibold leading-none text-gray-300">type</label>

                  <select className='leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded' onChange={e => setType(e.target.value)} >
                    <option value='MOVIE' > Movie </option>
                    <option value='SERIES' > Series </option>
                  </select>

                </div>
              </div>

              <div class="md:flex items-center mt-12">
                <div class="w-full md:w-1/2 flex flex-col">
                  <label class="font-semibold leading-none text-gray-300">movie Image</label>
                  <input type="text" class="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded"
                    value={movieImg}
                    onChange={e => setMovieImg(e.target.value)} />
                </div>
                <div class="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
                  <label class="font-semibold leading-none text-gray-300">Poster Image</label>
                  <input type="text" class="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded"
                    value={movieImgPoster}
                    onChange={e => setMovieImgPoster(e.target.value)}
                  />
                </div>
              </div>

              <div class="w-full flex flex-col mt-8">
                <label class="font-semibold leading-none text-gray-300">details</label>
                <textarea type="text" class="h-40 text-base leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-800 border-0 rounded" value={details} onChange={e => setDetails(e.target.value)}></textarea>
              </div>

              <div class="md:flex items-center mt-8 ">
                <div class="w-full flex flex-col">
                  <label class="font-semibold leading-none text-gray-300">Producer = {producer}</label>

                  <div className='grid grid-cols-12'>
                    <div className='col-span-9 ml-2'>
                      <input list="producers" className='leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded w-full'
                        onChange={e => setProducer(e.target.value)} />
                      <datalist id="producers">
                        {allProducer.map(item => (
                          <option value={item.producerName} />
                        ))}
                      </datalist>
                    </div>

                    <div className='col-span-3 mx-2'>
                      <div class="text-center mt-4 font-semibold leading-none text-white p-3 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none" onClick={() => setShowModalProducer(true)}>
                        Add new producer
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <div class="flex items-center justify-end w-full ">
                <button class="mt-9 font-semibold leading-none text-white py-4 px-10 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none">
                  Edit
                </button>
                <div class="mx-2 mt-9 font-semibold leading-none text-white py-4 px-10 bg-red-700 rounded hover:bg-red-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none" onClick={() => setIsEdit(false)}>
                  close
                </div>
              </div>

            </form>

          </div>
        </div>
      </div>

      
      {showModalProducer ? (<AddProducer setShowModalProducer={setShowModalProducer} />) : null}
      <div className="opacity-50 fixed inset-0 z-40 bg-black" onClick={() => setIsEdit(false)} ></div>
    </div>

  )
}

export default MovieEdit