import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const PageHeader = ({ title, subtitle }) => (
  <div className="page_title">
    <h4 className="page_title__title">{title}</h4>
    <span className="page_title__subtitle">{subtitle}</span>
  </div>
);

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default PageHeader;
