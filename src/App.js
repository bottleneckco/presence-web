import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Login from './components/Login';
import './stylesheets/styles.scss';

const App = () => (
  <BrowserRouter>
    <div>
      <header>
        <Header />
      </header>
      <main>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/a" component={Header} />
        </Switch>
      </main>
    </div>
  </BrowserRouter>
);

export default App;
