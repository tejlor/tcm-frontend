import * as TableActions from "actions/table";
import * as DirectoryApi from 'logic/DirectoryApi';
import * as React from "react";
import { connect } from "react-redux";
import ReactTable from "react-table-6";
import { formatDiagnosticsWithColorAndContext } from "typescript";

class ContentList extends React.Component {
  static defaultProps = {
    parentRef: undefined
  };

  columns = [
    {
      Header: <span className="w3-left">Data</span>,
      id: "main",
      accessor: row => <div><h4>{row.name}</h4><p>{row.ref}</p></div>
    },
    {
      Header: <span className="w3-left">Data 2</span>,
      id: "main2",
      accessor: row => "X"
    }
  ];

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
    };

    this.loadData = this.loadData.bind(this);
    this.onLoadData = this.onLoadData.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    DirectoryApi.list(this.props.parentRef, (data) => {
      this.props.doDataSetLoaded(data);
    });
  }

  onLoadData(state, instance) {
    this.setState({
      loading: true
    });
     Axios.post('mysite.com/data', {
       page: state.page,
       pageSize: state.pageSize,
       sorted: state.sorted,
       filtered: state.filtered
     })
       .then((res) => {
         // Update react-table
         this.setState({
           data: res.data.rows,
           pages: res.data.pages,
           loading: false
         })
       })
  }

  render() {
    return (
      <div>
        <ReactTable
          columns={this.columns}
          manual
          data={this.state.data}
          onFetchData={this.onLoadData}
           
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  doDataSetLoaded: TableActions.dataSetLoaded,
  doOpenDialog: TableActions.openDialog
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentList);
