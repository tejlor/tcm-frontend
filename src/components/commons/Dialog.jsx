import "./Dialog.scss";

import * as React from "react";

import { dateToMoment, null2Str } from "utils/Utils";

import { Checkbox } from "react-icheck";
import DatePicker from "react-datepicker";
import DialogMode from "enums/DialogMode";
import Select from "react-select-v1";

export class Dialog extends React.Component {
  
  static defaultProps = {
    mode: DialogMode.HIDDEN,
    title: "",
    className: "",
    saveText: undefined,
    buttons: undefined,
    onClose: () => {},
    onSave: () => {}
  };

  render() {
    let saveText = this.props.saveText !== undefined
      ? this.props.saveText
      : this.props.mode === DialogMode.ADD ? "Add" : "Save";

    let closeText = this.props.mode === DialogMode.ADD || this.props.mode === DialogMode.EDIT
      ? "Cancel"
      : "Close";
    
    let { mode, className, title, onClose, onSave, children, buttons } = this.props;
    
    return (
      <div className="w3-modal dialog" style={mode !== DialogMode.HIDDEN ? { display: "block" } : { display: "none" }}>
        <div className={"w3-modal-content w3-animate-top " + className}>
          <header className="w3-container w3-display-container w3-blue">
            <span className="w3-display-right">
              <i className="fa fa-window-close w3-xlarge" onClick={onClose} />
            </span>
            <h4>{title}</h4>
          </header>
          <div className="w3-padding">
            {children}
          </div>
          <footer className="w3-padding w3-border-top">
            {buttons
              ? buttons
              : <div className="w3-bar w3-right-align" >
                <button className="w3-button w3-round w3-white" onClick={onClose}>{closeText}</button>
                &nbsp;
                {saveText && <button className="w3-button w3-round w3-theme" onClick={onSave}>{saveText}</button>}          
              </div>
            }
          </footer>
        </div>
      </div>
    );
  }
}

export class Row extends React.Component {
  static defaultProps = {
    label: "",
    value: undefined,
    pattern: undefined,
    enabled: false,
    visible: true,
    options: undefined,
    multi: false,
    textarea: false,
    calendar: false,
    checkbox: false,
    raw: false,
    onChange: undefined
  };

  render() {
    if(!this.props.visible)
      return null;

    return (
      <div className="w3-row form-inline">
        <div className="w3-col m4 label">
          <label className="bold">{this.props.label}:</label>
        </div>
        <div className="w3-col m8 value">
          <RowControl {...this.props} />
        </div>
      </div>
    );
  }
}

class RowControl extends React.Component {
  static defaultProps = {
    value: undefined,
    enabled: false,
    pattern: undefined,
    options: undefined,
    multi: false,
    textarea: false,
    calendar: false,
    checkbox: false,
    raw: false,
    onChange: undefined
  };

  render() {
    let { value, enabled, options, multi, pattern, textarea, calendar, checkbox, raw, onChange} = this.props;

    if (raw) {
      return <p>{value}</p>;
    }
    else if (options) {
      return <Select value={value} options={options} multi={multi} onChange={onChange} disabled={!enabled} placeholder="Select" clearable={false} />;
    }
    else if (calendar) {
      var selectedDate = value ? dateToMoment(value) : null;
      return (
        <DatePicker
          dateFormat="YYYY-MM-DD"
          className="w3-input w3-border w3-round"
          selected={selectedDate}
          onChange={onChange}
          placeholderText="Select date"
          disabled={!enabled}
        />
      );
    }
    else if (checkbox) {
      return <Checkbox checkboxClass="icheckbox_flat-blue" label="&nbsp;" checked={value === true} onChange={onChange} />
    }
    else if (textarea) {
      return <textarea className="w3-input w3-border w3-round" value={null2Str(value)} onChange={onChange} readOnly={!enabled} />; 
    }
    else {
      return <input type="text" className="w3-input w3-border w3-round" value={null2Str(value)} onChange={onChange} readOnly={!enabled} pattern={pattern} />;
    }
  }
}