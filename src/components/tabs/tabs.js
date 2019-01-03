/**
 * Copyright @2016-present, Sumscope, Inc.
 * All rights reserved.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import '../../themes/tabs.less';
import {Link} from 'react-router-dom'

class Tabs extends Component {
  static propTypes = {
    className: PropTypes.string,
    items: PropTypes.array,
    activeKey: PropTypes.string,
    onChange: PropTypes.func,
    linkedRoute: PropTypes.bool,
    prefix: PropTypes.string,
    sync: PropTypes.object
  };

  static defaultProps = {
    items: [],
    linkedRoute: false
  };
  constructor(props) {
    super(props);
    this.state = {
      activeKey: props.activeKey
    };
  }

  componentWillReceiveProps(nextProps) {
    const {activeKey} = nextProps;
    if (activeKey !== this.props.activeKey) {
      this.setState({activeKey});
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {sync, items} = nextProps;
    const {activeKey} = nextState;
    return activeKey !== this.state.activeKey || sync !== this.props.sync || items !== this.props.items;
  }

  isInvalid = () => {
    const {items} = this.props;
    return items.length === 0;
  };

  handleChange = (item) => {
    const {onChange} = this.props;
    if (onChange) onChange(item);
  };

  render() {
    if (this.isInvalid()) return '';

    const {className, items, linkedRoute, prefix} = this.props;
    const {activeKey} = this.state;
    const liz = [];
    items.forEach(item => {
      const {value, label} = item;
      const props = {
        className: 'tab-item'
      };

      if (value === activeKey) {
        props.className += ` active ${value}`;
      } else {
        if (!linkedRoute) props.onClick = this.handleChange.bind(this, item);
      }

      liz.push(
        <li key={value}>
          {linkedRoute
            ? <Link to={{pathname: `/${prefix}/${value}`}} {...props}>{label}</Link>
            : <span {...props}>{label}</span>}
        </li>
      );
    });

    return <ul className={'tab-wrapper' + ' ' + className}>{liz}</ul>;
  }
}

export default Tabs;
