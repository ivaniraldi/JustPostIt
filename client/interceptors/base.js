import axios from "axios";
import responseInterceptor from "./responseInterceptors";
import requestInterceptor from "./requestInterceptors";

const localhost = "https://justposthis.herokuapp.com";
const Api = axios.create({
  baseURL: localhost,
});
responseInterceptor(Api);
requestInterceptor(Api);
export default Api;
