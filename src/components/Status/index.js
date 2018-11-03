import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Status = ({ children, title, sinceTime, icon, handleClick }) => (
  <div className="status">
    <div className="status__icon" onClick={handleClick}>
      <img src={icon} alt="icon" />
    </div>
    <span className="status__title">{title}</span>
    <span className="status__since">{sinceTime}</span>
    {children}
  </div>
);

Status.defaultProps = {
  sinceTime: null,
  children: null,
};

Status.propTypes = {
  title: PropTypes.string.isRequired,
  sinceTime: PropTypes.oneOf(Date),
  icon: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Status;
