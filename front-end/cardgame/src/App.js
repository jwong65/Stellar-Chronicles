import './App.css';
import { useState, useEffect } from 'react';
import GameInterface from './components/game/GameInterface';

function App() {

  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [gameState, setGameState]  = useState(null)
  useEffect(()=>{
    function startGame(){
      fetch(`${backendUrl}/api/game/start`,{
        method: 'POST'
      })
      .then(response => response.json())
      .then(data => {
        if(data.gameState){
          setGameState(data.gameState)
        }
        else{
          console.error('No gameState returned from API')
        }
      })
      .catch(error=>{
        console.error('Error starting game', error)
      })
    }
    startGame()
  })
  return (
    <div className="App">
      <div id='gameState'>Hello</div>
      {gameState && (
          <pre>{JSON.stringify(gameState, null, 2)}</pre>
        )}
      
      <GameInterface />
    </div>
  );
}

export default App;
