import * as React from "react";
import ReduxToastr from "react-redux-toastr";
import { Route, Switch} from "react-router-dom";

import "App.scss";
import "file-icon-vectors/dist/file-icon-classic.min.css";
import "react-select-v1/dist/react-select.css";
import "react-table-6/react-table.css";

import Authorize from "components/Authorize";
import Footer from "components/Footer";
import Header from "components/Header";
import LoginPage from "components/myAccount/LoginPage";
import LogoutPage from "components/myAccount/LogoutPage";
import MainPage from "components/repo/MainPage";
import Path from "utils/Path";


export default class App extends React.Component {

  render() {
    return ( 
      <div>
        <Switch>
          <Route path={Path.myAccount + Path.login} component={LoginPage} />
          <Route path={Path.myAccount + Path.logOut} component={LogoutPage} />
          <Authorize>
            <Header />
            <div className="w3-content w3-container app-container">
                <Route path={Path.repository} exact component={MainPage} />
            </div>
            <Footer />
          </Authorize>  
        </Switch>

        <ReduxToastr timeOut={4000} preventDuplicates position="top-center" transitionIn="fadeIn" transitionOut="fadeOut" 
          progressBar closeOnToastrClick />
      </div>
    );
  }
}

