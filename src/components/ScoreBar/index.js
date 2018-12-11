import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './ScoreBar.css'

const ScoreBar = ({ correctScore, incorrectScore }) => {
  return (
    <Fragment>
    {correctScore === '0%' && incorrectScore === '0%' ?
    <div className="score-bar-container"></div> :
    correctScore === '0%' ?
    <div className="score-bar-container">
      <div
        className="score-bar-right"
        style={{width: correctScore}} >
      </div>
      <div
        className="score-bar-left"
        style={{width: incorrectScore}} >
          <span className="score-left">{incorrectScore}</span>
      </div>
    </div> : incorrectScore === '0%'?
    <div className="score-bar-container">
      <div
        className="score-bar-right"
        style={{width: correctScore}} >
        <span className="score-right">{correctScore}</span>
      </div>
    </div> :
  <div className="score-bar-container">
    <div
      className="score-bar-right"
      style={{width: correctScore}} >
      <span className="score-right">{correctScore}</span>
    </div>
    <div
      className="score-bar-left"
      style={{width: incorrectScore}} >
      <span className="score-left">{incorrectScore}</span>
    </div>
  </div>
}

  </Fragment>)
}

ScoreBar.propTypes = {
  barWidth: PropTypes.string
}

export default ScoreBar;