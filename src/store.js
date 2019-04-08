/*
 * @Author: 汤国栋
 * @Date: 2019-04-08 11:07:57
 * @Last Modified by: 汤国栋
 * @Last Modified time: 2019-04-08 11:11:15
 * 
 * redux 添加中间件，增强器，处理函数。
 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

// eslint-disable-next-line no-underscore-dangle
const reduxDevTool = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__; // chrome redux 插件
const composeEnhancers =
  process.env.NODE_ENV === 'development' && reduxDevTool
    ? reduxDevTool
    : compose;

// 中间件
const middlewares = [thunk];

// 增强器
const storeEnhancers = composeEnhancers(applyMiddleware(...middlewares));

// 参数：函数，初始值，增强器
export default createStore(reducer, {}, storeEnhancers);
