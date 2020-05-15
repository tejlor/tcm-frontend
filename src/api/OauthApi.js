import axios from "utils/Axios";
import qs from "querystring";

export function generateToken(username, password, success, error){
   var data = qs.stringify({
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
    .then(res => success(res.data))
    .catch(err => error(err));
}
