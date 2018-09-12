import React, { Component, PropTypes } from 'react';
import Table from 'rc-table';
import Pagination from 'rc-pagination';
import Select from 'rc-select';
import Button from './Button';
import 'rc-table/assets/index.css';
import 'rc-pagination/assets/index.css';
import 'rc-select/assets/index.css';
import './style/table';
import IEVersion from 'tool/ie-version';

export default class JrTable extends Component {
  constructor(props, context) {
    super(props, context);
    this.allChecked = false;
    this.selectRows = [];
    this.myrefs = Object.create(null);
    const ieVersion = IEVersion();
    this.isIE8 = ~ieVersion && ieVersion <= 8;
  }
  componentWillMount() {
    const { columns, data, currentPage = 1, pageSize = 20 } = this.props;
    this.columns = this.columnsAddCheckbox(
      this.columnsAddAlign(this.addKey(Object.assign([], columns)))
    );
    this.data = this.addKey(Object.assign([], data));
    this.setState({ currentPage, pageSize });
  }
  componentWillReceiveProps(nextProps) {
    const { columns, data, currentPage = 1, pageSize = 20 } = nextProps;
    this.columns = this.columnsAddCheckbox(
      this.columnsAddAlign(this.addKey(Object.assign([], columns)))
    );
    this.data = this.addKey(Object.assign([], data));
    this.setState({ currentPage, pageSize });

    // 恢复原始参数
    this.allChecked = false;
    this.myrefs.allCheck.checked = false;
    this.selectRows = [];
    this.selectedCheckbox();
    // this.myrefs = Object.create(null);
  }
  // 添加 key 值，jsx 需要列表有不同的 key 。
  addKey(array) {
    return array.map((current, index) => {
      current.key = (!current.key && current.dataIndex) || 'data-' + index;
      return current;
    });
  }
  // 给表格添加对齐
  columnsAddAlign(columns) {
    return columns.map(current => {
      const { align, className = '' } = current;
      const cls = className.replace(
        /jerry-table-align-(left|center|right)/g,
        ''
      );
      current.className = !!align && `${cls} jerry-table-align-${align}`;
      return current;
    });
  }
  // 给表格添加行前的多选框
  columnsAddCheckbox(columns) {
    const { showCheckbox = true, singleCheck = false } = this.props;
    if (showCheckbox) {
      columns.splice(0, 0, {
        title: (
          <input
            className="_checkbox"
            type="checkbox"
            disabled={singleCheck}
            ref={ref => {
              this.myrefs.allCheck = ref;
            }}
            onClick={() => {
              if (!singleCheck) {
                this.selectRows = this.allChecked
                  ? []
                  : this.data.map((current, index) => index);
                this.allChecked = !this.allChecked;
                this.selectedCheckbox();
              }
            }}
          />
        ),
        dataIndex: '_checkbox',
        width: 30,
        render: (value, row, index) => {
          return (
            <input
              className="_checkbox"
              type="checkbox"
              ref={ref => {
                this.myrefs[`ref_checkbox_${index}`] = ref;
              }}
            />
          );
        },
      });
      columns.push({ title: '', dataIndex: '__blank', align: 'left' });
      return columns;
    }
  }
  selectedCheckbox() {
    const selectRows = [];
    this.data.forEach((current, index) => {
      const bool = this.selectRows.includes(index);
      if (this.myrefs[`ref_checkbox_${index}`]) {
        this.myrefs[`ref_checkbox_${index}`].checked = bool;
        this.myrefs[`ref_row_${index}`].setAttribute(
          'class',
          bool ? 'jerry-tr-selected' : 'jerry-tr'
        );
        if (bool) {
          selectRows.push(current);
        }
      }
    });
    this.props.onSelectRowsChange && this.props.onSelectRowsChange(selectRows);
  }
  // 行被点击时
  onRowClick() {
    const { singleCheck = false } = this.props;
    return (record, index) => {
      if (singleCheck) {
        if (this.selectRows.length > 0 && this.selectRows[0] === index) {
          this.selectRows = [];
        } else {
          this.selectRows = [index];
        }
      } else {
        const indexes = this.selectRows.findIndex(value => value === index);
        if (~indexes) {
          this.selectRows.splice(indexes, 1);
        } else {
          this.selectRows.push(index);
        }
      }
      this.selectedCheckbox();
    };
  }
  // 页码变化或每页显示数量变化
  onCurrentPageOrSizeChange() {
    const { onCurrentPageOrSizeChange, loadonce = true } = this.props;
    return (currentPage, pageSize) => {
      onCurrentPageOrSizeChange &&
        onCurrentPageOrSizeChange(currentPage, pageSize);
      loadonce && this.setState({ currentPage, pageSize });
    };
  }
  render() {
    const {
      loadonce = true,
      total,
      style = {},
      tableBodyHeight,
      showPagination = true,
      refreshGrid = () => {},
    } = this.props;
    if (showPagination && loadonce) {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.data = this.data.slice(start, end);
    }
    return (
      <div>
        <Table
          style={style}
          columns={this.columns}
          data={this.data}
          emptyText="没有数据"
          className="jerry-table"
          scroll={{ x: true, y: !this.isIE8 && tableBodyHeight }}
          // headerStyle={{ cellpadding: '0', cellspacing: '0', display: 'table' }}
          bodyStyle={
            this.isIE8 && !!this.data && this.data.length > 0
              ? { height: tableBodyHeight }
              : {}
          }
          rowClassName={() => 'jerry-tr'}
          rowRef={(record, index) => {
            return ref => {
              !!ref && (this.myrefs[`ref_row_${index}`] = ref.trRef);
            };
          }}
          onRowClick={this.onRowClick()}
        />
        {showPagination && (
          <div className="jerry-table-pager">
            <Pagination
              selectComponentClass={Select}
              showSizeChanger
              showQuickJumper={true}
              pageSizeOptions={['20', '30', '40', '50', '100']}
              current={this.state.currentPage}
              pageSize={this.state.pageSize}
              defaultPageSize={20}
              defaultCurrent={1}
              total={loadonce ? this.data.length : total}
              showTotal={(t, r) => (
                <span className="jerry-table-pager-total">
                  当前 {r[0]} 到 {r[1]} 条 ， 共 {t} 条 。
                  <Button style={{ lineHeight: 0.8 }} onClick={refreshGrid}>
                    刷新
                  </Button>
                </span>
              )}
              onChange={this.onCurrentPageOrSizeChange()}
              onShowSizeChange={this.onCurrentPageOrSizeChange()}
            />
          </div>
        )}
      </div>
    );
  }
}

