/**
|--------------------------------------------------
| 启动入口文件
|--------------------------------------------------
*/

// 热加载
if (module.hot) {
  module.hot.accept();
}

import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './router';
import './style/style.less';

ReactDOM.render(<AppRouter />, document.getElementById('root'));
