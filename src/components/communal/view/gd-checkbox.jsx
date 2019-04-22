/*
 * @Author: 汤国栋
 * @Date: 2018-04-27 16:04:59
 * @Last Modified by: 汤国栋
 * @Last Modified time: 2019-04-16 21:05:30
 * 
 * 多选框
 */
import React from 'react';
import Checkbox from 'rc-checkbox';
import '../style/gd-checkbox.less';

const GdCheckbox = props => {
  const { children, ...other } = props;
  return (
    <label>
      <Checkbox {...other} /> {children}
    </label>
  );
};

export default GdCheckbox;
