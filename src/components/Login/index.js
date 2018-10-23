import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';

import './styles.scss';
import Modal from '../Modal';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
    };

    this.handleGoogleSuccess = this.handleGoogleSuccess.bind(this);
    this.handleGoogleFailure = this.handleGoogleFailure.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  async handleGoogleSuccess({ profileObj, tokenObj }) {
    console.log(profileObj);
    console.log(tokenObj);
    const resp = await window.fetch(`${process.env.API_ROOT_URL}/login`, {
      method: 'POST',
      body: JSON.stringify({ profileObj, tokenObj }),
    });
    if (!resp.ok) {
      this.setState({ error: `Error logging in: HTTP ${resp.status}` });
    }
  }

  handleGoogleFailure({ error }) {
    this.setState({ error });
  }

  handleModalClose() {
    this.setState({ error: null });
  }

  render() {
    const { error } = this.state;
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
          autoLoad
        />
      </div>
    );
  }
}

export default Login;
