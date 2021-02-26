import axios from "utils/Axios";

const url = "settings";

export function getSafe(onSuccess, onError){
  axios
    .get(`${url}/safe`)
    .then((res) => onSuccess(res.data))
    .catch(err => onError(err));
}

