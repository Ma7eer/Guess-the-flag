import React from 'react';
import PropTypes from 'prop-types'
import sizeMe from 'react-sizeme'
import Confetti from 'react-confetti'
 
const DimensionedExample = sizeMe({
  monitorHeight: true,
  monitorWidth: true,
})(class Example extends React.PureComponent {
  static propTypes = {
    size: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
    }),
  }
  render() {
    return (
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <Confetti {...this.props.size} />
      </div>
    )
  }
})

const Result = ({ gameStatus, correctScore, incorrectScore }) => {
  return (
    <React.Fragment>
      {gameStatus === 'Done' && correctScore === incorrectScore ? <h1 style={{color: 'orange'}}>TIE!</h1> : gameStatus === 'Done' && correctScore > 50 && incorrectScore < 50 ? <><DimensionedExample /><h1 style={{color: '#4caf50'}}>YOU WIN!</h1></> : gameStatus === 'Done' && incorrectScore > 50 && correctScore < 50? <h1 style={{color: '#d32f2f'}}>YOU LOSE!</h1> : null}
    </React.Fragment>
  )
}

export default Result;