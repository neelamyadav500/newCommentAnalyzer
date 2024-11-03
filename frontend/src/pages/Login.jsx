import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    // Validate input fields
    if (!email || !password) {
      return handleError("Details are required!");
    }

    try {
      const url = "https://new-comment-analyzer-ny.vercel.app/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      });

      // Handle the response
      const result = await response.json();
      console.log("Login result:", result);

      const { success, message, jwtToken, name, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);
        console.log("Navigating to /home");
        navigate('/home');
      } else if (error) {
        handleError(error?.details[0].message);
      } else {
        handleError(message || "Login failed. Please try again.");
      }
    } catch (err) {
      handleError(err.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className='container'>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            id='email' // Added id for accessibility
            onChange={handleChange}
            type='email'
            name='email'
            placeholder='Enter your email...'
            autoComplete='email' // Added autocomplete
            value={loginInfo.email} // Binding the input value
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            id='password' // Added id for accessibility
            onChange={handleChange}
            type='password'
            name='password'
            placeholder='Enter your password...'
            autoComplete='current-password' // Added autocomplete
            value={loginInfo.password} // Binding the input value
          />
        </div>
        <button type='submit'>Login</button>
        <span>Don't have an account?</span>
        <Link to='/signup'>Signup</Link>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
