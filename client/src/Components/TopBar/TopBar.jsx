import React, { useContext } from 'react'
import './TopBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faTwitter, faPinterest, faInstagram } from '@fortawesome/free-brands-svg-icons'
import {Link} from 'react-router-dom'
import { Context } from '../../Context/Context'
const TopBar = () => {
    const PF = 'http://localhost:5000/Images/';
    const {user,dispatch} = useContext(Context);
    const handleLogout = (e)=>{
        dispatch({type:"LOGOUT"});
    };
    return (
        <div className='Top'>
            <div className='topLeft'>
                <FontAwesomeIcon className='topIcon' icon={faFacebook} />
                <FontAwesomeIcon className='topIcon' icon={faTwitter} />
                <FontAwesomeIcon className='topIcon' icon={faPinterest} />
                <FontAwesomeIcon className='topIcon' icon={faInstagram} />
            </div>
            <div className='topCenter'>
                <ul className='topList'>
                    <li className='topListItem'><Link to="/" className='link'>HOME</Link></li>
                    <li className='topListItem'><Link to="/about" className='link'>ABOUT</Link></li>
                    <li className='topListItem'><Link to="/contact" className='link'>CONTACT</Link></li>
                    <li className='topListItem'><Link to="/write" className='link'>WRITE</Link></li>
                    <li className='topListItem' onClick={handleLogout}><Link to="/login" className='link'>{user && "LOGOUT"}</Link></li>
                </ul>
            </div>
            <div className='topRight'>
            {user ? <>
                <Link to='/setting'><img className='topImg' src={PF+user.profilePic}/></Link>
            </>:
            <>
            <li style={{listStyle:"none"}} className='topListItem'><Link to="/login" className='link'>LOGIN</Link></li>
            <li style={{listStyle:"none"}} className='topListItem'><Link to="/register" className='link'>REGISTER</Link></li>
            </>}
                <FontAwesomeIcon className='topSearchIcon' icon={faSearch}/>
            </div>
        </div>
    )
}

export default TopBar