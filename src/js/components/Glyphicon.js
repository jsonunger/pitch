import React, { PropTypes } from 'react';

const Glyphicon = ({ glyph }) => {
  return <i className={`fa fa-${glyph}`}></i>;
};

Glyphicon.propTypes = {
  glyph: PropTypes.string
};

export default Glyphicon;
