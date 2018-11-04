import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Datetime from 'react-datetime';

import '../../../stylesheets/react-datetime.css';
import './styles.scss';

class ComplicatedStatusForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.titleLocked ? props.status : null,
      start_time: null,
      end_time: null,
      notes: null,
    };

    this.submit = this.submit.bind(this);
  }

  submit() {
    const { submit } = this.props;
    const {
      title, start_time, end_time, notes,
    } = this.state;

    submit({
      title, start_time, end_time, notes,
    });
  }

  render() {
    const { status, titleLocked } = this.props;
    return (
      <div className="complicated_status_form">
        <h5 className="complicated_status_form__title">{status}</h5>
        {titleLocked ? null : <span className="complicated_status_form__label">Title</span>}
        {titleLocked ? null : <input type="text" placeholder="Title" onChange={(e) => this.setState({ title: e.target.value })} required />}
        <span className="complicated_status_form__label">Start</span>
        <Datetime
          defaultValue={moment().hour(8).minute(0).toDate()}
          onChange={(start_time) => this.setState({ start_time })}
        />
        <span className="complicated_status_form__label">End</span>
        <Datetime
          defaultValue={moment().hour(17).minute(30).toDate()}
          onChange={(end_time) => this.setState({ end_time })}
        />
        <textarea
          className="complicated_status_form__notes"
          onChange={(e) => this.setState({ notes: e.target.value })}
          placeholder="Notes (e.g. Location, Purpose)"
        />
        <button onClick={this.submit} type="button">OK</button>
      </div>
    );
  }
}

ComplicatedStatusForm.defaultProps = {
  titleLocked: false,
};

ComplicatedStatusForm.propTypes = {
  status: PropTypes.string.isRequired,
  submit: PropTypes.func.isRequired,
  titleLocked: PropTypes.func,
};

export default ComplicatedStatusForm;
