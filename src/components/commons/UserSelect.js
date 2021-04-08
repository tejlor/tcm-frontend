import * as React from "react";
import * as UserApi from "api/adm/UserApi";

import Select from "react-select-v1";

export default class UserSelect extends React.Component {
  static defaultProps = {
    value: undefined,
    multi: true,
    disabled: false,
    onChange: () => {}
  };

  constructor(props) {
    super(props);
    this.state = {
      users: []
    };

    this.loadUsers();
  }

  loadUsers() {
    UserApi.getAll(data => {
      let _users = data.map(u => ({
        label: u.lastName + ' ' + u.firstName,
        value: u.id
      }));
      this.setState({
        ...this.state,
        users: _users
      });
    });
  }

  render() {    
    return (
      <Select value={this.props.value} options={this.state.users} multi={this.props.multi} disabled={this.props.disabled} className="select-inline w200"
        onChange={this.props.onChange} placeholder="Select" clearable={true} />
    );
  }
}