import React, { Component } from 'react';
import Header from './view/header';
import Leftbar from './view/leftbar';
import Center from './view/center';
import './index.less';

export default class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <Leftbar />
        <Center />
      </div>
    );
  }
}
