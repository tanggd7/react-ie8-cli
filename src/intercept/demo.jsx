/*
 * @Author: 汤国栋
 * @Date: 2019-04-08 14:19:05
 * @Last Modified by: 汤国栋
 * @Last Modified time: 2019-04-08 14:19:05
 * 
 * 例子拦截器
 */
import { Component, PropTypes } from 'react';

export default class Demo extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  render() {
    const { children } = this.props;
    return children;
  }
}
