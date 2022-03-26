import React, { useState, useEffect } from 'react'
import axios from '../../config/axios'

function MovieStreamingEdit({setIsEditStreaming,movie}) {

  const [allStreaming, setAllStreaming] = useState([])
  const [streamingInput, setStreamingInput] = useState('')
  const [streaming, setStreaming] = useState('')

  const fetchData = async () => {
    try {
      const ferchStreaming = await axios.get('/streamings')
      setAllStreaming(ferchStreaming.data)
    } catch (err) {
      console.log(err)
    }
  }

  const addStreaming = () => {
    if (streamingInput) {
      setStreaming(streaming + streamingInput + '/')
    }
    setStreamingInput('')
  }
  const updateMovieGenre = async (e) => {
    try {
      await axios.post(`/movies/streamings/${movie.id}`, { streaming })
    } catch (err) {
      console.log(err)
    } finally {
      setIsEditStreaming(false)
    }
  }
  const handleSubmitForm = async e => {
    e.preventDefault();
    updateMovieGenre()
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div>
      <div class="  fixed w-full inset-0 z-50 overflow-y-scroll">
        <div class="bg-gradient-to-b h-96"></div>
        <div class="max-w-5xl my-2 mx-auto px-6 sm:px-6 lg:px-8 mb-12">
          <div class="bg-gray-900 w-full shadow rounded p-8 sm:p-12 -mt-72  ">
            <p class="text-3xl font-bold leading-7 text-center text-white">Edit Streaming</p>

            <form onSubmit={handleSubmitForm}>

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

              <div class="flex items-center justify-end w-full ">
                <button class="mt-9 font-semibold leading-none text-white py-4 px-10 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none">
                Edit
                </button>

                <div class="mx-2 mt-9 font-semibold leading-none text-white py-4 px-10 bg-red-700 rounded hover:bg-red-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none" onClick={() => setIsEditStreaming(false)}>
                  close
                </div>

              </div>

            </form>
          </div>
        </div>
      </div>

      <div className="opacity-50 fixed inset-0 z-40 bg-black" onClick={() => setIsEditStreaming(false)} ></div>
    </div>

  )
}

export default MovieStreamingEdit