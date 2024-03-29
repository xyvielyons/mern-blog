import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard" 
import Header from "./components/Header"
import Layout from './components/Layout'
import { PrivateRoute } from './components/PrivateRoute'
import { ProtectedRoutes } from './components/ProtectedRoutes'
import { OnlyAdminPrivateRoute } from './components/OnlyAdminPrivateRoute'
import { CreatePost } from './pages/CreatePost'
import { UpdatePost } from './pages/UpdatePost'
import PostPage from './pages/PostPage'
import ScrollToTop from './components/ScrollToTop'
import Search from './pages/Search'
export default function App() {
  


  return (
    <BrowserRouter>
    <ScrollToTop></ScrollToTop>
    <Routes>
    
      <Route element={<Layout></Layout>}>
          <Route path="/sign-in" element={<Signin></Signin>}></Route>
          <Route path="/sign-up" element={<Signup></Signup>}></Route>
          <Route path="/search" element={<Search></Search>}></Route>
              
                  <Route path="/" element={<Home></Home>}></Route>
                      <Route path="/about" element={<About></About>}></Route>
                      <Route path="/projects" element={<Projects></Projects>}></Route>
                      <Route path="/post/:postSlug" element={<PostPage></PostPage>}></Route>
                      
                              <Route element={<PrivateRoute/>}>
                                  <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
                              </Route>
                              <Route element={<OnlyAdminPrivateRoute/>}>
                                  <Route path="/create-post" element={<CreatePost></CreatePost>}></Route>
                                  <Route path="/update-post/:postId" element={<UpdatePost></UpdatePost>}></Route>
                              


               </Route>
               



                 
                
      </Route>

     

  

    </Routes>

    
    </BrowserRouter>
  )
}
