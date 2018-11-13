import React from 'react';

const MultipleChoice = (props) => {
  return (
    <form onSubmit={props.handleButtonSubmit}>
    {props.quizChoices.map((choice, i) => {
      return props.answered ? <button onClick={props.handleButtonClick} type="submit" key={i} value={choice} disabled>{choice}</button> : <button onClick={props.handleButtonClick} type="submit" key={i} value={choice} >{choice}</button>
    })}
  </form>
  )
}

export default MultipleChoice;