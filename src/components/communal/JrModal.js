import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'rc-dialog';
import Button from './Button';
import iconInfo from 'static/icons/icon-info.png';
import iconSuccess from 'static/icons/icon-success.png';
import iconWarn from 'static/icons/icon-warn.png';
import iconError from 'static/icons/icon-error.png';
import iconHelp from 'static/icons/icon-help.png';
import './style/modal';

const preCls = 'jerry-modal';

class ConfirmDialog extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { visible: true };
  }
  destroyDialog(func) {
    !!func && func();
    // this.props.destroy();
    this.setState({ visible: false });
  }
  render() {
    const {
      title = '提示',
      content = '',
      onOk,
      onCancel,
      afterClose,
      style = {},
      width = 415,
      icon = iconHelp,
      hasCancel = false,
    } = this.props;
    return (
      <Dialog
        zIndex="999"
        className={preCls}
        closable={false}
        visible={this.state.visible}
        width={width}
        style={style}
        animation="zoom"
        maskAnimation="fade"
        destroyOnClose={true}
        afterClose={afterClose}
      >
        <div className={`${preCls}-wapper`}>
          <div className={`${preCls}-body`}>
            <img className={`${preCls}-icon`} src={icon} />
            <span className={`${preCls}-title`}>{title}</span>
            <div className={`${preCls}-content`}>{content}</div>
          </div>
          <div className={`${preCls}-btns`}>
            <Button type="primary" onClick={() => this.destroyDialog(onOk)}>
              确定
            </Button>
            {hasCancel && (
              <Button onClick={() => this.destroyDialog(onCancel)}>取消</Button>
            )}
          </div>
        </div>
      </Dialog>
    );
  }
}

ConfirmDialog.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  afterClose: PropTypes.func,
  style: PropTypes.object,
  width: PropTypes.number,
};

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
    ReactDOM.render(<ConfirmDialog {...props} />, div);
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
