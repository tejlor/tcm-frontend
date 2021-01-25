import ImgPreview from "./ImgPreview";
import PdfPreview from "./PdfPreview";
import * as FileApi from "api/FileApi";
import Card from "components/commons/Card";
import FileSaver from "file-saver";
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class ElementPreview extends React.Component {
  
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      notAvailable: false
    };

    this.onDownloadContentClick = this.onDownloadContentClick.bind(this);
  }

  componentDidMount() {
    this.init();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.elementRef !== this.props.elementRef) {
      this.init();
    }
  }

  onPreviewClick(){
    this.downloadPreview(this.props.elementRef);
  }

  init() {
    if (!this.props.element)
      return;
    
    let element = this.props.element;

    if (!element.previewMimeType) {
      this.setState({
        ...this.state,
        notAvailable: true
      });
    }
    else {
      this.downloadPreview(element.ref);
    }
  }

  downloadPreview(ref) {
    FileApi.preview(ref, (blob) => {
      let src = URL.createObjectURL(blob);
      this.setState({
        ...this.state,
        src: src
      }); 
    });
  }

  onDownloadContentClick() {
    FileApi.content(this.props.elementRef, (blob) => {
      FileSaver.saveAs(blob, this.props.element.name);
    });
  }

  render() {
    let body;
    if(this.state.notAvailable === true) {
      body = (
        <div className="element-preview">
          <div>
          <p>File preview is not available.<br/>Please click button to download content.</p>
            <button onClick={this.onDownloadContentClick} className="w3-button w3-theme-d5"><i className="fas fa-download" /> &nbsp;Download</button>
            </div>
        </div>
      );
    }
    else if (this.state.src) {
      if (this.props.element.previewMimeType === "image/jpg") {
        body = (
          <ImgPreview file={this.state.src}/>
        );
      }
      else if (this.props.element.previewMimeType === "application/pdf") {
        body = (
          <PdfPreview file={this.state.src}/>
        );
      }
    }
    else {
      body = (
        <div className="element-preview">
          <p>Please wait...</p>
        </div>
      );
    }

    return (
      <Card title="Preview" defaultOpen>
        {body}
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  elementRef: state.repository.details.elementRef,
  element: state.repository.details.element
});

const mapDispatchToProps = (dispatch) => ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ElementPreview));