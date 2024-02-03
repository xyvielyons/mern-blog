import React from 'react'
import {Footer} from "flowbite-react"
import { Link } from 'react-router-dom'
import {BsFacebook,BsInstagram,BsTwitter,BsGithub} from "react-icons/bs"
export default function Footercom() {
  return (
  <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm-flex md:grid-cols-1">
            <div className="mt-5">
                  <Link to="/" className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white '>
                  <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 to-pink-500 rounded-lg text-white'>Xaviers</span> Blog
                  </Link>
            </div>
            <div className="">
            <div className='grid grid-cols-2 gap-8 sm: mt-4 sm:grid-cols-3 sm:gap-6'>
              <Footer.Title title="About"/>
              <Footer.LinkGroup col>
                  <Footer.Link
                  href="https://www.100jsprojects.com"
                  target="_blank"
                  >100 Js Projects</Footer.Link>

                  <Footer.Link
                  href="https://www.100jsprojects.com"
                  target="_blank"
                  rel="noopenner no refeerer"
                  >xyvieblog</Footer.Link>


                </Footer.LinkGroup>
             

            </div>
            <div className='grid grid-cols-2 gap-8 sm: mt-4 sm:grid-cols-3 sm:gap-6'>
              <Footer.Title title="Follow Us"/>
              <Footer.LinkGroup col>
                  <Footer.Link
                  href="https://www.100jsprojects.com"
                  target="_blank"
                  >Github</Footer.Link>

                  <Footer.Link
                  href="https://www.100jsprojects.com"
                  target="_blank"
                  rel="noopenner no refeerer"
                  >Twitter</Footer.Link>


                </Footer.LinkGroup>
             

            </div>
            <div className='grid grid-cols-2 gap-8 sm: mt-4 sm:grid-cols-3 sm:gap-6'>
              <Footer.Title title="Legal"/>
              <Footer.LinkGroup col>
                  <Footer.Link
                  href="https://www.100jsprojects.com"
                  target="_blank"
                  >privacy policy</Footer.Link>

                  <Footer.Link
                  href="https://www.100jsprojects.com"
                  target="_blank"
                  rel="noopenner no refeerer"
                  >terms and condition</Footer.Link>


                </Footer.LinkGroup>
             

            </div>
            </div>
        </div>

        <Footer.Divider></Footer.Divider>
        <div className=''>
          <Footer.Copyright href="#" by="xyvielyons blog" year={new Date().getFullYear()}/></div>
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href='#' icon={BsFacebook}/>
            <Footer.Icon href='#' icon={BsTwitter}/>
            <Footer.Icon href='#' icon={BsGithub}/>
            <Footer.Icon href='#' icon={BsInstagram}/>


          </div>
      </div>

   </Footer>
  )
}