JrTable.propTypes = {
  columns: PropTypes.array.isRequired, // 表格参数
  data: PropTypes.array.isRequired, // 表格数据
  loadonce: PropTypes.bool, // 是否一次加载（默认：true）
  showPagination: PropTypes.bool, // 是否显示分页（默认：true）
  total: PropTypes.number, // 总记录数
  currentPage: PropTypes.number, // 当前页码（默认：1）
  pageSize: PropTypes.number, // 每页显示数量（默认：20）
  tableBodyHeight: PropTypes.number, // 表格高度
  showCheckbox: PropTypes.bool, // 是否显示多选框（默认：true）
  singleCheck: PropTypes.bool, // 是否只能选中一条数据（默认：false）
  onSelectRowsChange: PropTypes.func, // 获取当前选中记录的数据
  onCurrentPageOrSizeChange: PropTypes.func, // 页码变化或每页显示数量变化
  refreshGrid: PropTypes.func, // 刷新列表
};

/*

参数格式具体可以参照 rc-table 文档
注意：1、可以不用放入 key 参数；2、最好是其中有一条记录的 width 不写。

columns 参数格式：[{name: '名称', dataIndex: 'name', width: 100, render: func}]
例: const columns = [
      { title: 'Name', dataIndex: 'name', width: 100 },
      { title: 'Age', dataIndex: 'age', render: () => <a href="#">Opration</a> },
    ];

*/
