import React from 'react';
import PropTypes from 'prop-types';
import './Flag.css';

const Flag = ({ flagUrl }) => {
  return (
    <img src={flagUrl} alt="country flag" width="400px" className="flag"/>
  )
}

Flag.propTypes = {
  flag: PropTypes.string
}

export default Flag;