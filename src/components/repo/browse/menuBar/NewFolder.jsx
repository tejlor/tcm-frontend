import * as FolderApi from "api/repo/FolderApi";
import * as React from "react";
import * as TableActions from "actions/table";

import { Dialog, Row } from "components/commons/Dialog";

import DialogMode from "enums/DialogMode";
import { connect } from "react-redux";
import {toastr} from "react-redux-toastr";

class NewFolder extends React.Component {
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

  onClose(reload) {
    this.setState({
      ...this.state,
      dialogMode: DialogMode.HIDDEN
    });
    if (reload === true) {
      this.props.doReloadTableRows();
    }
  }
  
  render() {
    return (
      <>
        <button className="w3-bar-item w3-button w3-border-right" onClick={this.onClick}>
          <i className="fas fa-folder-plus"></i> New Folder
        </button>
        <NewFolderDialog parentRef={this.props.folderRef} mode={this.state.dialogMode} onClose={this.onClose} />
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

export default connect(mapStateToProps, mapDispatchToProps)(NewFolder);


class NewFolderDialog extends React.Component {

  static defaultProps = {
    parenRef: undefined,
    mode: DialogMode.HIDDEN,
    onClose: (reload) => { },
  };

  constructor(props) {
    super(props);
    
    this.state = {
      folder: {
        name: undefined
      }
    };

    this.onSaveClick = this.onSaveClick.bind(this);
  }

  onValueChange(name, event) {
    var _folder = { ...this.state.folder };
    _folder[name] = event.target.value;
    this.setState({
      ...this.state,
      folder: _folder
    });
  }

  onSaveClick() {
    if (!this.state.folder.name) {
      toastr.warning("Name cannot be empty!");
      return;
    }

    let folder = { ...this.state.folder };
    folder.parentRef = this.props.parentRef;

    FolderApi.create(folder, (data) => {
      this.props.onClose(true);
      toastr.success("Folder created successfully.");
    });
  }

  render() {
    return (
      <Dialog
        mode={this.props.mode}
        title="Create new folder"
        className="small"
        onClose={this.props.onClose}
        onSave={this.onSaveClick}
      >
        <Row 
          label="Name" 
          value={this.state.folder.name} 
          onChange={this.onValueChange.bind(this, "name")} 
          enabled
        />
      </Dialog>
    );
  }
}
