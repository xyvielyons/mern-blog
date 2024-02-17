import React, { useEffect } from 'react'
import authFetch from '../axios/custom'
import {Link} from "react-router-dom"
import CallToAction from "./../components/CallToAction"
export default function Home() {


  return (
    <div className="">
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to my blog</h1>
        <p className='text-gray-500 text-xs sm:text-sm'>Here you'll find a variety of topics and tutorials on topics
          such as web development,software engineering and programming languages
        </p>
        <Link to='/search' className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'>View all posts</Link>

      </div>

      <div className="p-3 bg-amber-100 dark:bg-slate-700">
        <CallToAction/>
      </div>

    </div>
  )
}


