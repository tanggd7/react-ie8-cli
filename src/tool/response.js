/*
 * @Author: 汤国栋
 * @Date: 2019-04-08 11:20:38
 * @Last Modified by: 汤国栋
 * @Last Modified time: 2019-04-08 11:28:57
 * 
 * 跳转
 * response.push：采用 html5 的 history 方式
 * response.redirect：采用浏览器重定向
 * 参数：
 * url -> String：（必须）跳转路径
 * param -> Object：跳转携带的参数（只能携带简单类型参数）
 */
import { browserHistory } from 'react-router';
import IEVersion from './ie-version';
import { PATH_PRE } from './constant';

const getUrl = (url, params) => {
  let Url = url;
  let param = '';
  if (params) {
    Object.keys(params).forEach(key => {
      param += `&${key}=${params[key].toString() || ''}`;
    });
  }
  if (param) {
    Url += `?${param && param.substring(1)}`;
  }
  return Url;
};

// 重定向跳转
const redirect = (url = '', params = {}, hostname = '') => {
  window.location.href = hostname + getUrl(`${PATH_PRE}${url}`, params);
};

// html5 跳转
const push = (url = '', state = {}) => {
  const ieVersion = IEVersion();
  // 在以下 IE 版本不支持 html5 跳转
  if ([6, 7, 8, 9].includes(ieVersion)) {
    sessionStorage.setItem('@History', JSON.stringify(state));
    browserHistory.push({ pathname: `${PATH_PRE}${url}` });
  } else {
    browserHistory.push({ pathname: `${PATH_PRE}${url}`, state });
  }
};

export default { redirect, push };
