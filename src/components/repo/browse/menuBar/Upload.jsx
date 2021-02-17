import "./Upload.scss";

import * as FileApi from "api/FileApi";
import * as React from "react";
import * as TableActions from "actions/table";

import { Dialog } from "components/commons/Dialog";
import DialogMode from "enums/DialogMode";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";

class Upload extends React.Component {
  
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      dialogMode: DialogMode.HIDDEN
    };
  
    this.onClick = this.onClick.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onClick() {
    this.setState({
      ...this.state,
      dialogMode: DialogMode.ADD
    });
  }

  onClose() {
    this.setState({
      ...this.state,
      dialogMode: DialogMode.HIDDEN
    });
  }
  
  render() {
    return (
      <>
        <button className="w3-bar-item w3-button w3-border-right" onClick={this.onClick}>
          <i className="fas fa-upload"></i> Upload files
        </button>
        <UploadDialog folderRef={this.props.folderRef} mode={this.state.dialogMode} onClose={this.onClose} onReload={this.props.doReloadTableRows} />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  folderRef: state.repo.folder?.ref
});

const mapDispatchToProps = (dispatch) => ({
  doReloadTableRows: () => dispatch(TableActions.reloadRows())
});

export default connect(mapStateToProps, mapDispatchToProps)(Upload);


class UploadDialog extends React.Component {

  static defaultProps = {
    parentRef: undefined,
    mode: DialogMode.HIDDEN,
    onReload: () => { },
    onClose: () => { }
  };

  constructor(props) {
    super(props);
    
    this.state = {
      files: [],
      percent: undefined
    };

    this.onFileChange = this.onFileChange.bind(this);
    this.onUploadClick = this.onUploadClick.bind(this);
  }

  onFileChange(event) {
    this.setState({
      ...this.state,
      files: event.target.files
    });
  }

  onUploadClick() {
    if (!this.state.files) {
      toastr.warning("Choose minimum one file!");
      return;
    }

    let data = new FormData();
    data.append('dirRef', this.props.parentRef);
    for (let i = 0; i < this.state.files.length; i++) {
      data.append('files', this.state.files[i])
    }

    FileApi.upload(data,
      (progress) => {
        this.setState({
          ...this.state,
          percent: 100 * progress.loaded / progress.total
        });
      },
      (data) => {
        this.props.onReload();
        this.props.onClose();
        toastr.success("Files uploaded successfully.");
      });
  }

  render() {
    return (
      <Dialog
        mode={this.props.mode}
        title="Upload files"
        onClose={this.props.onClose}
        saveText={null}
      >
        <div className="upload-files">
          <input type="file" multiple onChange={this.onFileChange}/>
        </div>
        <ProgressBar percent={this.state.percent} />
        <button className="w3-button w3-block w3-theme-d3 upload" onClick={this.onUploadClick}>Upload</button>
      </Dialog>
    );
  }
}

function ProgressBar(props) {
  if (props.percent === undefined)
    return null;
  
  let value = props.percent + '%';

  return (
    <div className="w3-light-grey progress">
      <div className="w3-container w3-green w3-center" style={{width: value}}>{value}</div>
    </div>
  );
}
