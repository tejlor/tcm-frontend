import axios from "utils/Axios";

const url = "files";

export function get(ref, success){
  axios
    .get(`${url}/${ref}`, success)
    .then((res) => success(res.data));
}

export function preview(ref, success){
  axios
    .get(`${url}/${ref}/preview`, {
      responseType: "blob"
    })
    .then(res => {
      let blob = new Blob([res.data], { type: "image/jpeg" });
      success(blob)
    });
}

export function content(ref, success){
  axios
    .get(`${url}/${ref}/content`, {
      responseType: "blob"
    })
    .then(res => {
      let blob = new Blob([res.data]);
      success(blob)
    });
}

export function zip(refs, success){
  axios
    .get(`${url}/zip?refs=${refs.join(',')}`, {
      responseType: "blob"
    })
    .then(res => {
      let blob = new Blob([res.data], { type: "application/zip" });
      success(blob)
    });
}

export function upload(data, onProgress, success){
  axios
    .post(`${url}/`, data, { onUploadProgress: onProgress })
    .then(res => success(res.data));
}

