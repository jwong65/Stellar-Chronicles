import React, { useEffect, useState } from 'react'
import GameInterface from './GameInterface'

export default function Tutorial() {
  
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [tutorialCards, setTutorialCards] = useState([])
  const fetchTutorialCards = ()=>{
    fetch(`${backendUrl}/api/tutorial/cards`)
    
    .then(response => response.json())
    .then(data => {
      setTutorialCards(data.cards)
    })
    .catch(error => {
      console.error('Error fetching tutorial cards', error)
    })
  }
  useEffect(() => {
    fetchTutorialCards()
  }, [])
  
  return (
    <div>
      <p>Welcome to the tutorial</p>
      <GameInterface player1Hand={tutorialCards} fetchTutorialDeck={true}/>
    </div>
    )
}
