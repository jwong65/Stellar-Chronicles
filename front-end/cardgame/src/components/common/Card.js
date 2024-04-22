import React, { useState } from 'react'

import './card.css'

export default function Card({value, effect}) {
  const [flip, setFlip] = useState(false)
  return (
    <div 
      className={`card ${flip ? "flip": ""}`} onClick={()=>setFlip(!flip)}
    > 
      <div className='front'>
        <div className='sprite-container'></div>
        Card: {value} and {effect}
      </div>
      <div className='back'>
        <h2>Back</h2>
        {/* <img src='../images/Wood Back.jpg' alt='Card Back'/> */}
      </div>
    </div>
  )
}
