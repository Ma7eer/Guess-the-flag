import React from 'react';
import PropTypes from 'prop-types';
import './Results.css';

const Results = ({ gameStatus, goToNextQuestion }) => {
  return (
    <React.Fragment>
    {
      gameStatus === 'onGoing' ?
        null : gameStatus === 'Next' ? <button className="btn-next" onClick={goToNextQuestion}>></button> : <h1 style={{color:'green'}}>You Win!</h1>
    }
    </React.Fragment>
  )
}

Results.propTypes = {
  isCorrect: PropTypes.string,
  goToNextQuestion: PropTypes.func
}

export default Results;