import axios from "axios"
import configs from "../configs";
const token = "vZGxnVsgsJWhqmMQ6zKfA5At"

export default axios.create({
  baseURL: `${configs.apiUrl}/rodan/`,
  responseType: "json",
  headers: {
    'Authorization': `Bearer ${token}`
  },
});