import React from 'react';
// import Button from '@mui/material/Button';
import './selection.css'

export default function CardSelectionMenu({ playerHand, handleCardClick, selectedCard }) {
  return (
    <div className='card-selection-menu'>
      <h2>Select a Card</h2>
      <div className='card-list'>
        {playerHand.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card)}
            className={`card-button ${selectedCard && selectedCard.id === card.id ? 'selected' : ''}`}
          >
            {card.name}
          </button>
        ))}
      </div>
      {selectedCard && (
        <div className='selected-card-details'>
          <p>Selected Card: {selectedCard.name}</p>
          {/* <Button>Play Card</Button> */}
        </div>
      )}
    </div>
  );
}
