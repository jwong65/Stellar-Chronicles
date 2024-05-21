import React from 'react'

export default function Enemy({enemy, onClick}) {
  return (
    <div className='enemy' onClick={()=>onClick(enemy)}>
        <div className='enemy-name'>{enemy.name}</div>
        <div className='enemy-health'>Health: {enemy.health}</div>
        <div className='health-bar'>
          <div className='health-fill' style={{ width: `${(enemy.health / enemy.maxHealth) * 100}%` }}></div>
        </div>
    </div>
  )
}
