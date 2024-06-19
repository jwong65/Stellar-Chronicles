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
import { Modal, Box, Drawer, Button } from '@mui/material'
import CardSelection from './CardSelection'

// Utils
import { handlePlayerHeal, handlePlayerDamage } from '../utils/cardHandler'

export default function GameInterface({player1Hand, fetchTutorialDeck}) {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const maxHealth = 15
  const maxMana = 4
  const [playerMana, setPlayerMana] = useState(0)
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const [playerHand, setPlayerHand] = useState(player1Hand)
  const [playerHealth, setPlayerHealth] = useState(maxHealth)
  const [usedCards, setUsedCards] = useState([])
  const [cardInfo, setCardInfo] = useState({})
  const [enemies, setEnemies] = useState([])
  const [gameInfoMessage, setGameInfoMessage] = useState("")
  const [selectedCard, setSelectedCard] = useState(null)

  // Drawer functions
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Card Selection Menu functions
  const [isCardMenuOpen, setIsCardMenuOpen] = useState(false);
  const toggleCardMenu = () => {
    setIsCardMenuOpen(!isCardMenuOpen);
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
      if (card.type === 'Heal') {
        handlePlayerHeal(card, setPlayerHealth, setPlayerMana, setUsedCards, setPlayerHand, setSelectedCard, maxHealth)
      }
      if (card.type === 'Self Damage') {
        handlePlayerDamage(card, setPlayerHealth, setPlayerMana, setUsedCards, setPlayerHand, setSelectedCard)
      }
      setSelectedCard(card)
      setIsCardMenuOpen(false);
    }
    else{
      setGameInfoMessage('Not enough mana to play this card')
    }
  }
  const handleTargetClick = (enemy) => {
    if (selectedCard) {
      const updatedEnemies = enemies.map((currentEnemy) => {
        if (currentEnemy && currentEnemy.id === enemy.id) {
          if (selectedCard.type === 'Damage') {
            const newHealth = Math.max(0, currentEnemy.health - selectedCard.value);      
          if (selectedCard.type === 'Self Damage'){
            setPlayerHealth(prevHealth => prevHealth - selectedCard.value)
          }
          return {
            ...currentEnemy,
            health: newHealth
          }
        }
        }
        return currentEnemy;
      }).filter(e => e !== undefined);

      setEnemies(updatedEnemies);
      setPlayerMana(prevMana => prevMana - selectedCard.cost);
      setUsedCards(prevUsedCards => [...prevUsedCards, selectedCard]);
      setPlayerHand(prevHand => prevHand.filter(c => c.id !== selectedCard.id));
      setSelectedCard(null);
    } else {
      setGameInfoMessage('No card selected');
    }
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

const healthPercentage = (playerHealth / maxHealth) * 100;
    return (
    <div id='game-interface'>
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
          <Card key={uuidv4()} id={card.id} value={card.value} effect={card.effect} cost={card.cost} type={card.type} name={card.name}
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
        <Button onClick={toggleDrawer} variant='text'>SEE USED CARDS</Button>
        <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
        <div style={{ width: 250 }}>
          <h2>Used Cards</h2>
          <div className="used-cards">
            {usedCards.map((card) => (
              <div key={card.id} className="used-card">
                ID: {card.id}, Cost: {card.cost}, Value: {card.value}, Effect: {card.effect}, Name: {card.name}
              </div>
            ))}
          </div>
        </div>
      </Drawer>
      </div>
      <button className='select-card' onClick={toggleCardMenu}>Select a Card</button>

      
      <Modal
          open={isCardMenuOpen}
          onClose={toggleCardMenu}
        >
          <Box className="modal-box">
            <CardSelection
              playerHand={playerHand}
              handleCardClick={handleCardClick}
              // handlePlayCard={handlePlayCard}
              selectedCard={selectedCard}
            />
          </Box>
        </Modal>
    </div>
  )
}