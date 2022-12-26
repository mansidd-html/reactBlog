import React, { useContext, useState } from 'react'
import './Write.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { } from '@fortawesome/free-brands-svg-icons'
import { Context } from '../../Context/Context'
import axios from 'axios'
const Write = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const { user } = useContext(Context);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            title,
            desc,
        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newPost.photo = filename;
            try {
                await axios.post('/api/upload', data);
            } catch (error) {
                console.log(error);
            }
        }
        try {
            const res = await axios.post('/post', newPost);
            window.location.replace('/post/' + res.data._id);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='write'>
            {file &&
                <img className='writeImg' src={URL.createObjectURL(file)} alt="" />}
            <form className='writeForm' onSubmit={handleSubmit}>
                <div className='writeFormGroup'>
                    <label htmlFor='fileInput'>
                        <FontAwesomeIcon className='writeIcon' icon={faPlusCircle} />
                    </label>
                    <input type="file" id='fileInput' style={{ display: "none" }} onChange={e => setFile(e.target.files[0])} />
                    <input type="text" placeholder="Title" className='writeInput' autoFocus={true} onChange={e=>setTitle(e.target.value)} />
                </div>
                <div className='writeFormGroup'>
                    <textarea placeholder='Write the post here' type='text' className='writeInput writeText' onChange={e=>setDesc(e.target.value)}></textarea>
                </div>
                <button className='writePublish' type='submit'>Publish</button>
            </form>
        </div>
    )
}

export default Write