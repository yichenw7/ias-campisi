import './themes';
import React from 'react';
import { App, QBService } from 'ss-web-start';
import createHistory from 'history/createBrowserHistory';
import Action from '@actions';
import routes from '@routes';
import models from '@models';
import { onEffect, onFetchOption } from '@utils/reduxUtils';

new QBService();
const app = new App({
  onEffect,
  onFetchOption,
  history: createHistory(),
});
app.models(models);
app.router((a) => {
  return routes(a);
});
app.start('#app');
new Action({dispatch: app._store.dispatch, history: app._history});
