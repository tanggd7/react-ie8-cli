/*
 * @Author: 汤国栋
 * @Date: 2018-05-03 20:25:07
 * @Last Modified by: 汤国栋
 * @Last Modified time: 2019-04-16 21:06:21
 * 
 * 对话框组件
 */
import React, { Component, PropTypes } from 'react';
import Dialog from 'rc-dialog';
import 'rc-dialog/assets/index.css';
import '../style/gd-dialog.less';

class GdDialog extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    maskClosable: PropTypes.bool,
    onOk: PropTypes.func,
    okText: PropTypes.string,
    onCancel: PropTypes.func,
    cancelText: PropTypes.string,
    reload: PropTypes.func, // props 参数，用来刷新 grid 。
    afterClose: PropTypes.func,
    children: PropTypes.element,
  };

  static defaultProps = {
    visible: true,
    width: 600,
    height: '',
    top: '30%',
    title: '',
    maskClosable: false,
    onOk: null,
    okText: '确定',
    onCancel: null,
    cancelText: '取消',
    reload: null,
    afterClose: () => {},
    children: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      destroyOnClose: true,
    };
  }

  componentWillMount = () => {
    const { visible } = this.props;
    this.setState({ visible });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible,
    });
  }

  onClose = () => {
    const { reload } = this.props;
    if (reload) {
      reload();
    }
    this.setState({ visible: false });
  };

  render() {
    const wrapClassName = 'center';
    const {
      width,
      height,
      top,
      title,
      maskClosable,
      onOk,
      okText,
      onCancel,
      cancelText,
      afterClose,
      children,
    } = this.props;
    const { visible, destroyOnClose } = this.state;
    const style = { width, top };
    const bodyStyle = height ? { height, overflowY: 'auto' } : {};
    return (
      <div>
        <Dialog
          visible={visible}
          animation="zoom"
          title={title}
          maskAnimation="fade"
          style={style}
          zIndex="20"
          maskClosable={maskClosable}
          wrapClassName={wrapClassName}
          onClose={this.onClose}
          destroyOnClose={destroyOnClose}
          bodyStyle={bodyStyle}
          afterClose={afterClose}
          footer={
            (!!onOk || !!onCancel) && (
              <div className="gd-dialog-footer">
                {!!onOk && (
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={onOk}
                  >
                    {okText}
                  </button>
                )}
                {!!onCancel && (
                  <button className="btn" type="button" onClick={onCancel}>
                    {cancelText}
                  </button>
                )}
              </div>
            )
          }
        >
          {children}
        </Dialog>
      </div>
    );
  }
}

export default GdDialog;
