import React from 'react';
import './ScoreBar.css'

const ScoreBar = (props) => {
  return <div className="score-bar-container">
            <div className="score-bar" style={{width: props.barWidth}}>
              <span className="score">{props.barWidth}</span>
            </div>
          </div>
}

export default ScoreBar;