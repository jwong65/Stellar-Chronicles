import React, {useState} from 'react'
import './interface.css'
import Card from '../common/Card'
import EndTurn from '../common/EndTurn'

export default function GameInterface() {
    const [player1Hand, setPlayer1Hand] = useState([
        { id: 1, value: 'Ace', effect: 'Destroy 2 cards' },
        { id: 2, value: 'Spade', effect:'Restore 2 health'}
    ])
    // If is Player Turn is true, it means it is currently the player's turn
    const [isPlayerTurn, setIsPlayerTurn] = useState(true)

    return (
    <div id='game-interface'>GameInterface
        <div className='game-board' id= 'playfield' ></div>
        <div className='player-hand' id='player-hand'>
        {player1Hand.map(card => (
          <Card key={card.id} id={card.id} value={card.value} effect={card.effect} />
        ))}
        </div>
        <EndTurn isPlayerTurn={isPlayerTurn} />
    </div>
  )
}

// useEffect(()=>{
//     function startGame(){
//       fetch(`${backendUrl}/api/game/start`,{
//         method: 'POST'
//       })
//       .then(response => response.json())
//       .then(data => {
//         if(data.gameState){
//           setGameState(data.gameState)
//         }
//         else{
//           console.error('No gameState returned from API')
//         }
//       })
//       .catch(error=>{
//         console.error('Error starting game', error)
//       })
//     }
//     startGame()
//   },[])