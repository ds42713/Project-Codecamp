import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom';
import axios from '../config/axios'
import defaultImg from '../assets/images/profileImg.png';
import { AuthContext } from '../contexts/AuthContext';
import DetailFooter from '../components/movie/DetailFooter';
import MovieEdit from '../components/layouts/MovieEdit';
import MovieActorEdit from '../components/layouts/MovieActorEdit';
import MovieGenreEdit from '../components/layouts/MovieGenreEdit';
import MovieStreamingEdit from '../components/layouts/MovieStreamingEdit';

function Detail() {
  const { user } = useContext(AuthContext)
  let { movieId } = useParams()
  const [movie, setMovie] = useState([])
  const [streaming, setStreaming] = useState([])
  const [producer, setProducer] = useState([])
  const [detail, setDetail] = useState("")
  const [genres, setGenres] = useState([])
  const [actors, setActors] = useState([])
  const [comments, setComments] = useState([])
  const defaultText = ''
  const [favorite, setFavorite] = useState(false)
  const [loading, setLoading] = useState(false)

  const [isEdit, setIsEdit] = useState(false)
  const [isEditActor, setIsEditActor] = useState(false)
  const [isEditGenre, setIsEditGenre] = useState(false)
  const [isEditStreaming, setIsEditStreaming] = useState(false)

  async function fetchMovie() {
    try {
      const res = await axios.get(`/movies/${movieId}`)
      setMovie(res.data.movie)
      setDetail(res.data.movie.details)

      if (res.data.movie.Streamings) {
        setStreaming(res.data.movie.Streamings)
      }
      if (res.data.movie.Producer) {
        setProducer(res.data.movie.Producer)
      }
      if (res.data.movie.Genres) {
        setGenres(res.data.movie.Genres)
      }
      if (res.data.movie.Actors) {
        setActors(res.data.movie.Actors)
      }
      if (res.data.movie.Comments) {
        setComments(res.data.movie.Comments)
      }
      setLoading(true)
    } catch (err) {
      console.log(err)
    }
  }

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
      const res = await axios.get(`/lists/${movieId}`)
      if (res.data.UserId === user.id) {
        await setFavorite(true)
      } 
    } catch (err) {
      console.log(err)
      await setFavorite(false)
    }
  }
  // อันนี้คือ นำเข้าใน list 
  function ButtonCreateFavorite({createList}) {
    return (
      <button className='mx-2 border-2 hover:bg-red-700 hover:text-white border-red-700 text-black  font-bold uppercase text-sm px-2 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none  ease-linear transition-all duration-150 flex flex-row' onClick={createList}>
        favorite
      </button>
    );
  }
  // อันนี้คือ นำออกใน list
  function ButtonDelateFavorite({deleteList}) {
    return (
      <button  className='mx-2 hover:bg-white hover:text-black bg-red-700 border-2 border-red-700 text-white  font-bold uppercase text-sm px-2 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none  ease-linear transition-all duration-150 flex flex-row' onClick={deleteList} >
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

  let adminMovie = []
  if(user.role == 'ADMIN') {
    adminMovie = (<button
    class="py-1 px-4 transition-colors bg-amber-500 border-2 border-amber-500 hover:border-black hover:text-black text-black  rounded-lg hover:bg-white font-bold uppercase	 disabled:opacity-50" onClick={() => setIsEdit(true)}> Edit </button>)
  }

  let adminActor = []
  if(user.role == 'ADMIN') {
    adminActor = (<button
    class="py-1 px-4 transition-colors bg-amber-500 border-2 border-amber-500 hover:border-black hover:text-black text-black  rounded-lg hover:bg-white font-bold uppercase	 disabled:opacity-50" onClick={() => setIsEditActor(true)}> Edit Actor </button>)
  }

  let adminGenre = []
  if(user.role == 'ADMIN') {
    adminGenre = (<button
    class="py-1 px-4 transition-colors bg-amber-500 border-2 border-amber-500 hover:border-black hover:text-black text-black  rounded-lg hover:bg-white font-bold uppercase	 disabled:opacity-50" onClick={() => setIsEditGenre(true)}> Edit Genre </button>)
  }

  let adminStreaming = []
  if(user.role == 'ADMIN') {
    adminStreaming = (<button
    class="py-1 px-4 transition-colors bg-amber-500 border-2 border-amber-500 hover:border-black hover:text-black text-black  rounded-lg hover:bg-white font-bold uppercase	 disabled:opacity-50" onClick={() => setIsEditStreaming(true)}> Edit Streaming </button>)
  }

  useEffect(  () => {
    fetchMovie()
    getList()
  }, [loading,isEdit,isEditActor,isEditGenre,isEditStreaming])


  return (
    <div className='bg-white'>

      <div className=' flex justify-center  '> 
        <div className='mx-4 mt-2'>
          {adminMovie}
        </div>
        <div className='mx-4 mt-2'>
          {adminActor}
        </div>
        <div className='mx-4 mt-2'>
          {adminGenre}
        </div>
        <div className='mx-4 mt-2'>
          {adminStreaming}
        </div>
      </div>

      {isEdit && <MovieEdit movie={movie} producerName={producer} setIsEdit={setIsEdit} fetchMovie={fetchMovie} />}
      {isEditActor && <MovieActorEdit movie={movie} setIsEditActor={setIsEditActor}/>}
      {isEditGenre && <MovieGenreEdit movie={movie} setIsEditGenre={setIsEditGenre}/>}
      {isEditStreaming && <MovieStreamingEdit movie={movie} setIsEditStreaming={setIsEditStreaming}/>}
      <section class="text-gray-700 body-font overflow-hidden bg-white ">
        <div class="container px-5 py-14 mx-auto">
          <div class="lg:w-4/5 mx-auto flex flex-wrap">
            <img alt="ecommerce" class="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src={movie.movieImgPoster ?? defaultImg} />
            <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 class="text-sm title-font text-gray-500 tracking-widest">
                {producer.producerName ?? defaultText} 
              </h2>
              <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{movie.movieName}</h1>
              <div class="flex mb-4">
                <span class="flex items-center">
                  <span class="text-gray-600 ml-3">Rating {movie.rating} / 10</span>
                  {buttonFavorite}
                </span>
                <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                  {streaming.map(streaming => (
                    <a class="ml-2 text-gray-500">
                      <img src={streaming.streamingImg ?? ''} className="w-6 h-6" />
                    </a>
                  ))}
                </span>
              </div>
              <p class="leading-relaxed">
                {(detail).slice(0, 500)}
              </p>
              <div class="flex justify-end mt-6  pb-5 border-b-2 border-gray-200 mb-5 text-black">
                <div class="ml-6 flex flex-wrap">
                  {genres.map(genre => (
                    <div className='p-2 flex flex-wrap place-items-center   '> 
                      <svg className="h-2 w-2 text-black m-1 "  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="12" r="9" /></svg>
                      {genre.genreName}
                    </div>
                  ))}
                </div>
              </div>
              <div class="flex flex-wrap">
                  {actors.map(actor => (
                    <div className='flex flex-wrap m-2 place-items-center '>                           
                      <div className="mx-2 ml-2 border-2 border-white dark:border-gray-700 shadow rounded-full w-8 h-8">
                      <img className="w-full h-full overflow-hidden object-cover rounded-full" src={actor.actorImg} alt="avatar" />
                      </div> 
                     {actor.actorName}
                    </div>
                  ))}
                  
              </div>
            </div>
          </div>
        </div>
      </section>

      <DetailFooter movieId={movieId} movie={movie} />


    </div>
  )
}

export default Detail