import { user } from './urls';

export default [
  {
    key: 'user.login',
    method: 'post',
    url: () => `${user}login`,
    resultKey: 'data',
  },
  {
    key: 'user.logout',
    method: 'post',
    url: () => `${user}logout`,
    resultKey: 'data',
  },
];
