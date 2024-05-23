import React from 'react'

export default function Enemy({enemy, onClick}) {
    const enemyHealthPercentage = (enemy.health / enemy.maxHealth) * 100;
  return (
    <div className='enemy'>
        <div className='enemy-name'>{enemy.name}</div>
        <div className='enemy-health'>Health: {enemy.health}</div>
        <div className='health-bar'>
          <div className='health-fill' style={{ width: `${enemyHealthPercentage}%` }}></div>
        </div>
    </div>
  )
}
