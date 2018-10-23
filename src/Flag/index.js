import React from 'react';
import './Flag.css';

const Flag = ({ flag }) => {
  return (
    <img src={flag} alt="country flag" width="400px" className="flag"/>
  )
}

export default Flag;