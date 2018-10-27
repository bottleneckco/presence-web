import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import validateFunc from '../../util/auth';

class AuthenticatedRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: null,
    };

    this.checkAuth = this.checkAuth.bind(this);
    this.checkAuth();
  }

  async checkAuth() {
    try {
      await validateFunc();
      this.setState({ auth: true });
    } catch (e) {
      console.error(e);
      this.setState({ auth: false });
    }
  }

  render() {
    const { auth } = this.state;
    const { children } = this.props;
    switch (auth) {
      case true:
        return children;
      case false:
        return <Redirect to="/" />;
      default: return null;
    }
  }
}

AuthenticatedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthenticatedRoute;
