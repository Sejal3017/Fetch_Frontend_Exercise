import React from 'react';
import Logo from '/Users/sejalbhanushali/Desktop/Fetch_demo/fetch-fe/src/img/logo.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Nav2() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('https://frontend-take-home-service.fetch.com/auth/logout', {}, { withCredentials: true });
      console.log('Logout successful');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="sticky top-0 bg-white shadow-lg">
      <nav className="rounded px-4 py-2.5 sm:px-4 ">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <a href="/" className="flex items-center p-2">
            <img src={Logo} className="sm:9 mr-3" alt="Fetch Logo" width={120} />
          </a>
          <button
            onClick={handleLogout}
            className="bg-[#300d38] text-white py-2 px-4 rounded hover:bg-[#4b124f] transition-colors ease duration-300"
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Nav2;
