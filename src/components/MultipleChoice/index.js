import React from 'react';
import PropTypes from 'prop-types';
import './MultipleChoice.css';

const MultipleChoice = ({ handleButtonSubmit, handleButtonClick, quizChoices, answered, correctAnswer }) => {
  return (
    <form
      onSubmit={handleButtonSubmit}
      className="btn-container" >
    { quizChoices.map((choice, i) => {
      return answered ?
      <div key={i}>
        {choice === correctAnswer ?
        <button
        className="btn btn-correct"
        onClick={handleButtonClick}
        type="submit"
        key={i}
        value={choice}
        disabled ><i className="fas fa-check-circle"></i> {choice}</button> :
        <button
        className="btn btn-wrong"
        onClick={handleButtonClick}
        type="submit"
        key={i}
        value={choice}
        disabled ><i className="fas fa-times-circle"></i> {choice}</button>}
      </div>
       :
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