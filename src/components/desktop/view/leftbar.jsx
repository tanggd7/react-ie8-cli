import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { JrTree } from 'ui';
import { apiUrl, request } from 'tool';
import { onTabChange, onActiveKeyChange } from '../ducks';

// const {} = apiUrl;

// 创建菜单树
const creatMenuTree = (data, nodes = []) => {
  if (data) {
    data.map(item => {
      let obj = {};
      if (item.menus.length > 0) {
        obj = {
          id: item.menucode,
          name: item.menuname,
          children: creatMenuTree(item.menus),
        };
      } else {
        obj = {
          id: item.menucode,
          name: item.menuname,
          children: [],
        };
      }
      nodes.push(obj);
    });
  }
  return nodes;
};

// 根据 key，递归查找对应菜单内容。
const findItem = (arr, code) => {
  let result;
  for (const item of arr) {
    if (!result) {
      if (item.menucode === code) {
        result = item;
        break;
      }
      if (item.menus.length > 0) {
        const _result = findItem(item.menus, code);
        if (_result) {
          result = _result;
        }
      }
    }
  }
  return result;
};

class Leftbar extends Component {
  static propTypes = {
    tabs: PropTypes.array,
    onTabChange: PropTypes.func.isRequired,
    onActiveKeyChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: '',
      menuList: [], //菜单列表
      menuNodes: [], // 菜单树
      userName: '测试', // 用户姓名
      unitName: '测试单位', // 单位名称
    };
  }

  componentDidMount = () => {
    // TODO: 调用接口获取 menuList
    this.setState({ menuNodes: creatMenuTree(this.state.menuList) });
  };

  onRbSelect = treeNode => {
    const selectedKeys = treeNode.id;
    this.setState({ selectedKeys });

    const item = findItem(this.state.menuList, selectedKeys.toString());
    if (item) {
      const { menuname, menucode, menus } = item;
      if (!menus.length) {
        const content = <div />;
        // const content = <GetMenu code={menucode} />;
        const newTab = {
          name: menuname,
          code: menucode,
          content: content ? content : menuname,
        };

        //判断 tabs 内是否已存在相同 key
        const activeTab = this.props.tabs.filter(obj => obj.code === menucode);
        if (!activeTab.length) {
          this.props.onTabChange(this.props.tabs.concat(newTab));
        }

        // 保存当前选中标签页
        this.props.onActiveKeyChange(newTab.code);
      }
    }
  };

  render() {
    const { userName, unitName, menuNodes } = this.state;
    return (
      <div className="left">
        <div className="leftbar">
          <div className="user_info">
            <div className="title">用户信息</div>
            <div className="detail_container">
              <div className="detail">
                用户名：
                {userName}
              </div>
              <div className="detail">
                单位名称：
                {unitName}
              </div>
            </div>
          </div>
          <div className="menu">
            <div className="title">菜单列表</div>
            <div className="menu_list">
              {menuNodes.length > 0 && (
                <JrTree nodes={menuNodes} onClick={this.onRbSelect} />
              )}
            </div>
          </div>
        </div>
        <div className="toggle_left" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tabs: state.desktop.tabs,
});

const mapDispatchToProps = { onTabChange, onActiveKeyChange };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Leftbar);
