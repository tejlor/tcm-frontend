import * as React from "react";
import * as TableActions from "actions/table";
import * as UserGroupApi from "api/adm/UserGroupApi";

import { Dialog, Row } from "components/commons/Dialog";

import DialogMode from "enums/DialogMode";
import { connect } from "react-redux";
import { toastr } from 'react-redux-toastr'

class UserGroupDialog extends React.Component {
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      row: undefined,
    };

    this.onSave = this.onSave.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.row !== this.props.row) {
      this.setState({
        ...this.state,
        row: this.props.row
      });
    }
  }

  onTextChange(name, event) {
    var value = event.target.value;
    this.updateRowValue(name, value);
  }

  updateRowValue(name, value) {
    this.setState((prevState) => {
      var row = { ...prevState.row };
      row[name] = value;

      var newState = {
        ...prevState,
        row: row,
      };
      return newState;
    });
  }

  onSave() {
    var row = this.state.row;

    if (!row.name) {
      toastr.warning("Name is required.");
      return;
    }

    if (!row.id) {
      UserGroupApi.add(row,
        (data) => {
          toastr.success("User group created sucessfully.");
          this.props.doCloseDialog();
          this.props.doReloadTableRows();
        });
    }
    else {
      UserGroupApi.update(row,
        (data) => {
          toastr.success("User group updated sucessfully.");
          this.props.doCloseDialog();
          this.props.doReloadTableRows();
        });
    }
  }

  render() {
    var { mode } = this.props;
    var row = this.state.row;
    if (row === undefined) return null;

    return (
      <Dialog
        title="User group" 
        mode={mode} 
        onClose={this.props.doCloseDialog} 
        onSave={this.onSave}
      >
        <Row
          label="Id"
          value={row.id}
          raw
        />
        <Row
          label="Name"
          value={row.name}
          enabled={mode === DialogMode.ADD || mode === DialogMode.EDIT}
          onChange={this.onTextChange.bind(this, "name")}
        />
      </Dialog>
    );
  }
}

const mapStateToProps = (state) => ({
  mode: state.table.dialogMode,
  row: state.table.dialogRow
});

const mapDispatchToProps = (dispatch) => ({
  doCloseDialog: () => dispatch(TableActions.closeDialog()),
  doReloadTableRows: () => dispatch(TableActions.reloadRows())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserGroupDialog);