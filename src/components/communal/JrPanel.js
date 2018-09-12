/**
 * @author 汤国栋 2018-05-10 14:36:16
 * @deprecated 面板组件
 */
import React, { Component, PropTypes } from 'react';
import './style/panel';

export default class JrPanel extends Component {
  render() {
    const { header, body, headerStyle = {}, bodyStyle = {} } = this.props;
    const headerDom =
      !!header && (typeof header === 'string' ? header : header());
    const bodyDom = !!body && (typeof body === 'string' ? body : body());
    return (
      <div className="jerry-panel">
        <div className="jerry-panel-header" style={headerStyle}>
          {headerDom}
        </div>
        <div className="jerry-panel-body" style={bodyStyle}>
          {bodyDom}
        </div>
      </div>
    );
  }
}

JrPanel.propTypes = {
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  body: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  headerStyle: PropTypes.object,
  bodyStyle: PropTypes.object,
};
