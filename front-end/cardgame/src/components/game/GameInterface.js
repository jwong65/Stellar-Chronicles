import React, {useEffect, useState} from 'react'
import './interface.css'
import Card from '../common/Card'
import EndTurn from '../common/EndTurn'
import CardMessage from './CardMessage'
import GameMessage from './GameMessage'
import ManaImage from './ManaImage'
import Deck from '../common/Deck'
import GameBoard from './GameBoard'
import { v4 as uuidv4 } from 'uuid';

// Materia UI imports
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';

export default function GameInterface({player1Hand, fetchTutorialDeck}) {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const maxEnemyHealth = 15
  const maxHealth = 15
  const maxMana = 4
  const [playerMana, setPlayerMana] = useState(0)
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const [playerHand, setPlayerHand] = useState(player1Hand)
  const [playerHealth, setPlayerHealth] = useState(maxHealth)
  const [usedCards, setUsedCards] = useState([])
  const [enemyHealth, setEnemyHealth] = useState(maxHealth)
  const [cardInfo, setCardInfo] = useState({})
  const [enemies, setEnemies] = useState([])
  const [gameInfoMessage, setGameInfoMessage] = useState("")
  const [selectedCard, setSelectedCard] = useState(null)

  // Drawer functions
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const fetchEnemy = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/tutorial/enemies`);
      if (response.ok) {
        const data = await response.json();
        setEnemies(data);
      } else {
        console.error('Failed to fetch enemy:', response.status);
      }
    } catch (error) {
      console.error('Error fetching enemy:', error);
    }
  };

  const fetchPlayerMana = async () => {
    try {
      // Make GET request to backend endpoint to fetch player's mana
      const response = await fetch(`${backendUrl}/api/player/mana/tutorial`);
      if (response.ok) {
        const data = await response.json();
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
      setSelectedCard(card)
      console.log(selectedCard)
    }
    else{
      setGameInfoMessage('Not enough mana to play this card')
    }
  }
 // if(card.type === 'Damage'){ 
    //   setEnemyHealth(prevHealth =>prevHealth - card.value)
    // }
    // if (card.type === 'Self Damage'){
    //   setPlayerHealth(prevHealth => prevHealth - card.value)
    // }
    // if (card.type === 'Heal') {
    //   if (playerHealth < maxHealth) {
    //     setPlayerHealth(prevHealth => Math.min(prevHealth + card.value, maxHealth));
    //   } else {
    //     setGameInfoMessage('Player health is already at maximum');
    //     return;
    //   }
    
  const handleTargetClick = (enemy)=>{
    if (selectedCard){
      const updatedEnemies = enemies.map(currentEnemy =>{
        if (currentEnemy.id === enemy.id){
        if(selectedCard.type === 'Damage'){ 
          // Update the enemy to do damage based on value.
          enemy.health = Math.max(0, enemy.health - selectedCard.value)
        }
        return enemy
    }})
    
      setEnemies(updatedEnemies)
      setPlayerMana(prevMana => prevMana - selectedCard.cost)
      setUsedCards(prevUsedCards => [...prevUsedCards, selectedCard]);
      setPlayerHand(prevHand => prevHand.filter(c => c.id !== selectedCard.id));
      setSelectedCard(null)
  }
  else{
    setGameInfoMessage('No card selected')
  }
  }
  

  const handleCardUse = (card) => {
    setPlayerHand(playerHand.filter((c) => c.id !== card.id));
    setUsedCards([...usedCards, card]);
  };

  // These two handles are for the cardInformation on hover.
  const handleCardHover = (card)=>{
    setCardInfo(card)
  } 
  const handleCardLeave=()=>{
    setCardInfo({})
  }
  const drawCard = (card )=>{
    setPlayerHand([...playerHand, card])
  }

  // UseEffect so that on load the player hand loads.
  useEffect(()=>{
    setPlayerHand(player1Hand)
  }, [player1Hand])
  useEffect(() => {
    // Fetch player's mana from the backend
    fetchPlayerMana();
  }, []); 
  // Fetches enemy from the backend
  useEffect(()=>{
    fetchEnemy()
  },[])

const enemyHealthPercentage = (enemyHealth / maxEnemyHealth) * 100;
const healthPercentage = (playerHealth / maxHealth) * 100;
    return (
    <div id='game-interface'>
        <div className='enemy-health' id='enemyhealth'>
          Enemy Health: {enemyHealth}
          <div className='health-bar'>
            <div className='health-fill' style={{ width: `${enemyHealthPercentage}%` }}></div>
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
          <GameBoard enemies={enemies} handleTargetClick={handleTargetClick}/> 
          <div className='end-turn-container'>
            <EndTurn isPlayerTurn={isPlayerTurn} />
          </div>
        </div>
        <GameMessage GameMessage={gameInfoMessage}/>
        <div className='player-container'>
        <div className='player-hand' id='player-hand'>
        <div className='player-health'>
          Player Health : {playerHealth}
        <div className='health-bar'>
            <div className='health-fill' style={{ width: `${healthPercentage}%` }}></div>
          </div>
        </div>
        {playerHand.map(card => (
          <Card key={uuidv4()} id={card.id} value={card.value} effect={card.effect} cost={card.cost} type={card.type} 
            handleCardClick={handleCardClick} 
            handleCardHover={handleCardHover}
            handleCardLeave={handleCardLeave}
            isSelected={selectedCard && selectedCard.id === card.id}
          />
        ))}
        </div>
        <div className='deck-container'>
          <Deck drawCard={drawCard} setGameInfoMessage={setGameInfoMessage} fetchTutorialDeck={fetchTutorialDeck} />
        </div>
        <Button onClick={toggleDrawer} >SEE USED CARDS</Button>
        <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
        <div style={{ width: 250 }}>
          <h2>Used Cards</h2>
          <div className="used-cards">
            {usedCards.map((card) => (
              <div key={card.id} className="used-card">
                ID: {card.id}, Cost: {card.cost}, Value: {card.value}, Effect: {card.effect}
              </div>
            ))}
          </div>
        </div>
      </Drawer>
      </div>
    </div>
  )
}