import React from 'react'

import GameCard from './GameCard.jsx'

function BoardGameBrowser () {
  return (
    <div style={cardHolder} className="container">
      <div className="row">
        <GameCard />
        <GameCard />
        <GameCard />
      </div>
    </div>
  )
}
const cardHolder = {
  margin: '1rem',
  padding: '1rem'
}

export default BoardGameBrowser
