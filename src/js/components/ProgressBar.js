import React, { PropTypes } from 'react';

const ProgressBar = ({ width }) => {
  return (
    <div className="bar">
      <div className="progress">
        <div className="progress-bar" style={{ width: `${width}%` }}></div>
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  width: PropTypes.number
};

export default ProgressBar;
