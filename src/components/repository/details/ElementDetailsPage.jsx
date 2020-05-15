import * as RepositoryDetailsActions from "actions/repository/details";
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "utils/Axios";


class ElementDetailsPage extends React.Component {
  static defaultProps = {

  };

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    this.props.doSetElementRef(this.props.match.params.elementRef);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.elementRef !== this.props.match.params.elementRef) {
      this.props.doSetElementRef(this.props.match.params.elementRef);
    }
    else if (prevProps.element !== this.props.element) {
      console.log(this.props.element);
      this.setElementRef();
    }
  }

  setElementRef() {
    let { elementRef } = this.props.match.params;

    axios.get(`files/${elementRef}/content`, {
      responseType: "blob",
      timeout: 30000
    })
      .then(res => {
        var blob = new Blob([res.data], { type: "image/jpeg" });
        let src = URL.createObjectURL(blob);
        this.setState({
          ...this.state,
          src: src
        });
    });  
  }

  render() {
    return (
      <div className="w3-row">
        <div className="w3-col m9">
          <div className="w3-card w3-round w3-white w3-container">
            <h3>Element</h3>
            {this.state.src && <img src={this.state.src} width={800} alt="preview" />}
          </div>
        </div>
        <div className="w3-col m3">
          <div className="w3-card w3-round w3-white w3-container w3-margin-left w3-margin-right w3-margin-bottom">
            <h3>Properties</h3>
            <p>{this.props.elementRef}</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  elementRef: state.repository.details.elementRef,
  element: state.repository.details.element
});

const mapDispatchToProps = (dispatch) => ({
  doSetElementRef: (elementRef) => dispatch(RepositoryDetailsActions.setElementRef(elementRef))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ElementDetailsPage));