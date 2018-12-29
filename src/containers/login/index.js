import './login.less';
import React from 'react';
import { Button, Icon, Input, message } from 'antd';
import { connect } from 'react-redux';
import UserCache from '@caches/UserCache';
import md5 from 'blueimp-md5';
import { QBService } from 'ss-web-start';
import Loading from '@components/loading';
import receive from '@utils/receive';

class Login extends React.PureComponent {
  state = {
    username: '',
    password: '',
  };

  constructor(props) {
    super(props);
    if (props.title) {
      window.document.title = props.title;
    }
  }

  componentWillMount() {
    if (QBService.inQb()) {
      QBService.getUser(UserCache.login);
    }
  }

  componentWillReceiveProps(nextProps) {
    receive.call(this, 'login', nextProps)
      .success((result) => {
        const {history, location} = nextProps;
        UserCache.user = result;
        if (location && location.state) {
          history.push(location.state);
        } else {
          history.push('/');
        }
      })
      .error(err => (!err && message(err)));
  }

  handleSubmit = () => {
    const {username, password} = this.state;
    if (!username || username === '') {
      message.info('请输入用户名');
      return;
    }
    if (!password || password === '') {
      message.info('请输入密码');
      return;
    }
    UserCache.login({username, password: md5(password)});
  };
  handleChange = (key, value) => {
    this.setState({[key]: value});
  };

  render() {
    const {prefixCls} = this.props;
    if (QBService.inQb()) {
      return (
        <Loading />
      );
    }
    return (
      <div className={`${prefixCls}-login`}>
        <div className={`${prefixCls}-login-container`}>
          <Input prefix={<Icon type='user' />}
                 placeholder='Username'
                 onChange={e => this.handleChange('username', e.target.value)}
                 onPressEnter={this.handleSubmit}
          />
          <Input prefix={<Icon type='lock' />}
                 type='password'
                 placeholder='Password'
                 onChange={e => this.handleChange('password', e.target.value)}
                 onPressEnter={this.handleSubmit}
          />
          <Button type='primary'
                  htmlType='submit'
                  onClick={this.handleSubmit}
          >登录</Button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    login: state.user.login,
  };
}

export default connect(mapStateToProps)(Login);

