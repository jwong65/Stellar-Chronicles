import React, {useState} from 'react'
import './interface.css'
import Card from '../common/Card'

export default function GameInterface() {
    const [player1Hand, setPlayer1Hand] = useState([
        { id: 1, value: 'Ace', effect: 'Destroy 2 cards' },
        { id: 2, value: 'Spade', effect:'Restore 2 health'}
    ])

    return (
    <div id='game-interface'>GameInterface
        <div className='game-board' id= 'playfield' ></div>
        <div className='player-hand' id='player-hand'>
        {player1Hand.map(card => (
          <Card key={card.id} id={card.id} value={card.value} effect={card.effect} />
        ))}
        </div>
    </div>
  )
}
