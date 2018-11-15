import React from 'react';
import PropTypes from 'prop-types';
import './ScoreBar.css'

const ScoreBar = ({ correctScore, incorrectScore }) => {
  return (
    <>
    {correctScore === '0%' && incorrectScore === '0%' ?
    <div className="score-bar-container">
    <div
      className="score-bar"
      style={{width: correctScore}} >
    </div>
    <div
      className="score-bar-left"
      style={{width: incorrectScore}} >
    </div>
  </div> : correctScore === '0%' ? 
  <div className="score-bar-container">
  <div
    className="score-bar"
    style={{width: correctScore}} >
  </div>
  <div
    className="score-bar-left"
    style={{width: incorrectScore}} >
    <span className="score-left">
      {incorrectScore}
    </span>
  </div> </div>: incorrectScore === '0%'? 
  <div className="score-bar-container">
  <div
    className="score-bar"
    style={{width: correctScore}} >
    <span className="score">
      {correctScore}
    </span>
  </div>
  <div
    className="score-bar-left"
    style={{width: incorrectScore}} >
  </div>
</div> :
  <div className="score-bar-container">
  <div
    className="score-bar"
    style={{width: correctScore}} >
    <span className="score">
      {correctScore}
    </span>
  </div>
  <div
    className="score-bar-left"
    style={{width: incorrectScore}} >
    <span className="score-left">
      {incorrectScore}
    </span>
  </div>
</div>
}

  </>)
}

ScoreBar.propTypes = {
  barWidth: PropTypes.string
}

export default ScoreBar;