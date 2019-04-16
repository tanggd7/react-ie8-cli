/*
 * @Author: 汤国栋
 * @Date: 2019-04-16 20:50:08
 * @Last Modified by: 汤国栋
 * @Last Modified time: 2019-04-16 20:50:08
 * 
 * 轻提示
 */
import React from 'react';
import Notification from 'rc-notification';
import 'rc-notification/assets/index.css';
import iconInfo from 'static/imgs/icon-info.png';
import iconSuccess from 'static/imgs/icon-success.png';
import iconWarn from 'static/imgs/icon-warn.png';
import iconError from 'static/imgs/icon-error.png';
import '../style/gd-message.less';

let notification = null;
if (!notification) {
  Notification.newInstance({ prefixCls: 'gd-message', style: {} }, n => {
    notification = n;
  });
}

const notice = (content, onClose, icon, duration = 2) => {
  notification.notice({
    content: (
      <span>
        <img src={icon} alt="" />
        <span>{content}</span>
      </span>
    ),
    onClose,
    duration,
  });
};

const info = (content, onClose, duration) => {
  notice(content, onClose, iconInfo, duration);
};

const success = (content, onClose, duration) => {
  notice(content, onClose, iconSuccess, duration);
};

const warn = (content, onClose, duration) => {
  notice(content, onClose, iconWarn, duration);
};

const error = (content, onClose, duration) => {
  notice(content, onClose, iconError, duration);
};

export default { info, success, warn, error };
