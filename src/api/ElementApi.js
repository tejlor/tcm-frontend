import axios from "utils/Axios";

const url = "elements";

export function get(elementRef, success){
  axios
    .get(`elements/${elementRef}`)
    .then((res) => success(res.data));
}

export function parentsTree(elementRef, success){
  axios
    .get(`elements/${elementRef}/parentsTree`)
    .then((res) => success(res.data));
}

export function childrenTree(parentRef, success){
  axios
    .get(`elements/${parentRef}/childrenTree`)
    .then((res) => success(res.data));
}

export function childrenTable(parentRef, params, success){
  axios
    .get(`elements/${parentRef}/childrenTable`, {
      params: params
    })
    .then((res) => success(res.data));
}

export function path(elementRef, success){
  axios
    .get(`elements/${elementRef}/path`)
    .then((res) => success(res.data));
}

export function deleteElements(refs, success){
  axios
    .delete(`${url}/delete?refs=${refs.join(',')}`)
    .then((res) => success(res.data));
}
