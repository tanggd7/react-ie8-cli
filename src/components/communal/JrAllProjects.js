/**
 * @author 汤国栋 2018-08-08 08:52:11
 * @deprecated 机构项目筛选组件
 */
import React, { Component, PropTypes } from 'react';
import Cascader from 'rc-cascader';
import Input from './Input';
import JrMessage from './JrMessage';
import ajaxRequest from 'tool/request';
import { ALL_SCREEN_PROJECTS } from 'tool/api-url';
import { SUCCESS } from 'tool/http-code';
import './style/allProject';

// 去重（存在重复的 Array<Object> => Map<[[key, value],[key, value]]> => Array<Object>）
const unique = array => [
  ...new Map(
    array.map(obj => {
      return [
        obj.value, // 将项目 id 作为键值，利用 Map 键唯一的特性去重。
        {
          value: obj.value,
          text: obj.text,
          parent: obj.parentValue,
          projectValue: obj.projectValue,
        },
      ];
    })
  ).values(),
];

class JrAllProjects extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { options: [], label: '', defaultValue: [] };
  }

  componentWillMount() {
    // 查询机构所有项目
    ajaxRequest(ALL_SCREEN_PROJECTS()).then(({ code, message, entity }) => {
      if (code === SUCCESS) {
        this.setState({ options: this.generateTree(entity) });
      } else {
        JrMessage.error(message);
      }
    });
  }

  // 选中默认选项
  checkDefaultValue = (codeArray = [], name) => {
    if (
      !!this.props.defaultValue &&
      codeArray.length > 0 &&
      codeArray[codeArray.length - 1] === this.props.defaultValue
    ) {
      this.setState({ defaultValue: codeArray, label: name });
    }
  };

  // 生成可以用来展示的树形结构
  generateTree = params => {
    params.industryList.push({ value: '', text: '全部' }); // 添加全部，代替清空功能。
    const industryList = unique(params.industryList);
    const categoryList = unique(params.categoryList);
    const projectList = unique(params.projectList);
    return industryList.map(industry => {
      this.checkDefaultValue([industry.value], industry.text);
      return {
        name: industry.text,
        code: industry.value,
        nodes: (() => {
          const categoryArray = [];
          categoryList.map(category => {
            if (industry.value === category.parent) {
              this.checkDefaultValue(
                [industry.value, category.value],
                category.text
              );
              categoryArray.push({
                name: category.text,
                code: category.value,
                nodes: (() => {
                  const projectArray = [];
                  projectList.map(project => {
                    if (category.value === project.parent) {
                      this.checkDefaultValue(
                        [industry.value, category.value, project.value],
                        project.text
                      );
                      projectArray.push({
                        name: project.text,
                        code: project.value,
                        value: project.projectValue,
                      });
                    }
                  });
                  return projectArray;
                })(),
              });
            }
          });
          return categoryArray;
        })(),
      };
    });
  };

  onChange = (value, select) => {
    if (select.length) {
      const label = select.map(o => o.name)[select.length - 1];
      const code = select.map(o => o.code)[select.length - 1];
      const projectValue = select.map(o => o.value)[select.length - 1];
      const obj = Object.create(null);
      obj.project_screen_name = label;
      switch (select.length) {
        case 1:
          obj.industry_id = code;
          break;
        case 2:
          obj.category_id = code;
          break;
        case 3:
          obj.project_id = code;
          obj.project_value = projectValue;
          break;
        default:
          break;
      }
      this.props.onChange(obj);
      this.setState({ label, code });
    }
  };

  render() {
    const { width, changeOnSelect = true } = this.props;
    return (
      <div>
        <Cascader
          defaultValue={this.state.defaultValue}
          expandTrigger="click"
          options={this.state.options}
          onChange={this.onChange}
          filedNames={{ label: 'name', value: 'code', children: 'nodes' }}
          changeOnSelect={changeOnSelect}
        >
          <Input style={{ width }} value={this.state.label} readOnly />
        </Cascader>
      </div>
    );
  }
}

JrAllProjects.propTypes = {
  onChange: PropTypes.func,
  width: PropTypes.number,
  defaultValue: PropTypes.string, // 默认值
  changeOnSelect: PropTypes.bool, // 是否级联每层都可以选中
};

export default JrAllProjects;
