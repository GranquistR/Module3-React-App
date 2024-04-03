// Import react base in ALL jsx files
import React from 'react'

// import global styles
import './styles/main.css'

// Import our custom components
import Header from './components/Header.jsx'
import BoardGameBrowser from './components/BoardGameBrowser.jsx'

export default function App (props) {
  return (
    // Root bootstrap container
    <div>
      <Header />
      <BoardGameBrowser />
    </div>
  )
}
