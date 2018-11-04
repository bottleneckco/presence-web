import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './styles.scss';

const TYPES = [
  'Report Sick Outside',
  'Report Sick Inside',
  'MC',
  'Medical Appointment',
];

class MedicalStatusForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: TYPES[0],
      start_time: null,
      end_time: null,
      notes: null,
    };

    this.handleMATime = this.handleMATime.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleMATime(e) {
    const date = moment(e.target.value);
    const isPM = date.hour() >= 12;
    const startHour = isPM ? 12 : 8;
    const endHour = isPM ? 17 : 12;
    this.setState({
      start_time: moment().minute(0).hour(startHour).toDate(),
      end_time: moment().minute(0).hour(endHour).toDate(),
    });
  }

  submit() {
    const { submit } = this.props;
    const {
      type, start_time, end_time, notes,
    } = this.state;

    submit({
      title: `Medical - ${type}`, start_time: start_time || new Date(), end_time, notes,
    });
  }

  render() {
    const { type } = this.state;
    const isMC = type === TYPES[2];
    const isMA = type === TYPES[3];
    return (
      <div className="medical_status_form">
        <h5 className="medical_status_form__title">Medical</h5>
        <select className="medical_status_form__type" type="combo" onChange={(e) => this.setState({ type: e.target.value })}>
          {
            TYPES.map((t) => <option key={t}>{t}</option>)
          }
        </select>
        { isMC ? <span className="complicated_status_form__label">Start</span> : null}
        { isMC ? <input type="datetime-local" onChange={(e) => this.setState({ start_time: e.target.value })} required /> : null}
        { isMC ? <span className="complicated_status_form__label">End</span> : null}
        { isMC ? <input type="datetime-local" onChange={(e) => this.setState({ end_time: e.target.value })} required /> : null}
        { isMA ? <span className="complicated_status_form__label">Time</span> : null}
        { isMA ? (
          <input
            type="datetime-local"
            onChange={this.handleMATime}
            required
          />) : null}
        <textarea
          className="medical_status_form__notes"
          onChange={(e) => this.setState({ notes: e.target.value })}
          placeholder="Notes (e.g. Location, Diagnosis)"
        />
        <button onClick={this.submit} type="button">OK</button>
      </div>
    );
  }
}

MedicalStatusForm.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default MedicalStatusForm;
