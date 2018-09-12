import React, { Component, PropTypes } from 'react';
import Select, { Option } from 'rc-select';
import ajaxRequest from 'tool/request';
import { COMMON_ALL_ORG } from 'tool/api-url';
import './style/select';

export default class JrJgSelect extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { options: [] };
  }
  componentWillMount() {
    ajaxRequest(COMMON_ALL_ORG())
      .then(data => {
        const { code, message, entity } = data;
        if (code === 200) {
          this.setState({ options: entity });
        } else {
          throw new Error(message);
        }
      })
      .catch(e => {
        throw e;
      });
  }
  onChange() {
    return e => {
      !!this.props.onChange &&
        this.props.onChange(e && e.target ? e.target.value : e);
    };
  }
  render() {
    return (
      <Select
        defaultValue={this.props.defaultValue}
        style={{ width: '100%', ...this.props.style }}
        className="jerry-select"
        notFoundContent="无"
        optionFilterProp="children"
        optionLabelProp="children"
        onChange={this.onChange()}
        dropdownMenuStyle={{ height: 200 }}
        allowClear
      >
        {this.state.options.map((current, index) => {
          return (
            <Option key={`jgList-${index}`} value={`${current.org_id}`}>
              {current.org_name}
            </Option>
          );
        })}
      </Select>
    );
  }
}

JrJgSelect.propTypes = {
  onChange: PropTypes.func, // 所选值发生变化事件
  style: PropTypes.object,
  defaultValue: PropTypes.string,
};
