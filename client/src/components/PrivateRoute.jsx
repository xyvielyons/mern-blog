import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import {  useSelector } from 'react-redux'
export const PrivateRoute = () => {
    const {currentUser} = useSelector((state)=> state.user)
  return currentUser ? <Outlet/> : <Navigate to="/sign-in"/>
}
