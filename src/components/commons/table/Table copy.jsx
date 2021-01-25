import Pagination from "./Pagination";
import * as React from "react";
import { connect } from "react-redux";
import ReactTable from "react-table-6";
import * as Utils from "utils/Utils";

class Table extends React.Component {

  static defaultProps = {
    columns: [],
    order: [],
    manual: true,
    onReloadTableRows: undefined,
    loading: false,
    dataSet: [],
    pages: 0,
    pageSize: 10,
    getPginationProps: undefined,
    getTrProps: undefined,
    showPageSizeOptions: true,
    SubComponent: undefined,
    onShowDialog: undefined
  };

  render() {
    let className = "-striped" + (this.props.onShowDialog ? " -highlight" : "");

    return (
      <ReactTable
        columns={this.props.columns}
        data={this.props.dataSet}
        manual={this.props.manual}
        onFetchData={onReloadTableRows}
        loading={this.props.loading}
        defaultSortMethod={Utils.sort}
        pageSizeOptions={[10, 20, 50, 1000]}
        pageSize={this.props.pageSize}
        minRows={1}
        pages={this.props.pages}
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
        showPageSizeOptions={showPageSizeOptions}
        SubComponent={SubComponent}
        getTrProps={getTrProps}
        getTdProps={(state, rowInfo, column) => {
          if (rowInfo && onShowDialog && column.id !== "options")
            return {
              onClick: (e) => {
                onShowDialog(rowInfo.original);
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

const mapStateToProps = (state) => {
  return {
    dataSet: state.table.filteredDataSet
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Table);