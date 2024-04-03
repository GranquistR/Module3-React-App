import React from 'react'
import PropTypes from 'prop-types'
import '../styles/GameCard.css'

function GameCard ({ game, openModal }) {
  return (
    <div className="col-sm-6 col-md-4 col-lg-3">
      <div className="Summary" onClick={openModal}>
        <h3 className="titleCutoff">{game.Name}</h3>
        <img src={game.ImageURL} alt="image of game" height="250px" />
        <br />
        <span className="summaryInfo">
          <div className="descCutoff">{game.Description}</div>
          {game.YearReleased}
          {' '}
          <br />
          {game.BGG_Rating}
          /10
        </span>
      </div>
    </div>
  )
}

GameCard.propTypes = {
  game: PropTypes.shape({
    Name: PropTypes.string,
    ImageURL: PropTypes.string,
    Description: PropTypes.string,
    YearReleased: PropTypes.number,
    BGG_Rating: PropTypes.number
  }).isRequired,
  openModal: PropTypes.func.isRequired
}
export default GameCard
