import axios from "axios";
import moment from "moment";
import qs from "querystring";
import { toastr } from "react-redux-toastr";
import Path from "utils/Path";
import { ACCESS_TOKEN_KEY, TOKEN_INFO_KEY } from "utils/Utils";


const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 5000
});

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

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 400) { // 400 - NASZ BŁĄD
      handle400(error);
    }
    else if (error.response.status === 401) { // 401 - BRAK DOSTĘPU
      return handle401(error);
    }
    else if (error.response.status === 404) { // 404 - NIE ZNALEZIONO
      handle404(error);
    }
    else if (error.response.status === 500) { // 500 - NIEZNANY BŁĄD
      handle500(error);
    }
    return Promise.reject(error);
  }
);

function handle400(error) {
  if (error.config.responseType === undefined) { // domyślnie = json
    if (error.response.data.statusCode === "BAD_REQUEST") { 
      toastr.warning("Uwaga", error.response.data.errorMessage);  
    }
    else {
      // toastr.warning("Uwaga", "Nieznany błąd. Kod: 400");
    }
  }
  else if(error.response.data.type === "application/json") { // ustawiony typ blob, ale może to nasz json
    const reader = new FileReader();
    reader.addEventListener('loadend', (e) => {
      var json = JSON.parse(e.srcElement.result);
      if (json.statusCode === "BAD_REQUEST") { 
        toastr.warning("Uwaga", json.errorMessage);  
      }
      else {
        // toastr.warning("Uwaga", "Nieznany błąd. Kod: 400");
      }
    });
    reader.readAsText(error.response.data);
  }
  else {
    // toastr.warning("Uwaga", "Nieznany błąd. Kod: 400");
  }
}

function handle401(error) {
  const originalReq = error.config;
  if (!originalReq.retry) { // pierwszy raz 401 -> odświeżamy token
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

    return instance   // request odświeżający token... 
      .post(`oauth/token`, data, config)
      .then(res => {
        handleGeneratedToken(res.data);
        return instance(originalReq); // ...zwraca oryginalny request
      })
      .catch(err => { 
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(TOKEN_INFO_KEY);
        window.location.href = Path.myAccount + Path.login;
      });
  }
  else {  // drugi raz 401 -> przelogowanie
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(TOKEN_INFO_KEY);
    window.location.href = Path.myAccount + Path.login;
  }
}

function handle404(error) {
  // jest ok
}

function handle500(error){
  if (error.config.responseType === undefined) { // domyślnie = json
    if (error.response.data.errorMessage === "Dostęp zabroniony")
      toastr.error("Błąd", "Brak dostępu.");
    else
      toastr.error("Błąd", "Wystapił błąd. Skontaktuj się z administratorem i przekaż mu czas wystąpienia: " + error.response.data.timestamp, { timeOut: 0 });
  }
  else if(error.response.data.type === "application/json") { // ustawiony typ blob, ale może to nasz json
    const reader = new FileReader();
    reader.addEventListener('loadend', (e) => {
      var json = JSON.parse(e.srcElement.result);
      if (json.statusCode === "INTERNAL_SERVER_ERROR") { 
        toastr.error("Błąd", "Wystapił błąd. Skontaktuj się z administratorem i przekaż mu czas wystąpienia: " + json.timestamp, { timeOut: 0 });
      }
      else {
        // toastr.warning("Uwaga", "Nieznany błąd. Kod: 500");
      }
    });
    reader.readAsText(error.response.data);
  }
  else {
    // toastr.warning("Uwaga", "Nieznany błąd. Kod: 500");
  }
}

export default instance;

export function handleGeneratedToken(data) {
  data.expire_time = moment().add(data.expire_time, 's').unix();
  localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);
  localStorage.setItem(TOKEN_INFO_KEY, JSON.stringify(data));
}
