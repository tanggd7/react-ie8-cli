/** 
@describe: 表单通用组建
@author：方磊
@date：2018-05-04
@prop：type支持text,select,textarea,date,plantext,hidden,sms_tmpl_select
**/

import moment from 'moment';
import 'moment/locale/zh-cn';
import Calendar from 'rc-calendar';
import 'rc-calendar/assets/index.css';
import DatePicker from 'rc-calendar/lib/Picker';
import cn from 'rc-calendar/lib/locale/zh_CN';
import Cascader from 'rc-cascader';
import 'rc-cascader/assets/index.css';
import 'rc-dialog/assets/index.css';
import { createForm } from 'rc-form';
import 'rc-notification/assets/index.css';
import React, { PropTypes } from 'react';
import Button from './Button';
import JrMessage from './JrMessage';
import JrEditor from './JrEditor';
import AjaxRequest from 'tool/request';
import { SEND_VCODE } from 'tool/api-url';
import {
  MODIFY_PASSWORD_SUCCESS,
  SUCCESS,
  SMS_SEND_SUCCESS,
  FORGET_PASSWORD_SUCCESS,
} from 'tool/http-code';
import './style/form.less';

const format = 'YYYY-MM-DD';
class JrForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
      waitTime: '点击发送',
    };
  }
  //表单提交
  submit() {
    this.props.form.validateFields((error, value) => {
      const { api, method } = this.props.elements;
      if (!error) {
        AjaxRequest(api, value, method ? method : 'post').then(response => {
          const { message, code } = response;
          if (
            code === MODIFY_PASSWORD_SUCCESS ||
            code === FORGET_PASSWORD_SUCCESS ||
            code === SMS_SEND_SUCCESS ||
            code === SUCCESS
          ) {
            JrMessage.success(message);
            this.props.close();
            this.props.reload();
          } else {
            JrMessage.error(message);
          }
        });
      }
    });
  }

  //渲染表单元素
  renderElements(item) {
    let html;
    const { getFieldDecorator } = this.props.form;
    const { waitTime } = this.state;
    //max判断会自动判断是否是string类型，所以分开
    if (item.limit) {
      this.requiredDecorator = getFieldDecorator(item.name, {
        rules: [
          {
            required: item.required || false,
            message: item.message ? item.message : `${item.label}必填`,
            max: item.limit ? item.limit : null,
          },
        ],
        initialValue: item.value,
      });
    } else {
      this.requiredDecorator = getFieldDecorator(item.name, {
        rules: [
          {
            required: item.required || false,
            message: item.message ? item.message : `${item.label}必填`,
          },
        ],
        initialValue: item.value,
      });
    }

    switch (item.type) {
      //文本框
      case 'text':
        html = (
          <span>
            {this.requiredDecorator(
              <input
                readOnly={item.readonly || false}
                style={{ width: item.width ? item.width : null }}
                type={item.rule ? item.rule : 'text'}
                min={item.min ? item.min : 'null'}
                max={item.max ? item.max : 'null'}
              />
            )}
            {item.required ? <span style={{ color: 'red' }}> *</span> : null}
          </span>
        );
        break;
      case 'password':
        html = <span>{this.requiredDecorator(<input type="password" />)}</span>;
        break;
      case 'password_confirm':
        html = (
          <span>
            {this.requiredDecorator(
              <input
                type="password"
                onBlur={e =>
                  this.conformPassword(e.target.value, item.name, item.target)
                }
              />
            )}
          </span>
        );
        break;
      //select选框
      case 'select':
        html = (
          <span>
            {this.requiredDecorator(
              <select
                onChange={e => this.onRelateSelect(e.target.value, item.target)}
              >
                {item.options.map((i, k) => {
                  return (
                    <option key={k} value={i.value}>
                      {i.text}
                    </option>
                  );
                })}
              </select>
            )}
            {item.required ? <span style={{ color: 'red' }}> *</span> : null}
          </span>
        );
        break;
      //长文本框
      case 'textarea':
        html = (
          <span>{this.requiredDecorator(<textarea rows="5" cols="40" />)}</span>
        );
        break;
      //日期选框
      case 'date':
        html = (
          <span>
            {this.requiredDecorator(<input type="hidden" />)}
            <DatePicker
              animation="slide-up"
              calendar={
                <Calendar format={format} locale={cn} showDateInput={true} />
              }
              Value={moment(item.value)}
              onChange={value => this.onDateChange(value, item.name)}
            >
              {({ value }) => {
                return (
                  <span tabIndex="0">
                    <input
                      readOnly
                      tabIndex="-1"
                      value={(value && value.format(format)) || item.value}
                    />
                  </span>
                );
              }}
            </DatePicker>
            {item.required ? <span style={{ color: 'red' }}> *</span> : null}
          </span>
        );
        break;
      //纯文本
      case 'plaintext':
        html = <span>{item.text}</span>;
        break;
      //联动选择器
      case 'cascader':
        html = (
          <span>
            <Cascader
              options={item.options}
              onChange={value => this.onCascaderChange(value, item.name)}
            >
              {this.requiredDecorator(<input />)}
            </Cascader>
            {item.required ? <span style={{ color: 'red' }}> *</span> : null}
          </span>
        );
        break;
      //发送短信验证码
      case 'vcode':
        html = (
          <span>
            {this.requiredDecorator(<input />)}
            <Button
              type="info"
              className="send_code"
              onClick={() => this.onSend(item.target)}
              disabled={Number.isInteger(waitTime) ? 'disabled' : ''}
            >
              {waitTime}
            </Button>
          </span>
        );
        break;
      //短信模板选择
      case 'sms_tmpl_select':
        html = (
          <span>
            {this.requiredDecorator(
              <select
                onChange={e => this.onTmplSelect(e.target.value, item.target)}
              >
                {item.options.map((i, k) => {
                  return (
                    <option key={k} value={i.value}>
                      {i.text}
                    </option>
                  );
                })}
              </select>
            )}
          </span>
        );
        break;
      case 'editor':
        html = (
          <span>
            {this.requiredDecorator(<input type="hidden" />)}
            <JrEditor
              onChange={value => this.onCascaderChange(value, item.name)}
              content={item.value}
            />
          </span>
        );
        break;
    }
    return html;
  }

  //赋值
  onCascaderChange(value, name) {
    this.props.form.setFieldsValue({ [name]: value });
  }
  //日期选择
  onDateChange(value, name) {
    this.props.form.setFieldsValue({ [name]: value && value.format(format) });
  }
  //联动选择
  onRelateSelect(v, target) {
    if (target) {
      //二级联动
      this.props.elements.fieldSet.map(item => {
        //如果有target，则遍历datasource取出需要的数据放入options
        if (item.name === target) {
          item.options = [{ value: '0', text: '请选择' }];
          if (v.toString() !== '0' && item.dataSource) {
            item.dataSource.map(i => {
              if (i.parentValue === v) {
                item.options = [...item.options, ...[i]];
              }
            });
          }
          //二级以后的联动，递归调用
          if (item.target) {
            this.onRelateSelect('0', item.target);
          }
        }
      });
    }
  }
  //密码确认
  conformPassword(value, fieldname, target) {
    if (value) {
      const passwordNew = this.props.form.getFieldValue(target);
      if (passwordNew !== value) {
        this.props.form.setFields({
          [fieldname]: { errors: ['密码不一致，请重新输入'] },
        });
      }
    }
  }

  //发送验证码
  onSend(target) {
    const telephone = this.props.form.getFieldValue(target);
    if (telephone) {
      //调用发送短信验证码接口
      AjaxRequest(SEND_VCODE(), { telephone: telephone }, 'get').then(
        response => {
          const { message, code, entity } = response;
          if (code === SUCCESS) {
            this.setState({
              waitTime: entity.waitTime,
            });
            this.countdown();
            JrMessage.success('验证码发送成功');
          } else {
            //错误处理
            JrMessage.error(message);
          }
        }
      );
    } else if (!/^[1][0-9]{10}$/.test(telephone)) {
      JrMessage.error('请先输入正确手机号。');
    }
  }
  //发送验证码倒计时
  countdown() {
    const t = setInterval(() => {
      let waitTime = this.state.waitTime;
      if (waitTime > 0) {
        this.setState({
          waitTime: waitTime - 1,
        });
      } else {
        this.setState({
          waitTime: '再次获取',
        });
        clearInterval(t);
      }
    }, 1000);
  }
  //短信模板选择
  onTmplSelect(v, target) {
    if (target) {
      //查找短信内容字段
      this.props.elements.fieldSet.map(item => {
        //如果有target，则取出对应content
        if (item.name === target) {
          if (
            v.toString() !== '0' &&
            v.toString() !== '99' &&
            item.dataSource
          ) {
            item.dataSource.map(i => {
              if (i.value === v) {
                item.value = i.content;
                this.props.form.setFieldsValue({ [target]: i.content });
              }
            });
          } else if (v.toString() === '99') {
            item.value = '';
            this.props.form.setFieldsValue({ [target]: '' });
          }
        }
      });
    }
  }

  render() {
    let errors;
    const { getFieldError } = this.props.form;
    const { fieldSet } = this.props.elements;
    return (
      <div className="form_container">
        {fieldSet.map((item, key) => {
          if (item.type !== 'hidden') {
            return (
              <div key={key} className="JrTable">
                <label>{item.label}</label>
                <span className="table-span">
                  {this.renderElements(item)}
                  <b>
                    {(errors = getFieldError(item.name))
                      ? errors.join(',')
                      : null}
                  </b>
                </span>
              </div>
            );
          } else {
            this.renderElements(item);
          }
        })}
        <div className="rc-dialog-footer">
          <div className="jerry-dialog-footer">
            <Button onClick={() => this.submit()} type="primary">
              确定
            </Button>
            <Button type="button" onClick={() => this.props.close()}>
              取消
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
JrForm.propTypes = {
  elements: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired, //实现关闭dialog方法（visible改成false）
  reload: PropTypes.func,
};
export default createForm()(JrForm);
