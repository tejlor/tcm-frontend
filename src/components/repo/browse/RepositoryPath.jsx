import"./RepositoryPath.scss"

import * as React from "react";

import { DIRECTORY_SEPARATOR } from "utils/Constants";
import { Link } from "react-router-dom";
import Path from "utils/Path";
import { connect } from "react-redux";

class RepositoryPath extends React.Component {
  static defaultProps = {};

  constructor(props) {
    super(props);   
    this.state = {};
  }
  
  render() {
    if (!this.props.path.refs)
      return null;
    
    let names = this.props.path.names.split(DIRECTORY_SEPARATOR);
    let refs = this.props.path.refs.split(DIRECTORY_SEPARATOR);

    let elements = [<i className="fas fa-desktop" key={-1} />, "\u00A0"];
    for (let i = 0; i < refs.length; i++){
      if (i < refs.length - 1) {
        elements.push(<Link to={Path.repo + Path.browse(refs[i])} key={refs[i]} >{names[i]}</Link>);
        elements.push("\u00A0");
        elements.push(<i className="fas fa-angle-right" key={i} />);
        elements.push("\u00A0");
      }
      else {
        elements.push(<span key={refs[i]} >{names[i]}</span>);
      }
    }

    return (
      <div className="repository-path">
        {elements}
      </div> 
    );
  }
}

const mapStateToProps = (state) => ({
  path: state.repo.path
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(RepositoryPath);