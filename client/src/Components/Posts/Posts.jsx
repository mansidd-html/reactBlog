import React from 'react'
import Post from '../Post/Post'
import './Posts.css'
const Posts = ({Posts}) => {
  return (
    <div className='Posts'>
        {Posts.map((p)=>(
          <Post Post={p}/>
        ))}
    </div>
  )
}

export default Posts