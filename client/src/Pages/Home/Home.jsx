import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'
import './Home.css'
import Header from '../../Components/Header/Header'
import Posts from '../../Components/Posts/Posts'
import Sidebar from '../../Components/Sidebar/Sidebar'
import axios from 'axios'; 
const Home = () => {
  const[posts,setPosts]= useState([]);
  const {search} = useLocation();
  useEffect(()=>{
    const fetchPost = async()=>{
     const res = await axios.get("/post"+search);
     setPosts(res.data);
    }
    fetchPost();
  },[search])
  return (
    <>
        <Header/>
        <div className='Home'>
          <Posts Posts={posts}/>
          <Sidebar/>
        </div>
    </>
  )
}

export default Home