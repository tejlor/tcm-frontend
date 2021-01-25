import "./ImgPreview.scss";
import * as React from "react";

export default class PdfPreview extends React.Component {
  static defaultProps = {
    file: undefined
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    if (!this.props.file)
      return null;
    
    return (
      <img src={this.props.file} alt="preview" className="element-preview" />
    );
  }
}
