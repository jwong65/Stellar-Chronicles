import './App.css';
import { useState, useEffect } from 'react';
import GameInterface from './components/game/GameInterface';
import Tutorial from './components/game/Tutorial';
import StartingMenu from './components/game/StartingMenu'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

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
  }, [backendUrl])
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<StartingMenu />} />
          {/* <Route path='/start' element={<StartingMenu />} /> */}
          <Route path='tutorial' element={<Tutorial />} />
        </Routes> 
      </Router>
    </div>
  );
}

export default App;
