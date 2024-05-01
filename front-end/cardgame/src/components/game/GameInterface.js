import React, {useEffect, useState} from 'react'
import './interface.css'
import Card from '../common/Card'
import EndTurn from '../common/EndTurn'

export default function GameInterface({player1Hand}) {
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const [enemyHealth, setEnemyHealth] = useState(15)
  const handleCardClick = (card)=>{
    if(card.type === 'Damage'){
      setEnemyHealth(prevHealth =>prevHealth - card.value)
    }
} 
    return (
    <div id='game-interface'>
        <div className='enemy-health' id='enemyhealth'>Enemy Health: {enemyHealth}</div>
        <div className='game-board' id= 'playfield' ></div>
        <div className='player-hand' id='player-hand'>
        {player1Hand.map(card => (
          <Card key={card.id} id={card.id} value={card.value} effect={card.effect} cost={card.cost} type={card.type} handleCardClick={()=>handleCardClick(card)}/>
        ))}
        <div className='end-turn-container'>
          <EndTurn isPlayerTurn={isPlayerTurn} />
        </div>
        </div>
    </div>
  )
}