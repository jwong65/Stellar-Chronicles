import React from 'react'
import './card.css'

export default function Card({id, cost, value, effect, name, type, handleCardClick, handleCardHover, handleCardLeave, isSelected}) {

  const handleMouseEnter =()=>{
    handleCardHover({id, cost, value, effect})
  }
  const handleMouseLeave = ()=>{
    handleCardLeave();
  }
  return (
    <div 
      className={`card ${isSelected? "selected" : ""}`}
      onClick={() => handleCardClick({ id, cost, value, effect, type, name })} 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave} 
    > 
      <div className='front'>
        <p>{name }</p>
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
// ${flip ? "flip": ""}
// onMouseEnter={()=>setFlip(true)} onMouseLeave={()=>setFlip(false)
// This is the flip effect of the card on hover but doesn't make sense right now.
