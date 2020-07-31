import PdfPreview from "./PdfPreview";
import * as RepositoryDetailsActions from "actions/repository/details";
import * as FileApi from "api/FileApi";
import Card from "components/common/Card";
import FileSaver from "file-saver";
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Preview extends React.Component {
  static defaultProps = {

  };

  constructor(props) {
    super(props);

    this.state = {
    };

    this.onDownloadClick = this.onDownloadClick.bind(this);
  }

  componentDidMount() {
    this.prepare();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.element !== this.props.element) {
      this.prepare();
    }
  }

  onPreviewClick(){
    this.downloadPreview(this.props.element.ref);
  }

  prepare() {
    if (!this.props.element)
      return;
    
    let element = this.props.element;

    if (!element.previewMimeType) {
      this.setState({
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
        src: src
      }); 
    });
  }

  onDownloadClick() {
    FileApi.content(this.props.element.ref, (blob) => {
      FileSaver.saveAs(blob, this.props.element.name);
    });
  }

  render() {
    let body;
    if(this.state.notAvailable === true) {
      body = (
        <div className="elementPreview">
          <div>
          <p>File preview is not available.<br/>Please click button to download content.</p>
            <button onClick={this.onDownloadClick} className="w3-button w3-theme-d5"><i className="fas fa-download" /> &nbsp;Download</button>
            </div>
        </div>
      );
    }
    else if (this.state.src) {
      if (this.props.element.previewMimeType === "image/jpg") {
        body = (
          <img src={this.state.src} alt="preview" className="preview" />
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
        <div className="elementPreview">
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
  doSetElementRef: (elementRef) => dispatch(RepositoryDetailsActions.setElementRef(elementRef))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Preview));