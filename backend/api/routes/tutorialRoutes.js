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
