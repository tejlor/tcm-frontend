import * as RepositoryBrowseActions from "actions/repository/browse";
import * as React from "react";
import { connect } from "react-redux";

class OrderBy extends React.Component {
  
  static defaultProps = {};

  items = [
    {
      label: "Name",
      property: "name",
      asc: true
    },
    {
      label: "Name",
      property: "name",
      asc: false
    },
    {
      label: "Created time",
      property: "createdTime",
      asc: true
    },
    {
      label: "Created time",
      property: "createdTime",
      asc: false
    },
  ];

  constructor(props) {
    super(props);
    this.state = {};
  }

  onClick(item) {
    let _tableParams = {
      ...this.props.tableParams,
      sortBy: item.property,
      sortAsc: item.asc
    };

    this.props.doLoadTableRows(_tableParams);
  }
  
  render() {
    let { sortBy, sortAsc } = this.props.tableParams;
    let activeItem = this.items.filter(i => i.property === sortBy && i.asc === sortAsc)[0];
    let activeIcon = activeItem.asc ? "fa-sort-amount-down-alt" : "fa-sort-amount-up";

    return (
      <div className="w3-dropdown-hover w3-right w3-border-left">
        <button className="w3-button" ><i className={"fas " + activeIcon}/> {activeItem.label} <i className="fas fa-caret-down" /></button>
        <div className="w3-dropdown-content w3-bar-block w3-card-4" >
          {this.items.map(i => {
            let icon = i.asc ? "fa-sort-amount-down-alt" : "fa-sort-amount-up";
            let active = (i.property === this.props.tableParams.sortBy && i.asc === this.props.tableParams.sortAsc);
            let activeCss = active ? " w3-grey" : "";
            return (
              <button className={"w3-bar-item w3-button" + activeCss} key={i.property + i.asc} onClick={this.onClick.bind(this, i)}>
                <i className={"fas " + icon} /> {i.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tableParams: state.repository.browse.tableParams
});

const mapDispatchToProps = (dispatch) => ({
  doLoadTableRows: (tableParams) => dispatch(RepositoryBrowseActions.loadTableRows(tableParams))
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderBy);
