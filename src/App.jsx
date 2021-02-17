import "scss/main.scss";

import * as React from "react";

import { Route, Switch } from "react-router-dom";

import Authorize from "components/commons/layout/Authorize";
import Footer from "components/commons/layout/Footer";
import Header from "components/commons/layout/Header";
import LoginPage from "components/adm/myAccount/login/LoginPage";
import LogoutPage from "components/adm/myAccount/logout/LogoutPage";
import MainPage from "components/MainPage";
import Path from "utils/Path";
import ReduxToastr from "react-redux-toastr";
import RepositoryBrowsePage from "components/repo/browse/RepositoryBrowsePage";
import RepositoryDetailsPage from "components/repo/details/RepositoryDetailsPage";
import UsersPage from "components/adm/users/UsersPage";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path={Path.login} exact>
            <LoginPage />
          </Route>
          <Route path={Path.logout} exact>
            <LogoutPage />
          </Route>
          <Authorize>
            <Header />
            <div className="w3-content w3-container app-container">
              <Route path={Path.main} exact>
                <MainPage />
              </Route>
              <Route path={Path.adm + Path.users} exact>
                <UsersPage />
              </Route>
              <Route path={Path.repo + Path.browse()}>
                <RepositoryBrowsePage />
              </Route>
              <Route path={Path.repo + Path.details()}>
                <RepositoryDetailsPage />
              </Route>
            </div>
            <Footer />
          </Authorize>
        </Switch>

        <ReduxToastr timeOut={4000} preventDuplicates position="top-center" transitionIn="fadeIn" transitionOut="fadeOut" progressBar closeOnToastrClick />
      </div>
    );
  }
}
