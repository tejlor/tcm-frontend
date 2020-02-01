import axios from "axios";
import qs from "querystring";
import { toastr } from "react-redux-toastr";
import Path from "utils/Path";
import { ACCESS_TOKEN_KEY, TOKEN_INFO_KEY } from "utils/Utils";


const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 5000
});

export default instance;

export function handleGeneratedToken(data) {
  localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);
  localStorage.setItem(TOKEN_INFO_KEY, JSON.stringify(data));
}

// add token to request
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log("REQ", error);
  }
);

// handle response error
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 400) { // 400 - known exception
      handle400(error);
    }
    else if (error.response.status === 401) { // 401 - access denied
      return handle401(error);
    }
    else if (error.response.status === 404) { // 404 - not found
      handle404(error);
    }
    else if (error.response.status === 500) { // 500 - unknown exception
      handle500(error);
    }
    return Promise.reject(error);
  }
);

function handle400(error) {
  if (error.config.responseType === undefined) { // default = json
    if (error.response.data.statusCode === "BAD_REQUEST") { 
      toastr.warning("Warning", error.response.data.errorMessage);  
    }
    else {
      // toastr.warning("Warning", "Unknown error. Code: 400");
    }
  }
  else if(error.response.data.type === "application/json") { // blob is set, but maybe it's our json
    const reader = new FileReader();
    reader.addEventListener('loadend', (e) => {
      var json = JSON.parse(e.srcElement.result);
      if (json.statusCode === "BAD_REQUEST") { 
        toastr.warning("Warning", json.errorMessage);  
      }
      else {
         // toastr.warning("Warning", "Unknown error. Code: 400");
      }
    });
    reader.readAsText(error.response.data);
  }
  else {
     // toastr.warning("Warning", "Unknown error. Code: 400");
  }
}

function handle401(error) {
  const originalReq = error.config;
  if (!originalReq.retry) { // first time -> refresh token
    var data = qs.stringify({
      grant_type: "refresh_token",
      refresh_token: JSON.parse(localStorage.getItem(TOKEN_INFO_KEY)).refresh_token 
    });

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      auth: {
        username: process.env.REACT_APP_AUTH_CLIENT_NAME,
        password: process.env.REACT_APP_AUTH_CLIENT_PASS,
      },
      retry: true
    }

    return instance   // refreshing token request... 
      .post(`oauth/token`, data, config)
      .then(res => {
        handleGeneratedToken(res.data);
        return instance(originalReq); // ...returns original request
      })
      .catch(err => { 
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(TOKEN_INFO_KEY);
        window.location.href = Path.myAccount + Path.login;
      });
  }
  else {  // second time -> redirect to login page
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(TOKEN_INFO_KEY);
    window.location.href = Path.myAccount + Path.login;
  }
}

function handle404(error) {
  // nothing
}

function handle500(error){
  if (error.config.responseType === undefined) { // default = json
    if (error.response.data.errorMessage === "Dostęp zabroniony")
      toastr.error("Error", "Access denied.");
    else
      toastr.error("Error", "An error occured. Please contact the administrator and give him the time: " + error.response.data.timestamp, { timeOut: 0 });
  }
  else if (error.response.data.type === "application/json") { // blob is set, but maybe it's our json
    const reader = new FileReader();
    reader.addEventListener('loadend', (e) => {
      var json = JSON.parse(e.srcElement.result);
      if (json.statusCode === "INTERNAL_SERVER_ERROR") { 
        toastr.error("Error", "An error occured. Please contact the administrator and give him the time: " + json.timestamp, { timeOut: 0 });
      }
      else {
        // toastr.warning("Warning", "Unknown error. Code: 500");
      }
    });
    reader.readAsText(error.response.data);
  }
  else {
    // toastr.warning("Warning", "Unknown error. Code: 500");
  }
}

