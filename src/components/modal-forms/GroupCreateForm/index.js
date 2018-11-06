import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

class GroupCreateForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
    };

    this.submit = this.submit.bind(this);
  }

  submit() {
    const { submit } = this.props;
    const { name } = this.state;
    submit({ name });
  }

  render() {
    return (
      <div className="group_create_form">
        <h5 className="group_create_form__title">Create Group</h5>
        <input className="group_create_form__input" type="text" placeholder="Title" onChange={(e) => this.setState({ name: e.target.value })} />
        <button type="button" onClick={this.submit}>Create</button>
      </div>
    );
  }
}

GroupCreateForm.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default GroupCreateForm;
