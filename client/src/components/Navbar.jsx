import React from 'react'

const Navbar = () => {
  return (
    <nav className='nav-bar'>
      <h2>OnlineShop</h2>
      <div className="nav-bar"></div>
      <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-bag-fill" viewBox="0 0 16 16">
        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"/>
      </svg>
      <span className="bag-quantiti">
        <span>3</span>
      </span>
    </nav>
  )
}

export default Navbar