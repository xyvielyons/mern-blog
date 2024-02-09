import React from 'react'
import {Outlet,Navigate} from "react-router-dom"
import authFetch from '../axios/custom'
const useAuth= async()=>{
    const getState = await authFetch.get("/user/refresh")
    console.log(getState.data.valid)
    return getState.data.valid
}

export const ProtectedRoutes = () => {
    const auth=useAuth()


    return auth ? <Outlet/> : <Navigate to="/sign-up"/>

}
