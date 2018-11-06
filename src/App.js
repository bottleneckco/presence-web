import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AuthenticatedRoute from './components/AuthenticatedRoute';
import Header from './components/Header';
import Login from './components/Login';
import validateToken from './util/auth';
import { backendFetch } from './util/fetch';
import './stylesheets/styles.scss';
import Home from './components/Home';
import Groups from './components/Groups';
import Movement from './components/Movement';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };

    this.checkUser = this.checkUser.bind(this);
    this.checkUser();
  }

  async checkUser() {
    const accessToken = window.localStorage.getItem('access_token');
    try {
      await validateToken(accessToken);
      const resp = await backendFetch('/api/users/me')
        .then((r) => r.json());
      this.setState({ user: resp.data });
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const { user } = this.state;
    return (
      <BrowserRouter>
        <div>
          <header>
            <Header user={user} />
          </header>
          <main>
            <Switch>
              <Route exact path="/" render={(props) => <Login {...props} user={user} handleUserChange={this.checkUser} />} />
              <AuthenticatedRoute>
                <Route path="/home" render={(props) => <Home {...props} user={user} />} />
                <Route path="/movement" render={(props) => <Movement {...props} user={user} />} />
                <Route path="/groups" render={(props) => <Groups {...props} user={user} />} />
              </AuthenticatedRoute>
            </Switch>
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
