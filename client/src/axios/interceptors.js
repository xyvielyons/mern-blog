import axios from "axios";

const myauthFetch = axios.create({
    baseURL:"https://course-api.com",
    // headers:{
    //     Accept:"application/json"
    // }
    
})


myauthFetch.interceptors.request.use(
    (request)=>{
    
    console.log("request sent")
    return request
    },
    (error)=>{
    Promise.reject(error)
})


myauthFetch.interceptors.response.use((response)=>{
    console.log("got response")
    return response
},(error)=>{
    console.log(error.response)
})

export default myauthFetch