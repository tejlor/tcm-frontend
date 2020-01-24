import moment from "moment";
import * as React from "react";
import ReduxToastr from "react-redux-toastr";
import { Route, Switch} from "react-router-dom";

import "App.css";
import "icheck/skins/flat/blue.css";
import "moment/locale/pl";
import "react-select-v1/dist/react-select.css";
import "react-table/react-table.css";

import Authorize from "components/Authorize";
import MainPage from "components/MainPage";
import LoginPage from "components/myAccount/LoginPage";
import LogoutPage from "components/myAccount/LogoutPage";
import Path from "utils/Path";


export default class App extends React.Component {
  constructor(props) {
    super(props);

    moment.locale("pl");
  }

  render() {
    const options = {
      okText: "Tak",
      cancelText: "Nie"
    };

    return ( 
      <div>
        <Switch>
          <Route path={Path.myAccount + Path.login} component={LoginPage} />
          <Route path={Path.myAccount + Path.logOut} component={LogoutPage} />
          <Authorize>
            <div className="w3-content w3-container app-container">
              <Route path={Path.main} exact component={MainPage} />
            </div>
          </Authorize>  
        </Switch>
         <ReduxToastr timeOut={4000} preventDuplicates position="top-center" transitionIn="fadeIn" transitionOut="fadeOut"
          progressBar closeOnToastrClick confirmOptions={options} />
      </div>
    );
  }
}

