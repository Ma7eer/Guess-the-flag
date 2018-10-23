import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import './App.css';

import Flag from '../Flag';
import Form from '../Form';

class Game extends Component {

  componentDidMount() {
    this.props.startNewGame();
  }

  render() {
    return (
      <React.Fragment>
        <Flag flag={this.props.flag} />
        <Form value={this.props.textInput}
              handleTextInputChange={this.props.handleChange}
              handleClick={this.props.handleClick} />
      </React.Fragment>
    );
  }
}

Game.propTypes = {
  startNewGame: PropTypes.func,
  flag: PropTypes.string
}

export default Game;
