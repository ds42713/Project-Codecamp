import React,{ useState,useEffect, useContext } from 'react'
import MovieForm from '../components/createMovie/MovieForm'
import Spinner from '../components/utils/Spinner'
import { AuthContext } from '../contexts/AuthContext'

function CreateMovie() {

  const [loading, setLoading] = useState(false);
  const { logout, user } = useContext(AuthContext);

  useEffect(() => {
    console.log(user)
    if(user.role == 'USER') {
      console.log("admin")
    }
  }, [])

  return (
    <div>
      {loading && <Spinner/>}
      <MovieForm setLoading={setLoading} />
    </div>
  )
}

export default CreateMovie