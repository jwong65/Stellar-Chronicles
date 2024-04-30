import React, { useState } from 'react'
import './card.css'

export default function Card({value, effect}) {
  const [flip, setFlip] = useState(false)
  return (
    <div 
      className={`card ${flip ? "flip": ""}`} onMouseEnter={()=>setFlip(true)} onMouseLeave={()=>setFlip(false)}
    > 
      <div className='front'>
        <div className='sprite-container'></div>
        Card: {value} and {effect}
      </div>
      <div className='back'>
      </div>
    </div>
  )
}
