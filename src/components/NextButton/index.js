import React from 'react';
import PropTypes from 'prop-types';
import './Results.css';

const NextButton = ({ gameStatus, goToNextQuestion }) => {
  return (
    <React.Fragment>
    {
      gameStatus === 'next' ?
      <button className="btn-next" onClick={goToNextQuestion}>></button> : null
    }
    </React.Fragment>
  )
}

NextButton.propTypes = {
  isCorrect: PropTypes.string,
  goToNextQuestion: PropTypes.func
}

export default NextButton;