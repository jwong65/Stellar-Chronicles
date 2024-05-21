const express = require('express');
const router = express.Router();

// Middleware to handle requests to /api/tutorial/cards
router.get('/cards', (req, res) => {
  const tutorialCards = [
    { id: 1, cost: 1, value: 2, effect: 'Deal 2 damage', type: 'Damage' },
    { id: 2, cost: 2, value: 2, effect: 'Heal 2 health', type: 'Heal' },
    { id: 3, cost: 1, value: 1, effect: 'Take 1 damage', type: 'Self Damage' }
  ];
  res.json({ cards: tutorialCards });
});

router.get('/deck', (req, res)=>{
  const tutorialDeck = [
    { id: 4, cost: 1, value: 2, effect: 'Deal 2 damage', type: 'Damage' },
    { id: 5, cost: 2, value: 'Tutorial Card 2', effect: 'Heal 2 damage', type: 'Heal' }
  ];
  res.json({deck: tutorialDeck})
})

router.get('/enemies', (req, res) => {
  const tutorialEnemies = [
  { id: 1, name: 'Goblin', health: 10 },
  { id: 2, name: 'Orc', health: 20 },
  ];
  res.json(tutorialEnemies);
});

module.exports = router;
