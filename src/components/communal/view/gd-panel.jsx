/*
 * @Author: 汤国栋
 * @Date: 2018-05-10 14:36:16
 * @Last Modified by: 汤国栋
 * @Last Modified time: 2019-04-16 21:06:48
 * 
 * 面板
 */
import React, { PropTypes } from 'react';
import '../style/gd-panel.less';

const GdPanel = props => {
  const { header, body } = props;
  const headerDom =
    !!header && (typeof header === 'string' ? header : header());
  const bodyDom = !!body && (typeof body === 'string' ? body : body());
  return (
    <div className="gd-panel">
      <div className="gd-panel-header">{headerDom}</div>
      <div className="gd-panel-body">{bodyDom}</div>
    </div>
  );
};

GdPanel.propTypes = {
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  body: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

GdPanel.defaultProps = {
  header: '',
  body: '',
};

export default GdPanel;
