import React from 'react'

function Header () {
  return (
    <div style={header}>
      <h1>Board Game Browser</h1>
      Click on a card to see more info!
    </div>
  )
}

const header = {
  backgroundColor: '#1F1F1F',
  borderBottom: 'solid #2B2B2B 2px',
  padding: '1rem'
}

export default Header
