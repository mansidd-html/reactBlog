import React, { useState } from 'react'
import './Register.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post('/auth/register', {
        username,
        email,
        password,
      });
      res.data && window.location.replace('/login');
    }
    catch (error) {
      setError(true);
    }

  }
  return (
    <div className='register'>
      <span className='registerTitle'>Register</span>
      <form className='registerForm' onSubmit={handleSubmit}>
        <label>Username</label>
        <input type='text' placeholder='Enter your username' onChange={e => setUsername(e.target.value)} />
        <label>Email</label>
        <input type='email' placeholder='Enter your email' onChange={e => setEmail(e.target.value)} />
        <label>Password</label>
        <input type='password' placeholder='Enter your password' onChange={e => setPassword(e.target.value)} />
        <button className='registerBtn' type='submit'>Register</button>
      </form>
      <button className='registerLoginBtn'><Link to='/login' className='link'>Login</Link></button>
      {error&&<span style={{color:"red"}}>Something went wrong!</span>}
    </div>
  )
}

export default Register