import * as DirectoryApi from 'logic/DirectoryApi';
import Tree, { TreeNode } from 'rc-tree';
import * as React from "react";

import 'rc-tree/assets/index.css';

/* 
  Tree:
  - icon  customize icon. When you pass component, whose render will receive full TreeNode props as component props element/Function(props)
  - loadedKeys mark node is loaded when loadData is true | string[]
  - prefixCls 	prefix class 	String 	'rc-tree'
  - selectable 	whether can be selected 	bool 	true
  - showIcon 	whether show icon 	bool 	true
  - showLine 	whether show line 	bool 	false
  - onExpand 	fire on treeNode expand or not 	function(expandedKeys, {expanded: bool, node, nativeEvent}) 	-
  - onMouseEnter 	call when mouse enter a treeNode 	function({event,node}) 	-
  - onMouseLeave 	call when mouse leave a treeNode 	function({event,node}) 	-
  - onRightClick 	select current treeNode and show customized contextmenu 	function({event,node}) 	-
  - onSelect 	click the treeNode to fire 	function(selectedKeys, e:{selected: bool, selectedNodes, node, event, nativeEvent}) 	-
  - switcherIcon 	specific the switcher icon. 	ReactNode / (props: TreeNodeAttribute) => ReactNode

  TreeNode:
  - className 	additional class to treeNode 	String 	''
  - style 	set style to treeNode 	Object 	''
  - title 	tree/subTree's title 	String/element 	'---'
  - key 	it's used with tree props's (default)ExpandedKeys / (default)CheckedKeys / (default)SelectedKeys. you'd better to set it, and it must be unique in the tree's all treeNodes 	String 	treeNode's position
  - isLeaf 	whether it's leaf node 	bool 	false
  - icon 	customize icon. When you pass component, whose render will receive full TreeNode props as component props 	element/Function(props) 	-
  - switcherIcon 	specific the switcher icon. 	ReactNode / (props: TreeNodeAttribute) => ReactNode 	-
*/
export default class RepoTree extends React.Component {
  static defaultProps = {

  };

  constructor(props) {
    super(props);

    this.state = {
      data: []
    };

    this.onLoadData = this.onLoadData.bind(this);
  }

  componentDidMount() {
    this.onLoadData(null);
  }

  onLoadData(node) {
    var parentRef = node ? node.props.eventKey : null;
    var parentElement = node ? node.props.element : null;

    DirectoryApi.list(parentRef, (data) => {    
      if (parentElement) {
        var newData = [...this.state.data];
        parentElement.children = data;
        this.setState({
          data: newData
        });
      }
      else {
        this.setState({
          data: data
        });
      }
    });
  }

  render() {
    const loop = (data) => {
      if (!data) return null;
      return data.map((item) => {
        if (item.children) {
          return <TreeNode title={item.name} key={item.ref}>{loop(item.children)}</TreeNode>;
        }
        return (
          <TreeNode title={item.name} key={item.ref} isLeaf={item.file} />
        );
      });
    };
    const treeNodes = loop(this.state.data);

    return (
      <Tree onSelect={this.onSelect} loadData={this.onLoadData}>
        {treeNodes}
      </Tree>   
    );
  }
}
