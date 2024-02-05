import React, { useEffect,useState,} from 'react'
import {Sidebar} from "flowbite-react"
import {useLocation} from 'react-router-dom'
import {HiUser,HiArrowSmRight} from "react-icons/hi"
import { Link } from 'react-router-dom'
export default function DashSidebar() {
    const location = useLocation()
    const [tab ,setTab] = useState("")

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
                <Sidebar.Item  icon={HiArrowSmRight} className="cursor-pointer">
                  Sign Out
                </Sidebar.Item>
                

            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}
