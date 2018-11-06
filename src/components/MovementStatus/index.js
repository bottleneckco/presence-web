import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './styles.scss';

class MovementStatus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNotesShown: false,
    };
  }

  render() {
    const { isNotesShown } = this.state;
    const { status } = this.props;
    return (
      <div className="movement__group__status" onClick={() => this.setState({ isNotesShown: !isNotesShown })}>
        <img className="movement__group__status__pic" src={status.user.picture} alt="" />
        <span className="movement__group__status__username">{status.user.name}</span>
        <span className="movement__group__status__text">{status.category} - {status.title}</span>
        <span className="movement__group__status__notes">{isNotesShown ? status.notes : null}</span>
        <span className="movement__group__status__since">{moment(status.start_time).fromNow()}</span>
      </div>
    );
  }
}

MovementStatus.propTypes = {
  status: PropTypes.shape({
    title: PropTypes.string,
    notes: PropTypes.string,
    category: PropTypes.string,
    user: PropTypes.shape({
      picture: PropTypes.string,
      name: PropTypes.string,
    }),
  }).isRequired,
};

export default MovementStatus;
