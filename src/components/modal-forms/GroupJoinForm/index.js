import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

class GroupJoinForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: null,
    };

    this.submit = this.submit.bind(this);
  }

  submit() {
    const { submit } = this.props;
    const { code } = this.state;
    submit({ code });
  }

  render() {
    return (
      <div className="group_join_form">
        <h5 className="group_join_form__title">Join Group</h5>
        <span className="group_join_form__subtitle">Enter the group&#39;s five-digit code.</span>
        <input className="group_join_form__input" type="text" placeholder="Group code" onChange={(e) => this.setState({ code: e.target.value })} />
        <button type="button" onClick={this.submit}>Join</button>
      </div>
    );
  }
}

GroupJoinForm.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default GroupJoinForm;
