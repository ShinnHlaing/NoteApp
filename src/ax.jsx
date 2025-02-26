import axios from "axios";

const ax = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
})
export default ax;

