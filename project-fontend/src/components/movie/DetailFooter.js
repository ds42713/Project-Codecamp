import React, { useEffect, useState } from 'react'
import CommentForm from '../layouts/CommentForm'
import CommentList from '../layouts/CommentList'
import axios from '../../config/axios'


function DetailFooter({movie, movieId}) {

  
  const [comments, setComments] = useState([])

  const createComment = async title => {
    try {
      const res = await axios.post('/comments', {title, movieId: movieId})
      console.log(res.data)
      setComments(prev => [...prev, res.data])
      console.log(comments)
    } catch (err) {
      console.log(err)
    }
  }

    useEffect(  () => {
      if (movie.Comments) {
        setComments(movie.Comments)
      }

        console.log(movie)
        console.log(comments)

      }, [movie])
      
  return (
    <div className='flex flex-col mx-auto items-center justify-center  p-2 m-0'>
      <CommentList comments={comments} />
      <CommentForm createComment={createComment}/>
    </div>
  )
}

export default DetailFooter