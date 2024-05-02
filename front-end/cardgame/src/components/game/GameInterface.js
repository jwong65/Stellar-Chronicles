import React, {useEffect, useState} from 'react'
import './interface.css'
import Card from '../common/Card'
import EndTurn from '../common/EndTurn'
import InfoMessage from './CardMessage'
import GameMessage from './GameMessage'

export default function GameInterface({player1Hand}) {
  const maxHealth = 15
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const [enemyHealth, setEnemyHealth] = useState(maxHealth)

  const handleCardClick = (card)=>{
    if(card.type === 'Damage'){
      setEnemyHealth(prevHealth =>prevHealth - card.value)
    }
} 
const healthPercentage = (enemyHealth / maxHealth) * 100;
console.log(healthPercentage)
    return (
    <div id='game-interface'>
        <div className='enemy-health' id='enemyhealth'>
          Enemy Health: {enemyHealth}
          <div className='health-bar'>
            <div className='health-fill' style={{ width: `${healthPercentage}%` }}></div>
          </div>
        </div>
        <div id='playarea'>
          <InfoMessage />
          <div className='game-board' id= 'playfield' ></div>  
          <div className='end-turn-container'>
            <EndTurn isPlayerTurn={isPlayerTurn} />
          </div>
        </div>
        <GameMessage />
        <div className='player-hand' id='player-hand'>
        {player1Hand.map(card => (
          <Card key={card.id} id={card.id} value={card.value} effect={card.effect} cost={card.cost} type={card.type} handleCardClick={()=>handleCardClick(card)}/>
        ))}
        </div>
    </div>
  )
}