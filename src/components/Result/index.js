import React from 'react';

const Result = ({ gameStatus, correctScore, incorrectScore }) => {
  return (
    <React.Fragment>
      {gameStatus === 'Done' && correctScore === incorrectScore ? <h1 style={{color: 'orange'}}>TIE!</h1> : gameStatus === 'Done' && correctScore > 50 && incorrectScore < 50 ? <h1 style={{color: '#4caf50'}}>YOU WIN!</h1> : gameStatus === 'Done' && incorrectScore > 50 ? <h1 style={{color: '#d32f2f'}}>YOU LOSE!</h1> : null}
    </React.Fragment>
  )
}

export default Result;