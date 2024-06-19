import React from 'react'
import './map.css'

export default function Map() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${width}, 30px)` }}>
    {map.flat().map((room, index) => (
      <div
        key={index}
        style={{
          width: '30px',
          height: '30px',
          border: '1px solid black',
          backgroundColor: room.type === 'empty' ? 'grey' : 'white',
        }}
      ></div>
    ))}
  </div>
  )
}
