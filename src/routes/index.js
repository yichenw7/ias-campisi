import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from '@containers/app';
import Piwik from '@utils/Piwik';
import login from './login';
import demo from './demo';
import campisi from './campisi';

export default (app) => {
  const piwik = app._store.getState().app.piwik;
  if (piwik) {
    window.piwik = new Piwik({ piwik, trackName: '债券深度详情' });
  }
  return (
    <Router history={app._history}>
      <Switch>
        <Route path='/login' exact component={login} />
        <Route path='/' component={props => (
          <App {...props}>
            <Route path='/demo' exact component={demo} />
            <Route path='/campisi' exact component={campisi}/>
          </App>
        )} />
      </Switch>
    </Router>
  );
}
