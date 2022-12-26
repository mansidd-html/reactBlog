import React, { useContext, useEffect, useState } from 'react'
import './SinglePost.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { } from '@fortawesome/free-brands-svg-icons'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import { Context } from '../../Context/Context'
const SinglePost = () => {
    const PF = 'http://localhost:5000/Images/';
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({});
    const { user } = useContext(Context);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updatemode, setUpdatemode] = useState(false);
    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get(`/post/${path}`);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        }
        getPost();
    }, [path]);
    const handleDelete = async () => {
        try {
            await axios.delete(`/post/${path}`, { data: { username: user.username } });
            window.location.replace('/');
        } catch (error) {
            console.log(error);
        }
    }
    const handleUpdate = async ()=>{
        try {
            await axios.put(`/post/${path}`,{username:user.username,title,desc});
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='singlePost'>
            <div className='singlePostWrapper'>
                {post.photo && <img className='singlePostImg' src={PF + post.photo} />}
                {updatemode ? <input type='text' value={title} className='SinglePostTitleInput' onChange={e => setTitle(e.target.value)} autoFocus></input> : <> <h1 className='SinglePostTitle'>{post.title}
                    {post.username === user?.username && <div className='singlePostEdit'>
                        <FontAwesomeIcon className='singlePostIcon' icon={faEdit} onClick={() => setUpdatemode(true)} />
                        <FontAwesomeIcon className='singlePostIcon' icon={faTrash} onClick={handleDelete} />
                    </div>}
                </h1></>}
                <div className='singlePostInfo'>
                    <span className='singlePostAuthor'>Author:
                        <Link to={`/?user=${post.username}`} className='link'><b>{post.username}</b></Link>
                    </span>
                    <span className='singlePostDate'>{new Date(post.createdAt).toDateString()}</span>
                </div>
                {updatemode ? <textarea className='singlePostDetailsInput' value={desc} onChange={e => setDesc(e.target.value)} rows='10' cols='80' /> : <p className='singlePostDetails'>{post.desc}</p>}
                {updatemode && <button className='singlePostBtn' onClick={handleUpdate}>Update</button>}
            </div>
        </div>
    )
}

export default SinglePost