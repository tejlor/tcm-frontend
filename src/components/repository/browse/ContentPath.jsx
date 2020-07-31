import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { DIRECTORY_SEPARATOR } from "utils/Constants";
import Path from "utils/Path";


class ContentPath extends React.Component {
  
  static defaultProps = {

  };

  constructor(props) {
    super(props);
    
    this.state = {
     
    };
  }
  
  render() {
    if (!this.props.path.refs)
      return null;
    
    let names = this.props.path.names.split(DIRECTORY_SEPARATOR);
    let refs = this.props.path.refs.split(DIRECTORY_SEPARATOR);

    let elements = [<i className="fas fa-desktop" key={-1} />, "\u00A0"];
    for (let i = 0; i < refs.length; i++){
      elements.push(<Link to={Path.repository + Path.browse(refs[i])} key={refs[i]} >{names[i]}</Link>);
      elements.push("\u00A0");
      elements.push(<i className="fas fa-angle-right" key={i} />);
      elements.push("\u00A0");
    }
    if (elements.length > 0) {
      elements.pop();
      elements.pop();
      elements.pop();
    }

    return (
      <div class="contentPath">
        {elements}
      </div> 
    );
  }
}

const mapStateToProps = (state) => ({
  path: state.repository.browse.currentPath
});

const mapDispatchToProps = ({

});

export default connect(mapStateToProps, mapDispatchToProps)(ContentPath);
