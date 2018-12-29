import React from 'react';
import { connect } from 'react-redux';
import UserCache from '@caches/UserCache';

class WebSocket extends React.Component {
  componentWillMount() {
    window.addEventListener('beforeunload', this.leave);
    this.startWorker();
  }


  shouldComponentUpdate() {
    return false;
  }

  leave = () => {
    if (this.worker) {
      this.worker.close();
    }
  };

  startWorker = () => {
    let token;
    if (UserCache.user && UserCache.user.gatewayToken && window.SharedWork) {
      token = UserCache.user.gatewayToken;
    } else {
      return;
    }
    const {host, path} = this.props.webSocket;
    const self = this;
    const option = {
      token: JSON.stringify({token}),
      query: function (data) {
        return JSON.parse(data);
      }
    };
    this.worker = new SharedWork(host + path, option);
    this.worker.on('connect', function (event) {
      console.log('connected', event);
    });
    this.worker.on('reconnect', function (event) {
      console.log('reconnect', event);
      window.location.reload();
    });
    this.worker.on('reconnecting', function (event) {
      console.log('reconnecting', event);
    });
    this.worker.on('close', event => {
      console.log('close', event);
    });
    this.worker.on('error', event => {
      console.log('error', event);
    });
    this.worker.on('message', event => {
      console.log(event);
    });
  };

  render() {
    return null;
  }
}

function mapStateToProps(state) {
  return {
    webSocket: state.app.webSocket,
  };
}

export default connect(mapStateToProps)(WebSocket);
