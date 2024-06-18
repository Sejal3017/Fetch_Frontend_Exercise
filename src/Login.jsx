import React, { useState, lazy, Suspense } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import DogGif from '/Users/sejalbhanushali/Desktop/Fetch_demo/fetch-fe/src/img/running_dog.gif';
const Nav = lazy(async () => import('/Users/sejalbhanushali/Desktop/Fetch_demo/fetch-fe/src/elements/nav.jsx'));
const Footer = lazy(async () => import('/Users/sejalbhanushali/Desktop/Fetch_demo/fetch-fe/src/elements/footer.jsx'));


const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://frontend-take-home-service.fetch.com/auth/login',
        { name, email },
        { withCredentials: true }
      );
      console.log('Login successful:', response);
      // Assuming response.data.token or some other confirmation of successful login

      // Redirect to search page upon successful login
      navigate('/search');
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle error state if needed
    }
  }

  return (
  <>
  <Suspense fallback={<div>Loading...</div>}>
          <Nav />
      </Suspense>

    <div className="auth-form-container">
              <h2>Login</h2>
              <form className="login-form" onSubmit={handleSubmit}>
                  <label htmlFor="name">Name</label>
                  <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      placeholder="Your Name"
                      id="name"
                      name="name" />
                  <label htmlFor="email">Email</label>
                  <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="youremail@gmail.com"
                      id="email"
                      name="email" />
                  <button type="submit">Log In</button>
              </form>
          </div><img src={DogGif} alt="Running Dog" className="dog-gif" />
          
          <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense></>
  );
}

export default Login;
