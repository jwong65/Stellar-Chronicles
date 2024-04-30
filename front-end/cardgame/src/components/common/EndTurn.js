import React from 'react'

export default function EndTurn(isPlayerTurn) {
    const handleClick=()=>{
        if(isPlayerTurn){
            EndTurn()
        }else{
            console.log("Not Player's Turn")
        }
    }
  return (
    <div onClick={handleClick}>End Turn</div>
  )
}
