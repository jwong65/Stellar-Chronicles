import React, { useState } from 'react'

import './card.css'

export default function Card({value, effect}) {
  return (
    <div 
      className={`card`}
    >
      <div className='sprite-container'></div>
      Card: {value} and {effect}
    </div>
  )
}
