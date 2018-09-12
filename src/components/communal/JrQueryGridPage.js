/**
 * @author 汤国栋 2018-05-10 14:36:00
 * @deprecated 查询列表页面组件
 */
import React, { Component, PropTypes } from 'react';
import Input from './Input';
import Button from './Button';
import JrMessage from './JrMessage';
import JrTable from './JrTable';
import JrPanel from './JrPanel';
import JrSelect from './JrSelect';
import JrJgSelect from './JrJgSelect';
import JrAllProjects from './JrAllProjects';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import 'rc-calendar/assets/index.css';
import './style/queryGridPage';
import ajaxRequest from 'tool/request';
import { SUCCESS } from 'tool/http-code';
import { MENU_USERMENU_BUTTONS } from 'tool/api-url';
import iconLoading from 'static/icons/icon-loading.gif';

const format = 'YYYY-MM-DD'; // 查询列表日期组件格式化格式
const width = 200; // 查询列表表单宽度

/**
 * 查询条件组件
 */
class Condition extends Component {
  constructor(props, context) {
    super(props, context);
    this.form = Object.create(null);
    this.state = { switchCondition: false };
  }
  componentDidMount = () => {
    // 查询条件初始化触发查询列表，并把查询条件初始值传出。
    // this.props.onSearchClick(this.form);
  };
  onChangeValue = e => {
    this.form[e.target.name] = e.target.value.trim();
  };
  // 生成表单组件
  renderForm(obj) {
    const { name, type, options = [], defaultValue, readonly } = obj;
    !!defaultValue &&
      !this.form[name] &&
      !Object.keys(this.form).includes(name) &&
      (this.form[name] = defaultValue);
    switch (type) {
      case 'input':
        return (
          <Input
            style={{ width }}
            name={name}
            onChange={this.onChangeValue}
            defaultValue={defaultValue}
            readOnly={readonly}
          />
        );
      case 'select':
        return (
          <JrSelect
            options={options}
            style={{ width }}
            onChange={value => {
              this.form[name] = value;
            }}
            defaultValue={defaultValue}
          />
        );
      case 'date':
        return (
          <DatePicker
            animation="slide-up"
            calendar={
              <Calendar format={format} locale={zhCN} showDateInput={true} />
            }
            onChange={value => {
              this.form[name] = (value && value.format(format)) || '';
            }}
          >
            {({ value }) => {
              return (
                <span tabIndex="0">
                  <Input
                    readOnly
                    style={{ width }}
                    tabIndex="-1"
                    value={(value && value.format(format)) || ''}
                    defaultValue={defaultValue}
                  />
                </span>
              );
            }}
          </DatePicker>
        );
      case 'jgSelect':
        return (
          <JrJgSelect
            style={{ width }}
            onChange={value => {
              this.form[name] = value;
            }}
            defaultValue={defaultValue}
          />
        );
      case 'projects':
        return (
          <JrAllProjects
            width={width}
            defaultValue={defaultValue}
            onChange={value => {
              this.form[name] = value;
            }}
          />
        );
      default:
        break;
    }
  }
  // 生成查询条件
  renderConditions = (conditions, isAdvanced) => {
    return conditions.map((current, index, array) => {
      const pre = array[index - 1];
      const cls = Object.create(null);
      if (isAdvanced && !this.state.switchCondition) {
        cls.display = 'none';
      }
      if ((index + 1) % 2 === 0) {
        return (
          <div
            key={`condition-${index}`}
            className="jerry-qg-cd-cell"
            style={cls}
          >
            <label className="jerry-qg-cd-content-label">{pre.title}：</label>
            <span className="jerry-qg-cd-content-span">
              {this.renderForm(pre)}
            </span>
            <label className="jerry-qg-cd-content-label">
              {current.title}：
            </label>
            <span className="jerry-qg-cd-content-span">
              {this.renderForm(current)}
            </span>
          </div>
        );
      }
      if (
        array.length < 2 ||
        (index === array.length - 1 && (index + 1) % 2 > 0)
      ) {
        return (
          <div
            key={`condition-${index}`}
            className="jerry-qg-cd-cell"
            style={cls}
          >
            <label className="jerry-qg-cd-content-label">
              {current.title}：
            </label>
            <span className="jerry-qg-cd-content-single">
              {this.renderForm(current)}
            </span>
          </div>
        );
      }
    });
  };
  // 普通查询条件
  createConditions = () => {
    const { conditions = [] } = this.props;
    return this.renderConditions(conditions, false);
  };
  // 高级查询条件
  createAdvancedConditions = () => {
    const { advancedConditions = [] } = this.props;
    return this.renderConditions(advancedConditions, true);
  };
  // 显示高级查询按钮事件
  switchCondition = () => {
    this.setState({ switchCondition: !this.state.switchCondition });
  };
  render() {
    const {
      onSearchClick,
      onRefreshClick,
      advancedConditions = [],
    } = this.props;
    return (
      <div className="jerry-qg-cd">
        <JrPanel
          bodyStyle={{ padding: 0 }}
          header={() => {
            return (
              <span>
                搜索条件
                {advancedConditions.length > 0 && (
                  <Button
                    onClick={() => {
                      this.switchCondition();
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>
                      {this.state.switchCondition ? '- ' : '+ '}
                    </span>
                    高级搜索
                  </Button>
                )}
              </span>
            );
          }}
          body={() => {
            return (
              <div className="jerry-qg-cd-content">
                {this.createConditions()}
                {this.createAdvancedConditions()}
                <div className="jerry-qg-cd-cell">
                  <div className="jerry-qg-cd-search">
                    <Button
                      className="jerry-qg-cd-btn"
                      type="primary"
                      onClick={() => {
                        onSearchClick(this.form);
                      }}
                    >
                      查&nbsp;&nbsp;询
                    </Button>
                    <Button
                      className="jerry-qg-cd-a"
                      onClick={() => {
                        onRefreshClick();
                      }}
                    >
                      刷&nbsp;&nbsp;新
                    </Button>
                  </div>
                </div>
              </div>
            );
          }}
        />
      </div>
    );
  }
}

// 工具栏组件默认 state
const defaultToolbarState = {
  visible: false, // 是否展示功能
  MyDialog: <div />, // 按钮对应组件
  title: '',
  param: {}, // toolbar 文件中设置的 params 参数
};

/**
 * 工具栏组件
 */
class Toolbar extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = defaultToolbarState;
  }
  componentWillMount = () => {
    const { menucode, toolbar } = this.props;
    // 如果传入 menucode 则查询接口查看当前用户能显示出的按钮。
    if (!!menucode && !!toolbar) {
      ajaxRequest(MENU_USERMENU_BUTTONS(this.props.menucode), {})
        .then(data => {
          const { code, message, entity } = data;
          if (code === SUCCESS) {
            const allUserToolCodes = new Map(
              entity.map(value => {
                return [value.buttoncode, value.buttonname];
              })
            );
            const userToolbar = [];
            for (const toolObj of toolbar) {
              if (allUserToolCodes.has(toolObj.code)) {
                toolObj.title = allUserToolCodes.get(toolObj.code);
                userToolbar.push(toolObj);
              }
            }
            this.setState({ toolbar: userToolbar });
          } else {
            JrMessage.error(message);
          }
        })
        .catch(error => {
          throw new Error(error);
        });
    } else {
      // 如果没有传入 menucode 就显示蓑有按钮
      this.setState({ toolbar: this.props.toolbar });
    }
  };
  // 销毁按钮组件
  closeDialog = () => {
    this.setState({ ...defaultToolbarState, toolbar: this.state.toolbar });
  };
  render() {
    const { reloadGrid, getSelectRows, getConditions } = this.props;
    const { visible, toolbar, MyDialog, title, params } = this.state;
    return (
      !!toolbar && (
        <div className="jerry-qg-toolbar">
          {toolbar.map((curr, index) => {
            return (
              <Button
                key={`toolbar-${index}`}
                type="info"
                onClick={() => {
                  const selectRows = getSelectRows();
                  // 根据 toolbar 中的 single 参数判断用户选择的记录数量是否符合要求。
                  if (typeof curr.single !== 'undefined') {
                    if (selectRows.length < 1) {
                      JrMessage.warn('请至少选择一条记录');
                      return;
                    }
                    if (curr.single && selectRows.length > 1) {
                      JrMessage.warn('只能操作一条记录');
                      return;
                    }
                  }
                  // 按钮组件可以是一个 reactDom 也可以是一个 function
                  if (curr.callBack) {
                    curr.callBack(
                      getSelectRows(),
                      curr.params,
                      reloadGrid,
                      getConditions()
                    );
                  } else {
                    this.setState({
                      visible: true,
                      toolbar,
                      MyDialog: curr.component,
                      title: curr.title,
                      params: curr.params,
                    });
                  }
                }}
              >
                {curr.title}
              </Button>
            );
          })}
          {visible &&
            !!MyDialog && (
              <MyDialog
                title={title}
                reloadGrid={reloadGrid}
                selectRows={getSelectRows()}
                conditions={getConditions()}
                params={params}
                closeDialog={this.closeDialog}
              />
            )}
        </div>
      )
    );
  }
}

