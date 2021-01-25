import LoginPage from "components/adm/myAccount/login/LoginPage";
import LogoutPage from "components/adm/myAccount/logout/LogoutPage";
import Authorize from "components/commons/layout/Authorize";
import Footer from "components/commons/layout/Footer";
import Header from "components/commons/layout/Header";
import MainPage from "components/MainPage";
import RepositoryBrowsePage from "components/repo/browse/RepositoryBrowsePage";
import RepositoryDetailsPage from "components/repo/details/RepositoryDetailsPage";
import * as React from "react";
import ReduxToastr from "react-redux-toastr";
import { Route, Switch } from "react-router-dom";
import "scss/main.scss";
import Path from "utils/Path";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path={Path.myAccount + Path.login}>
            <LoginPage />
          </Route>
          <Route path={Path.myAccount + Path.logOut}>
            <LogoutPage />
          </Route>
          <Authorize>
            <Header />
            <div className="w3-content w3-container app-container">
              <Route path={Path.main} exact>
                <MainPage />
              </Route>
              <Route path={Path.repository + Path.browse()} exact>
                <RepositoryBrowsePage />
              </Route>
              <Route path={Path.repository + Path.details()} exact>
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
