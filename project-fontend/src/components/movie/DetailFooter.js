import React, { useEffect, useState } from 'react'
import CommentForm from '../layouts/CommentForm'
import CommentList from '../layouts/CommentList'
import axios from '../../config/axios'

function DetailFooter({movie, movieId}) {

  const [comments, setComments] = useState([])
  
  const fetchComment = async () => {
    try{
      const res = await axios.get(`/comments/${movieId}`)
      setComments(res.data.comment)
    } catch(err) {
      console.log(err)
    }
    
  }
  const createComment = async title => {
    try {
      const res = await axios.post('/comments', {title, movieId: movieId})
      fetchComment()
    } catch (err) {
      console.log(err)
    }
  }

    useEffect( () => {
      fetchComment()
    }, [])
  
  return (
    <div className='flex flex-col mx-auto items-center justify-center  p-2 m-0'>
      <CommentList comments={comments} fetchComment={fetchComment} />
      <CommentForm createComment={createComment}/>
    </div>
  )
}

export default DetailFooter