/**
 * 查询列表页面统筹组件
 */
export default class JrQueryGridPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.selectRows = [];
    this.currentPage = 1;
    this.pageSize = 20;
    this.form = {};
    this.state = { loading: false };
  }
  // 用户点击记录时触发事件
  onSelectRowsChange = selectRows => {
    this.selectRows = selectRows;
  };
  // 表格页码或每页显示数量变化时触发事件
  onCurrentPageOrSizeChange = (currentPage, pageSize) => {
    this.currentPage = currentPage;
    this.pageSize = pageSize;
    this.loadData(currentPage, pageSize, this.form);
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
    this.setState({ loading: true });
    this.props.loadData(currentPage, pageSize, form);
  };
  componentWillReceiveProps = () => {
    this.setState({ loading: false });
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
      columns = [],
      data = [],
      total = 0,
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
        <div className="jerry-qg-table">
          <div style={!this.state.loading ? { display: 'none' } : {}}>
            <img src={iconLoading} />
            <span className="jerry-qg-table-loading">正在加载中</span>
          </div>
          <JrTable
            loadonce={false}
            currentPage={this.currentPage}
            pageSize={this.pageSize}
            total={total}
            columns={columns}
            data={data}
            tableBodyHeight={400}
            singleCheck={singleCheck}
            onSelectRowsChange={this.onSelectRowsChange}
            onCurrentPageOrSizeChange={this.onCurrentPageOrSizeChange}
            refreshGrid={this.reloadGrid}
          />
        </div>
      </div>
    );
  }
}

