import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard" 
import Header from "./components/Header"


export default function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route element={<Header></Header>}>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/about" element={<About></About>}></Route>
      <Route path="/projects" element={<Projects></Projects>}></Route>
      <Route path="/sign-in" element={<Signin></Signin>}></Route>
      <Route path="/sign-up" element={<Signup></Signup>}></Route>
      <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
      </Route>
  

    </Routes>
    
    </BrowserRouter>
  )
}
