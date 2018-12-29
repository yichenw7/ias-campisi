import React from 'react';
import WebSocket from '@containers/websocket';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {children} = this.props;
    return (
      <div className='ss-app'>
        {children}
        <WebSocket />
      </div>
    );
  }
}

export default App;
