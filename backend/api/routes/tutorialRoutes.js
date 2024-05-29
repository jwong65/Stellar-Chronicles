const express = require('express');
const router = express.Router();

// Middleware to handle requests to /api/tutorial/cards
router.get('/cards', (req, res) => {
  const tutorialCards = [
    { id: 1, cost: 1, value: 2, effect: 'Deal 2 damage', type: 'Damage', name: 'Tutorial Card 1' },
    { id: 2, cost: 2, value: 2, effect: 'Heal 2 health', type: 'Heal', name: 'Tutorial Card 2' },
    { id: 3, cost: 1, value: 1, effect: 'Take 1 damage', type: 'Self Damage', name: 'Tutorial Card 3' },
  ];
  res.json({ cards: tutorialCards });
});

router.get('/deck', (req, res)=>{
  const tutorialDeck = [
    { id: 4, cost: 1, value: 2, effect: 'Deal 2 damage', type: 'Damage', name: 'Tutorial Card 4' },
    { id: 5, cost: 2, value: 'Tutorial Card 2', effect: 'Heal 2 damage', type: 'Heal', name: 'Tutorial Card 5' }
  ];
  res.json({deck: tutorialDeck})
})

router.get('/enemies', (req, res) => {
  const tutorialEnemies = [
  { id: 1, name: 'Slime', health: 10, frames: 8, frameWidth: 128, frameHeight: 128},
  { id: 2, name: 'Jellyfish', health: 20, frames: 4, frameWidth: 128, frameHeight: 128},
  ];
  res.json(tutorialEnemies);
});

module.exports = router;
