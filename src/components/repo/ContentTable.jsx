import * as TableActions from "actions/table";
import Pagination from "components/Pagination";
import fileIconVectorCatalog from "file-icon-vectors/dist/icons/classic/catalog.json";
import * as ElementApi from 'logic/ElementApi';
import * as React from "react";
import { connect } from "react-redux";
import ReactTable from "react-table-6";
import "scss/ContentTable.scss";
import { calcFileExtension, formatTime } from "utils/Utils";


class ContentList extends React.Component {
  
  static defaultProps = {
    parentRef: undefined
  };

  columns = [
    {
      Header: <span className="w3-left">Data</span>,
      id: "main",
      accessor: row => this.renderRow(row)
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      pageCount: 1,
      rowCount: 0,
      rowStart: 0,
      rowEnd: 0
    };
    console.log("cons");

    this.onFetchData = this.onFetchData.bind(this);
    this.getPaginationProps = this.getPaginationProps.bind(this);
  }

  componentDidMount() {
    console.log("mount");
  }

  componentDidUpdate(prevProps) {
    if (prevProps.parentRef !== this.props.parentRef) {
      console.log("update");
      this.loadData(0);
    }
  }

  onFetchData(state) {
    this.loadData(state.page);
  }

  loadData(page) {
    if (!this.props.parentRef)
      return;

    this.setState({
      loading: true
    });
    ElementApi.childrenTable(this.props.parentRef, {
      pageNo: page,
      pageSize: 10,
      //sorted: state.sorted,
      //filtered: state.filtered
    },
      (data) => {
        this.setState({
          loading: false,
          data: data.data,
          pageCount: data.pageCount,
          rowCount: data.rowCount,
          rowStart: data.rowStart,
          rowEnd: data.rowEnd
        });
      });
  }

  renderRow(row) {
    var fileExtension;
    if (row.typeName === "Directory") {
      fileExtension = "folder";
    }
    else {
      fileExtension = calcFileExtension(row.name);
      if (!fileIconVectorCatalog.includes(fileExtension)) {
        fileExtension = "blank";
      }
    }

    return (
      <div className="w3-row">
        <div className="w3-col w3-center icon">
          <span className={"fiv-cla fiv-icon-" + fileExtension + " icon"} ></span>
        </div>
        <div className="w3-rest">
          <h4 className="margin-0">{row.name}</h4>
          <p className="w3-small w3-text-dark-grey margin-0">{row.ref}</p>
          <p className="margin-top">Created on <span className="highlight">{formatTime(row.createdTime)}</span> by <span className="highlight">{row.createdByName}</span></p>
          {row.modifiedTime && <p className="margin-0">Modified on <span className="highlight">{formatTime(row.modifiedTime)}</span> by <span className="highlight">{row.modifiedTByName}</span></p>}
        </div>
      </div>
    );
  }

  getPaginationProps() {
    return {
      rowCount: this.state.rowCount,
      rowStart: this.state.rowStart,
      rowEnd: this.state.rowEnd
    };
  }

  render() {
    return (
      <div className="content-table">
        <ReactTable
          columns={this.columns}
          className="-striped -highlight"
          manual
          onFetchData={this.onFetchData}
          loading={this.state.loading}
          data={this.state.data}
          pages={this.state.pageCount}
          pageSize={10}
          minRows={1}
          pageSizeOptions={[10, 20, 50, 1000]}
          defaultPageSize={10}
          PaginationComponent={Pagination}
          getPaginationProps={this.getPaginationProps}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = {
  doDataSetLoaded: TableActions.dataSetLoaded,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentList);
