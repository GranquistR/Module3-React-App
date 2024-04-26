import Express from 'express'
import GameController from '../../controller/gameController.js'

// Make an express router
const dataRouter = new Express.Router()
dataRouter.use(Express.json())

const gameController = new GameController()

// Respond with summarized game list
// - get methods, /game path, responds
dataRouter.get('/game', (req, res) => {
  gameController
    .GetAllGames()
    .then((data) => {
      res.status(200).json(
        data.map((game) => ({
          ID: game._id,
          Name: game.Name,
          ImageURL: game.ImageURL,
          BGG_Rating: game.BGG_Rating,
          Description: game.Description,
          YearReleased: game.YearReleased
        }))
      )
    })
    .catch((error) => {
      res.status(500).json({ error: true, message: error.message })
    })
})

// Respond with full game details
// - Get methods, /game/[id] path, responds
dataRouter.get('/game/:id', (req, res) => {
  // Search for the requested game
  const gameID = req.params.id

  gameController
    .GetFullGame(gameID)
    .then((data) => {
      console.log(data)
      res.status(200).json(data)
    })
    .catch((error) => {
      res.status(500).json({ error: true, message: error.message })
    })
})

// Responds with added game
// - Put methods, /game path, responds
dataRouter.put('/add', (req, res) => {
  const newGame = req.body
  // Validate the game object
  const missingFields = []
  const fields = [
    'ID',
    'Name',
    'Description',
    'Artists',
    'Designers',
    'Publishers',
    'ImageURL',
    'MaxPlayTime',
    'MinPlayTime',
    'MinAge',
    'YearReleased',
    'MaxPlayers',
    'MinPlayers',
    'BGG_Rating',
    'GameWeight'
  ]

  fields.forEach((field) => {
    try {
      if (!newGame[field]) {
        missingFields.push(field)
      }
    } catch (e) {
      missingFields.push(field)
    }
  })

  if (missingFields.length > 0) {
    res.status(400).json({
      error: true,
      message: 'Missing game fields',
      fields: missingFields
    })
    return
  }

  // Add the new game to the array
  gameController
    .AddGame(newGame)
    .then(() => {
      res.status(201).json({ error: false, id: req.body.ID })
    })
    .catch((error) => {
      res.status(500).json({ error: true, message: error.message })
    })
  // Respond with the newly added game
})

// Responds with request status
// - Delete methods, /game/[id] path, responds
dataRouter.delete('/delete/:id', (req, res) => {
  const gameID = req.params.id
  gameController
    .DeleteGame(gameID)
    .then(() => {
      res.status(200).json({ error: false, id: gameID })
    })
    .catch((error) => {
      res.status(500).json({ error: true, message: error.message })
    })
})

// Expose the dataRouter for importing
export default dataRouter
