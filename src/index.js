/*
 * @Author: 汤国栋
 * @Date: 2019-04-08 11:06:03
 * @Last Modified by: 汤国栋
 * @Last Modified time: 2019-04-08 11:06:03
 * 
 * 启动入口文件
 */
import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './router';
import './style/style.less';

// 热加载
if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(<AppRouter />, document.getElementById('root'));
