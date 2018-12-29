import { user } from './urls';

export default [
  {
    key: 'user.login',
    method: 'post',
    url: () => `${user}login`,
  },
  {
    key: 'user.info',
    method: 'get',
    url: () => user,
  },
  {
    key: 'user.permission',
    method: 'get',
    url: () => `${user}permission`,
  }
];
