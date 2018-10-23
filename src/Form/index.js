import React from 'react';
import PropTypes from 'prop-types';

const Form = ({ value, handleTextInputChange, handleClick }) => {
  return (
    <form>
      <input type="text" value={value} onChange={handleTextInputChange} required />
      <button type="submit" onClick={handleClick}>Submit</button>
    </form>
  )
}

Form.propTypes = {
  value: PropTypes.string,
  handleTextInputChange: PropTypes.func
}

export default Form;