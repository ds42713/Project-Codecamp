import React, { useState, useEffect } from 'react'
import axios from '../../config/axios'
import AddActor from './AddActor'
import AddProducer from './AddProducer'

function MovieForm({setLoading}) {

  const [showModalActor, setShowModalActor] = useState(false)
  const [showModalProducer, setShowModalProducer] = useState(false)

  const [movieName, setMoviename] = useState('')//
  const [details, setDetails] = useState('')//
  const [rating, setRating] = useState('') //
  const [type, setType] = useState('')//
  const [season, setSeason] = useState('') //
  const [movieImg, setMovieImg] = useState('') //
  const [movieImgPoster, setMovieImgPoster] = useState('') //
  const [producer, setProducer] = useState('')
  const [actor, setActor] = useState('')
  const [genre, setGenre] = useState('')
  const [streaming, setStreaming] = useState('')

  const [allProducer, setAllProducer] = useState([])

  const [allActor, setAllActor] = useState([])
  const [actorInput, setActorInput] = useState('')

  const [allGenre, setAllGenre] = useState([])
  const [genreInput, setGenreInput] = useState('')

  const [allStreaming, setAllStreaming] = useState([])
  const [streamingInput, setStreamingInput] = useState('')

  let ratingOption = []
  for (let i=10; i >= 0; i--) {
    ratingOption.push(<option value={i} > {i} </option>)          
  }

  const fetchData = async () => {
    try {
      const ferchActor = await axios.get('/actors')
      const ferchGenre = await axios.get('/genres')
      const ferchStreaming = await axios.get('/streamings')
      const ferchProducer = await axios.get('/producers')

      setAllActor(ferchActor.data)
      setAllGenre(ferchGenre.data)
      setAllStreaming(ferchStreaming.data)
      setAllProducer(ferchProducer.data)

    } catch (err) {
      console.log(err)
    }
  }
  const addActor = () => {
    if (actorInput) {
      setActor(actor + actorInput + '/')
    }
    setActorInput('')
  }
  const addStreaming = () => {
    if (streamingInput) {
      setStreaming(streaming + streamingInput + '/')
    }
    setStreamingInput('')
  }
  const addGenre = () => {
    if (genreInput) {
      setGenre(genre + genreInput + '/')
    }
    setGenreInput('')
  }
  
  const addMovie = async () => {
    try{
      setLoading(true)
      await axios.post('/movies', {movieName,details,rating,type,season,movieImg,movieImgPoster,producer,actor,genre,streaming})
    }catch(err) {
      console.log(err)
    } finally{
      setLoading(false)
    }
  }

  const handleSubmitForm = async e => {
    addMovie()
  }
  
  useEffect(() => {
    fetchData()
  }, [showModalActor,showModalProducer])
 
  return (
    <div>
      <div class="w-full ">
        <div class="bg-gradient-to-b h-96"></div>
        <div class="max-w-5xl my-2 mx-auto px-6 sm:px-6 lg:px-8 mb-12">
          <div class="bg-gray-900 w-full shadow rounded p-8 sm:p-12 -mt-96">
            <p class="text-3xl font-bold leading-7 text-center text-white">Add Movie</p>

            <form  onSubmit={handleSubmitForm}>

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
                    { ratingOption }
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
             

              <div class="md:flex items-center mt-8">
                <div class="w-full flex flex-col">

                  <label class="font-semibold leading-none text-gray-300">Producer = {producer}</label>
                  <input list="producers" className='leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded w-full' 
                  onChange={e => setProducer(e.target.value)} />
                  <datalist id="producers">
                    { allProducer.map(item => (
                      <option value={item.producerName} />
                    ))}
                  </datalist>

                  <div class="flex items-center justify-center w-full">
                    <div class="mt-2 font-semibold leading-none text-white py-4 px-10 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none" onClick={()=>setShowModalProducer(true)} >
                      Add new producer
                    </div>
                  </div>

                </div>
              </div>

              <div class="md:flex items-center mt-8">
                <div class="w-full flex flex-col">

                  <label className='font-semibold leading-none text-gray-300'>
                    Actors = {actor}
                  </label>
                  <div className='grid grid-cols-12'>
                    <div className='col-span-9 ml-2'>
                      <input list="actors" className='leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded w-full' onChange={e => setActorInput(e.target.value)} />
                      <datalist id="actors">
                        {allActor.map(item => (
                          <option value={item.actorName} />
                        ))}
                      </datalist>
                    </div>

                    <div className='col-span-3 mx-2'>
                      <div class="text-center mt-4 font-semibold leading-none text-white p-3 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none" onClick={addActor}>
                        add
                      </div>
                    </div>
               
                  </div>   

                  <div class="flex items-center justify-center w-full">
                    <div class="mt-2 font-semibold leading-none text-white py-4 px-10 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none" onClick={()=>setShowModalActor(true)} >
                      Add new actor
                    </div>
                  </div>

                </div>
              </div>

              <div class="md:flex items-center mt-8">
                <div class="w-full flex flex-col">
                  <label className='font-semibold leading-none text-gray-300'>
                    Genre = {genre}
                  </label>

                  <div className='grid grid-cols-12'>
                    <div className='col-span-9 ml-2'>
                      <input list="genres" className='leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded w-full' onChange={e => setGenreInput(e.target.value)} />
                      <datalist id="genres">
                        { allGenre.map(item => (
                          <option value={item.genreName} />
                        ))}
                      </datalist>
                    </div>

                    <div className='col-span-3 mx-2'>

                      <div class="text-center mt-4 font-semibold leading-none text-white p-3 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none" onClick={addGenre}>
                        add
                      </div>
                    </div>
               
                  </div>        
                </div>
              </div>

              <div class="md:flex items-center mt-8 ">
                <div class="w-full flex flex-col">
                    <label className='font-semibold leading-none text-gray-300'>
                    Streaming = {streaming}
                    </label>

                  <div className='grid grid-cols-12'>
                    <div className='col-span-9 ml-2'>
                      <input list="streamings" className='leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded w-full' onChange={e => setStreamingInput(e.target.value)} />
                      <datalist id="streamings">
                        { allStreaming.map(item => (
                          <option value={item.streamingName} />
                          ))}
                      </datalist>
                    </div>

                    <div className='col-span-3 mx-2'>
                      <div class="text-center mt-4 font-semibold leading-none text-white p-3 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none" onClick={addStreaming}>
                        add
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <div class="flex items-center justify-center w-full">
                <button class="mt-9 font-semibold leading-none text-white py-4 px-10 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none">
                  Add
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
      
      { showModalActor ? ( <AddActor setShowModalActor={setShowModalActor} /> ) : null }
      { showModalProducer ? ( <AddProducer setShowModalProducer={setShowModalProducer} /> ) : null }
    </div>
  )
}

export default MovieForm