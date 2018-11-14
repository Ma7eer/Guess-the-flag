import React from 'react';

const Result = ({ gameStatus, score, wrongScore }) => {
  return (
    <React.Fragment>
      {gameStatus === 'Done' && score === wrongScore ? <h1 style={{color: 'orange'}}>TIE!</h1> : gameStatus === 'Done' && score > 50 ? <h1 style={{color: '#4caf50'}}>YOU WIN!</h1> : gameStatus === 'Done' && wrongScore > 50 ? <h1 style={{color: '#d32f2f'}}>YOU LOSE!</h1> : null}
    </React.Fragment>
  )
}

export default Result;