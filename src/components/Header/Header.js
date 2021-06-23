import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import styles from './header.scss';

const Header = ({ openBookForm }) => (
  <nav className="navbar navbar-inverse navbar-fixed-top">
    <div className="container">
      <div className='book-btn'>
        <button className='btn btn-danger' onClick={e => openBookForm()}>BOOK</button>
      </div>
      <div className="navbar-header">
        <Link className="navbar-brand icon" to="/mode"></Link>
        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
      </div>
      <div id="navbar" className="navbar-collapse collapse">
        <ul className="nav navbar-nav navbar-right">
          <li><NavLink activeClassName="active" to="/look">Look</NavLink></li>
          <li><NavLink activeClassName="active" to="/book">Book</NavLink></li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Header;
