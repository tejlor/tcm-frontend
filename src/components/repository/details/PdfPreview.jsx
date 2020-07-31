import * as React from "react";
import { Document, Page, pdfjs } from "react-pdf";


export default class PdfPreview extends React.Component {
  static defaultProps = {
    file: undefined
  };

  constructor(props) {
    super(props);

    this.state = {
      pageNo: 1,
      pageCount: undefined
    };

    pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.js";

    this.onLoadSuccess = this.onLoadSuccess.bind(this);
  }

  onLoadSuccess(doc) {
    this.setState({
      ...this.state,
      pageNo: 1,
      pageCount: doc.numPages,
    });
  }

  onChangePage(pageNo) {
    this.setState({
      ...this.state,
      pageNo: pageNo
    });
  }

  render() {
    if (!this.props.file)
      return null;
    
    return (
      <div class="w3-center">  
        <div class="w3-bar pdf-nav">
          <button class="w3-button" onClick={this.onChangePage.bind(this, 1)}><i className="fas fa-fast-backward"/></button>
          <button class="w3-button" onClick={this.onChangePage.bind(this, this.state.pageNo - 1)}><i className="fas fa-backward"/></button>
          <span>{this.state.pageNo} / {this.state.pageCount || "--"}</span>
          <button class="w3-button" onClick={this.onChangePage.bind(this, this.state.pageNo + 1)}><i className="fas fa-forward" /></button>
          <button class="w3-button" onClick={this.onChangePage.bind(this, this.state.pageCount)}><i className="fas fa-fast-forward"/></button>
        </div> 
        <Document file={this.props.file} onLoadSuccess={this.onLoadSuccess} renderMode="svg">
          <Page pageNumber={this.state.pageNo} />
        </Document>
      </div>
    );
  }
}
