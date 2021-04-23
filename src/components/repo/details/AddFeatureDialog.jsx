import * as React from "react";

import { Dialog, Row } from "components/commons/Dialog";

import DialogMode from "enums/DialogMode";

export default class AddFeatureDialog extends React.Component {
  static defaultProps = {
    mode: DialogMode.HIDDEN,
    featureOptions: [],
    onClose: () => { },
    onSave: (featureId) => { }
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedFeatureId: null
    };

    this.onSave = this.onSave.bind(this);
  }

  onSelectChange(option) {
    let value = option !== undefined ? option.value : undefined; 
    this.setState({
      ...this.state,
      selectedFeatureId: value
    });
  }

  onSave() {
    let featureId = this.state.selectedFeatureId;
    this.setState({
      ...this.state,
      selectedFeatureId: null
    })
    this.props.onSave(featureId);
  }

  render() {
    let mode = this.props.mode;
    return (
      <Dialog
        title="Add feature" 
        mode={mode} 
        onClose={this.props.onClose} 
        onSave={this.onSave}
      >
        <Row label="Feature"
          value={this.state.selectedFeatureId}
          options={this.props.featureOptions}
          enabled={true}
          onChange={this.onSelectChange.bind(this)} />
      </Dialog>
    );
  }
}
