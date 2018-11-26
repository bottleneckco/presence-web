import React from 'react';
import { Link } from 'react-router-dom';
import userPropType from '../../prop-types/user';

import './styles.scss';

const Header = ({ user }) => (
  <div className="header">
    <h1 className="header__title">Presence</h1>
    {
      user != null ? [
        <Link key="home" to="/home">Home</Link>,
        <Link key="movement" to="/movement">Movement</Link>,
        <Link key="facilities" to="/facilities">Facilities</Link>,
        <Link key="groups" to="/groups">Groups</Link>,
      ] : null
    }
    {
      user != null ? <img className="header__user_art" src={user.picture} alt="profile" /> : null
    }
  </div>
);

Header.defaultProps = {
  user: null,
};

Header.propTypes = {
  user: userPropType,
};

export default Header;
