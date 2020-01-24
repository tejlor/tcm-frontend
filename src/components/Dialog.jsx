import DialogMode from "enums/DialogMode";
import moment from "moment";
import * as React from "react";
import DatePicker from "react-datepicker";
import { Checkbox } from "react-icheck";
import { connect } from "react-redux";
import Select from "react-select-v1";
import { dateToMoment, null2Str } from "utils/Utils";

export class Dialog extends React.Component {
  static defaultProps = {
    mode: DialogMode.HIDDEN,
    title: "",
    modalClass: "",
    saveText: undefined,
    buttons: undefined,
    onClose: () => {},
    onSave: () => {}
  };

  render() {
    var saveText = this.props.saveText;
    if (!saveText) {
      if (this.props.mode === DialogMode.ADD)
        saveText = "Dodaj";
      else if (this.props.mode === DialogMode.EDIT)
        saveText = "Zapisz";
    }
    
    return (
      <div className="w3-modal" style={this.props.mode !== DialogMode.HIDDEN ? { display: "block" } : { display: "none" }}>
        <div className={"w3-modal-content w3-animate-top " + this.props.modalClass}>
          <header className="w3-container w3-display-container w3-blue">
            <span onClick={this.props.onClose} className="w3-button w3-display-right" style={{padding: "11px 16px"}}>
              <i className="fa fa-times w3-xlarge" />
            </span>
            <h4>{this.props.title}</h4>
          </header>
          <div className="w3-padding">
            {this.props.children}
          </div>
          <footer className="w3-padding w3-light-grey">
            {this.props.buttons
              ? this.props.buttons
              : <div className="w3-bar w3-center">
                <button className="w3-button w3-round w3-red" onClick={this.props.onClose}>Zamknij</button>
                &nbsp;
                {saveText && <button className="w3-button w3-round w3-green" onClick={this.props.onSave}>{saveText}</button>}          
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
    textarea: false,
    calendar: false,
    checkbox: false,
    month: false,
    year: false,
    raw: false,
    onChange: undefined
  };

  render() {
    if(!this.props.visible)
      return null;

    return (
      <div className="w3-row form-inline">
        <div className="w3-col m4 label">
          <label><b>{this.props.label}:</b></label>
        </div>
        <div className="w3-col m8 value">
          <RowControlCmp {...this.props} />
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
    textarea: false,
    calendar: false,
    checkbox: false,
    month: false,
    year: false,
    raw: false,
    onChange: undefined
  };

  render() {
    var { value, enabled, options, pattern, textarea, calendar, checkbox, raw, month, year, onChange} = this.props;

    if (raw) {
      return <p>{value}</p>;
    }
    else if (options) {
      return <Select value={value} options={options} onChange={onChange} disabled={!enabled} placeholder="Wybierz" clearable={false} />;
    }
    else if (calendar) {
      var selectedDate = value ? dateToMoment(value) : null;
      return (
        <DatePicker
          dateFormat="YYYY-MM-DD"
          className="w3-input w3-border w3-round"
          selected={selectedDate}
          onChange={onChange}
          placeholderText="Wybierz datę"
          disabled={!enabled}
          highlightDates={this.props.holidays}
        />
      );
    }
    else if (month) {
      var months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"].map((el, index) => {
        return {
          label: el,
          value: index
        };
      });

      return <Select
        className="select-inline w200"
        value={value}
        onChange={onChange}
        options={months}
        disabled={!enabled}
        clearable={false} />  
    }
    else if (year) {
      var thisYear = moment().year();
      var years = [];
      for (var i = thisYear - 1; i <= thisYear + 1; i++) {
        years.push({
          label: i,
          value: i
        });
      }

      return <Select
        className="select-inline w200"
        clearable={false}
        value={value}
        onChange={onChange}
        disabled={!enabled}
        options={years}
      />;
    }
    else if (textarea) {
      return <textarea className="w3-input w3-border w3-round" value={null2Str(value)} onChange={onChange} disabled={!enabled} />; 
    }
    else if (checkbox) {
      return <Checkbox checkboxClass="icheckbox_flat-blue" label="&nbsp;" checked={value === true} onChange={onChange} />
    }
    else {
      return <input type="text" className="w3-input w3-border w3-round" value={null2Str(value)} onChange={onChange} disabled={!enabled} pattern={pattern} />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    holidays: state.session.holidays
  };
};

const RowControlCmp = connect(mapStateToProps)(RowControl);