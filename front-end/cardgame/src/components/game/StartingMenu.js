import React from 'react'
import { Link } from 'react-router-dom'
import './menu.css'

export default function StartingMenu() {
  return (
    <div id='start'>
      <h1>Stellar Chronicles</h1>
      <p>A card game of strategy and chance</p>
      
      <div className='button-container'>
        <button>Start Game</button>
        <Link to="/tutorial">
          <button>Tutorial</button>
        </Link>
      </div>
    </div>
  )
}
