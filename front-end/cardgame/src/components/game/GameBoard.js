import React from 'react'
import './interface.css'
import Enemy from '../common/Enemy'

export default function GameBoard({enemies, handleTargetClick}) {
  
  return (
    <div className='game-board' id= 'playfield' >
      {enemies.map(enemy => <Enemy key={enemy.id} enemy={enemy} handleTargetClick={handleTargetClick} />)}
    </div> 
  )
}
