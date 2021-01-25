import qs from "querystring";
import axios from "utils/Axios";

export function generateToken(username, password, onSuccess, onError){
  const data = qs.stringify({
    grant_type: "password",
    username: username,
    password: password
  });

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    auth: {
      username: process.env.REACT_APP_AUTH_CLIENT_NAME,
      password: process.env.REACT_APP_AUTH_CLIENT_PASS,
    }
  };

  axios
    .post(`oauth/token`, data, config)
    .then(res => onSuccess(res.data))
    .catch(err => onError(err));
}
