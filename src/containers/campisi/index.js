import React from 'react';
import './index.less';
import {Tabs} from 'antd';
import Header from './header';
import ThreeEffect from './three-effect'
import campisi from "../../routes/campisi";
import BarTabs from '../../components/tabs/tabs';

const TabPane = Tabs.TabPane;

class Campisi extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      type: 'top',
    };
  }

  componentWillMount() {
    this.setState({
      activeKey: 'threeEffect',
    })
  }

  onTab = (item) => {
    const activeKey = item.value;
    this.setState({activeKey});
  }

  setOptions = () => {
    let options = [
      {
        value: 'threeEffect',
        label: '三效应归因分析',
      },
      {
        value: 'fiveEffect',
        label: '五效应归因分析',
      },
      {
        value: 'sixEffect',
        label: '六效应归因分析',
      },
      {
        value: 'contrast',
        label: '对比',
      }];
    return options;
  }

  render() {
    const {type} = this.state;
    return (
      <div className={'campisi'}>
        <Header></Header>
        <div className={'campisi-type'}>
          <BarTabs
            className='chart-tabs'
            items={this.setOptions()}
            activeKey={this.state.activeKey}
            onChange={this.onTab}
          />
          <div className={'campisi-content'}>
            <ThreeEffect></ThreeEffect>
          </div>
        </div>
      </div>
    );
  }
}

export default Campisi;
