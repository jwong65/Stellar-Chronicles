import React from 'react'
import './map.css'

export default function Map() {
  const generateMap =(height, width)=>{
    const map = []
    const cellType = ['empty', 'enemy']

    for (let i = 0; i < height; i++) {
      const row = []
      for (let j = 0; j < width; j++) {
        const randomIndex= Math.floor(Math.random() * cellType.length)
        const type = cellType[randomIndex]
        row.push({type: 'wall'})
      }
      map.push(row)
    }
    // const pathCells = [
    //   [0, 5], [1, 5], [2, 4], [2, 5], [2, 6], [3, 4], [4, 4], [5, 4],
    //   [5, 5], [5, 6], [6, 6], [7, 6], [8, 5], [9, 5]
    // ];

    // pathCells.forEach(([row, col])=>{
    //   map[row][col] = {type: 'path'}
    // })

    return map
  }
  const map = generateMap(10, 10)
  

  return (
    <div className='map-container'>
      {map.map((row, rowIndex)=> (
        row.map((cell, cellIndex)=>
        <div 
          key={`${rowIndex}-${cellIndex}`}
          className={`map-cell map-cell-${cell.type}`}
          //  map-cell-${cell.type}
        ></div>
      )))}
    </div>
  )
}
