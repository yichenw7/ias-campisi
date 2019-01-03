import UserCache from '@caches/UserCache';
import { message } from 'antd';

export const onEffect = async (action, res) => {
  try {
    const body = await res.json();
    action.status = res.status;
    action.loading = false;
    if (action.url.startsWith('/api/')) {
      action.message = body.message;
      action.success = res.status === 200 && body.code === '0000';
      action.result = body.data;
      return action;
    }
  } catch (err) {
    message.error(err.message);
    action.success = false;
    action.error = '服务端异常';
  }
  return action;
};

export const onFetchOption = (option, item) => {
  if (item.key !== 'user.login') {
    if (UserCache.user) {
      option.headers = option.headers || {};
      option.headers.Authorization = UserCache.user.access_token;
    }
  }
  return option;
};
