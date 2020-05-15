import * as RepositoryBrowseActions from "actions/repository/browse";
import * as React from "react";
import { connect } from "react-redux";
import toastr from "react-redux-toastr";

class Filter extends React.Component {
  
  static defaultProps = {

  };

  timeoutId = null;

  constructor(props) {
    super(props);

    this.state = {
      filter: ""
    };

    this.onChange = this.onChange.bind(this);
    this.search = this.search.bind(this);
  }

  onChange(event) {
    this.setState({
      ...this.state,
      filter: event.target.value
    });
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(this.search, 500);
  }
  
  search() {
    let _tableParams = {
      ...this.props.tableParams,
      filter: this.state.filter
    };

    this.props.doLoadContentList(_tableParams);
  }

  render() {
    return (
      <div className="w3-right w3-border-left filter">
        <i className="fas fa-search" />
        <input type="text" className="filter" onChange={this.onChange} value={this.state.filter}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  parentRef: state.repository.browse.folderRef,
  tableParams: state.repository.browse.tableParams
});

const mapDispatchToProps = (dispatch) => ({
  doLoadContentList: (tableParams) => dispatch(RepositoryBrowseActions.loadTableRows(tableParams))
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
