import axios from "utils/Axios";

export function list(ref, success){
  axios
    .get(ref ? `directories/list/{ref}` : `directories/list`)
    .then((res) => success(res.data));
}
