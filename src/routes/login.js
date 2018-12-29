import React from 'react';
import Bundle from 'react-router-bundle';

export default props => (
  <Bundle load={() => import('@containers/login/index')}>
    {(COM) => <COM {...props} title='登录' prefixCls='ss' />}
  </Bundle>
)
