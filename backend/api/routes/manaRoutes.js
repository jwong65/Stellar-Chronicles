const express = require('express');
const router = express.Router();

// Middleware to handle requests to /api/player/mana/
router.get('/tutorial', (req, res) => {
   try{
    const playerMana = 3;
    // Player's mana as a response.
    
    res.json({mana: playerMana});

   } catch (error) {
    console.error('Error fetching player mana:', error);
    res.status(500).json({ error: 'Internal server error' });
}
});

module.exports = router;
