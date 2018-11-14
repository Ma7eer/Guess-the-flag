import React from 'react';
import PropTypes from 'prop-types';
import './ScoreBar.css'

const ScoreBar = ({ barWidth, wrongScore }) => {
  return (
    <>
    {barWidth === '0%' && wrongScore === '0%' ?
    <div className="score-bar-container">
    <div
      className="score-bar"
      style={{width: barWidth}} >
    </div>
    <div
      className="score-bar-left"
      style={{width: wrongScore}} >
    </div>
  </div> : barWidth === '0%' ? 
  <div className="score-bar-container">
  <div
    className="score-bar"
    style={{width: barWidth}} >
  </div>
  <div
    className="score-bar-left"
    style={{width: wrongScore}} >
    <span className="score-left">
      {wrongScore}
    </span>
  </div> </div>: wrongScore === '0%'? 
  <div className="score-bar-container">
  <div
    className="score-bar"
    style={{width: barWidth}} >
    <span className="score">
      {barWidth}
    </span>
  </div>
  <div
    className="score-bar-left"
    style={{width: wrongScore}} >
  </div>
</div> :
  <div className="score-bar-container">
  <div
    className="score-bar"
    style={{width: barWidth}} >
    <span className="score">
      {barWidth}
    </span>
  </div>
  <div
    className="score-bar-left"
    style={{width: wrongScore}} >
    <span className="score-left">
      {wrongScore}
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