import axios from "axios";
import responseInterceptor from "./responseInterceptors";
import requestInterceptor from "./requestInterceptors";

const localhost = "http://localhost:3001";
const Api = axios.create({
  baseURL: localhost,
});
responseInterceptor(Api);
requestInterceptor(Api);
export default Api;
