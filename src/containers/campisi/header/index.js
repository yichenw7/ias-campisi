import React from 'react';
class ThreeEffect extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className={'campisi-header'}>
        <div className={'account flex-center-between'}>
          <div className={'account-left flex-center'}>
            <div className={'account-analysis ias-group-start'}>
              <label>分析账户：</label>
              <button>
                账户
              </button>
            </div>
            <div className={'account-lately ias-group-start'}>
              <label>分析账户：</label>
              <div>已建账户一</div>
              <div>已建账户二</div>
              <div>已建账户三</div>
              <div>已建账户四</div>
            </div>
          </div>

          <div className={'account-operate'}>
            <button>账户管理</button>
            <button>新建账户</button>
          </div>
        </div>

      </div>
    );
  }
}

export default ThreeEffect;
