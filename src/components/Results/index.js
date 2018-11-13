import React from 'react';
import PropTypes from 'prop-types';
import './Results.css';

const Results = ({ isCorrect, goToNextQuestion }) => {
  return (
    <div>
    {isCorrect === 'Correct!' ? <div>
    <button onClick={goToNextQuestion}>Next</button> <h1 style={{color:'green'}}>{isCorrect}</h1>
      </div> : isCorrect === 'Wrong!' ? <div> <button  onClick={goToNextQuestion}>Next</button> <h1 style={{color:'red'}}>{isCorrect}</h1> </div> : <div> <h1 style={{color:'green'}}>{isCorrect}</h1> </div> }
    </div>

  )
}

Results.propTypes = {
  isCorrect: PropTypes.string,
  goToNextQuestion: PropTypes.func
}

export default Results;