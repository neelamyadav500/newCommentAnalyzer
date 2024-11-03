import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false); // New state for loading
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;

    // Basic validation
    if (!name || !email || !password) {
      return handleError("All fields are required!");
    }

    setLoading(true); // Start loading
    try {
      const url = "https://new-comment-analyzer.vercel.app/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupInfo),
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/login');
        }, 500);
      } else if (error) {
        const details = error?.details[0]?.message || "An error occurred";
        handleError(details);
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError(err.message || "Network error occurred");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className='container'>
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor='name'>Name</label>
          <input
            id='name' // Added id for accessibility
            onChange={handleChange}
            type='text'
            name='name'
            value={signupInfo.name} // Binding the input value
            autoFocus
            placeholder='Enter your name...'
          />
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            id='email' // Added id for accessibility
            onChange={handleChange}
            type='email'
            name='email'
            value={signupInfo.email} // Binding the input value
            placeholder='Enter your email...'
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            id='password' // Added id for accessibility
            onChange={handleChange}
            type='password'
            name='password'
            value={signupInfo.password} // Binding the input value
            placeholder='Enter your password...'
          />
        </div>
        <button type='submit' disabled={loading}>
          {loading ? 'Signing Up...' : 'Signup'} {/* Loading feedback */}
        </button>
        <span>Already have an account?</span>
        <Link to='/login'>Login</Link>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Signup;
