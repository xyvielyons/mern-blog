import React, { useEffect,useState } from 'react'
import {useLocation} from 'react-router-dom'
import DashSidebar from '../components/DashSidebar'
import DashProfile from '../components/DashProfile'
import authFetch from '../axios/custom'
import { useNavigate } from 'react-router-dom'
import { DashPosts } from '../components/DashPosts'
import DashUsers  from '../components/DashUsers'
import DashComments from '../components/DashComments'
import DashboardComp from '../components/DashboardComp'
export default function Dashboard() {
  const [tab ,setTab] = useState("")
  const location = useLocation()
 const navigate = useNavigate()

//  useEffect(()=>{
//   const verify = async ()=>{
//     try{
//       const res = await authFetch.get("/user/refresh")
//     if(!res.data.valid){
//       return navigate("/sign-in")
//     }

//     }catch(err){
//       //console.log(err)

//     }
    
//   }
//  verify()
//  })

  useEffect(()=>{
      
    
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tap')
    console.log(tabFromUrl,urlParams,location)
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
  },[location.search])

  
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      <div className="md:w-56">
        <DashSidebar></DashSidebar>
      </div>

      {tab==="profile" && <DashProfile></DashProfile>}
      {tab==="posts" && <DashPosts></DashPosts>}
      {tab==="users" && <DashUsers></DashUsers>}
      {tab==="comments" && <DashComments></DashComments>}
      {tab==="dash" && <DashboardComp></DashboardComp>}

    </div>
  )
}
