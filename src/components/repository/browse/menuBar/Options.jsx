import { statement } from "@babel/template";
import * as TableActions from 'actions/repository/browse';
import * as RepositoryBrowseActions from "actions/repository/browse";
import * as ElementApi from "api/ElementApi";
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

    this.onCut = this.onCut.bind(this);
    this.onCopy = this.onCopy.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onDownloadZip = this.onDownloadZip.bind(this);
  }

  onCut() {
    this.props.doActionSelected(this.getSelectedRefs(), 'cut');
  }

  onCopy() {
    this.props.doActionSelected(this.getSelectedRefs(), 'copy');
  }

  onDelete() {
    toastr.confirm("Delete all selected elements?", {
      onOk: () => {
        ElementApi.deleteElements(this.getSelectedRefs(), () => {
          toastr.success("Elements has been deleted.");
          this.props.doLoadTableRows();
        });
      }
    });
  }

  onDownloadZip() {
    FileApi.zip(this.getSelectedRefs(), (data) => {
      var blob = new Blob([data], { type: "application/zip" });
      FileSaver.saveAs(blob, `TCM_files.xlsx`);
    });
  }
  
  getSelectedRefs() {
    return this.props.tableRows.filter(row => row.selected === true).map(row => row.ref);
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
          <button className="w3-bar-item w3-button" key="delete" onClick={this.onDelete}>
            <i className="fas fa-trash-alt"/> Delete
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
  tableRows: state.repository.browse.tableRows
});

const mapDispatchToProps = (dispatch) => ({
  doLoadTableRows: () => dispatch(TableActions.loadTableRows()),
  doActionSelected: (selectedRefs, action) => dispatch(TableActions.actionSelected(selectedRefs, action))
});

export default connect(mapStateToProps, mapDispatchToProps)(Options);
