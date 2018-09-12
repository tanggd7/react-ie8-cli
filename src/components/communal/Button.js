/**
 * @author 汤国栋 2018-04-27 16:04:18
 * @deprecated 按钮组件
 */
import React, { Component } from 'react';
import './style/button';

export default class Button extends Component {
  render() {
    const { type = '', className = '', ...otherProps } = this.props;
    return (
      <button
        className={`jerry-btn ${type && `jerry-btn-${type}`} ${className}`}
        {...otherProps}
      >
        {this.props.children}
      </button>
    );
  }
}
