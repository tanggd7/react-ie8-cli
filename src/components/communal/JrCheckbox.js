/**
 * @author 汤国栋 2018-04-27 16:04:59
 * @deprecated 多选框组件
 */
import React, { Component } from 'react';
import Checkbox from 'rc-checkbox';
import './style/checkbox';

export default class JrCheckbox extends Component {
  render() {
    return <Checkbox {...this.props} />;
  }
}
