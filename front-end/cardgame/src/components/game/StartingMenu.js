import React from 'react'
import { Link } from 'react-router-dom'
import './menu.css'

export default function StartingMenu() {
  return (
    <div id='start'>
      <h1>Stellar Chronicles</h1>
      <p>A card game of strategy and chance</p>
      <h3>This application is currently finding difficulty with card selections in other browsers that are not Firefox. For optimal selection please try using a Firefox browser.</h3>
      <div className='button-container'>
        <button>Start Game</button>
        <Link to="/tutorial">
          <button>Tutorial</button>
        </Link>
      </div>
    </div>
  )
}
