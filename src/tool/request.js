/**
|--------------------------------------------------
| 封装的异步请求函数
|--------------------------------------------------
*/
import axios from 'axios';
import { SUCCESS } from './http-code';
import response from './response';
import { JrMessage } from 'ui';

const AJAX_TIMEOUT = 'ECONNABORTED';

const newRequest = (url, params, method, onError) =>
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
          localStorage.clear();
          response.push('/');
        }
        if (code !== SUCCESS) {
          if (onError) {
            onError();
          } else {
            JrMessage.error(message);
            reject(message);
          }
        }
        resolve(data);
      })
      .catch(error => {
        if (error.code === AJAX_TIMEOUT) {
          JrMessage.error('请求超时，请重试');
        } else {
          throw error;
        }
      });
  });

const request = ({ url = '', param = {}, method = 'get', onError }) => {
  method = method.toLowerCase();
  if (method === 'get') {
    return newRequest(url, { params: param }, 'get', onError);
  }
  if (method === 'post') {
    return newRequest(url, { data: param }, 'post', onError);
  }
  if (method === 'put') {
    return newRequest(url, { data: param }, 'put', onError);
  }
  if (method === 'delete') {
    return newRequest(url, { params: param }, 'delete', onError);
  }
};

request.get = (url, param, onError) =>
  request({ method: 'get', url, param, onError });
request.post = (url, param, onError) =>
  request({ method: 'post', url, param, onError });
request.put = (url, param, onError) =>
  request({ method: 'put', url, param, onError });
request.delete = (url, param, onError) =>
  request({ method: 'delete', url, param, onError });

export default request;
