import axios from "utils/Axios";

const url = "userGroups";

export function getAll(onSuccess){
  axios
    .get(`${url}`)
    .then((res) => onSuccess(res.data));
}

export function table(params, onSuccess) {
  axios
    .get(`${url}/table`, {
      params: params
    })
    .then((res) => onSuccess(res.data));
}

export function add(data, onSuccess) {
  axios
    .post(`${url}`, data)
    .then((res) => onSuccess(res.data));
}

export function update(data, onSuccess) {
  axios
    .put(`${url}/${data.id}`, data)
    .then((res) => onSuccess(res.data));
}

export function exportToXlsx(onSuccess) {
  axios
    .get(`${url}/xlsx`, {
      responseType: "blob"
    })
    .then(res => {
      let blob = new Blob([res.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      onSuccess(blob)
    });
}
