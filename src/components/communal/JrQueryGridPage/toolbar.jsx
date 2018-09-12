import React, { Component, PropTypes } from 'react';
import JrMessage from '../JrMessage';
import Button from '../Button';
import { request, apiUrl } from 'tool';

const { MENU_USERMENU_BUTTONS } = apiUrl;

// 工具栏组件默认 state
const defaultToolbarState = {
  visible: false, // 是否展示功能
  MyDialog: <div />, // 按钮对应组件
  title: '',
  param: {}, // toolbar 文件中设置的 params 参数
};

class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.state = { ...defaultToolbarState, toolbar: [] };
  }

  static propTypes = {
    menucode: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    toolbar: PropTypes.array,
    reloadGrid: PropTypes.func,
    getSelectRows: PropTypes.func,
    getConditions: PropTypes.func,
  };

  static defaultProps = {
    reloadGrid: () => {},
    getSelectRows: () => {},
    getConditions: () => {},
  };

  componentWillMount = () => {
    const { menucode, toolbar } = this.props;
    // 如果传入 menucode 则查询接口查看当前用户能显示出的按钮。
    if (!!menucode && !!toolbar) {
      request
        .get(MENU_USERMENU_BUTTONS(this.props.menucode))
        .then(({ entity }) => {
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
        });
    } else {
      // 如果没有传入 menucode 就显示所有按钮
      this.setState({ toolbar: this.props.toolbar });
    }
  };

  // 销毁按钮组件
  destroy = () => {
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
                destroy={this.destroy}
              />
            )}
        </div>
      )
    );
  }
}

export default Toolbar;
