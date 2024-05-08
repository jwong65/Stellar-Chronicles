import React, {useEffect, useState} from 'react'
import './interface.css'
import Card from '../common/Card'
import EndTurn from '../common/EndTurn'
import CardMessage from './CardMessage'
import GameMessage from './GameMessage'
import ManaImage from './ManaImage'
import Deck from '../common/Deck'

export default function GameInterface({player1Hand}) {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const maxHealth = 15
  const maxMana = 4
  const [playerMana, setPlayerMana] = useState(0)
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const [playerHand, setPlayerHand] = useState(player1Hand)
  const [enemyHealth, setEnemyHealth] = useState(maxHealth)
  const [cardInfo, setCardInfo] = useState({})
  
// UseEffect so that on load the player hand loads.
  useEffect(()=>{
    setPlayerHand(player1Hand)
  }, [player1Hand])
  useEffect(() => {
    // Fetch player's mana from the backend
    fetchPlayerMana();
  }, []); 

  const fetchPlayerMana = async () => {
    try {
      // Make GET request to backend endpoint to fetch player's mana
      const response = await fetch(`${backendUrl}/api/player/mana/tutorial`);
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched player mana:', data.mana);
        setPlayerMana(data.mana); // Update playerMana state with data from backend
      } else {
        console.error('Failed to fetch player mana:', response.status);
      }
    } catch (error) {
      console.error('Error fetching player mana:', error);
    }
  };

  const handleCardClick = (card)=>{
    if(card.cost <=playerMana){
    if(card.type === 'Damage'){
      setEnemyHealth(prevHealth =>prevHealth - card.value)
    }
      setPlayerMana(prevMana => prevMana - card.cost)
    }
    else{
      console.log('No more mana to play card')
    }
  }
  const handleCardHover = (card)=>{
    setCardInfo(card)
  } 
  const handleCardLeave=()=>{
    setCardInfo({})
  }
  const drawCard = (card )=>{
    setPlayerHand([...player1Hand, card])
  }
const healthPercentage = (enemyHealth / maxHealth) * 100;
    return (
    <div id='game-interface'>
        <div className='enemy-health' id='enemyhealth'>
          Enemy Health: {enemyHealth}
          <div className='health-bar'>
            <div className='health-fill' style={{ width: `${healthPercentage}%` }}></div>
          </div>
        </div>
        <div id='playarea'>
          <div className='info-container'>
            <CardMessage cardInfo={cardInfo}/>
            <div className='mana-container'>
              Current Mana : {playerMana}/{maxMana}
              {[...Array(playerMana)].map((_, index) => (
                <ManaImage key={index} available={index < playerMana} />
              ))}
              {[...Array(maxMana - playerMana)].map((_, index) => (
                <ManaImage key={`unavailable-${index}`} available={false} />
              ))}
          </div>
        </div>
          <div className='game-board' id= 'playfield' ></div>  
          <div className='end-turn-container'>
            <EndTurn isPlayerTurn={isPlayerTurn} />
          </div>
        </div>
        <GameMessage />
        <div className='player-container'>
        <div className='player-hand' id='player-hand'>
        {playerHand.map(card => (
          <Card key={card.id} id={card.id} value={card.value} effect={card.effect} cost={card.cost} type={card.type} 
            handleCardClick={() => { handleCardClick(card); }} 
            handleCardHover={handleCardHover}
            handleCardLeave={handleCardLeave}
          />
        ))}
        </div>
        <div className='deck-container'>
          <Deck drawCard={drawCard}/>
        </div>
      </div>
    </div>
  )
}