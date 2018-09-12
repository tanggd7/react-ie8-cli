import React, { Component, PropTypes } from 'react';
import Input from '../Input';
import JrSelect from '../JrSelect';
import JrPanel from '../JrPanel';
import Button from '../Button';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import 'rc-calendar/assets/index.css';
import './style/queryGridPage';

const format = 'YYYY-MM-DD'; // 查询列表日期组件格式化格式
const width = 200; // 查询列表表单宽度

class Condition extends Component {
  constructor(props) {
    super(props);
    this.form = Object.create(null);
    this.state = { switchCondition: false };
  }

  static propTypes = {
    conditions: PropTypes.array,
    advancedConditions: PropTypes.array,
    onSearchClick: PropTypes.func,
    onRefreshClick: PropTypes.func,
  };

  static defaultProps = {
    conditions: [],
    advancedConditions: [],
    onSearchClick: () => {},
    onRefreshClick: () => {},
  };

  // 获取表单值
  onChangeValue = e => {
    this.form[e.target.name] = e.target.value.trim();
  };

  // 生成表单组件
  renderForm = obj => {
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
      default:
        break;
    }
  };

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
    const { conditions } = this.props;
    return this.renderConditions(conditions, false);
  };

  // 高级查询条件
  createAdvancedConditions = () => {
    const { advancedConditions } = this.props;
    return this.renderConditions(advancedConditions, true);
  };

  // 显示高级查询按钮事件
  switchCondition = () => {
    this.setState({ switchCondition: !this.state.switchCondition });
  };

  search = () => {
    this.props.onSearchClick(this.form);
  };

  render() {
    const { onRefreshClick, advancedConditions } = this.props;
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
                      onClick={this.search}
                    >
                      查&nbsp;&nbsp;询
                    </Button>
                    <Button className="jerry-qg-cd-a" onClick={onRefreshClick}>
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

export default Condition;
