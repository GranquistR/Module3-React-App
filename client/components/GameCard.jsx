import React from 'react'
import '../styles/card.css'

function GameCard (props) {
  return (
    <div className="col-sm-6 col-md-4 col-lg-3">
      <div
        className="Summary"
        onMouseOver="overCard(this)"
        onMouseOut="outCard(this)"
      >
        <h3 className="titleCutoff">NAME</h3>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Test.svg"
          alt="image of game"
          height="250px"
        />
        <br />
        <span className="summaryInfo">
          <div className="descCutoff">Description</div>
          YEAR , 9/10
        </span>
      </div>
    </div>
  )
}

export default GameCard
