import React from 'react'
import blueManaImage from '../images/Button_Blue.png'
import redManaImage from '../images/Button_Red.png'

export default function ManaImage({available}) {
    return (
        <div>
              <img src={available ? blueManaImage : redManaImage} alt="Mana" height={50} width={50}/>
        </div>
  )
}
