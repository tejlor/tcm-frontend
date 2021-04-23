import "./ElementFeature.scss";

import * as ElementApi from "api/repo/ElementApi";
import * as React from "react";

import { formatDate, formatTime, null2Str, strToDate, strToTime } from "utils/Utils";

import Card from "components/commons/Card";
import CardMode from "enums/CardMode";
import { Checkbox } from "react-icheck";
import DatePicker from "react-datepicker";
import FeatureAttributeType from "enums/FeatureAttributeType";
import { toastr } from "react-redux-toastr";

export default class ElementFeature extends React.Component {
  static defaultProps = {
    element: undefined,
    feature: undefined
  };

  constructor(props) {
    super(props);
    
    this.state = {
      originalValues: [],
      values: [],
      editable: false
    };

    this.loadData = this.loadData.bind(this);
    this.onCardEditModeChange = this.onCardEditModeChange.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.feature !== this.props.feature) {
      this.loadData();
    }
  }

  loadData() {
    if (!this.props.element || !this.props.feature)
      return;
  
    ElementApi.getFetureValues(this.props.element.ref, this.props.feature.code, data => {
      this.setState({
        originalValues: data,
        values: data
      });
    }); 
  }

  onCardEditModeChange(editMode) {
    switch (editMode) {
      case CardMode.EDIT:
        this.setState({
          ...this.state,
          editable: true
        });
        break;
      
      case CardMode.CANCEL:
        this.setState({
          ...this.state,
          editable: false,
          values: this.state.originalValues
        });
        break;
      
      case CardMode.SAVE:
        this.setState({
          ...this.state,
          editable: false
        });
        this.saveData();
        break;
    }
  }

  onTextChange(attributeId, event) {
    var value = event.target.value;
    this.onValueChange(attributeId, value);
  }

  onCheckChange(attributeId, event, checked) {
    this.onValueChange(attributeId, checked);
  }

  onDateChange(attributeId, date) {
    var value = formatDate(date);
    console.log(date, value);
    this.onValueChange(attributeId, value);
  }
  
  onTimeChange(attributeId, time) {
    var value = formatTime(time);
    this.onValueChange(attributeId, value);
  }

  onValueChange(attributeId, value) {
    let _values = this.state.values;
    _values.forEach(v => {
      if (v.attribute.id === attributeId) {
        v.value = value;
      }
    });

    this.setState({
      ...this.state,
      values: _values
    });
  }

  saveData() {
    ElementApi.saveFeatureValues(this.props.element.ref, this.state.values, (data) => {
      this.setState({
        ...this.state,
        values: data,
        originalValues: data
      });
      toastr.success("Attribute values were saved.");
    });
  }

  render() {
    if (!this.state.values)
      return null;
    
    let size = this.state.values.length;
    
    return (
      <Card title={this.props.feature.name} defaultOpen editable onEditModeChange={this.onCardEditModeChange}>
        <div className="w3-row element-feature">
          <div className="w3-col m6">
            <table className="w3-table">
              <tbody>
                {this.renderRows(this.state.values.slice(0, size / 2))}
              </tbody>
            </table>
          </div>
          <div className="w3-col m6">
            <table className="w3-table">
              <tbody>
                {this.renderRows(this.state.values.slice(size / 2))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    );
  }

  renderRows(attributeValues) {
    return attributeValues.map(attributeValue => (
      <tr key={attributeValue.attribute.id} >
        <td className="label">{attributeValue.attribute.name}:</td>
        <td className="value">{this.renderValueControl(attributeValue)}</td>
      </tr>
    ));
  }

  renderValueControl(attributeValue) {
    let editable = this.state.editable;
    let value = attributeValue.value;
    let attributeId = attributeValue.attribute.id;
    if (!editable) {
      return <span className="highlight">{value}</span>;
    }

    let type = attributeValue.attribute.type;
    switch (type) {
      case FeatureAttributeType.INT.value:
      case FeatureAttributeType.FLOAT.value:
      case FeatureAttributeType.DEC.value:
      case FeatureAttributeType.STRING.value:
        return <input type="text" className="w3-input w3-border w3-round" value={null2Str(value)} onChange={this.onTextChange.bind(this, attributeId)} />;
        
      case FeatureAttributeType.TEXT.value:
        return <textarea className="w3-input w3-border w3-round" value={null2Str(value)} onChange={this.onTextChange.bind(this, attributeId)} />; 
      
      case FeatureAttributeType.BOOL.value:
        return <Checkbox checkboxClass="icheckbox_flat-blue" label="&nbsp;" checked={value === true} onChange={this.onCheckChange.bind(this, attributeId)} />
      
      case FeatureAttributeType.DATE.value:
        let selectedDate = value ? strToDate(value) : null;
        return (
          <DatePicker
            dateFormat="yyyy-MM-dd"          
            className="w3-input w3-border w3-round"
            selected={selectedDate}
            placeholderText="Select date"
            onChange={this.onDateChange.bind(this, attributeId)}
          />
        );
      
      case FeatureAttributeType.TIME.value:
        let selectedTime = value ? strToTime(value) : null;
        return (
          <DatePicker
            dateFormat="yyyy-MM-dd HH:mm:ss"
            showTimeSelect
            className="w3-input w3-border w3-round"
            selected={selectedTime}
            placeholderText="Select time"
            onChange={this.onTimeChange.bind(this, attributeId)}
          />
        );
      
      default:
        return "An error occured";
    }
  }
}