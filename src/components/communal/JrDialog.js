/** 
@describe: 对话框组件
@author：方磊
@date：2018-05-03
@paras:
visible:boolen
content:text
<JrDialog visible={true} width="600" maskClosable={false} content={<Component />} title="标题" />
 **/
import 'rc-dialog/assets/index.css';
import React, { PropTypes } from 'react';
import Button from './Button';
import Dialog from 'rc-dialog';
import './style/dialog.less';

export default class JrDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible,
      destroyOnClose: true,
    };
  }
  onClose() {
    this.setState({
      visible: false,
    });
    if (this.props.reload) this.props.reload();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible,
    });
  }
  render() {
    const wrapClassName = 'center';
    const {
      width,
      height = '',
      top,
      title,
      maskClosable,
      onOk,
      okText = '确定',
      onCancel,
      cancelText = '取消',
      afterClose,
    } = this.props;
    const style = { width: width || 600, top: top || '30%' };
    const bodyStyle = height ? { height, overflowY: 'auto' } : {};
    return (
      <div>
        <Dialog
          visible={this.state.visible}
          animation="zoom"
          title={title || ''}
          maskAnimation="fade"
          style={style}
          zIndex="20"
          maskClosable={maskClosable || false}
          wrapClassName={wrapClassName}
          onClose={() => this.onClose()}
          destroyOnClose={this.state.destroyOnClose}
          bodyStyle={bodyStyle}
          afterClose={afterClose}
          footer={
            (!!onOk || !!onCancel) && (
              <div className="jerry-dialog-footer">
                {!!onOk && (
                  <Button type="primary" onClick={onOk}>
                    {okText}
                  </Button>
                )}
                {!!onCancel && <Button onClick={onCancel}>{cancelText}</Button>}
              </div>
            )
          }
        >
          {this.props.children}
        </Dialog>
      </div>
    );
  }
}
JrDialog.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  title: PropTypes.string,
  maskClosable: PropTypes.bool,
  onOk: PropTypes.func,
  okText: PropTypes.string,
  onCancel: PropTypes.func,
  cancelText: PropTypes.string,
  reload: PropTypes.func, //props传，用来刷新grid
  // content: PropTypes.any.isRequired,
  afterClose: PropTypes.func,
};
