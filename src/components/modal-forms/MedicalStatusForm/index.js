import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Datetime from 'react-datetime';

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
      mcStartTime: moment().startOf('day').toDate(),
      mcEndTime: moment().endOf('day').toDate(),
      maStartTime: moment().startOf('day').hour(10).minute(0)
        .toDate(),
      notes: null,
    };
    this.submit = this.submit.bind(this);
  }

  submit() {
    const { submit } = this.props;
    const {
      type, mcStartTime, mcEndTime, maStartTime, notes,
    } = this.state;

    let start_time;
    let end_time;

    switch (TYPES.indexOf(type)) {
      case 0:
      case 1:
        start_time = new Date();
        break;
      case 2:
        start_time = mcStartTime;
        end_time = mcEndTime;
        break;
      case 3: {
        const date = moment(maStartTime);
        const isPM = date.hour() >= 12;
        const startHour = isPM ? 12 : 8;
        const endHour = isPM ? 17 : 12;
        start_time = moment().startOf('day').minute(0).hour(startHour)
          .toDate();
        end_time = moment().startOf('day').minute(0).hour(endHour)
          .toDate();
        break;
      }
      default: break;
    }

    submit({
      title: 'Medical', category: type, start_time, end_time, notes,
    });
  }

  render() {
    const {
      type, mcStartTime, mcEndTime, maStartTime,
    } = this.state;
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
        { isMC ? (
          <Datetime
            dateFormat="DD MMM YYYY"
            timeFormat={false}
            defaultValue={mcStartTime}
            onChange={(v) => this.setState({ mcStartTime: v })}
          />
        ) : null}
        { isMC ? <span className="complicated_status_form__label">End</span> : null}
        { isMC ? (
          <Datetime
            dateFormat="DD MMM YYYY"
            timeFormat={false}
            defaultValue={mcEndTime}
            onChange={(v) => this.setState({ mcEndTime: v })}
          />
        ) : null}
        { isMA ? <span className="complicated_status_form__label">Time</span> : null}
        { isMA ? (
          <Datetime
            defaultValue={maStartTime}
            dateFormat="DD MMM YYYY [at]"
            onChange={(v) => this.setState({ maStartTime: v })}
          />
        ) : null}
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
