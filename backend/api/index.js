const express = require('express');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 3000;

const tutorialRoutes = require('./routes/tutorialRoutes');

app.use(cors())

app.use(`/api/tutorial`, tutorialRoutes)

const gameState = {
  id: 1,
  players: ['Player 1', 'Player 2'],
  currentTurn: 'Player 1',
};
app.get('/', (req, res) => {
    res.json({ message: 'Hello from Express!' });
  });

// Get the current game state
app.get('/api/game/state', (req, res)=>{
  res.json({gameState})
})
// Starts a new game
app.post('/api/game/start', (req, res) => {    
    res.json({ message: 'New game started!', gameState: gameState });
  });
// Ends the turn
app.post('/api/game/end-turn', (req, res) => {
  if (gameState.currentTurn == 'Player 1'){
    gameState.currentTurn = 'Player 2'
  }
  else{
    gameState.currentTurn = 'Player 1'
  }
  res.json({message: 'Turn Ended.', gameState})
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
