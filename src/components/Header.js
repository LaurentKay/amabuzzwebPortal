// CORE
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header id="header" className="fixed-top">
      <div className="container d-flex align-items-center">
        <h1 className="logo mr-auto"><Link to="index.html">amabuzz</Link></h1>
        <nav className="nav-menu d-none d-lg-block">
          <ul>
            <li className="active"><Link to="/">Home</Link></li>
            <li><Link to="courses.html">How it works</Link></li>
            <li><Link to="about.html">About us</Link></li>
            <li><Link to="contact.html">Contact us</Link></li>
          </ul>
        </nav>
        {/*<Link to="courses.html" className="get-started-btn">Apply Now!</Link>*/}
        <Link to="/login" className="get-started-btn">Apply Now!</Link>
      </div>
   </header>
  );
};
export default Header;
