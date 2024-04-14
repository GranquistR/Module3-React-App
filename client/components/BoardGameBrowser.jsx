import React, { useEffect, useState, useContext } from 'react'
import GameCard from './GameCard.jsx'
import DetailsModal from './DetailsModal.jsx'
import AddGameModal from './AddGameModal.jsx'
import { GameContext } from './GameContext.jsx'

import TableTopService from '../scripts/TableTopService.js'

function BoardGameBrowser () {
  const { selectedGame, setSelectedGame } = useContext(GameContext)
  const [games, setGames] = useState([])
  // so much more cumbersome than vue refs :/

  useEffect(() => {
    TableTopService.GetAllGames().then((games) => {
      setGames(games)
    })
  }, [])

  const handleOpenModal = (game) => {
    TableTopService.GetGameById(game.ID).then((gameDetails) => {
      setSelectedGame(gameDetails)
      document.getElementsByTagName('body')[0].style.overflow = 'hidden'
    })
  }

  const handleCloseModal = () => {
    setSelectedGame(null)
    document.getElementsByTagName('body')[0].style.overflow = 'visible'
  }

  const addGame = (game) => {
    setGames([game, ...games])
  }

  return (
    <div className="container" style={container}>
      <AddGameModal addGame={addGame} />
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
