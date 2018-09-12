/**
@filename: JrViewDetail.js
@description: 用来显示详情的组件
@author: Ben Fang
@createDate: 15/06/2018
@props:taskId(string),close(function)
**/
import React, { Component } from 'react';
import Button from './Button';
import './style/form';
import { JrMessage } from 'ui';
import ajaxRequest from 'tool/request';
import { SUCCESS } from 'tool/http-code';
import { TASK_GRID } from 'tool/api-url';

export default class JrViewDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { task: {}, refresh: '刷新' };
  }
  componentWillReceiveProps(props) {
    this.init(props.taskId);
  }

  refresh(taskId) {
    this.setState({ refresh: '刷新中...' });
    setTimeout(() => {
      this.init(taskId);
    }, 500);
  }

  init(taskId) {
    ajaxRequest(TASK_GRID(), { taskId: taskId }, 'post').then(response => {
      const { code, message, entity } = response;
      if (code === SUCCESS) {
        this.setState({ task: entity[0], refresh: '刷新' });
      } else {
        JrMessage.error(message);
      }
    });
  }

  render() {
    const { taskId } = this.props;
    const { task, refresh } = this.state;
    const {
      result_display,
      update_time,
      create_time,
      error_msg,
      result_body,
    } = task;
    return (
      <div className="form_container">
        <div className="JrTable">
          <label>任务ID</label>
          <span className="table-span">{taskId}</span>
        </div>
        <div className="JrTable">
          <label>操作结果</label>
          <span className="table-span">{result_display}</span>
        </div>
        <div className="JrTable">
          <label>下载结果</label>
          <span className="table-span">
            {result_body ? <a href={result_body}>点击下载</a> : '暂无结果'}
          </span>
        </div>
        <div className="JrTable">
          <label>创建时间</label>
          <span className="table-span">{create_time}</span>
        </div>
        <div className="JrTable">
          <label>完成时间</label>
          <span className="table-span">{update_time}</span>
        </div>
        {error_msg ? (
          <div className="JrTable">
            <label>错误信息</label>
            <span className="table-span">{error_msg}</span>
          </div>
        ) : null}

        <div className="rc-dialog-footer">
          <div className="jerry-dialog-footer">
            <Button type="info" onClick={() => this.refresh(taskId)}>
              {refresh}
            </Button>
            <Button type="button" onClick={() => this.props.close()}>
              关闭
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
