import Express from 'express'

import fs from 'fs'

// Read in the game data and parse the JSON
const myRawData = fs.readFileSync('./server/data/allTheGames.json', {
  encoding: 'utf8'
})
const gameData = JSON.parse(myRawData)

// Create a list of all full games
const allFullGames = gameData.map((game) => ({
  ID: game.ID,
  Name: game.Name,
  Description: game.Description,
  Artists: game.Artists,
  Designers: game.Designers,
  Publishers: game.Publishers,
  ImageURL: game.ImageURL,
  MaxPlayTime: game.MaxPlayTime,
  MinPlayTime: game.MinPlayTime,
  MinAge: game.MinAge,
  YearReleased: game.YearReleased,
  MaxPlayers: game.MaxPlayers,
  MinPlayers: game.MinPlayers,
  BGG_Rating: game.BGG_Rating,
  GameWeight: game.GameWeight
}))

// Make an express router
const dataRouter = new Express.Router()
dataRouter.use(Express.json())

// Respond with summarized game list
// - get methods, /game path, responds
dataRouter.get('/game', (req, res) => {
  res.status(200).json(
    allFullGames.map((game) => ({
      ID: game.ID,
      Name: game.Name,
      ImageURL: game.ImageURL,
      BGG_Rating: game.BGG_Rating,
      Description: game.Description,
      YearReleased: game.YearReleased
    }))
  )
})

// Respond with full game details
// - Get methods, /game/[id] path, responds
dataRouter.get('/game/:id', (req, res) => {
  // Search for the requested game
  const gameID = Number(req.params.id)
  const game = allFullGames.find((game) => game.ID === gameID)
  // If found, return the game, otherwise, return a 404
  if (!game) {
    res.status(404).json({ error: true, message: 'game not found' })
  } else {
    res.json(game)
  }
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

  // Check if a game with the same ID already exists
  const existingGame = allFullGames.find((game) => game.ID === newGame.ID)
  if (existingGame) {
    res.status(400).json({ error: true, message: 'Game ID already in use' })
    return
  }

  // Add the new game to the array
  allFullGames.unshift(newGame)
  // Respond with the newly added game
  res.status(201).json({ error: false, id: req.body.ID })
})

// Responds with request status
// - Delete methods, /game/[id] path, responds
dataRouter.delete('/delete/:id', (req, res) => {
  const gameID = req.params.id
  const gameIndex = allFullGames.findIndex((game) => game.ID === gameID)
  if (gameIndex === -1) {
    res.status(404).json({ error: true, message: 'Game not found' })
  } else {
    allFullGames.splice(gameIndex, 1)
    res.status(200).json({ error: false, id: gameID })
  }
})

// Expose the dataRouter for importing
export default dataRouter
