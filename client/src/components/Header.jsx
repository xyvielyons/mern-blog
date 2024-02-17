import React, { useEffect,useState } from 'react'
import {Navbar,TextInput,Button, Dropdown, Avatar} from "flowbite-react"
import { Link ,useLocation,useNavigate} from 'react-router-dom'
import {FaMoon,FaSun} from "react-icons/fa"
import {AiOutlineSearch} from "react-icons/ai"
import {useSelector,useDispatch} from "react-redux"
import {toggleTheme} from "../redux/theme/themeSlice"
import {signOutSuccess} from"../redux/user/userSlice.js"
import authFetch from '../axios/custom.js'
export default function Header() {
  const path = useLocation().pathname
  const location = useLocation()
  const dispatch = useDispatch()
  const {currentUser} = useSelector(state=>state.user)
  const {theme} = useSelector(state=>state.theme)
  const [searchTerm,setSearchTerm] = useState('')
  const navigate = useNavigate()

  console.log(searchTerm)
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get('searchTerm')
    if(searchTermFromUrl){
      setSearchTerm(searchTermFromUrl)
    }

  },[location.search])

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
const handleSubmit = (e)=>{
  e.preventDefault();
  const urlParams = new URLSearchParams(location.search)
  urlParams.set('searchTerm',searchTerm)
  const searchQuery = urlParams.toString();
  navigate(`/search?${searchQuery}`)
}
  return (
    <>
    <Navbar className='border-b-2'>
    <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white '>
      <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 to-pink-500 rounded-lg text-white'>Xaviers</span> Blog
    </Link>
    <form action="" onSubmit={handleSubmit}>
      <TextInput
         type="text"
         placeholder='Search...'
         rightIcon={AiOutlineSearch}
         className='hidden lg:inline'
         value={searchTerm}
         onChange={(e)=>setSearchTerm(e.target.value)}

         
      />
    </form>
    <Button className='w-12 h-10 lg:hidden' color="gray" pill>
       <AiOutlineSearch/>
    </Button>

    <div className='flex gap-2 md:order-2'>
      <Button  className="w-12 h-10 hidden sm:inline" color="gray" pill onClick={()=>dispatch(toggleTheme())}>
        {theme==='light'? <FaSun/> : <FaMoon/>}

      </Button>
     {currentUser ? <Dropdown
     arrowIcon={false}
     inline
     label={
      <Avatar
      alt='user'
      img={currentUser.profilePicture}
      rounded/>
      
     }>
         <Dropdown.Header>
          <span className='block text-sm'>@{currentUser.username}</span>
          <span className='block text-sm font-medium truncate'>{currentUser.email}</span>

         </Dropdown.Header>
         <Link to={"/dashboard?tap=profile"}>
          <Dropdown.Item>Profile</Dropdown.Item>
         </Link>

         <Dropdown.Divider></Dropdown.Divider>
         <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>


     </Dropdown>:  <Link to="/sign-in">
      <Button  gradientDuoTone='purpleToBlue' pill  outline>
        Sign In

      </Button>

      </Link>
     }
     

   <Navbar.Toggle></Navbar.Toggle>
    </div>
        <Navbar.Collapse>
          <Navbar.Link active={path === "/"} as={"div"}>
            <Link to="/">
               Home
            
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/about"} as={"div"}>
            <Link to="/about">
               About
            
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/projects"} as={"div"}>
            <Link to="/projects">
               projects
            
            </Link>
          </Navbar.Link>


        </Navbar.Collapse>

    </Navbar>
    
    
    
    </>
    
   
  )
}
