import * as ElementApi from "api/repo/ElementApi";
import * as FeatureAPI from "api/repo/FeatureApi";
import * as React from "react";

import AddFeatureDialog from "./AddFeatureDialog";
import DialogMode from "enums/DialogMode";
import ElementFeature from "./ElementFeature";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";

class ElementFeatures extends React.Component {
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      dialogMode: DialogMode.HIDDEN,
      elementFeatures: [],
      featureOptions: []
    };

    this.onAddFeatureClick = this.onAddFeatureClick.bind(this);
    this.onCloseAddFeatureDialog = this.onCloseAddFeatureDialog.bind(this);
    this.onSaveAddFeatureDialog = this.onSaveAddFeatureDialog.bind(this);
  }

  componentDidMount() {
    this.initFeatures();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.element !== this.props.element) {
      this.initFeatures();
    }
  }

  initFeatures() {
    if (!this.props.element)
      return;
    
    let elementFeatureIds = this.props.element.features.map(feature => feature.id);
    FeatureAPI.getAll(data => {  
      let options = data
        .filter(feature => !elementFeatureIds.includes(feature.id))
        .map(feature => ({
          label: feature.name,
          value: feature.id
      }));
      this.setState({
        ...this.state,
        elementFeatures: this.props.element.features,
        featureOptions: options
      });
    });
  }

  onAddFeatureClick() {
    this.setState({
      ...this.state,
      dialogMode: DialogMode.ADD
    });
  }

  onCloseAddFeatureDialog() {
    this.setState({
      ...this.state,
      dialogMode: DialogMode.HIDDEN
    });
  }

  onSaveAddFeatureDialog(featureId) {
    this.onCloseAddFeatureDialog();
    ElementApi.addFeature(this.props.element.ref, featureId, (data) => {
      let _featureOptions = this.state.featureOptions.filter(option => option.value !== featureId);
      this.setState({
        ...this.state,
        features: data.features,
        featureOptions: _featureOptions
      })
      toastr.success("Feature was added. Please fill attributes.");
    });
  }

  render() {
    if (!this.props.element)
      return null;
    
    let cards = this.state.elementFeatures.map(feature => <ElementFeature element={this.props.element} feature={feature} key={feature.id} />);
    
    return (
      <>
        {cards}
        <button className="w3-button w3-round w3-theme" onClick={this.onAddFeatureClick}>Add feature</button>
        <AddFeatureDialog mode={this.state.dialogMode} options={this.state.featureOptions} onClose={this.onCloseAddFeatureDialog} onSave={this.onSaveAddFeatureDialog}/>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  element: state.repo.element
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ElementFeatures);
