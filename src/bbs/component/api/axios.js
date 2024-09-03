import axios from "axios";
const api = axios.create({
    // json server
    // baseURL: "http://localhost:8000/",
    baseURL: "http://localhost:8001/",
})
export default api ;