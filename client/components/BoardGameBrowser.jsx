import React, { useEffect, useState } from 'react'
import GameCard from './GameCard.jsx'
import DetailsModal from './DetailsModal.jsx'

import TableTopService from '../scripts/TableTopService.js'

function BoardGameBrowser () {
  const [games, setGames] = useState([])
  const [selectedGame, setSelectedGame] = useState(null)
  // so much more cumbersome than vue refs :/

  useEffect(() => {
    TableTopService.GetAllGames().then((games) => {
      setGames(games)
    })
  }, [])

  const handleOpenModal = (game) => {
    TableTopService.GetGameById(game.ID).then((gameDetails) => {
      console.log(gameDetails)
      setSelectedGame(gameDetails)
      document.getElementsByTagName('body')[0].style.overflow = 'hidden'
    })
  }

  const handleCloseModal = () => {
    setSelectedGame(null)
    document.getElementsByTagName('body')[0].style.overflow = 'visible'
  }

  return (
    <div className="container" style={container}>
      <div className="row">
        {games.map((game) => (
          <GameCard
            key={game.ID}
            game={game}
            openModal={() => handleOpenModal(game)}
          /> // missing v-for's right about now
        ))}
      </div>
      {selectedGame
        ? (
          <DetailsModal
            game={selectedGame}
            closeModal={() => handleCloseModal()}
          />
          )
        : null}
    </div>
  )
}

const container = { marginTop: '2rem' }

export default BoardGameBrowser
