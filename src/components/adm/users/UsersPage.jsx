import * as React from "react";
import * as TableActions from "actions/table";
import * as UserApi from "api/UserApi";

import PageWithTable from "components/commons/layout/PageWithTable";
import TableManual from "components/commons/table/TableManual";
import UserDialog from "./UserDialog";
import { connect } from "react-redux";

class UsersPage extends React.Component {
  static defaultProps = {};

  columns = [
    {
      Header: <span className="w3-left">First name</span>,
      accessor: "firstName"
    },
    {
      Header: <span className="w3-left">Last name</span>,
      accessor: "lastName"
    },
    {
      Header: <span className="w3-left">E-mail</span>,
      accessor: "email"
    }
  ];
  order = [{ id: "lastName", desc: false }];

  constructor(props) {
    super(props);

    this.state = {}; 

    this.onReloadTableRows = this.onReloadTableRows.bind(this);
  }

  onReloadTableRows(tableState) {
    this.props.doLoadRows(UserApi.table, {
      pageNo: tableState.page,
      pageSize: tableState.pageSize,
      sortBy: tableState.sorted[0].id, 
      sortAsc: !tableState.sorted[0].desc,
      filter: this.props.tableParams.filter
    });
  }

  render() {
    return (
      <PageWithTable title="Users" onExportToXlsx={UserApi.exportToXlsx} >
        <TableManual
          columns={this.columns}
          order={this.order}
          onReloadTableRows={this.onReloadTableRows}
        />
        <UserDialog />
      </PageWithTable>
    );
  }
}

const mapStateToProps = (state) => ({
  tableParams: state.table.tableParams,
});

const mapDispatchToProps = (dispatch) => ({
  doOpenDialog: (row, mode) => dispatch(TableActions.openDialog(row, mode)),
  doLoadRows: (method, tableParams) => dispatch(TableActions.loadRows(method, tableParams)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);