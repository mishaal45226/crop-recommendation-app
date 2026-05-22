import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='navbar'>
      <h2>Smart Crop <span>AI</span></h2>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/predict'>Predict</Link></li>
        <li><Link to='/about'>About</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar