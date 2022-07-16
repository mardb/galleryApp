import React from 'react'
import { 
  // Route, 
  NavLink } from 'react-router-dom';

const NavBar = ({match}) => (
<nav className="main-nav">
        <ul>
          <li><NavLink to='/cats'>Cats</NavLink></li>
          <li><NavLink to='/dogs'>Dogs</NavLink></li>
          <li><NavLink to='/computers'>Computers</NavLink></li>
        </ul>
        {/* <Route path='/cats' component={dogs} />
        <Route path='/dogs' component={cats} />
        <Route path='/computers' component={computers} /> */}
      </nav>
      // routes
)

export default NavBar;