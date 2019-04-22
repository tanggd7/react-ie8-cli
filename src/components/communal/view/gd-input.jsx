/*
 * @Author: 汤国栋
 * @Date: 2018-04-27 16:04:37
 * @Last Modified by: 汤国栋
 * @Last Modified time: 2019-04-16 21:05:04
 * 
 * 输入框
 */
import React, { PropTypes } from 'react';
import '../style/gd-input.less';

const GdInput = ({ className, ...otherProps }) => (
  <input className={`gd-input ${className}`} {...otherProps} />
);

GdInput.propTypes = {
  className: PropTypes.string,
};

GdInput.defaultProps = {
  className: '',
};

export default GdInput;
