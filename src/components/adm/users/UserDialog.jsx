import * as React from "react";
import * as TableActions from "actions/table";
import * as UserApi from "api/adm/UserApi";
import * as UserGroupApi from "api/adm/UserGroupApi";

import { Dialog, Row } from "components/commons/Dialog";

import DialogMode from "enums/DialogMode";
import { connect } from "react-redux";
import { toastr } from 'react-redux-toastr'

class UserDialog extends React.Component {
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      row: undefined,
      userGroupOptions: []
    };

    this.prepareUserGroupsOptions();

    this.onSave = this.onSave.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.row !== this.props.row) {
      let _row = { ...this.props.row };
      if (_row.groups) {
        _row.groups = _row.groups.map(g => g.id);
      }
      this.setState({
        ...this.state,
        row: _row
      });
    }
  }

  onTextChange(name, event) {
    var value = event.target.value;
    this.updateRowValue(name, value);
  }

  onMultiSelectChange(name, options) {
    var values = options !== null ? options.map(o => o.value) : []; 
    this.updateRowValue(name, values);
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
    let row = this.state.row;

    if (!row.email) {
      toastr.warning("E-mail address is required.");
      return;
    }

    if (row.groups) {
      row.groups = row.groups.map(v => ({id: v, name: null}));
    }

    if (!row.id) {
      UserApi.add(row,
        (data) => {
          toastr.success("User created sucessfully.");
          this.props.doCloseDialog();
          this.props.doReloadTableRows();
        });
    }
    else {
      UserApi.update(row,
        (data) => {
          toastr.success("User updated sucessfully.");
          this.props.doCloseDialog();
          this.props.doReloadTableRows();
        });
    }
  }

  prepareUserGroupsOptions() {
    UserGroupApi.getAll((data) => { 
      let _userGroupOptions = data.map(g => ({
        label: g.name,
        value: g.id
      }));
      this.setState({
        ...this.state,
        userGroupOptions: _userGroupOptions
      });
    });
  }

  render() {
    let { mode } = this.props;
    let row = this.state.row;
    if (row === undefined) return null;

    return (
      <Dialog
        title="User" 
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
          label="First name"
          value={row.firstName}
          enabled={mode === DialogMode.ADD || mode === DialogMode.EDIT}
          onChange={this.onTextChange.bind(this, "firstName")}
        />
        <Row
          label="Last name"
          value={row.lastName}
          enabled={mode === DialogMode.ADD || mode === DialogMode.EDIT}
          onChange={this.onTextChange.bind(this, "lastName")}
        />
        <Row
          label="E-mail"
          value={row.email}
          enabled={mode === DialogMode.ADD || mode === DialogMode.EDIT}
          onChange={this.onTextChange.bind(this, "email")}
        />
        <Row
          label="Groups"
          value={row.groups}
          options={this.state.userGroupOptions}
          multi
          enabled={mode === DialogMode.ADD || mode === DialogMode.EDIT}
          onChange={this.onMultiSelectChange.bind(this, "groups")}
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

export default connect(mapStateToProps, mapDispatchToProps)(UserDialog);