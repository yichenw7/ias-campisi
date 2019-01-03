import React from 'react';
import Bundle from 'react-router-bundle';

export default props => (
  <Bundle load={() => import('@containers/campisi/index')}>
    {(COM) => <COM {...props} title='Campisi' prefixCls='ss' />}
  </Bundle>
)
