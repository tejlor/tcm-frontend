import * as React from "react";
import * as RepoActions from "actions/repo";

import MenuBar from "./menuBar/MenuBar";
import RepositoryPath from "./RepositoryPath";
import RepositoryTable from "./RepositoryTable";
import RepositoryTree from "./RepositoryTree";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class RepositoryBrowsePage extends React.Component {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {}; 
  }

  componentDidMount() {
    this.props.doSetFolderRef(this.props.match.params.folderRef);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.folderRef !== this.props.match.params.folderRef) {
      this.props.doSetFolderRef(this.props.match.params.folderRef);
    }
  }

  render() {
    return (
      <div className="w3-row">
        <div className="w3-col m3 left">
          <div className="w3-card w3-round w3-white w3-container card">
            <h2><i className="fas fa-desktop" />Repository</h2>
            <RepositoryTree />
          </div>
        </div>
        <div className="w3-col m9 right">
          <div className="w3-card w3-round w3-white w3-container card">
            <h2><i className="fas fa-folder-open" />Content</h2>
            <RepositoryPath />
            <MenuBar />
            <RepositoryTable />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
 
});

const mapDispatchToProps = (dispatch) => ({
  doSetFolderRef: (folderRef) => dispatch(RepoActions.setFolder(folderRef))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RepositoryBrowsePage));