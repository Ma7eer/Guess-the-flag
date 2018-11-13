import React from 'react';
import PropTypes from 'prop-types';
import './MultipleChoice.css';

const MultipleChoice = ({ handleButtonSubmit, handleButtonClick, quizChoices, answered }) => {
  return (
    <form
      onSubmit={handleButtonSubmit}
      className="btn-container" >
    { quizChoices.map((choice, i) => {
      return answered ?
      <button
        className="btn"
        onClick={handleButtonClick}                  type="submit"
        key={i}
        value={choice}
        disabled >{choice}</button> :
      <button
       className="btn"
       onClick={handleButtonClick}
       type="submit"
       key={i}
       value={choice} >{choice}</button>
    }
    ) }
  </form>
  )
}

MultipleChoice.propTypes = {
  handleButtonSubmit: PropTypes.func,
  handleButtonClick: PropTypes.func,
  quizChoices: PropTypes.array,
  answered: PropTypes.bool
}

export default MultipleChoice;