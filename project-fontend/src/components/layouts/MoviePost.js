import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import defaultImg from '../../assets/images/profileImg.png';
import axios from '../../config/axios'
import { AuthContext } from '../../contexts/AuthContext';

function MoviePost({ setShowModal, movie }) {

  const { user } = useContext(AuthContext)
  const [streaming, setStreaming] = useState([])
  const [producer, setProducer] = useState([])
  const [favorite, setFavorite] = useState(false)
  const [movieId, setMovieId] = useState(movie.id)
  const defaultText = 'No data'

  const createList = async movie => {
    try {
      const res = await axios.post('/lists', { movieId: movieId });
      setFavorite(true)
      
    } catch (err) {
      console.log(err);
    }
  };

  const deleteList = async movie => {
    try {
      await axios.delete(`/lists/${movieId}`);
      setFavorite(false)
      
    } catch (err) {
      console.log(err);
    }
  }

  const getList = async () => {
    try {
      const res = await axios.get(`/lists/${movie.id}`)
      if(res.data.UserId === user.id){
        await setFavorite(true)
      } else {
        console.log("notmylist")
      }
    } catch (err) {
      console.log(err)
      await setFavorite(false)
    }
  }
  // อันนี้คือ นำเข้าใน list 
  function ButtonCreateFavorite({createList}) {
    return (
      <button className=' border-2 border-red-700 text-white  font-bold uppercase text-sm px-3 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 flex flex-row' onClick={createList}>
        favorite
      </button>
    );
  }
  // อันนี้คือ นำออกใน list
  function ButtonDelateFavorite({deleteList}) {
    return (
      <button  className=' bg-red-700 border-2 border-red-700 text-white  font-bold uppercase text-sm px-3 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 flex flex-row' onClick={deleteList} >
        favorite
      </button>
    );
  }

  let buttonFavorite 
  if (!favorite) {
    buttonFavorite = <ButtonCreateFavorite key={movie.id} createList={createList} />
  } else {
    buttonFavorite = <ButtonDelateFavorite key={movie.id} deleteList={deleteList} />
  }


  useEffect(async () => {
    await getList()
    if (movie.Streamings) {
      setStreaming(movie.Streamings)
    }
    if (movie.Producer) {
      setProducer(movie.Producer)
    }
  }, [favorite])

  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none w-full h-fit "
      >
        <div className="relative my-6 mx-auto w-auto lg:w-9/12 lg:min-h-80 ">
          <div className="relative p-6 flex-auto">

            <div className="flex flex-col-reverse lg:flex-row w-full h-full bg-white dark:bg-gray-800 shadow rounded">


              <div className="w-full lg:w-1/2 flex flex-col justify-between ">
                <div className="pt-4 lg:pt-6 pb-4 lg:pb-6 pl-4 lg:pl-6 pr-4 lg:pr-6">

                  <h2 className="text-gray-800 dark:text-gray-100 mt-4 mb-2 tracking-normal text-xl lg:text-2xl font-bold">{movie.movieName}</h2>

                  <p className="mb-6 font-normal text-gray-600 dark:text-gray-400 text-sm tracking-normal ">{(movie.details).slice(0, 500)}</p>
                </div>

                <div className='w-full pb-0  flex-col justify-between '>

                  <div className="grid grid-cols-2 p-4 ">

                    <div className="flex justify-start mt-4 ">
                      {streaming.map(streaming => (
                        <>
                          <img src={streaming.streamingImg ?? ''} className="w-6 h-6" />
                          <p className="text-gray-600 dark:text-gray-400 mx-2 ">{streaming.streamingName}</p>

                        </>
                      ))}
                    </div>


                    <div className="mt-4  ml-0  flex justify-end  ">
                      <span className="mr-1 text-gray-600 dark:text-gray-400">

                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"></path></svg>

                      </span>
                      <p className="text-gray-600 dark:text-gray-400 font-normal text-right">{producer.producerName ?? defaultText}</p>
                    </div>
                  </div>

                  <div className="px-3 lg:px-3 md:px-3 py-3 lg:py-4 flex flex-row items-center justify-between border-t border-gray-300 ">
                    <div className="flex items-center  mr-5">
                      <div className="text-indigo-700 dark:text-indigo-600 hover:text-indigo-600 cursor-pointer">
                              
                          {buttonFavorite}
                      </div>
                      <div className="text-indigo-700 dark:text-indigo-600 hover:text-indigo-600 cursor-pointer">
                        <div
                          className=" border-2 border-red-700 text-white  font-bold uppercase text-sm px-3 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 flex flex-row cursor-default "

                        >
                          <svg className="h-4 w-4 text-yellow-400 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                          {movie.rating} / 10
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center ">
                      <div className="flex items-center ">
                        <Link to={`movie/${movie.id}`}>
                          <button
                            className="rounded-md border-2 border-red-700 text-white active:bg-red-400 font-bold uppercase text-sm px-3 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}
                          >
                            detail
                          </button>
                        </Link>

                        <button
                          className="rounded-md border-2 border-red-700 text-white active:bg-red-700 font-bold uppercase text-sm px-3 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          close
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              </div>



              <div className="relative w-full h-64 lg:h-max lg:w-1/2 rounded-t lg:rounded-t-none lg:rounded-r inline-block  bg-contain bg-center flex justify-center ">
                <img className=" h-full xlg:h-max bg-contain bg-center  " src={movie.movieImgPoster ?? defaultImg} alt="banner" />
              </div>



            </div>
          </div>

        </div>
      </div>

      <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>

    </>
  )
}

export default MoviePost