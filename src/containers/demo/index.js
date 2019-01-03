import React from 'react';
import AutoCheck from '@containers/autocheck';
import './style.less';

// @AutoCheck
class Demo extends React.PureComponent {
  render() {
    const {prefixCls} = this.props;
    return (
      <div className={`${prefixCls}-demo`}>
        <p>Sumscope Web App</p>
      </div>
    );
  }
}

export default Demo;
