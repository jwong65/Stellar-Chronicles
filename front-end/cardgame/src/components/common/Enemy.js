import React from 'react'
import BlueSlime from '../images/enemy/BlueSlimeIdle.png'
import BlueJelly from '../images/enemy/Jellyfish.png'
import './enemy.css'

export default function Enemy({enemy, onClick}) {
    const enemyHealthPercentage = (enemy.health / enemy.maxHealth) * 100;

    const enemyImages ={
        "Slime": BlueSlime,
        "Jellyfish": BlueJelly
    }
    
  return (
    <div className='enemy'>
        <div className='enemy-name'>{enemy.name}</div>
        <div className='enemy-sprite' style={
            {
                '--frames': enemy.frames,
                '--frame-width': `${enemy.frameWidth}px`,
                backgroundImage: `url(${enemyImages[enemy.name]})`,
                width: `${enemy.frameWidth}px`,
                height: `${enemy.frameHeight}px`,
            }
        }></div>
        <div className='enemy-health'>Health: {enemy.health}</div>
        <div className='health-bar'>
          <div className='health-fill' style={{ width: `${enemyHealthPercentage}%` }}></div>
        </div>
    </div>
  )
}
