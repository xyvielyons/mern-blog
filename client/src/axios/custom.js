import axios from "axios";

const authFetch = axios.create({
    baseURL:"http://127.0.0.1:4000/api",
    withCredentials:true,
    headers:{
        Accept:"application/json"
    },
    
})
export default authFetch