import React, { Component, PropTypes } from 'react';
import Condition from './condition';
import Toolbar from './toolbar';
import JrGrid from '../JrGrid';
import './index.less';

class JrQueryGridPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.selectRows = [];
    this.currentPage = 1;
    this.form = {};
  }

  static propTypes = {
    columns: PropTypes.array.isRequired, // 表格参数
    data: PropTypes.array.isRequired, // 表格数据
    total: PropTypes.number.isRequired, // 总记录数
    conditions: PropTypes.array, // 普通条件
    advancedConditions: PropTypes.array, // 高级条件
    toolbar: PropTypes.array, // 工具栏
    menucode: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // 菜单代码
    singleCheck: PropTypes.bool, // 单选中行
    loadData: PropTypes.func.isRequired, // 加载表格数据
  };

  onInitGrid = gridObj => {
    this.gridObj = gridObj;
  };

  // 查询条件查询按钮点击事件
  onSearchClick = form => {
    this.form = form;
    this.currentPage = 1;
    this.loadData(1, this.pageSize, form);
  };

  // 刷新表格
  reloadGrid = () => {
    this.loadData(this.currentPage, this.pageSize, this.form);
  };

  loadData = (currentPage, pageSize, form) => {
    this.props.loadData(currentPage, pageSize, form);
  };

  // 获取选中行数据
  getSelectRows = () => {
    return this.selectRows;
  };

  // 获取查询条件
  getConditions = () => {
    return this.form;
  };

  render() {
    const {
      columns,
      data,
      total,
      conditions,
      advancedConditions,
      toolbar,
      menucode,
      singleCheck,
    } = this.props;
    return (
      <div>
        <Condition
          conditions={conditions}
          advancedConditions={advancedConditions}
          onSearchClick={this.onSearchClick}
          onRefreshClick={this.reloadGrid}
        />
        <Toolbar
          menucode={menucode}
          toolbar={toolbar}
          reloadGrid={this.reloadGrid}
          getSelectRows={this.getSelectRows}
          getConditions={this.getConditions}
        />
        <JrGrid
          onInit={this.onInitGrid}
          currentPage={this.currentPage}
          total={total}
          cols={columns}
          data={data}
          height={400}
          singleCheck={singleCheck}
          onCurrentPageOrSizeChange={this.onCurrentPageOrSizeChange}
        />
      </div>
    );
  }
}

export default JrQueryGridPage;
