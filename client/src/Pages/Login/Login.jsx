import React, { useContext, useRef } from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import { Context } from '../../Context/Context';
import axios from 'axios';
const Login = () => {
  const userRef = useRef();
  const passRef = useRef();
  const {user, dispatch, isFetching } = useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post('/auth/login', {
        username: userRef.current.value,
        password: passRef.current.value
      })
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  }
  return (
    <div className='Login'>
      <span className='loginTitle'>Login</span>
      <form className='loginForm' onSubmit={handleSubmit}>
        <label>Username</label>
        <input type='text' placeholder='Enter your username' ref={userRef} />
        <label>Password</label>
        <input type='password' placeholder='Enter your password' ref={passRef} />
        <button className='loginBtn' type='submit' disabled={isFetching}>Login</button>
      </form>
      <button className='registerBtn'><Link to='/register' className='link'>Register</Link></button>
    </div>
  )
}

export default Login