import React, { useState } from 'react'
import './card.css'

export default function Card({id, cost, value, effect, handleCardClick}) {
  const [flip, setFlip] = useState(false)
  const handleClick=() =>{
    handleCardClick(2)
  }
  return (
    <div 
      className={`card ${flip ? "flip": ""}`}
      onClick={handleClick} 
    > 
      <div className='front'>
        <p>Cost: {cost} </p>
        <div className='sprite-container' />
          {/* <p>Card: {value}</p> */}
          <p>{effect}</p>
      </div>
      <div className='back'>
      </div>
    </div>
  )
}
// onMouseEnter={()=>setFlip(true)} onMouseLeave={()=>setFlip(false)
// This is the flip effect of the card on hover but doesn't make sense right now.
