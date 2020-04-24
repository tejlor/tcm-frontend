import * as TableActions from "actions/table";
import * as ElementApi from 'logic/ElementApi';
import Tree from 'rc-tree';
import 'rc-tree/assets/index.css';
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { ROOT_REF } from 'utils/Constants';
import Path from "utils/Path";


class RepoTree extends React.Component {
  static defaultProps = {

  };

  constructor(props) {
    super(props);

    this.state = {
      dataSet: [{
        key: ROOT_REF,
        title: "Main catalog",
        isLeaf: false
        }
      ]
    };

    this.onLoadData = this.onLoadData.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  componentDidMount() {
    this.onLoadData();
  }

  onLoadData(node) {
    var parentKey = node ? node.props.eventKey : ROOT_REF;

    return new Promise(resolve => {
        ElementApi.childrenTree(parentKey, (data) => {    
          var _dataSet = [...this.state.dataSet];
          this.updateTree(_dataSet, parentKey, data);
          this.setState({
            dataSet: _dataSet
          });
        });
        resolve();
    });
  }

  updateTree(dataSet, parentKey, children) {
    dataSet.forEach(item => {
      if (item.isLeaf === true)
        return;

      if (item.key === parentKey) {
        item.children = children.map(e => {
          return {
            key: e.ref,
            title: e.name,
            isLeaf: e.leaf
          }
        });
      }
      else if(item.children) {
        this.updateTree(item.children, parentKey, children)
      }
    });
  }

  onSelect(selectedKeys, event) {
    var ref = selectedKeys[0];
    var isLeaf = event.node.isLeaf;

    //this.props.doTreeSelected(ref);
    this.props.history.push(Path.repository.replace(":parentRef", ref));
  }

  render() {
    return (
      <Tree treeData={this.state.dataSet} loadData={this.onLoadData} onSelect={this.onSelect} />   
    );
  }
}

const mapStateToProps = (state) => {
  return {
    
  };
};

const mapDispatchToProps = {
  doTreeSelected: TableActions.treeSelected,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RepoTree));
