import Pagination from "./Pagination";
import * as React from "react";
import ReactTable from "react-table-6";

export default class TableManual extends React.Component {

  static defaultProps = {
    columns: [],
    dataSet: [],
    pages: undefined,
    onReloadTableRows: undefined,
    loading: false,
    pageSize: undefined,
    getPaginationProps: undefined,
    getTrProps: undefined,
    SubComponent: undefined,
    onShowDialog: undefined
  };

  render() {
    let className = "-striped" + (this.props.onShowDialog ? " -highlight" : "");

    return (
      <ReactTable
        columns={this.props.columns}
        data={this.props.dataSet}
        pages={this.props.pages}
        onFetchData={this.props.onReloadTableRows}
        loading={this.props.loading}
        pageSize={this.props.pageSize}
        minRows={1}
        previousText="<<"
        nextText=">>"
        loadingText="Loading..."
        noDataText="No results"
        pageText="Page"
        ofText="of"
        rowsText="rows"
        pageJumpText="jump"
        rowsSelectorText="rows per page"
        className={className}
        SubComponent={this.props.SubComponent}
        getTrProps={this.props.getTrProps}
        getTdProps={(state, rowInfo, column) => {
          if (rowInfo && this.props.onShowDialog && column.id !== "options")
            return {
              onClick: (e) => {
                this.props.onShowDialog(rowInfo.original);
              },
              style: { cursor: "pointer" }
            };
          else return {};
        }}
        PaginationComponent={Pagination}
        getPaginationProps={this.props.getPaginationProps}
      />
    );
  }
}
