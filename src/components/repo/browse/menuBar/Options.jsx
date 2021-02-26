import * as ElementApi from "api/repo/ElementApi";
import * as FileApi from "api/repo/FileApi";
import * as React from "react";
import * as TableActions from 'actions/table';

import FileSaver from "file-saver";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";

class Options extends React.Component {
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {};

    this.onCut = this.onCut.bind(this);
    this.onCopy = this.onCopy.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onDownloadZip = this.onDownloadZip.bind(this);
  }

  onCut() {
    this.props.doSelectAction('move', this.getSelectedRefs());
  }

  onCopy() {
    this.props.doSelectAction('copy', this.getSelectedRefs());
  }

  onDelete() {
    toastr.confirm("Delete all selected elements?", {
      onOk: () => {
        ElementApi.remove(this.getSelectedRefs(), () => {
          toastr.success("Elements has been deleted.");
          this.props.doReloadRows();
        });
      }
    });
  }

  onDownloadZip() {
    FileApi.downloadAsZip(this.getSelectedRefs(), (blob) => {
      FileSaver.saveAs(blob, `TCM_files.zip`);
    });
  }
  
  getSelectedRefs() {
    return this.props.rows.filter(row => row.selected === true).map(row => row.ref);
  }

  render() {
    if (this.props.rows.filter(row => row.selected === true).length === 0)
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
  rows: state.table.rows
});

const mapDispatchToProps = (dispatch) => ({
  doReloadRows: () => dispatch(TableActions.reloadRows()),
  doSelectAction: (action, actionRows) => dispatch(TableActions.selectAction(action, actionRows))
});

export default connect(mapStateToProps, mapDispatchToProps)(Options);