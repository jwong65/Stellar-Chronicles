import React, { useEffect, useState } from 'react'
import {cardBack} from '../images/Wood Back.png'
import '../common/card.css'

export default function Deck({drawCard}) {
    const [deckCards, setDeckCards] = useState([])
    const [isDrawing, setIsDrawing] = useState(false)
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    useEffect(() => {
      fetchDeckCards()
    },[]);

    const fetchDeckCards = async () => {
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
    };

    const handleDrawingCards=()=>{
      setIsDrawing(true)
      setTimeout(()=>{
        drawCard(deckCards[0])
        setDeckCards(deckCards.slice(1))
        // This removes the card from the array.
        setIsDrawing(false)
        // UseState back to false after animation
      }, 500) 
    }

    return(
    <div className='deck' onClick={handleDrawingCards}>
      {isDrawing ? (
        // Placeholder for animation, can be a spinner or any loading indicator
        <div>Loading...</div>
      ) : (
        // Actual deck card, you can style this as needed
        <div className='deck-card'></div>
      )}    
      
    </div>
      )
}
