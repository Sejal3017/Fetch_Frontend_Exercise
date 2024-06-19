import React from 'react';
import Bg_img from './f_bg.jpg';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';


const Footer = () => {
  return (
    <footer className="relative bg-cover bg-center mt-12" style={{ backgroundImage: `url(${Bg_img})` }}>
      <div className="bg-black bg-opacity-50 text-white py-8">
        <div className="container mx-auto text-center">
          {/* Social Media Icons */}
          <div className="flex justify-center space-x-4 mb-4">
            <a href="https://www.facebook.com/FetchRewards/"><FaFacebook className="text-2xl" /></a>
            <a href="https://twitter.com/FetchRewards?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"><FaTwitter className="text-2xl" /></a>
            <a href="https://www.instagram.com/fetchrewards/"><FaInstagram className="text-2xl" /></a>
            <a href="https://www.youtube.com/channel/UCwVp3gzavJ7ymM8uv8rJaqg"><FaYoutube className="text-2xl" /></a>
          </div>
          {/* Follow Us on LinkedIn Section */}
          <div className="flex justify-center items-center mb-4">
            <a href="https://www.linkedin.com/company/fetch-rewards-llc/"><FaLinkedin className="text-2xl mr-2" /></a>
            <p className="text-lg">Follow us on LinkedIn</p>
          </div>
          {/* Footer Text */}
          <p className="text-lg">&copy; 2024 FETCH, All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
