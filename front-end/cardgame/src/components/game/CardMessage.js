import React from 'react'
import './info.css'

export default function CardMessage({ cardInfo }) {
// console.log(cardInfo)
const { id, cost, value, effect } = cardInfo;
// console.log(cardInfo.cost, "Cost")
return (
<div className='card-message'>Card Information
{cardInfo && Object.keys(cardInfo).length > 0 && (
<>
<div className='cardcost'>{cost !== undefined ? `Cost: ${cost}` : ''}</div>
<div className='cardname'>{value !== undefined ? `Card Name: ${value}` : ''}</div>
<div className='cardeffect'>{effect !== undefined ? `Card Effect: ${effect}` : ''}</div>
</>
)}
</div>
)}
