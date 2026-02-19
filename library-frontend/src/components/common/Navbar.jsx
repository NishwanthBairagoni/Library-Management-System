import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/LandingPage.css';

const Navbar = () => {
     return (
          <nav className="navbar">
               <Link to="/" className="nav-brand">
                    <span className="text-gradient">LibManager</span>
               </Link>
               <div className="nav-links">
                    <Link to="/" className="nav-link">Home</Link>
                    <a href="#features" className="nav-link">Features</a>
                    <a href="#roles" className="nav-link">Login / Register</a>
               </div>
          </nav>
     );
};

export default Navbar;
