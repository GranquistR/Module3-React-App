import React, { useState } from 'react'
import { GameContext } from './GameContext.jsx'

export function GameProvider ({ children }) {
  const [selectedGame, setSelectedGame] = useState(null)

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <GameContext.Provider value={{ selectedGame, setSelectedGame }}>
      {children}
    </GameContext.Provider>
  )
}
