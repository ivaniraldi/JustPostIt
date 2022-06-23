import axios from "axios";
import responseInterceptor from "./responseInterceptors";
import requestInterceptor from "./requestInterceptors";

const heroku = "https://justposthis.herokuapp.com";
const local = "http://localhost:3001";
const Api = axios.create({
  baseURL: heroku,
});
responseInterceptor(Api);
requestInterceptor(Api);
export default Api;
