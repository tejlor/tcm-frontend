import axios from "utils/Axios";

const url = "files";

export function get(ref, success){
  axios
    .get(`${url}/${ref}`, success)
    .then((res) => success(res.data));
}

export function upload(data, onProgress, success){
  axios
    .post(`${url}/`, data, { onUploadProgress: onProgress })
    .then((res) => success(res.data));
}

