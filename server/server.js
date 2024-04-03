// Express as our HTTP server
import Express from 'express'

// Bring in the router for our Game API
import gameRouter from './api/game.js'

// Make an express application
const app = new Express()

// Log all requests: logging route
// - All methods, all paths, no response (fall through)
app.use((req, res, next) => {
  console.log(`${req.method} request at ${req.path}`)
  next()
})

// Attach the game routes
app.use('/api', gameRouter)

// Static file server
app.use(Express.static('public'))

// Start server listening on port 8000
app.listen(8000, () => {
  console.log('Listening on port 8000')
})
