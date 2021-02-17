import "./RepositoryTree.scss";
import 'rc-tree/assets/index.css';

import * as ElementApi from 'api/ElementApi';
import * as React from "react";

import { DIRECTORY_SEPARATOR } from 'utils/Constants';
import Path from "utils/Path";
import Tree from 'rc-tree';
import { connect } from "react-redux";
import { withRouter } from "react-router";

class RepositoryTree extends React.Component {
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      treeData: [],
      expandedKeys: []
    };

    this.loadData(this.props.folderRef);

    this.onLoadData = this.onLoadData.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onExpand = this.onExpand.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.folderRef !== this.props.folderRef) {
      this.loadData(this.props.folderRef);
    }
  }

  loadData(folderRef) {
    if (!folderRef)
      return;
    
    ElementApi.parentsTree(folderRef, (data) => {
      this.setState({
        ...this.state,
        treeData: [this.elementToNode(data)],
        expandedKeys: this.props.path.split(DIRECTORY_SEPARATOR)
      });
    });
  }

  onLoadData(node) {
    if (!node)
      return;
    
    let parentKey = node.props.eventKey;

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

  elementToNode(element) {
    return {
      key: element.ref,
      title: element.name,
      isLeaf: element.leaf,
      selectable: !element.leaf,
      children: element.children ? element.children.map(e => this.elementToNode(e)) : null
    };
  }

  onSelect(selectedKeys, event) {
    let ref = selectedKeys[0];    
    let isLeaf = event.node.props.isLeaf;
    if (!ref || isLeaf)
      return;
    
    this.props.history.push(Path.repo + Path.browse(ref));
  }

  onExpand(expandedKeys) {
    this.setState({
      ...this.state,
      expandedKeys: expandedKeys,
    })
  }

  render() {
    return (
      <Tree
        className="repository-tree"
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
  folderRef: state.repo.folder?.ref,
  path: state.repo.path.refs
});

const mapDispatchToProps = (dispatch) => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RepositoryTree));
