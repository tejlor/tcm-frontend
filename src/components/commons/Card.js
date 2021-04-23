import "./Card.scss";

import * as React from "react";

import CardMode from "enums/CardMode";
import If from "./utils/If";

export default class Card extends React.Component {
  static defaultProps = {
    animated: true,
    title: undefined,
    defaultOpen: false,
    editable: false,
    onEditModeChange: (editMode) => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      open: this.props.defaultOpen === true || this.props.animated === false,
      editMode: false
    };

    this.onOpenerClick = this.onOpenerClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
  }

  onOpenerClick() {
    this.setState({
      ...this.state,
      open: !this.state.open
    });
  }

  onEditClick() {
    this.setState({
      ...this.state,
      editMode: !this.state.editMode
    });
    this.props.onEditModeChange(CardMode.EDIT);
  }

  onSaveClick() {
    this.setState({
      ...this.state,
      editMode: false
    });
    this.props.onEditModeChange(CardMode.SAVE);
  }

  onCancelClick() {
    this.setState({
      ...this.state,
      editMode: false
    });
    this.props.onEditModeChange(CardMode.CANCEL);
  }

  render() {
    let transform = this.state.open === true ? "rotate(180deg)" : "rotate(0deg)";
    let cardOpen = this.state.open === true ? "card-open" : "";

    return (
      <div className={"w3-card w3-round w3-white w3-container card " + cardOpen}>
        <header className="w3-row">
          <If cond={this.props.animated}>
            <div className="w3-col w3-right opener">
              <h3>
                <i className="fas fa-chevron-down" style={{ transform: transform }} onClick={this.onOpenerClick} />
              </h3>
            </div>
          </If>
          <div className="w3-rest">
            <h3>
              {this.props.title}
              <If cond={this.props.editable && !this.state.editMode}>
                <i className="fas fa-edit pointer w3-margin-left" title="Edit" onClick={this.onEditClick} />
              </If>
              <If cond={this.state.editMode}>
                <i className="far fa-save pointer w3-margin-left" title="Save" onClick={this.onSaveClick} />
                <i className="far fa-times-circle pointer" title="Cancel" onClick={this.onCancelClick} />
              </If>
            </h3>
          </div>
        </header>
        <div className="body">
          <div className="body-in">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
