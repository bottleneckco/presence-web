import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';
import validateToken from '../../util/auth';
import fetch from '../../util/fetch';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
    this.checkUser();
  }

  async checkUser() {
    const accessToken = window.localStorage.getItem('access_token');
    try {
      await validateToken(accessToken);
      const resp = await fetch(`${process.env.BACKEND_ROOT_URL}/api/users/me`)
        .then((r) => r.json());
      this.setState({ user: resp.data });
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const { user } = this.state;
    return (
      <div className="header">
        <h1 className="header__title">Statuses</h1>
        {
          user != null ? [
            <Link to="/home">Home</Link>,
            <Link to="/movement">Movement</Link>,
            <Link to="/facilities">Facilities</Link>,
            <Link to="/groups">Groups</Link>,
          ] : null
        }
        {
          user != null ? <img className="header__user_art" src={user.picture} alt="profile" /> : null
        }
      </div>
    );
  }
}

export default Header;
