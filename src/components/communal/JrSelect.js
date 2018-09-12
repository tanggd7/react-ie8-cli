import React, { Component, PropTypes } from 'react';
import Select, { Option } from 'rc-select';
import './style/select';

export default class JrSelect extends Component {
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
        {this.props.options.map((current, index) => {
          return (
            <Option key={`jgList-${index}`} value={current.value}>
              {current.text}
            </Option>
          );
        })}
      </Select>
    );
  }
}

JrSelect.propTypes = {
  onChange: PropTypes.func, // 所选值发生变化事件
  style: PropTypes.object,
  options: PropTypes.array,
  defaultValue: PropTypes.string,
};
