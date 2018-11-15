import React from 'react';
import PropTypes from 'prop-types';
import ImageLoader from 'react-loading-image'
import './Flag.css';

const Flag = ({ flagUrl }) => {
  return (
    <ImageLoader
      src={flagUrl}
      loading={() => <div className="loading">loading...</div>}
      error={() => <div>Error! press "New Game"</div>}
      className="flag"
    />
  )
}

Flag.propTypes = {
  flag: PropTypes.string
}

export default Flag;