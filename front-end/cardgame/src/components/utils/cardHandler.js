// These will also settheSelectedCard back to null.

export const handlePlayerHeal = (card, setPlayerHealth, setPlayerMana, setUsedCards, setPlayerHand, setSelectedCard, maxHealth) => {
  // Math.min will make it so that if the prevHealth + value of healing is greater than the maxHealth, it will default back to maxHealth. 
  // If it is less, then by default it will grab the min.
  setPlayerHealth((prevHealth) => Math.min(prevHealth + card.value, maxHealth));
  setPlayerMana((prevMana) => prevMana - card.cost);
  setUsedCards((prevUsedCards) => [...prevUsedCards, card]);
  setPlayerHand((prevHand) => prevHand.filter((c) => c.id !== card.id));
  setSelectedCard(null);
};

export const handlePlayerDamage = (card, setPlayerHealth, setPlayerMana, setUsedCards, setPlayerHand, setSelectedCard) => {
  // Math.max will make it so that if the prevHealth - value of damage is less than 0, it will default back to 0.
  setPlayerHealth((prevHealth) => Math.max(prevHealth - card.value, 0));
  setPlayerMana((prevMana) => prevMana - card.cost);
  setUsedCards((prevUsedCards) => [...prevUsedCards, card]);
  setPlayerHand((prevHand) => prevHand.filter((c) => c.id !== card.id));
  setSelectedCard(null);
};


 // if(card.type === 'Damage'){ 
    //   setEnemyHealth(prevHealth =>prevHealth - card.value)
    // }
    // if (card.type === 'Self Damage'){
    //   setPlayerHealth(prevHealth => prevHealth - card.value)
    // }
    // if (card.type === 'Heal') {
    //   if (playerHealth < maxHealth) {
    //     setPlayerHealth(prevHealth => Math.min(prevHealth + card.value, maxHealth));
    //   } else {
    //     setGameInfoMessage('Player health is already at maximum');
    //     return;
    //   }

