import "./FeatureDialog.scss";

import * as FeatureApi from "api/repo/FeatureApi";
import * as React from "react";
import * as TableActions from "actions/table";

import { Dialog, Row } from "components/commons/Dialog";

import { Checkbox } from "react-icheck";
import DialogMode from "enums/DialogMode";
import FeatureAttributeType from "enums/FeatureAttributeType";
import If from "components/commons/utils/If";
import Select from "react-select-v1/lib/Select";
import { connect } from "react-redux";
import { enum2ComboBox } from "enums/Enum";
import { toastr } from 'react-redux-toastr';

class UserDialog extends React.Component {
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      row: undefined
    };

    this.onAddAttributeClick = this.onAddAttributeClick.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.row !== this.props.row) {
      let _row = { ...this.props.row };
      if (_row.attributes === undefined) {
        _row.attributes = [];
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

  onAddAttributeClick() {
    let _attributes = this.state.row.attributes;
    _attributes.push({
      id: null,
      name: "",
      type: "",
      required: false
    });
    this.updateRowValue("attributes", _attributes);
  }

  onDeleteAttributeClick(idx) {
    let _attributes = this.state.row.attributes;
    _attributes.splice(idx, 1);
    this.updateRowValue("attributes", _attributes);
  }

  onAttrNameChange(idx, event) {
    let value = event.target.value;
    this.updateAttributeValue(idx, "name", value);
  }

  onAttrTypeChange(idx, option) {
    let value = option !== null ? option.value : undefined; 
    this.updateAttributeValue(idx, "type", value);
  }

  onAttrRequiredChange(idx, event, checked) {
    this.updateAttributeValue(idx, "required", checked);
  }

  updateAttributeValue(idx, name, value) {
    let _attributes = this.state.row.attributes;
    _attributes[idx][name] = value;
    this.updateRowValue("attributes", _attributes);
  }

  onSave() {
    let row = this.state.row;

    if (!row.name) {
      toastr.warning("Name is required.");
      return;
    }

    if (!row.code) {
      toastr.warning("Code is required.");
      return;
    }

    if (!row.id) {
      FeatureApi.create(row,
        (data) => {
          toastr.success("Feature created sucessfully.");
          this.props.doCloseDialog();
          this.props.doReloadTableRows();
        });
    }
    else {
      FeatureApi.update(row,
        (data) => {
          toastr.success("Feature updated sucessfully.");
          this.props.doCloseDialog();
          this.props.doReloadTableRows();
        });
    }
  }

  render() {
    let { mode } = this.props;
    let row = this.state.row;
    if (row === undefined) return null;

    let attributeRows = row.attributes.map((attribute, idx) => {
      return (
        <div className="w3-row form-inline">
          <div className="w3-col m11">
            <div className="w3-col m2 label">
              <label className="bold">Name:</label>
            </div>
            <div className="w3-col m3 value">
              <input type="text" className="w3-input w3-border w3-round" value={attribute.name} onChange={this.onAttrNameChange.bind(this, idx)} readOnly={false} />
            </div>
            <div className="w3-col m2 label">
              <label className="bold">Type:</label>
            </div>
            <div className="w3-col m3 value">
              <Select options={enum2ComboBox(FeatureAttributeType)} value={attribute.type} onChange={this.onAttrTypeChange.bind(this, idx)} disabled={false} placeholder="Select" clearable={false} />
            </div>
            <div className="w3-col m2 w3-right-align value">
              <Checkbox checkboxClass="icheckbox_flat-blue" label="&nbsp;required" checked={attribute.required} onChange={this.onAttrRequiredChange.bind(this, idx)} />
            </div>
          </div>
          <div className="w3-col m1 trash">
            <i className="far fa-trash-alt pointer" title="Delete" onClick={this.onDeleteAttributeClick.bind(this, idx)}/>
          </div>
        </div>
      );
    });

    return (
      <Dialog
        title="Feature" 
        className="feature-dialog"
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
        <Row
          label="Code"
          value={row.code}
          enabled={mode === DialogMode.ADD || mode === DialogMode.EDIT}
          onChange={this.onTextChange.bind(this, "code")}
        />
        <div className="attributes">{attributeRows}</div>
        <If cond={mode === DialogMode.ADD || mode === DialogMode.EDIT}>
          <button className="w3-button w3-round w3-theme" onClick={this.onAddAttributeClick}>Add attribute</button>
        </If>
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