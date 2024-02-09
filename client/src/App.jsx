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
export default function App() {
  


  return (
    <BrowserRouter>
    <Routes>
    
      <Route element={<Layout></Layout>}>
          <Route path="/sign-in" element={<Signin></Signin>}></Route>
          <Route path="/sign-up" element={<Signup></Signup>}></Route>
              
               <Route path="/" element={<ProtectedRoutes></ProtectedRoutes>}>
                  <Route path="/" element={<Home></Home>}></Route>
                      <Route path="/about" element={<About></About>}></Route>
                      <Route path="/projects" element={<Projects></Projects>}></Route>
                      
                              <Route element={<PrivateRoute/>}>
                                  <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
                              </Route>


               </Route>



                 
                
      </Route>

     

  

    </Routes>

    
    </BrowserRouter>
  )
}
