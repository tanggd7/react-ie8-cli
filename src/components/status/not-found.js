/*
 * @Author: 汤国栋
 * @Date: 2019-04-11 19:31:44
 * @Last Modified by: 汤国栋
 * @Last Modified time: 2019-04-11 19:56:45
 * 
 * 404 页面
 */
import React from 'react';
import { response } from 'tool';
import { GdCheckbox } from 'ui';
import './index.less';

const NotFound = () => (
  <div className="gd-notfound">
    <h1>404</h1>
    <div className="gd-notfound-explain">抱歉，你访问的页面不存在！</div>
    <button
      className="btn btn-success"
      type="button"
      onClick={() => {
        response.push('/desktop');
      }}
    >
      返 回
    </button>
    <GdCheckbox>123123</GdCheckbox>
  </div>
);

export default NotFound;
