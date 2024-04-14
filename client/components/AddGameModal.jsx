/* eslint-disable react/jsx-child-element-spacing */
import React, { useState, useEffect, useRef } from 'react'

import { Modal } from 'bootstrap'

import TableTopService from '../scripts/TableTopService'

function AddGameModal ({ addGame }) {
  const modalRef = useRef()

  // Setup state for our BS Modal Obj
  const [modalObj, setModalObj] = useState(null)
  useEffect(() => {
    if (modalRef.current && modalObj === null) {
      setModalObj(new Modal(modalRef.current, { backdrop: 'static' }))
    }
  }, [modalObj])

  const openModal = () => {
    if (modalObj !== null) {
      modalObj.show()
    }
  }

  const closeModal = () => {
    if (modalObj !== null) {
      modalObj.hide()
    }
  }

  // input fields
  const [name, setName] = useState('Default Name')
  const [description, setDescription] = useState(
    'lorem ipsum dolor sit amet, consectetur adipiscing elit. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  )
  const [imageURL, setImageURL] = useState(
    'https://previews.123rf.com/images/fordzolo/fordzolo1506/fordzolo150600296/41026708-example-white-stamp-text-on-red-backgroud.jpg'
  )
  const [bggRating, setBggRating] = useState(1)
  const [gameWeight, setGameWeight] = useState(1)
  const [maxPlayTime, setMaxPlayTime] = useState(1)
  const [minPlayTime, setMinPlayTime] = useState(1)
  const [maxPlayers, setMaxPlayers] = useState(1)
  const [minPlayers, setMinPlayers] = useState(1)
  const [minAge, setMinAge] = useState(1)
  const [designers, setDesigners] = useState('Default Designers')
  const [artists, setArtists] = useState('Default Artists')
  const [publishers, setPublishers] = useState('Default Publishers')
  const [yearReleased, setYearReleased] = useState(1)

  function handleSubmit (e) {
    e.preventDefault()
    const formJson = {
      Name: name,
      Description: description,
      ImageURL: imageURL,
      BGG_Rating: bggRating,
      GameWeight: gameWeight,
      MaxPlayTime: maxPlayTime,
      MinPlayTime: minPlayTime,
      MaxPlayers: maxPlayers,
      MinPlayers: minPlayers,
      MinAge: minAge,
      Designers: designers,
      Artists: artists,
      Publishers: publishers,
      YearReleased: yearReleased
    }
    formJson.ID = Math.floor(Math.random() * 1000000)

    console.log(formJson)

    TableTopService.AddGame(formJson).then((response) => {
      if (response.error) {
        alert('Failed to add.')
      } else {
        closeModal()
        addGame(formJson)
      }
    })
  }

  return (
    <div>
      {/* Open Modal Button */}
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
        onClick={openModal}
      >
        Add New Game
      </button>
      {/* Modal */}
      <div
        ref={modalRef}
        className="modal fade"
        id="addModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl addModalDialog">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add Tabletop Game
              </h1>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
                color="white"
                onClick={closeModal}
              />
            </div>
            <div className="modal-body border-0">
              <div className="card">
                <div className="container">
                  <form
                    className="d-flex flex-column"
                    method="post"
                    onSubmit={handleSubmit}
                  >
                    <label>
                      Name (max 255 characters):
                      <br />
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        name="Name"
                      />
                    </label>

                    <label>
                      Description (max 65,000~ characters)
                      <br />
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        name="Description"
                        rows="3"
                      />
                    </label>

                    <label>
                      Image URL (max 1024 characters)
                      <br />
                      <input
                        value={imageURL}
                        onChange={(e) => setImageURL(e.target.value)}
                        name="ImageURL"
                      />
                    </label>

                    <label>
                      BGG Rating (0 to 10)
                      <br />
                      <input
                        value={bggRating}
                        onChange={(e) => setBggRating(e.target.value)}
                        name="BGG_Rating"
                        type="number"
                      />
                    </label>

                    <label>
                      Game Weight (0 to 5)
                      <br />
                      <input
                        value={gameWeight}
                        onChange={(e) => setGameWeight(e.target.value)}
                        name="GameWeight"
                      />
                    </label>

                    <label>
                      Max Play Time (positive integer)
                      <br />
                      <input
                        value={maxPlayTime}
                        onChange={(e) => setMaxPlayTime(e.target.value)}
                        name="MaxPlayTime"
                      />
                    </label>

                    <label>
                      Min Play Time (positive integer)
                      <br />
                      <input
                        value={minPlayTime}
                        onChange={(e) => setMinPlayTime(e.target.value)}
                        name="MinPlayTime"
                      />
                    </label>

                    <label>
                      Max Players (positive integer)
                      <br />
                      <input
                        value={maxPlayers}
                        onChange={(e) => setMaxPlayers(e.target.value)}
                        name="MaxPlayers"
                      />
                    </label>

                    <label>
                      Min Players (positive integer)
                      <br />
                      <input
                        value={minPlayers}
                        onChange={(e) => setMinPlayers(e.target.value)}
                        name="MinPlayers"
                      />
                    </label>

                    <label>
                      Min Age (positive integer)
                      <br />
                      <input
                        value={minAge}
                        onChange={(e) => setMinAge(e.target.value)}
                        name="MinAge"
                      />
                    </label>

                    <label>
                      Designers (max 65,000~ characters)
                      <br />
                      <input
                        value={designers}
                        onChange={(e) => setDesigners(e.target.value)}
                        name="Designers"
                      />
                    </label>

                    <label>
                      Artists (max 65,000~ characters)
                      <br />
                      <input
                        value={artists}
                        onChange={(e) => setArtists(e.target.value)}
                        name="Artists"
                      />
                    </label>

                    <label>
                      Publishers (max 65,000~ characters)
                      <br />
                      <input
                        value={publishers}
                        onChange={(e) => setPublishers(e.target.value)}
                        name="Publishers"
                      />
                    </label>

                    <label>
                      Year Released (positive integer)
                      <br />
                      <input
                        value={yearReleased}
                        onChange={(e) => setYearReleased(e.target.value)}
                        name="YearReleased"
                      />
                    </label>

                    <div>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ margin: '1rem' }}
                      >
                        Submit
                      </button>
                      <button
                        type="reset"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                        onClick={closeModal}
                        style={{ margin: '1rem' }}
                      >
                        Close
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="modal-footer border-0" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddGameModal
