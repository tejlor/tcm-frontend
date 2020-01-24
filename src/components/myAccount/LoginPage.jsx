
import qs from "querystring";
import * as React from "react";
import { GoogleLogin , GoogleLogout} from "react-google-login";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { withRouter } from "react-router-dom";
import axios, { handleGeneratedToken} from "utils/Axios";
import Path from "utils/Path";
import { ACCESS_TOKEN_KEY, TOKEN_INFO_KEY } from "utils/Utils";


class LoginPage extends React.Component {
  static defaultProps = {

  };

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
    this.onGoogleLogin = this.onGoogleLogin.bind(this);
  }

  componentWillMount() {
    console.log("will");
    this.validateUser();
  }

  validateUser(user = this.props.currentUser) {
    if (user)
      this.props.history.push(Path.basic + Path.timeEntries);
    else {
      console.log("del");
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
      toastr.warning("Wypełnij email");
      return;
    }
    if (!this.state.password) {
      toastr.warning("Wypełnij hasło");
      return;
    }

    var data = qs.stringify({
      grant_type: "password",
      username: this.state.email,
      password: this.state.password
    });

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      auth: {
        username: process.env.REACT_APP_AUTH_CLIENT_NAME,
        password: process.env.REACT_APP_AUTH_CLIENT_PASS,
      }
    }

    axios
      .post(`oauth/token`, data, config)
      .then(res => {
        this.handleToken(res.data);
      })
      .catch(err => {
        if (err.response.status === 400) {
          toastr.warning("Login i/lub hasło jest nieprawidłowe.");
        }
      });
  }

  onGoogleLogin(result) {
    if (!result.tokenId)
      return;
    
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(TOKEN_INFO_KEY);

    var data = qs.stringify({
      token: result.tokenId,
    });

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }

    axios
      .post(`Accounts/LoginByGoogle`, data, config)
      .then(res => {
        // nie potrzeba nam już sesji z Googla
        new GoogleLogout({ onLogoutSuccess: () => { } }).signOut();
        this.handleToken(res.data);
      });
  }

  handleToken(data) {
    handleGeneratedToken(data);
    this.redirectToMainPage();
  }

  redirectToMainPage() {
    this.props.history.push(Path.main);
  }

  GoogleButton(props) {
    return (
      <button className="w3-button w3-round w3-block google" onClick={props.onClick} >
        <i className="fab fa-google"/>&nbsp;&nbsp;Zaloguj z Google
      </button>
    );
  }

  render() {
    return (
      <div className="login-form-bckg w3-theme-l3">
        <div className="w3-card-4 login-form w3-white" style={{maxWidth:"600px"}}>
          <div className="w3-center"><br />
            <img src="/img/user.svg" alt="User" style={{ width: "30%"}} className="w3-margin-top" />
          </div>
          <div className="w3-container" >
            <div className="w3-section">
              <label><b>Email</b></label>
              <input className="w3-input w3-border w3-margin-bottom" type="text" placeholder="Wpisz email" value={this.state.email}
                onChange={this.onEmailChange} onKeyPress={this.onKeyPress} required />
              <label><b>Hasło</b></label>
              <input className="w3-input w3-border" type="password" placeholder="Wpisz hasło" value={this.state.password}
                onChange={this.onPasswordChange} onKeyPress={this.onKeyPress} required />
              <button className="w3-button w3-block w3-round w3-green w3-section w3-padding" onClick={this.onLogin} >Zaloguj</button>
              <p className="w3-center">lub</p>
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                render={this.GoogleButton}
                onSuccess={this.onGoogleLogin}
                onFailure={this.onGoogleLogin}
              />
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

const mapDispatchToProps = {

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));