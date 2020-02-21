import axios from "utils/Axios";

export function children(parentRef, success){
  axios
    .get(parentRef ? `elements/{parentRef}/children` : `elements/root/children`)
    .then((res) => success(res.data));
}
