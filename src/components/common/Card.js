import If from "./utils/If";
import * as React from "react";

export default class Card extends React.Component {
  static defaultProps = {
    animated: true,
    title: undefined,
    defaultOpen: false
  };

  constructor(props) {
    super(props);

    this.state = {
      open: this.props.defaultOpen === true || this.props.animated === false
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    let transform = this.state.open === true ? "rotate(180deg)" : "rotate(0deg)";
    let cardOpen = this.state.open === true ? "card-open" : "";

    return (
      <div className={"w3-card w3-round w3-white w3-container card " + cardOpen}>
        <div className="w3-row">
          <If cond={this.props.animated}>
            <div className="w3-col w3-right opener">
              <h3>
                <i className="fas fa-chevron-down" style={{ transform: transform }} onClick={this.onClick} />
              </h3>
            </div>
          </If>
          <div className="w3-rest">
            <h3>{this.props.title}</h3>
          </div>
        </div>
        <div className="body">
          <div className="body-in">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
