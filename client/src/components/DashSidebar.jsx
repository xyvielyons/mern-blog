import React, { useEffect,useState,} from 'react'
import {Sidebar, SidebarItem} from "flowbite-react"
import {useLocation} from 'react-router-dom'
import {HiUser,HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiAnnotation, HiChartPie} from "react-icons/hi"
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import {signOutSuccess} from"../redux/user/userSlice.js"
import authFetch from '../axios/custom.js'
export default function DashSidebar() {
    const location = useLocation()
    const dispatch = useDispatch()
    const [tab ,setTab] = useState("")
    const {currentUser} = useSelector(state=>state.user)


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
          
            <Sidebar.ItemGroup className='flex flex-col gap-1'>
            {
            currentUser && currentUser.isAdmin && (
              <Link to="/dashboard?tap=dash">
                <Sidebar.Item
                active={tab === 'dash' || !tab}
                icon={HiChartPie}
                as="div"
                >
                 Dashboard
                </Sidebar.Item>
              
              </Link>
            )
          }
                <Link to="/dashboard?tap=profile">
                <Sidebar.Item active={tab==="profile"} icon={HiUser} label={currentUser.isAdmin ? "Admin":"User"} labelColor="dark" as="div">
                  Profile
                </Sidebar.Item>
                </Link>
                {currentUser.isAdmin && 
                 <Link to="/dashboard?tap=posts">
                 <Sidebar.Item active={tab==="posts"} icon={HiDocumentText} as="div">
                   Posts
                 </Sidebar.Item>
               </Link>

                }
                {currentUser.isAdmin && 
                <>
                <Link to="/dashboard?tap=users">
                 <Sidebar.Item active={tab==="users"} icon={HiOutlineUserGroup} as="div">
                   users
                 </Sidebar.Item>
               </Link>
               <Link to="/dashboard?tap=comments">
               <Sidebar.Item active={tab==="comments"} icon={HiAnnotation} as="div">
                 comments
               </Sidebar.Item>
             </Link>
             </>
                 

                }

               

                <Sidebar.Item  icon={HiArrowSmRight} className="cursor-pointer" onClick={handleSignOut}>
                  Sign Out
                </Sidebar.Item>
                

            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}
