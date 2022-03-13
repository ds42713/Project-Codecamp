import React from 'react'
import timeSince from '../../services/timeSince'


function CommentItem({ comment }) {
  return (
    <div class="space-y-4 p-2">
      <div class="flex">
        <div class="flex-shrink-0 mr-3">
        </div>
        <div class="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
          <strong>{comment.User.name}</strong> 
          <span class="text-xs text-gray-400">{timeSince(comment.createdAt)}</span>
          <p class="text-sm">
            {comment.title}
          </p>
        </div>
      </div>
    </div>

  )
}

export default CommentItem