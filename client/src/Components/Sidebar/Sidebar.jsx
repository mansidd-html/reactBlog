import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faTwitter, faPinterest, faInstagram } from '@fortawesome/free-brands-svg-icons'
import axios from 'axios'
import { Link } from 'react-router-dom'
const Sidebar = () => {
    const [cats, setCats] = useState([]);
    useEffect(() => {
        const getCats = async () => {
            const res = await axios.get('/categories/');
            setCats(res.data);
        }
        getCats();
    }, [])
    return (
        <div className='sideBar'>
            <div className='sideBarItems'>
                <span className='sideBarTitle'>ABOUT ME</span>
                <img src='https://img.favpng.com/25/7/23/computer-icons-user-profile-avatar-image-png-favpng-LFqDyLRhe3PBXM0sx2LufsGFU.jpg' />
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer</p>
            </div>
            <div className='sideBarItems'>
                <span className='sideBarTitle'>CATEGORIES</span>
                <ul className='sideBarList'>
                    {cats.map((cat) => (
                        <Link to={`/?cat=${cat.name}`} className='link'>
                            <li className='sideBarListItems'>{cat.name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
            <div className='sideBarItems'>
                <span className='sideBarTitle'>FOLLOW US</span>
                <div className='sideBarSocial'>
                    <FontAwesomeIcon className='sideBarIcon' icon={faFacebook} />
                    <FontAwesomeIcon className='sideBarIcon' icon={faTwitter} />
                    <FontAwesomeIcon className='sideBarIcon' icon={faPinterest} />
                    <FontAwesomeIcon className='sideBarIcon' icon={faInstagram} />
                </div>
            </div>
        </div>
    )
}

export default Sidebar