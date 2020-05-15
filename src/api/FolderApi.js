import axios from "utils/Axios";

export function create(data, success){
  axios
    .post(`folders/`, data)
    .then((res) => success(res.data));
}

