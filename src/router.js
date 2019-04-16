/*
 * @Author: 汤国栋
 * @Date: 2019-04-08 11:07:30
 * @Last Modified by: 汤国栋
 * @Last Modified time: 2019-04-09 20:03:22
 * 
 * 路由表
 */
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { constant } from 'tool';
import store from './store';
import * as pages from './pages';
// import { Demo } from './intercept';

const { PATH_PRE } = constant;

// 功能模块
const R = (path, component) => (
  <Route path={`${PATH_PRE}${path}`} getComponent={component} />
);

export default class AppRouter extends React.Component {
  createComponent = (Component, props) => (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );

  render() {
    return (
      <Router history={browserHistory} createElement={this.createComponent}>
        {/* <Route component={Demo}>{R('/login', pages.login)}</Route> */}
        {/* {R('/desktop', pages.desktop)} */}
        {/* {R('/', pages.login)} */}
        {/* {R('/*', pages.notfound)} */}
        {R('*', pages.notfound)}
      </Router>
    );
  }
}
