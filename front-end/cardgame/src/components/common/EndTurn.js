import React from 'react'
import './button.css'

export default function EndTurn(isPlayerTurn) {
    const handleClick=()=>{
        if(isPlayerTurn){
            EndTurn()
        }else{
            console.log("Not Player's Turn")
        }
    }
  return (
    <div className='end-turn' onClick={handleClick}>
      <button>End Turn</button>
    </div>
  )
}
