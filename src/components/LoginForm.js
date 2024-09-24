// src/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({setIsLoggedIn}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/users/login', {
        email,
        password,
      }, { withCredentials: true });

      if (response.status === 200) {
        // Handle successful login (e.g., redirect or set user state)
        setIsLoggedIn(true);
        navigate('/todos');
        console.log('Login successful', response.data);
      }
    } catch (err) {
      setError('Invalid credentials');
      console.error('Login failed', err);
    }
  };

  return (
    <div className='TodoWrapper'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className='TodoForm'>
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
        }}>
          <label style={{color: 'white'}}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='todo-input'
          />
        </div>
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
        }}>
          <label style={{color: 'white'}}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='todo-input'
          />
        </div>
        <button className='todo-btn' type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <Link to="/register" style={{cursor: 'pointer', color: 'white'}}>Don't have an account? Register</Link>
    </div>
  );
};

export default Login;
