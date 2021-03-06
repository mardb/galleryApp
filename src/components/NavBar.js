import React from 'react'
import { NavLink } from 'react-router-dom';

//sets up the navigation links/routes for the existing buttons 
const NavBar = () => (
<nav className="main-nav">
        <ul>
          <li><NavLink to='/cats'>Cats</NavLink></li>
          <li><NavLink to='/dogs'>Dogs</NavLink></li>
          <li><NavLink to='/computers'>Computers</NavLink></li>
        </ul>
      </nav>

)

export default NavBar;