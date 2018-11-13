import React from 'react';
import PropTypes from 'prop-types';
import './ScoreBar.css'

const ScoreBar = ({ barWidth }) => {
  return <div className="score-bar-container">
            <div
              className="score-bar"
              style={{width: barWidth}} >
              <span className="score">
                {barWidth}
              </span>
            </div>
          </div>
}

ScoreBar.propTypes = {
  barWidth: PropTypes.string
}

export default ScoreBar;