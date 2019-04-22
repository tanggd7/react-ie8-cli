/*
 * @Author: 汤国栋
 * @Date: 2018-09-18 11:29:39
 * @Last Modified by: 汤国栋
 * @Last Modified time: 2019-04-16 21:05:54
 * 
 * 询问框
 */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'rc-dialog';
import iconInfo from 'static/imgs/icon-info.png';
import iconSuccess from 'static/imgs/icon-success.png';
import iconWarn from 'static/imgs/icon-warn.png';
import iconError from 'static/imgs/icon-error.png';
import iconHelp from 'static/imgs/icon-help.png';
import '../style/gd-confirm.less';

const preCls = 'gd-modal';

class GdConfirm extends Component {
  static propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    afterClose: PropTypes.func,
    style: PropTypes.object,
    width: PropTypes.number,
    icon: PropTypes.node,
    hasCancel: PropTypes.bool,
  };

  static defaultProps = {
    title: '提示',
    content: '',
    onOk: null,
    onCancel: null,
    afterClose: null,
    style: {},
    width: 415,
    icon: iconHelp,
    hasCancel: false,
  };

  constructor(props, context) {
    super(props, context);
    this.state = { visible: true };
  }

  destroyDialog(func) {
    if (func) {
      func();
    }
    // this.props.destroy();
    this.setState({ visible: false });
  }

  render() {
    const {
      title,
      content,
      onOk,
      onCancel,
      afterClose,
      style,
      width,
      icon,
      hasCancel,
    } = this.props;
    const { visible } = this.state;
    return (
      <Dialog
        zIndex="999"
        className={preCls}
        closable={false}
        visible={visible}
        width={width}
        style={style}
        animation="zoom"
        maskAnimation="fade"
        destroyOnClose
        afterClose={afterClose}
      >
        <div className={`${preCls}-wapper`}>
          <div className={`${preCls}-body`}>
            <img className={`${preCls}-icon`} src={icon} alt="" />
            <span className={`${preCls}-title`}>{title}</span>
            <div className={`${preCls}-content`}>{content}</div>
          </div>
          <div className={`${preCls}-btns`}>
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => this.destroyDialog(onOk)}
            >
              确定
            </button>
            {hasCancel && (
              <button
                className="btn"
                type="button"
                onClick={() => this.destroyDialog(onCancel)}
              >
                取消
              </button>
            )}
          </div>
        </div>
      </Dialog>
    );
  }
}

const createConfirm = config => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  // const destroy = () => {
  //   const unmountResult = ReactDOM.unmountComponentAtNode(div);
  //   if (unmountResult && div.parentNode) {
  //     div.parentNode.removeChild(div);
  //   }
  // };

  const render = props => {
    ReactDOM.render(<GdConfirm {...props} />, div);
  };
  render({ ...config });
};

const confirm = props => {
  createConfirm({
    icon: iconHelp,
    hasCancel: true,
    ...props,
  });
};

const info = props => {
  createConfirm({ icon: iconInfo, ...props });
};

const success = props => {
  createConfirm({ icon: iconSuccess, ...props });
};

const warn = props => {
  createConfirm({ icon: iconWarn, ...props });
};

const error = props => {
  createConfirm({ icon: iconError, ...props });
};

export default { confirm, info, success, warn, error };
