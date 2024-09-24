import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/users/register', {
        email,
        password,
      }, { withCredentials: true });

      if (response.status === 201) {
        // Handle successful login (e.g., redirect or set user state)
        navigate('/login');
        console.log('Login successful', response.data);
      }
    } catch (err) {
      setError('Invalid credentials');
      console.error('Login failed', err);
    }
  };

  return (
    <div className='TodoWrapper'>
      <h1>Register</h1>
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
        <button className='todo-btn' type="submit">Register</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Register;
