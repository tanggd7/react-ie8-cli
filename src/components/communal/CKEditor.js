import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
const loadScript = require('load-script');

let defaultScriptUrl = 'http://cdn.bootcss.com/ckeditor/4.9.2/ckeditor.js';

/**
 * @author codeslayer1
 * @description CKEditor component to render a CKEditor textarea with defined configs and all CKEditor events handler
 */
class CKEditor extends React.Component {
  constructor(props) {
    super(props);

    //Bindings
    this.onLoad = this.onLoad.bind(this);

    //State initialization
    this.state = {
      isScriptLoaded: props.isScriptLoaded,
    };
  }

  //load ckeditor script as soon as component mounts if not already loaded
  componentDidMount() {
    if (!this.state.isScriptLoaded) {
      loadScript(this.props.scriptUrl, this.onLoad);
    } else {
      this.onLoad();
    }
  }

  componentWillReceiveProps(props) {
    const editor = this.editorInstance;
    if (editor && editor.getData() !== props.content) {
      editor.setData(props.content);
    }
  }

  componentWillUnmount() {
    this.unmounting = true;
  }

  onLoad() {
    if (this.unmounting) return;

    this.setState({
      isScriptLoaded: true,
    });

    if (!window.CKEDITOR) {
      return;
    }
    /*eslint-disable */
    this.editorInstance = window.CKEDITOR.appendTo(
      ReactDOM.findDOMNode(this),
      this.props.config,
      this.props.content
    );
    /*eslint-enable */
    //Register listener for custom events if any
    for (let event in this.props.events) {
      let eventHandler = this.props.events[event];

      this.editorInstance.on(event, eventHandler);
    }
  }

  render() {
    return <div className={this.props.activeClass} />;
  }
}

CKEditor.defaultProps = {
  content: '',
  config: {},
  isScriptLoaded: false,
  scriptUrl: defaultScriptUrl,
  activeClass: '',
  events: {},
};

CKEditor.propTypes = {
  content: PropTypes.any,
  config: PropTypes.object,
  isScriptLoaded: PropTypes.bool,
  scriptUrl: PropTypes.string,
  activeClass: PropTypes.string,
  events: PropTypes.object,
};

export default CKEditor;
