import './App.css';
import Login from './components/LoginForm';
import Register from './components/RegisterForm';
import { TodoWrapperr } from './components/TodoWrapperr';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { getCookie } from './utils/cookies'; // Utility function to get cookies
import axios from 'axios';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = getCookie('connect.sid');
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
    // Add event listener for page reloads
    window.addEventListener('load', checkLoginStatus);

    return () => {
      window.removeEventListener('load', checkLoginStatus);
    };
  }, []);

  const handleLogout = async () => {
    await axios.post('http://localhost:3000/users/logout', { withCredentials: true });
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={isLoggedIn ? <Navigate to="/todos" /> : <Navigate to="/login" />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/todos" /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={isLoggedIn ? <Navigate to="/todos" /> : <Register />} />
          <Route path="/todos" element={isLoggedIn ? <TodoWrapperr onLogout={handleLogout} /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;