import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Group = ({ group }) => (
  <div className="group">
    <span className="group__name">{group.name}</span>
    <span className="group__author">created by {group.author.email}</span>
    <span className="group__code">{group.code}</span>
  </div>
);

Group.propTypes = {
  group: PropTypes.shape({
    name: PropTypes.string,
    author: PropTypes.shape({
      email: PropTypes.string,
    }),
    code: PropTypes.string,
  }).isRequired,
};

export default Group;
