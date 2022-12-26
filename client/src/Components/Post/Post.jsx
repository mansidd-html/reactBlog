import React from 'react'
import {Link} from 'react-router-dom'
import './Post.css'
const Post = ({ Post }) => {
  const PF = 'http://localhost:5000/Images/';
  return (
    <div className='Post'>
      {Post.photo && <img src={PF + Post.photo} />}
      <div className='postInfo'>
        <div className='postcats'>
          {
            Post.categories.map(c => (
              <span className='postcat'>{c.name}</span>
            ))
          }
        </div>
        <Link to={`/post/${Post._id}`} className='link'>
          <span className='postTitle'>{Post.title}</span>
        </Link>
        <hr />
        <span className='postDate'>{new Date(Post.createdAt).toDateString()}</span>
      </div>
      <p className='postDetails'>{Post.desc}</p>
    </div>
  )
}

export default Post