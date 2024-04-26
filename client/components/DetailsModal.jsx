import React from 'react'
import PropTypes from 'prop-types'
import '../styles/DetailsModal.css'
import TableTopService from '../scripts/TableTopService'

function DetailsModal ({ game, closeModal, removeGame }) {
  const deleteGame = () => {
    TableTopService.DeleteGame(game._id).then((response) => {
      if (!response.error) {
        removeGame(game._id)
      }
    })
  }

  return (
    <div className="backdrop">
      <div
        className="modal fade show"
        id="gameModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        style={{ display: 'block' }}
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-body border-0">
              <div className="card">
                <div className="main">
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <img src={game.ImageURL} alt="Game" height="200px" />
                    <div className="rating">
                      <div className="ratingPart">{game.BGG_Rating}</div>
                      <div className="ratingPart">out of</div>
                      <div className="ratingPart">10</div>
                    </div>
                  </div>
                  <div className="title">
                    <h1>{game.Name}</h1>
                    <div className="description">{game.Description}</div>
                    <br />
                    <div>
                      Release Year:
                      {game.YearReleased}
                    </div>
                  </div>
                  <div>
                    <h2 className="credits">Credits</h2>
                    <div className="credits">
                      Designers:
                      {game.Designers}
                    </div>
                    <div className="credits">
                      Publishers:
                      {game.Publishers}
                    </div>
                    <div className="credits">
                      Artists:
                      {game.Artists}
                    </div>
                  </div>
                </div>
                <div className="content">
                  <div>
                    <h2>
                      {game.MinPlayers}
                      -
                      {game.MaxPlayers}
                      {' '}
                      Player
                    </h2>
                    <div>Possible Players</div>
                  </div>
                  <div>
                    <h2>
                      {game.MinPlayTime}
                      -
                      {game.MaxPlayTime}
                      {' '}
                      Min
                    </h2>
                    <div>Playing Time</div>
                  </div>
                  <div>
                    <h2>
                      {game.MinAge}
                      {' '}
                      Years
                    </h2>
                    <div>Minimum Age</div>
                  </div>
                  <div>
                    <h2>
                      {game.GameWeight}
                      /5 Weight
                    </h2>
                    <div>Complexity rating</div>
                  </div>
                </div>
                {/* <button
                  type="button"
                  style={{ width: 'fit-content', marginTop: '20px' }}
                >
                  DELETE
                </button> */}
              </div>
            </div>
            <div className="modal-footer border-0">
              <div
                className="d-flex justify-content-between"
                style={{ width: '100%' }}
              >
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={deleteGame}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

DetailsModal.propTypes = {
  game: PropTypes.shape({
    BGG_Rating: PropTypes.number,
    Designers: PropTypes.arrayOf(PropTypes.string),
    Artists: PropTypes.arrayOf(PropTypes.string),
    Description: PropTypes.string,
    GameWeight: PropTypes.number,
    ImageURL: PropTypes.string,
    MaxPlayTime: PropTypes.number,
    MinPlayers: PropTypes.number,
    MinAge: PropTypes.number,
    MinPlayTime: PropTypes.number,
    MaxPlayers: PropTypes.number,
    Name: PropTypes.string,
    Publishers: PropTypes.arrayOf(PropTypes.string),
    YearReleased: PropTypes.number,
    ID: PropTypes.number,
    _id: PropTypes.string
  }).isRequired,
  closeModal: PropTypes.func.isRequired,
  removeGame: PropTypes.func.isRequired
}

export default DetailsModal
