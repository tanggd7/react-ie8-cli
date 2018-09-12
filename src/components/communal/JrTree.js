/**
@filename: JrTree.js
@description: ztree封装
@author: Ben Fang
@createDate: 29/05/2018
@props:onClick:func,check:boolen
**/

import React, { Component, PropTypes } from 'react';
import jquery from 'jquery';
import 'ztree';
import 'ztree/css/zTreeStyle/zTreeStyle.css';
import './style/tree.less';

export default class JrTree extends Component {
  constructor(props, context) {
    super(props, context);
  }
  componentWillMount = () => {
    this.treeId = this.props.id || 'ztree';
  };
  componentDidMount = () => {
    this.initTree(this.props);
  };
  componentWillReceiveProps = nextProps => {
    const { afreshTree = false } = nextProps;
    if (afreshTree) {
      this.treeObj.destroy();
      this.initTree(nextProps);
    }
  };
  initTree = props => {
    const {
      nodes: zTreeNodes,
      onClick,
      check,
      chkboxType,
      getTreeObj,
      expandAll,
    } = props;
    if (zTreeNodes) {
      const setting = {
        callback: {
          onClick: (event, treeId, treeNode) => {
            !!onClick && this.props.onClick(treeNode);
          },
        },
        check: {
          enable: check,
          chkboxType,
        },
      };
      this.treeObj = jquery.fn.zTree.init(
        jquery(`#${this.treeId}`),
        setting,
        zTreeNodes
      );
      !!getTreeObj && getTreeObj(this.treeObj);
      //是否默认展开全部节点
      if (expandAll) {
        this.treeObj.expandAll(true);
      }
    }
  };
  render() {
    return <div id={this.treeId} className="ztree" />;
  }
}

JrTree.propTypes = {
  id: PropTypes.string, // ztree 在 html 中 id
  onClick: PropTypes.func, // 节点点击事件
  nodes: PropTypes.array, // 节点信息组成的数组
  check: PropTypes.bool, // 节点前是否显示多选框
  chkboxType: PropTypes.object, // 勾选 checkbox 对于父子节点的关联关系
  getTreeObj: PropTypes.func, // 获取 tree 对象，参数 obj：tree对象
  afreshTree: PropTypes.bool, // 是否需要重新生成 tree , 初始化时不起作用
  expandAll: PropTypes.bool, //是否展开全部节点
};
