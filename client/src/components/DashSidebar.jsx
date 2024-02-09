import React, { useEffect,useState,} from 'react'
import {Sidebar} from "flowbite-react"
import {useLocation} from 'react-router-dom'
import {HiUser,HiArrowSmRight} from "react-icons/hi"
import { Link } from 'react-router-dom'
import {useDispatch} from "react-redux"
import {signOutSuccess} from"../redux/user/userSlice.js"
import authFetch from '../axios/custom.js'
export default function DashSidebar() {
    const location = useLocation()
    const dispatch = useDispatch()
    const [tab ,setTab] = useState("")
    const handleSignOut = async ()=>{
      try{
          const res = await authFetch.post('/user/signout',{})
          if(!res){
              console.log(res)
          }else{
              dispatch(signOutSuccess())
          }
  
      }catch(err){
          console.log(err.message)
      }
  
  }
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tap')
    
    console.log(tabFromUrl,urlParams,location)
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
  },[location.search])

  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Link to="/dashboard?tap=profile">
                <Sidebar.Item active={tab==="profile"} icon={HiUser} label={"User"} labelColor="dark" as="div">
                  Profile
                </Sidebar.Item>
                </Link>
                <Sidebar.Item  icon={HiArrowSmRight} className="cursor-pointer" onClick={handleSignOut}>
                  Sign Out
                </Sidebar.Item>
                

            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}
