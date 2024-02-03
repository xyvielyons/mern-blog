import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'


function HomeLayout() {
  return (
    <Outlet></Outlet>
  )
}
export default HomeLayout

