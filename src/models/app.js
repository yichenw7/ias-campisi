export default [
  {
    key: 'app.auth'
  },
  {
    key: 'app.webSocket',
    loading: (state, action) => {
      const payload = action.payload || {};
      const newState = {...state.webSocket || {}, ...payload};
      newState.ready = newState.connected && newState.login;
      if (newState.ready && !state.webSocket.ready) console.log('WebSocket is ready');
      return newState;
    }
  },
  {
    key: 'app.piwik'
  }
];
