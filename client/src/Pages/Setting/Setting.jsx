import React, { useContext, useState } from 'react'
import './Setting.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { } from '@fortawesome/free-brands-svg-icons'
import { Context } from '../../Context/Context'
import axios from 'axios'
const Setting = () => {
    const { user, dispatch } = useContext(Context);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState(null);
    const [updated, setUpdated] = useState(false);
    const PF = 'http://localhost:5000/Images/';
    const handleUpdate = async (e) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_START" });
        const updatedUser = {
            userId: user._id,
            username,
            email,
            password,
        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            updatedUser.profilePic = filename;
            try {
                await axios.post('/api/upload', data);
            } catch (error) {
                console.log(error);
            }
        }
        try {
            const res = await axios.put(`/user/${user._id}`, updatedUser);
            setUpdated(true);
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data })
        } catch (error) {
            dispatch({ type: "UPDATE_FAILED" })
        }
    }
    return (
        <div className='settings'>
            <div className='settingsWrapper'>
                <div className='settingTitle'>
                    <span className='settingUpdateTitle'>{updated ? <>Updated Successfully</> : <>Update your Account</>}</span>
                    <span className='settingDelteTitle'>Delete Account</span>
                </div>
                <form className='settingform'>
                    <label>Profile Picture</label>
                    <div className='settingPP'>
                        <img src={file ? URL.createObjectURL(file) : PF + user.profilePic} alt="" />
                        <label htmlFor='fileInput'><FontAwesomeIcon className='settingPPIcon' icon={faCircleUser} /></label>
                        <input type='file' id='fileInput' style={{ display: "none" }} onChange={e => setFile(e.target.files[0])} />
                    </div>
                    <label>Username</label>
                    <input type='text' placeholder={user.username} onChange={e => setUsername(e.target.value)} />
                    <label>Email</label>
                    <input type='email' placeholder={user.email} onChange={e => setEmail(e.target.value)} />
                    <label>Password</label>
                    <input type='password' onChange={e => setPassword(e.target.value)} />
                    <button className='settingUpdate' onClick={handleUpdate}>Update</button>
                </form>
            </div>
            <Sidebar />
        </div>
    )
}

export default Setting