import React from 'react'
import './interface.css'
import Enemy from '../common/Enemy'

export default function GameBoard({enemies}) {
  return (
    <div className='game-board' id= 'playfield' >
      {enemies.map(enemy => <Enemy enemy={enemy} />)}
    </div> 
  )
}
