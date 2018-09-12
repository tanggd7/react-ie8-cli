import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { onTabChange, onActiveKeyChange } from '../ducks';
import ClosePng from 'static/imgs/close.png';

import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import 'rc-tabs/assets/index.css';

const initTabs = [
  {
    name: '首页',
    code: 'index',
    content: <div />,
  },
];

class Center extends Component {
  static propTypes = {
    tabs: PropTypes.array,
    activeKey: PropTypes.string,
    onTabChange: PropTypes.func.isRequired,
    onActiveKeyChange: PropTypes.func.isRequired,
  };

  componentDidMount = () => {
    this.props.onTabChange(initTabs);
    this.props.onActiveKeyChange('index');
  };

  onChange = activeKey => {
    this.props.onActiveKeyChange(activeKey);
  };

  remove = code => {
    let foundIndex = 0;
    let tabs = this.props.tabs;
    const after = tabs.filter((t, i) => {
      if (t.code !== code) {
        return true;
      }
      foundIndex = i;
      return false;
    });
    let activeKey = this.props.activeKey;
    if (activeKey === code) {
      if (foundIndex) {
        foundIndex--;
      }
      activeKey = after[foundIndex].code;
    }
    this.props.onTabChange(after);
    this.props.onActiveKeyChange(activeKey);
  };

  render() {
    return (
      <div>
        <Tabs
          renderTabBar={() => <ScrollableInkTabBar />}
          renderTabContent={() => <TabContent animated={false} />}
          activeKey={this.props.activeKey}
          onChange={this.onChange}
        >
          {!!this.props.tabs &&
            this.props.tabs.map(tab => {
              return (
                <TabPane
                  tab={
                    <span>
                      {tab.name}
                      {tab.name !== '首页' && (
                        <a
                          className="close_tab"
                          onClick={() => {
                            this.remove(tab.code);
                          }}
                        >
                          <img src={ClosePng} />
                        </a>
                      )}
                    </span>
                  }
                  key={tab.code}
                >
                  <div>{tab.content}</div>
                </TabPane>
              );
            })}
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tabs: state.desktop.tabs,
  activeKey: state.desktop.activeKey,
});

const mapDispatchToProps = { onTabChange, onActiveKeyChange };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Center);
