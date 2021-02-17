import "./LoginPage.scss";

import * as OauthApi from "api/OauthApi";
import * as React from "react";

import { ACCESS_TOKEN_KEY, TOKEN_INFO_KEY } from "utils/Constants";

import Path from "utils/Path";
import { connect } from "react-redux";
import { handleGeneratedToken } from "utils/Axios";
import { toastr } from "react-redux-toastr";
import { withRouter } from "react-router-dom";

class LoginPage extends React.Component {
  static defaultProps = {};

  constructor(props){
    super(props);

    this.state = {
      email: "",
      password: ""
    }

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  componentDidMount() {
    this.validateUser();
  }

  validateUser() {
    if (this.props.currentUser){
      this.redirectToMainPage();
    }
    else {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(TOKEN_INFO_KEY);
    }
  }

  onEmailChange(event) {
    this.setState({
      ...this.state,
      email: event.target.value
    });
  }

  onPasswordChange(event) {
    this.setState({
      ...this.state,
      password: event.target.value
    });
  }

  onKeyPress(event) {
    if (event.key === "Enter") {
      this.onLogin();
		}
  }

  onLogin() {
    if (!this.state.email) {
      toastr.warning("Please enter email.");
      return;
    }
    if (!this.state.password) {
      toastr.warning("Please enter password.");
      return;
    }

    OauthApi.generateToken(this.state.email, this.state.password, 
      (data) => {
        handleGeneratedToken(data);
        this.redirectToMainPage();
      },
      (error) => {
        if (error.response.status === 400) {
          toastr.warning("Email or/and password are incorrect.");
        }
      });
  }

  redirectToMainPage() {
    this.props.history.push(Path.main);
  }

  render() {
    return (
      <div className="login-page w3-theme-l3">
        <div className="w3-card-4 login-form w3-white" >
          <div className="w3-center"><br />
            <img src="/img/user.svg" alt="User" style={{ width: "40%"}} className="w3-margin-top" />
          </div>
          <div className="w3-container" >
            <div className="w3-section">
              <label className="bold">E-mail</label>
              <input className="w3-input w3-border w3-margin-bottom" type="text" placeholder="Your e-mail" value={this.state.email}
                onChange={this.onEmailChange} onKeyPress={this.onKeyPress} required />
              <label className="bold">Password</label>
              <input className="w3-input w3-border" type="password" placeholder="Your password" value={this.state.password}
                onChange={this.onPasswordChange} onKeyPress={this.onKeyPress} required />
              <button className="w3-button w3-block w3-round w3-green w3-section w3-padding" onClick={this.onLogin} >Log in</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = (dispatch) => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));