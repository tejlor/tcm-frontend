import { statement } from "@babel/template";
import * as RepositoryBrowseActions from "actions/repository/browse";
import * as FileApi from "api/FileApi";
import * as FolderApi from "api/FolderApi";
import { Dialog, Row } from "components/common/Dialog";
import DialogMode from "enums/DialogMode";
import FileSaver from "file-saver";
import * as React from "react";
import { connect } from "react-redux";
import toastr from "react-redux-toastr";

class Options extends React.Component {
  
  static defaultProps = {

  };

  constructor(props) {
    super(props);

    this.state = {
      
    };

    this.onDownloadZip = this.onDownloadZip.bind(this);
  }

  onDownloadZip() {
    let refs = this.props.tableRows.filter(row => row.selected === true).map(row => row.ref);
    FileApi.zip(refs, (data) => {
      var blob = new Blob([data], { type: "application/zip" });
      FileSaver.saveAs(blob, `TCM_files.xlsx`);
    });
  }
  
  render() {
    let disabled = true;
    for (let row of this.props.tableRows) {
      if (row.selected === true) {
        disabled = false;
        break;
      }
    }

    if (disabled)
      return null;

    return (
      <div className="w3-dropdown-hover w3-border-right">
        <button className="w3-button"><i className="fas fa-check-double" /> Selected <i className="fas fa-caret-down" /></button>
        <div className="w3-dropdown-content w3-bar-block w3-card-4" >
          <button className="w3-bar-item w3-button" key="cut" onClick={this.onCut}>
            <i className="fas fa-cut"/> Cut
          </button>
          <button className="w3-bar-item w3-button" key="copy" onClick={this.onCopy}>
            <i className="fas fa-copy"/> Copy
          </button>
          <button className="w3-bar-item w3-button w3-border-top" key="zip" onClick={this.onDownloadZip}>
            <i className="far fa-file-archive"/> Download as zip
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  parentRef: state.repository.browse.folderRef,
  tableRows: state.repository.browse.tableRows,
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Options);
