import * as ElementApi from 'api/ElementApi';
import Tree from 'rc-tree';
import 'rc-tree/assets/index.css';
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { DIRECTORY_SEPARATOR } from 'utils/Constants';
import Path from "utils/Path";

class RepoTree extends React.Component {
  
  static defaultProps = {

  };

  constructor(props) {
    super(props);

    this.state = {
      treeData: [],
      expandedKeys: []
    };

    this.onLoadData = this.onLoadData.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onExpand = this.onExpand.bind(this);
  }

  componentDidMount() {
    
  }

  componentDidUpdate(prevProps) {
    if (prevProps.folderRef !== this.props.folderRef) {
      ElementApi.parentsTree(this.props.folderRef, (data) => {
        this.setState({
          ...this.state,
          treeData: [this.elementToNode(data)],
          expandedKeys: this.props.path.split(DIRECTORY_SEPARATOR)
        });
      });
    }
  }

  onLoadData(node) {
    if (!node)
      return;
    
    var parentKey = node.props.eventKey;

    return new Promise(resolve => {
        ElementApi.childrenTree(parentKey, (data) => {    
          let _treeData = [...this.state.treeData];
          this.updateTree(_treeData, parentKey, data);
          this.setState({
            treeData: _treeData
          });
        });
        resolve();
    });
  }

  updateTree(treeData, parentKey, children) {
    treeData.forEach(item => {
      if (item.isLeaf === true)
        return;

      if (item.key === parentKey) {
        item.children = children.map(e => this.elementToNode(e));
      }
      else if(item.children) {
        this.updateTree(item.children, parentKey, children)
      }
    });
  }

  onSelect(selectedKeys, event) {
    var ref = selectedKeys[0];    
    var isLeaf = event.node.props.isLeaf;
    if (!ref || isLeaf)
      return;
    
    this.props.history.push(Path.repository + Path.browse(ref));
  }

  onExpand(expandedKeys) {
    this.setState({
      ...this.state,
      expandedKeys: expandedKeys,
    })
  }

  elementToNode(element) {
    return {
      key: element.ref,
      title: element.name,
      isLeaf: element.leaf,
      selectable: !element.leaf,
      children: element.children ? element.children.map(e => this.elementToNode(e)) : null
    };
  }

  render() {
    return (
      <Tree
        className="repoTree"
        treeData={this.state.treeData}
        expandedKeys={this.state.expandedKeys}
        onExpand={this.onExpand}
        onSelect={this.onSelect}
        loadData={this.onLoadData}
      />   
    );
  }
}

const mapStateToProps = (state) => ({
  folderRef: state.repository.browse.folderRef,
  path: state.repository.browse.currentPath.refs
});

const mapDispatchToProps = (dispatch) => ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RepoTree));
