import axios from "utils/Axios";

const url = "folders";

export function get(ref, onSuccess){
  axios
    .get(`${url}/${ref}`)
    .then((res) => onSuccess(res.data));
}

export function create(data, onSuccess){
  axios
    .post(`${url}/`, data)
    .then((res) => onSuccess(res.data));
}
