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
      start_time: moment().startOf('day').hour(8).minute(0)
        .toDate(),
      end_time: moment().startOf('day').hour(17).minute(30)
        .toDate(),
      notes: null,
    };

    this.submit = this.submit.bind(this);
  }

  submit() {
    const { status, submit } = this.props;
    const {
      title, start_time, end_time, notes,
    } = this.state;

    submit({
      title, category: status, start_time, end_time, notes,
    });
  }

  render() {
    const { status, titleLocked } = this.props;
    const { start_time, end_time } = this.state;
    return (
      <div className="complicated_status_form">
        <h5 className="complicated_status_form__title">{status}</h5>
        {titleLocked ? null : <span className="complicated_status_form__label">Title</span>}
        {titleLocked ? null : <input type="text" placeholder="Title" onChange={(e) => this.setState({ title: e.target.value })} required />}
        <span className="complicated_status_form__label">Start</span>
        <Datetime
          dateFormat="DD MMM YYYY [at]"
          defaultValue={start_time}
          onChange={(start_time) => this.setState({ start_time })}
        />
        <span className="complicated_status_form__label">End</span>
        <Datetime
          dateFormat="DD MMM YYYY [at]"
          defaultValue={end_time}
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
