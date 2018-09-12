import React, { Component } from 'react';
import { createForm } from 'rc-form';
import { Input, Button, JrCheckbox } from 'ui';
import { response } from 'tool';
import './index.less';

import logo from 'static/imgs/logo-big.png';
import icon_user from 'static/icons/login-user.png';
import icon_pwd from 'static/icons/login-pwd.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.rememberPassword = false;
  }

  submit = () => {
    this.props.form.validateFields((error, value) => {
      if (!error) {
        // const { userCode, password } = value;

        response.push('desktop');
      }
    });
  };

  remember = e => {
    this.rememberPassword = e.target.checked;
  };

  forgot = () => {};

  render() {
    let errors;
    const { getFieldProps, getFieldError } = this.props.form;
    return (
      <div className="login">
        <div className="login-top" />
        <div className="login-header">
          <img className="login-logo" src={logo} />
          <span className="login-title">工业底片数字化智能云平台</span>
        </div>
        <div className="login-form">
          <div className="login-form-div">
            <img className="login-icon" src={icon_user} />
            <Input
              className="login-input"
              {...getFieldProps('userCode', {
                rules: [{ required: true, message: `用户名必填` }],
              })}
              placeholder="用户名"
            />
            <b>
              {(errors = getFieldError('userCode')) ? errors.join(',') : null}
            </b>
          </div>
          <div className="login-form-div">
            <img className="login-icon" src={icon_pwd} />
            <Input
              className="login-input"
              {...getFieldProps('password', {
                rules: [{ required: true, message: `密码必填` }],
              })}
              placeholder="密码"
              type="password"
            />
            <b>
              {(errors = getFieldError('password')) ? errors.join(',') : null}
            </b>
          </div>
          <div className="login-wapper">
            <label>
              <JrCheckbox onChange={this.remember} />
              &nbsp;&nbsp;记住密码
            </label>
            <a className="login-forget" onClick={this.forgot}>
              忘记密码
            </a>
          </div>
          <Button onClick={this.submit} className="login-btn" type="primary">
            登录
          </Button>
        </div>
      </div>
    );
  }
}

export default createForm()(Login);
