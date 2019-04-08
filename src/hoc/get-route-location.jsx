/*
 * @Author: 汤国栋
 * @Date: 2019-04-08 14:13:25
 * @Last Modified by: 汤国栋
 * @Last Modified time: 2019-04-08 14:15:31
 * 
 * 获取跳转携带的参数
 * IE 版本低于 IE9 时，因为浏览器不支持 html5 的 history ，所以只能自行通过 sessionStorage 来传递参数。
 * 如果组件需要接受通过 history 跳转携带的参数，需要采用该组件。
 */
import React, { Component, PropTypes } from 'react';
import { IEVersion } from 'tool';

const WrapComponent = ChildComponent =>
  class GetRouteLocation extends Component {
    static propTypes = {
      location: PropTypes.object.isRequired,
    };

    componentWillMount() {
      const ieVersion = IEVersion();
      if ([6, 7, 8, 9].includes(ieVersion)) {
        const { location } = this.props;
        const state = JSON.parse(sessionStorage.getItem('@History'));
        location.state = state;
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  };

export default WrapComponent;
