import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

class SimpleStatusForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: null,
    };

    this.submit = this.submit.bind(this);
  }

  submit() {
    const { status, submit } = this.props;
    const { notes } = this.state;

    submit({ title: status, category: status, notes });
  }

  render() {
    const { status } = this.props;
    return (
      <div className="simple_form">
        <h5 className="simple_form__title">{status}</h5>
        <textarea className="simple_form__notes" onChange={(e) => this.setState({ notes: e.target.value })} placeholder="Notes (e.g. Classroom, Course Name)" />
        <button onClick={this.submit} type="button">OK</button>
      </div>
    );
  }
}

SimpleStatusForm.propTypes = {
  status: PropTypes.string.isRequired,
  submit: PropTypes.func.isRequired,
};

export default SimpleStatusForm;
