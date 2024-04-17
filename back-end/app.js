const express = require('express');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.get('/', (req, res) => {
    res.json({ message: 'Hello from Express!' });
  });
  
app.post('/api/game/start', (req, res) => {
    const gameState = {
        id: 1,
        players: ['Player 1', 'Player 2'],
        currentTurn: 'Player 1',
    };
    res.json({ message: 'New game started!', gameState: gameState });
  });
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  