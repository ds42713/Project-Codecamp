import React,{useState, useContext, useEffect} from 'react'
import timeSince from '../../services/timeSince'
import { AuthContext } from '../../contexts/AuthContext';
import axios from '../../config/axios'

function CommentItem({ comment,fetchComment }) {

  const { user } = useContext(AuthContext);
  const [commentId, setCommentId] = useState(comment.id)
  const [comments, setComments] = useState(comment)


  const deleteComment = async () => {
    try{
      await axios.delete(`/comments/${commentId}`,)
      fetchComment()
    } catch(err) {
      console.log(err)
    } 
  }


  let deleteCommentUI
  if(user.id === comments.UserId) {
    deleteCommentUI = <button onClick={deleteComment} > <svg xmlns="http://www.w3.org/2000/svg" class="fill-current text-gray-700" viewBox="0 0 16 16" width="20" height="20"><path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path></svg> </button>
  }

  return (
    <div class="space-y-4 p-2">
      <div class="flex">
        <div class="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
          <div className='flex justify-between'>

            <div>
              <strong>{comments.User.name}</strong>
            </div>
            <div>
              <span class="text-xs text-gray-400">{timeSince(comments.createdAt)} {deleteCommentUI} </span>
            </div>
          </div>
          <p class="text-sm">
            {comments.title}
          </p>
        </div>
      </div>
    </div>

  )
}

export default CommentItem