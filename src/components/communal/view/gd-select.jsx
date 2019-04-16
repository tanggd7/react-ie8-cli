/*
 * @Author: 汤国栋
 * @Date: 2018-09-18 10:18:41
 * @Last Modified by: 汤国栋
 * @Last Modified time: 2019-04-16 21:07:00
 * 
 * 选择下拉框组件
 */
import React, { PropTypes } from 'react';
import Select, { Option } from 'rc-select';
import 'rc-select/assets/index.css';
import '../style/gd-select.less';

const GdSelect = props => {
  const { defaultValue, style, onChange, options } = props;
  return (
    <Select
      defaultValue={defaultValue}
      style={{ width: '100%', style }}
      className="gd-select"
      notFoundContent="无"
      optionFilterProp="children"
      optionLabelProp="children"
      onChange={e => {
        onChange(e && e.target ? e.target.value : e);
      }}
      dropdownMenuStyle={{ height: 200 }}
      allowClear
    >
      {options.map(current => (
        <Option key={current.value} value={current.value}>
          {current.text}
        </Option>
      ))}
    </Select>
  );
};

GdSelect.propTypes = {
  defaultValue: PropTypes.string,
  style: PropTypes.object,
  onChange: PropTypes.func,
  options: PropTypes.array,
};

GdSelect.defaultProps = {
  defaultValue: '',
  style: Object.create(null),
  onChange: () => {},
  options: [],
};

export default GdSelect;
