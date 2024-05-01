const express = require('express');
const router = express.Router();

// Middleware to handle requests to /api/tutorial/cards
router.get('/cards', (req, res) => {
  const tutorialCards = [
    { id: 1, cost: 1, value: 2, effect: 'Deal 2 damage', type: 'Damage' },
    { id: 2, cost: 2, value: 'Tutorial Card 2', effect: 'Tutorial Effect 2', type: 'Heal' },
    { id: 3, cost: 1, value: 'Tutorial Card 3', effect: 'Tutorial Effect 3', type: 'Etc.' }
  ];
  res.json({ cards: tutorialCards });
});

module.exports = router;

//   // const [player1Hand, setPlayer1Hand] = useState([
    //     { id: 1, value: 'Ace', effect: 'Destroy 2 cards' },
    //     { id: 2, value: 'Spade', effect:'Restore 2 health'}
    // ])
    // If is Player Turn is true, it means it is currently the player's turn
  