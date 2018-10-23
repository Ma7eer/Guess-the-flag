import React from 'react';
import PropTypes from 'prop-types';
import './Navbar.css';

const Navbar = ({ startNewGame }) => {
  return (
    <header className="nav">
      <h2>Guess The Flag</h2>
      <button className="my-btn" onClick={startNewGame}>New Game</button>
    </header>
  )
}

Navbar.propTypes = {
  startNewGame: PropTypes.func
}

export default Navbar;