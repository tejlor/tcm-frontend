import axios from "utils/Axios";

const url = "elements";

export function get(ref, onSuccess){
  axios
    .get(`${url}/${ref}`)
    .then((res) => onSuccess(res.data));
}

export function path(ref, onSuccess){
  axios
    .get(`${url}/${ref}/path`)
    .then((res) => onSuccess(res.data));
}

export function childrenTree(parentRef, onSuccess){
  axios
    .get(`${url}/${parentRef}/childrenTree`)
    .then((res) => onSuccess(res.data));
}

export function parentsTree(ref, onSuccess){
  axios
    .get(`${url}/${ref}/parentsTree`)
    .then((res) => onSuccess(res.data));
}

export function childrenTable(ref, params, onSuccess) {
  axios
    .get(`${url}/${ref}/childrenTable`, {
      params: params
    })
    .then((res) => onSuccess(res.data));
}

export function rename(data){
  axios
    .post(`${url}/rename`, data);
}

export function move(data, onSuccess){
  axios
    .post(`${url}/move`, data)
    .then((res) => onSuccess(res.data));
}

export function copy(data, onSuccess) {
  axios
    .post(`${url}/copy`, data)
    .then((res) => onSuccess(res.data));
}

export function remove(refs, onSuccess){
  axios
    .delete(`${url}/remove?refs=${refs.join(',')}`)
    .then((res) => onSuccess(res.data));
}
