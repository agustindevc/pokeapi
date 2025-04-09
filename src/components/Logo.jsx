import React from 'react'
import Pokemon_Logo from '../assets/images/Pokemon_logo.png';
import './Logo.css';

function Logo() {
  return (
    <div className='logo-container'>
        <img className="logo" src={Pokemon_Logo} alt="Pokemon Logo" />
    </div>
  )
}

export default Logo