import React, { useState, useEffect } from 'react'
import CommentItem from '../layouts/CommentItem'

function CommentList({ comments }) {



  return (
    <div class="antialiased mx-auto max-w-screen-sm bg-white w-full p-2 mb-0">
      <h3 class="mb-4 text-lg font-semibold text-gray-900">Comments</h3>
      {comments.map(item => (
        <CommentItem key={item.id} comment={item} />
      ))}
    </div>
  )
}

export default CommentList