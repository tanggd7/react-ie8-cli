/*
 * @Author: 汤国栋
 * @Date: 2019-04-08 11:19:50
 * @Last Modified by: 汤国栋
 * @Last Modified time: 2019-04-16 21:07:47
 * 
 * 封装的异步请求函数
 */
import axios from 'axios';
import { GdMessage } from 'ui';
import { SUCCESS } from './http-code';
import response from './response';
import { clearStorage } from './util';

const AJAX_TIMEOUT = 'ECONNABORTED';

const newRequest = (url, params, method, error = false) =>
  new Promise((resolve, reject) => {
    axios({
      url,
      method,
      timeout: 5000,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        token: localStorage.token || '',
      },
      ...params,
    })
      .then(({ data }) => {
        const { code, message } = data;
        if (code === 401 || code === 403) {
          reject(new Error('没有权限，请重新登录！'));
          clearStorage();
          response.push('/');
        } else if (code !== SUCCESS) {
          if (!error) {
            GdMessage.error(message);
          } else {
            reject(data);
          }
        } else {
          resolve(data);
        }
      })
      .catch(err => {
        if (err.code === AJAX_TIMEOUT) {
          GdMessage.error('请求超时，请重试');
        }
        reject(err);
      });
  });

const request = ({ url = '', param = {}, method = 'get', error }) => {
  const Method = method.toLowerCase();
  if (Method === 'post') {
    return newRequest(url, { data: param }, 'post', error);
  }
  if (Method === 'put') {
    return newRequest(url, { data: param }, 'put', error);
  }
  if (Method === 'delete') {
    return newRequest(url, { params: param }, 'delete', error);
  }
  return newRequest(url, { params: param }, 'get', error); // 默认 Get 请求
};

request.get = (url, param, error) =>
  request({ method: 'get', url, param, error });
request.post = (url, param, error) =>
  request({ method: 'post', url, param, error });
request.put = (url, param, error) =>
  request({ method: 'put', url, param, error });
request.delete = (url, param, error) =>
  request({ method: 'delete', url, param, error });

export default request;
