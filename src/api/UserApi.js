import axios from "utils/Axios";

const url = "users";

export function getAll(onSuccess){
  axios
    .get(`${url}`)
    .then((res) => onSuccess(res.data));
}

