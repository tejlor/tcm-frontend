import ContentPath from "./ContentPath";
import ContentTable from "./ContentTable";
import ContentBar from "./menuBar/ContentBar";
import RepoTree from "./RepoTree";
import * as RepositoryBrowseActions from "actions/repository/browse";
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";


class RepositoryBrowsePage extends React.Component {
  
  static defaultProps = {

  };

  constructor(props) {
    super(props);

    this.state = {
      
    };
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
        <div className="w3-col m3">
          <div className="w3-card w3-round w3-white w3-container">
            <h2><i className="fas fa-desktop" />Repository</h2>
            <RepoTree />
          </div>
        </div>
        <div className="w3-col m9">
          <div className="w3-card w3-round w3-white w3-container w3-margin-left w3-margin-right w3-margin-bottom">
            <h2><i className="fas fa-folder-open" />Content</h2>
            <ContentPath />
            <ContentBar />
            <ContentTable />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
 
});

const mapDispatchToProps = (dispatch) => ({
  doSetFolderRef: (folderRef) => dispatch(RepositoryBrowseActions.setFolderRef(folderRef))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RepositoryBrowsePage));