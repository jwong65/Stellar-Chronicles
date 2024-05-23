import React, { useEffect, useState, useCallback } from 'react'
import '../common/card.css'

export default function Deck({drawCard, setGameInfoMessage, fetchTutorialDeck}) {
    const [deckCards, setDeckCards] = useState([])
    const [isDrawing, setIsDrawing] = useState(false)
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const numCardsInDeck = deckCards.length;

    const fetchDeckCards = useCallback (async () => {
      try {
        const response = await fetch(`${backendUrl}/api/tutorial/deck`);
        if (response.ok) {
          const data = await response.json();
          setDeckCards(data.deck);
        } else {
          console.error('Failed to fetch deck cards:', response.status);
        }
      } catch (error) {
        console.error('Error fetching deck cards:', error);
      }
    },[backendUrl])

    const handleDrawingCards=()=>{
      if (deckCards.length===0){
        setGameInfoMessage('No cards left in deck')
        return
      }
      setIsDrawing(true)
      setTimeout(()=>{
        drawCard(deckCards[0])
        setDeckCards(deckCards.slice(1))
        // This removes the card from the array.
        setIsDrawing(false)
        // UseState back to false after animation
      }, 500) 
    }

    

    useEffect(() => {
      if (fetchTutorialDeck){
      fetchDeckCards()
      }
    },[fetchTutorialDeck, fetchDeckCards]);

  


    return(
    <div className='deck' onClick={handleDrawingCards}>
      {isDrawing ? (
        <div className='deck-card draw-card-animation'>
          <span className='number-deck'>{numCardsInDeck}</span>
        </div>
      ) : (
        <div className='deck-card'>
          <span className='number-deck'>{numCardsInDeck}</span>
        </div>
      )}
    </div>
      )
}
