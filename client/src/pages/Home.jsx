import React, { useEffect } from 'react'
import authFetch from '../axios/custom'
import { useNavigate } from 'react-router-dom'
export default function Home() {
const navigate = useNavigate();
  // useEffect(()=>{
  //   try{
  //     const verify = async ()=>{
  //       const res = await authFetch.get("/user/refresh")
  //       if(!res.data.valid){
  //         navigate("/sign-in")
  //       }
  //     }
  //    verify()

  //   }catch(err){
  //     //console.log(err)
  //   }
    
  // })
  return (
    <div>Home</div>
  )
}


