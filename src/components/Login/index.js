import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GoogleLogin } from 'react-google-login';
import { Redirect } from 'react-router-dom';

import './styles.scss';
import Modal from '../Modal';
import validateToken from '../../util/auth';
import userPropType from '../../prop-types/user';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
    };

    this.handleGoogleSuccess = this.handleGoogleSuccess.bind(this);
    this.handleGoogleFailure = this.handleGoogleFailure.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.checkAlreadyAuthenticated = this.checkAlreadyAuthenticated.bind(this);
    this.checkAlreadyAuthenticated();
  }

  async checkAlreadyAuthenticated() {
    const { handleUserChange } = this.props;
    try {
      const accessToken = window.localStorage.getItem('access_token');
      await validateToken(accessToken);
      handleUserChange();
    } catch (e) {
      console.error(e);
      const refreshToken = window.localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          await validateToken(refreshToken);
          // Exchange refresh token for new tokens
          const resp = await window.fetch(`${process.env.BACKEND_ROOT_URL}/oauth/token`, {
            method: 'POST',
            body: JSON.stringify({
              grant_type: 'refresh_token',
              refresh_token: refreshToken,
            }),
          });
          const { access_token, refresh_token } = await resp.json();
          window.localStorage.setItem('access_token', access_token);
          window.localStorage.setItem('refresh_token', refresh_token);
          this.checkAlreadyAuthenticated();
        } catch (ee) {
          console.error(ee);
        }
      }
    }
  }

  async handleGoogleSuccess({ tokenObj }) {
    const resp = await window.fetch(`${process.env.BACKEND_ROOT_URL}/oauth/token`, {
      method: 'POST',
      body: JSON.stringify({
        grant_type: 'password',
        google_id_token: tokenObj.id_token,
      }),
    });
    const { access_token, refresh_token } = await resp.json();
    window.localStorage.setItem('access_token', access_token);
    window.localStorage.setItem('refresh_token', refresh_token);
    if (!resp.ok) {
      this.setState({ error: `Error logging in: HTTP ${resp.status}` });
    }
    this.checkAlreadyAuthenticated();
  }

  handleGoogleFailure({ error }) {
    this.setState({ error });
  }

  handleModalClose() {
    this.setState({ error: null });
  }

  render() {
    const { error } = this.state;
    const { user } = this.props;
    if (user !== null) {
      return <Redirect to="/home" />;
    }
    return (
      <div className="login">
        <Modal show={error !== null} onClose={this.handleModalClose}>
          <span>{error}</span>
        </Modal>
        <h1 className="login__title">Login</h1>
        <GoogleLogin
          clientId={process.env.GOOGLE_CLIENT_ID}
          onSuccess={this.handleGoogleSuccess}
          onFailure={this.handleGoogleFailure}
        />
      </div>
    );
  }
}

Login.defaultProps = {
  user: null,
};

Login.propTypes = {
  user: userPropType,
  handleUserChange: PropTypes.func.isRequired,
};

export default Login;
