import axios from "axios";

const authFetch = axios.create({
    baseURL:"https://sandbox.safaricom.co.ke",
    headers:{
        Accept:"application/json",
        Authorization:'Basic cFJZcjZ6anEwaThMMXp6d1FETUxwWkIzeVBDa2hNc2M6UmYyMkJmWm9nMHFRR2xWOQ=='
    },
    
})
export default authFetch