import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css'
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';

import App from './App'
import Notfound from './components/empty-state';
// import LoginComponent from './components/login-screen';

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        {/* <Route path="/admin" component={LoginComponent} /> */}
        <Route component={Notfound} />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'))
