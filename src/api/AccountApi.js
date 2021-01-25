import axios from "utils/Axios";

const url = "accounts";

export function getCurrentUser(onSuccess, onError){
  axios
    .get(`${url}/current`)
    .then((res) => onSuccess(res.data))
    .catch(err => onError(err));
}

export function loginAs(userId, onSuccess){
  axios
    .post(`${url}/loginAs`, { userId: userId })
    .then((res) => onSuccess(res.data));
}

export function changePassword(data, onSuccess){
  axios
    .post(`${url}/changePassword`, data)
    .then((res) => onSuccess(res.data));
}
