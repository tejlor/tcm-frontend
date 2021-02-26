import axios from "utils/Axios";

const url = "files";

export function get(ref, onSuccess){
  axios
    .get(`${url}/${ref}`)
    .then((res) => onSuccess(res.data));
}

export function preview(ref, onSuccess){
  axios
    .get(`${url}/${ref}/preview`, {
      responseType: "blob"
    })
    .then(res => {
      const blob = new Blob([res.data], { type: "image/jpeg" });
      onSuccess(blob)
    });
}

export function content(ref, onSuccess){
  axios
    .get(`${url}/${ref}/content`, {
      responseType: "blob"
    })
    .then(res => {
      const blob = new Blob([res.data]);
      onSuccess(blob)
    });
}

export function downloadAsZip(refs, onSuccess){
  axios
    .get(`${url}/zip?refs=${refs.join(',')}`, {
      responseType: "blob"
    })
    .then(res => {
      let blob = new Blob([res.data], { type: "application/zip" });
      onSuccess(blob)
    });
}

export function upload(data, onProgress, onSuccess){
  axios
    .post(`${url}/`, data, { onUploadProgress: onProgress })
    .then(res => onSuccess(res.data));
}

