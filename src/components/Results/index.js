import React from 'react';

const Results = (props) => {
  return (
    <div>
    {props.isCorrect === 'Correct!' ? <div>
    <button onClick={props.goToNextQuestion}>Next</button> <h1 style={{color:'green'}}>{props.isCorrect}</h1>
      </div> : props.isCorrect === 'Wrong!' ? <div> <button  onClick={props.goToNextQuestion}>Next</button> <h1 style={{color:'red'}}>{props.isCorrect}</h1> </div> : <div> <h1 style={{color:'green'}}>{props.isCorrect}</h1> </div> }
    </div>

  )
}

export default Results;