JrQueryGridPage.propTypes = {
  menucode: PropTypes.string, // 菜单代码
  conditions: PropTypes.array, // 查询条件
  advancedConditions: PropTypes.array, // 高级查询条件
  toolbar: PropTypes.array, // 表格功能工具
  columns: PropTypes.array, // 表格参数
  data: PropTypes.array, // 表格数据
  total: PropTypes.number, // 总记录数
  singleCheck: PropTypes.bool, // 是否只能选中一条数据（默认：false）
  loadData: PropTypes.func.isRequired, // 加载列表数据，用于初始化加载和需要刷新列表事件触发（点击查询按钮，页码变化，每页显示数量变化）。
};

/*

menucode: 如果传入该参数，组件会查询接口，进行比对，只展示接口返回的按钮。

const conditions = [
  { title: '用户名称', name: 'user', type: 'input', defaultValue: '111' },
  {
    title: '项目类型',
    name: 'tele',
    type: 'select',
    options: [{ value: '0', text: '新证' }, { value: '1', text: '复审' }],
  },
  { title: '所属机构', name: 'ssjg', type: 'jgSelect' },
  { title: '时间', name: 'sj', type: 'date' },
  { title: '项目筛选', name: 'sx', type: 'projects' },
];

const advancedConditions = [
  { title: '机构名称', name: 'jgname', type: 'input' },
  { title: '班次名称', name: 'bcname', type: 'input' },
  {
    title: '项目状态',
    name: 'zt',
    type: 'select',
    options: [{ value: '0', text: '有效' }, { value: '1', text: '无效' }],
  },
];


const toolbar = [
  { title: '新增', code: 'add', component: DialogDemo, single: true, params: {} },
  { title: '修改', code: 'edit', callBack: DialogDemo },
];
single: 是否只选中一条记录，无参数->不一定需要选中， true->只能选中一条， false->可以选择多条。
params: 用户自定义参数，之后会以参数的形式传给组件或方法中。

component 传的是组件对象， 会注入参数
title(string): 标题
reloadGrid(func): 刷新列表
selectRows(array)：获取当前选择的行信息
conditions(object): 查询条件对象
closeDialog(func): 关闭 dialog 方法
params(object): 参数对象

callBack 传的是函数
selectRows(array)：获取当前选择的行信息
params(object): 参数对象
reloadGrid(func): 刷新列表
conditions(object): 查询条件对象


const columns = [
  { title: 'Name', dataIndex: 'name', width: 100 },
  { title: 'Age', dataIndex: 'age', render: () => <a href="#">Opration</a> },
];

loadData 有三个参数，当前页码，每页显示数量，查询条件集合。
const loadData = (pageNumber, pageSize, condition) => {};

*/
