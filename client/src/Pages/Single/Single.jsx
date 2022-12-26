import React from 'react'
import SinglePost from '../../Components/SinglePost/SinglePost'
import SideBar from '../../Components/Sidebar/Sidebar'
import './Single.css'
const Single = () => {
  return (
    <div className='single'>
        <SinglePost/>
        <SideBar/>
    </div>
  )
}

export default Single