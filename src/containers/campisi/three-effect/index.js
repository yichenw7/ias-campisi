import React from 'react';
import { Select , Table, Divider, Tag } from 'antd';
const { Column, ColumnGroup } = Table;
class ThreeEffect extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const bondColumns  = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="javascript:;">{text}</a>,
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
    }];
    const bondSource = [{
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    }, {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    }, {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    }];

    this.setState({
      bondColumns: bondColumns,
      bondSource: bondSource,
    })
  }

  render() {
    const {bondColumns, bondSource} = this.state;
    return (
      <div>
        <div className={'target-set flex-center-left card'}>
          <div style={{marginRight: '20px'}}>指标设置</div>
          <div style={{marginRight: '20px'}}>
            <label>无风险利率曲线：</label>
            <Select defaultValue="中债无风险利率曲线" style={{ width: 120 }} onChange={this.YieldCurveChange}>
              <Option value="--">--</Option>
              <Option value="中债无风险利率曲线">中债无风险利率曲线</Option>
              <Option value="--" disabled>--</Option>
              <Option value="--">--</Option>
            </Select>
          </div>

          <div style={{marginRight: '20px'}}>
            <label>估值方法（银行间）：</label>
            <Select defaultValue="中债行权" style={{ width: 120 }} onChange={this.YieldCurveChange}>
              <Option value="--">--</Option>
              <Option value="中债行权">中债行权</Option>
              <Option value="--">--</Option>
              <Option value="--">--</Option>
            </Select>
          </div>

          <div>
            <label>估值方法（交易所）：</label>
            <Select defaultValue="收盘价" style={{ width: 120 }} onChange={this.YieldCurveChange}>
              <Option value="--">--</Option>
              <Option value="收盘价">收盘价</Option>
              <Option value="--">--</Option>
              <Option value="--">--</Option>
            </Select>
          </div>
        </div>
        <div className={'result card'}>
          <h5>分析结果</h5>
          <div className={'result-top flex-center-left'}>
            <div className={'flex-center'}>
              <div className={'result-top-all'}>总收益</div>
              <div className={'result-top-list'}>
                <div className={'flex-center-between'}>
                  <span>收入效应</span>
                  <span>0.46%</span>
                </div>
                <div className={'flex-center-between'}>
                  <span>国债效应</span>
                  <span>0.46%</span>
                </div>
                <div className={'flex-center-between'}>
                  <span>利差效应</span>
                  <span>0.46%</span>
                </div>
              </div>


            </div>
            <div>

            </div>
          </div>
          <div>
            <Table columns={bondColumns} dataSource={bondSource} />

          </div>
        </div>
      </div>
    );
  }
}

export default ThreeEffect;
