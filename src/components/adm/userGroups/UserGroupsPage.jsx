import * as React from "react";
import * as TableActions from "actions/table";
import * as UserGroupApi from "api/adm/UserGroupApi";

import PageWithTable from "components/commons/layout/PageWithTable";
import TableManual from "components/commons/table/TableManual";
import UserGroupDialog from "./UserGroupDialog";
import { connect } from "react-redux";

class UserGroupsPage extends React.Component {
  static defaultProps = {};

  columns = [
    {
      Header: <span className="w3-left">Name</span>,
      accessor: "name"
    },
    {
      Header: <span className="w3-left">User count</span>,
      accessor: "userCount",
      width: 150
    }
  ];
  order = [{ id: "name", desc: false }];

  constructor(props) {
    super(props);

    this.state = {}; 

    this.onReloadTableRows = this.onReloadTableRows.bind(this);
  }

  onReloadTableRows(tableState) {
    this.props.doLoadRows(UserGroupApi.table, {
      pageNo: tableState.page,
      pageSize: tableState.pageSize,
      sortBy: tableState.sorted[0].id, 
      sortAsc: !tableState.sorted[0].desc,
      filter: this.props.tableParams.filter
    });
  }

  render() {
    return (
      <PageWithTable title="User groups" icon="fas fa-users" onExportToXlsx={UserGroupApi.exportToXlsx} >
        <TableManual
          columns={this.columns}
          order={this.order}
          onReloadTableRows={this.onReloadTableRows}
        />
        <UserGroupDialog />
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

export default connect(mapStateToProps, mapDispatchToProps)(UserGroupsPage);