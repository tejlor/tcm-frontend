import axios from "utils/Axios";

export function loadCurrentUser(success, error){
  axios
    .get(`accounts/current`)
    .then((res) => success(res.data))
    .catch(err => error(err));
}
