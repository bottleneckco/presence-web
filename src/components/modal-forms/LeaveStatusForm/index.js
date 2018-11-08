import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Datetime from 'react-datetime';

import '../../../stylesheets/react-datetime.css';
import './styles.scss';

const LEAVE_TYPES = [
  'Local Leave',
  'Overseas Leave',
];

class LeaveStatusForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Local Leave',
      start_time: moment().startOf('day').hour(8).minute(0)
        .toDate(),
      end_time: moment().startOf('day').hour(17).minute(30)
        .toDate(),
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
      title, category: 'Leave', start_time, end_time, notes,
    });
  }

  render() {
    const { title, start_time, end_time } = this.state;
    return (
      <div className="leave_status_form">
        <h5 className="leave_status_form__title">Leave</h5>
        <select className="leave_status_form__selector" onChange={(e) => this.setState({ title: e.target.value })}>
          { LEAVE_TYPES.map((lt) => <option>{lt}</option>)}
        </select>
        <span className="leave_status_form__label">Start</span>
        <Datetime
          dateFormat="DD MMM YYYY"
          timeFormat={false}
          defaultValue={start_time}
          onChange={(start_time) => this.setState({ start_time })}
        />
        <span className="leave_status_form__label">End</span>
        <Datetime
          dateFormat="DD MMM YYYY"
          timeFormat={false}
          defaultValue={end_time}
          onChange={(end_time) => this.setState({ end_time })}
        />
        <textarea
          className="leave_status_form__notes"
          onChange={(e) => this.setState({ notes: e.target.value })}
          placeholder="Notes (e.g. Location, Purpose)"
        />
        <button onClick={this.submit} type="button">OK</button>
      </div>
    );
  }
}

LeaveStatusForm.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default LeaveStatusForm;
