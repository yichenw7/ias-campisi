import React from 'react';
import { connect } from 'react-redux';
import hoistStatics from 'hoist-non-react-statics';
import Loading from '@components/loading';
import receive from '@utils/receive';
import Action from '@actions';
import UserCache from '@caches/UserCache';
import { message } from 'antd';
import isEmpty from 'lodash/isEmpty';

export default function (Node) {
  class AutoCheck extends React.Component {
    state = {
      checking: true,
      loadPermission: true,
    };

    componentWillMount() {
      const { title } = this.props;
      if (title) {
        window.document.title = title;
      }
      const state = {};
      if (UserCache.user) {
        state.checking = false;
      } else {
        Action.emit('user.info');
      }
      if (UserCache.permission) {
        state.loadPermission = false;
      } else {
        Action.emit('user.permission');
      }
      if (!isEmpty(state)) {
        this.setState(state);
      }
    }

    componentWillReceiveProps(nextProps) {
      const keys = [
        ['user', 'checking'],
        ['permission', 'loadPermission'],
      ];
      this.receive(keys, nextProps);
    }

    receive = (keys, nextProps) => {
      keys.forEach(([k, s]) => {
        receive.call(this, k, nextProps)
          .success((result) => {
            UserCache[k] = result;
            if (k === 'permission') {
              this.UserService.AuthInfo = result;
            }
            this.setState({ [s]: false });
          }).error(this.error);
      });
    };

    error = (err) => {
      if (!err) {
        message.error(err);
      }
    };

    render() {
      const { checking, loadPermission } = this.state;
      if (checking || loadPermission) {
        return (<Loading />);
      }
      return (<Node {...this.props} />);
    }
  }

  function mapStateToProps(state) {
    return {
      user: state.user.info,
      permission: state.user.permission,
      logon: state.ws.logon,
    };
  }

  const Component = connect(mapStateToProps)(AutoCheck);
  return hoistStatics(Component, Node);
}
