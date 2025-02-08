import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './Login.css'

function Login() {

const[username, setUsername] = useState('');
const[password, setPassword] = useState('');
const[error, setError] = useState('');
const navigate = useNavigate();

const handleSubmit = (e)=>{
  e.preventDefault();

  if(username=='admin' && password=='1'){
    navigate('/home');
  }
  else{
    setError('Invalid');
  }

}

  return (
    <div className='login'>
    <h1>Login</h1>
    <form onSubmit={handleSubmit}>
      
      <div className='input'>
        <label htmlFor='username'>Username</label>
        <input 
        type='text'
        id='username'
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
        required
        />
      </div>

      <div className='input'>
      <label htmlFor='password'>Password</label>
        <input 
        type='text'
        id='password'
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        required
        />
      </div>
      {error && <p className='error'>{error}</p>}
      <button type="submit">Login</button>
    </form>
    </div>
  )
}

export default Login