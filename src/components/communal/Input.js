/**
 * @author 汤国栋 2018-04-27 16:04:37
 * @deprecated 输入框组件
 */
import React, { Component } from 'react';
import './style/input';

export default class Input extends Component {
  render() {
    const { className = '', ...otherProps } = this.props;
    return <input className={`jerry-input ${className}`} {...otherProps} />;
  }
}
