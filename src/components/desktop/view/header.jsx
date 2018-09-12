import React, { Component } from 'react';
import Logo from 'static/imgs/logo.jpg';

export default class Header extends Component {
  editPersonInfo = () => {};

  editPassword = () => {};

  logOut = () => {};

  render() {
    return (
      <div>
        <div className="header">
          <div className="header_logo">
            <span>
              <img src={Logo} />
            </span>
            <span className="title">工业底片数字化智能云平台</span>
          </div>
          <div className="right_link">
            <span>
              <a onClick={this.editPersonInfo}>信息修改</a>
            </span>
            <span> - </span>
            <span>
              <a onClick={this.editPassword}>密码修改</a>
            </span>
            <span> - </span>
            <span>
              <a onClick={this.logOut}>退出</a>
            </span>
          </div>
        </div>
        <div className="toggle" />
      </div>
    );
  }
}
