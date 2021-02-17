import App from "./App";
import reducers from "./reducers/_reducers";
import { unregister } from './serviceWorker';
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";

const store = createStore(reducers, applyMiddleware(thunk));
window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

unregister(); // serviceWorker
