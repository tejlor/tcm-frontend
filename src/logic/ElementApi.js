import axios from "utils/Axios";


export function childrenTree(parentRef, success){
  axios
    .get(`elements/${parentRef}/childrenTree`)
    .then((res) => success(res.data));
}

export function childrenTable(parentRef, params, success){
  axios
    .get(`elements/${parentRef}/childrenTable?pageNo=${params.pageNo}&pageSize=${params.pageSize}`)
    .then((res) => success(res.data));
}
