/**
|--------------------------------------------------
| 跳转
|--------------------------------------------------
*/
import { browserHistory } from 'react-router';
import { PATH_PRE } from './constant';

const getUrl = (url, params) => {
  if (params) {
    let param = '';
    for (let key of Object.keys(params)) {
      params += `&${key}=${params[key].toString() || ''}`;
    }
    url += `?${param && param.substring(1)}`;
  }
  return url;
};

const redirect = (url = '', params = {}) => {
  window.location.href = getUrl(url, params);
};

const push = (url = '', state = {}) => {
  browserHistory.push({ pathname: `${PATH_PRE}${url}`, state });
};

export default {
  redirect,
  push,
};
